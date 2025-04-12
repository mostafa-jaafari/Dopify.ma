// 'use client';
// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";


// export default function CustimizePage(){
//     const [storedData, setStoredData] = useState<any[]>(() => {
//             const savedTemplates = localStorage.getItem("Template-Products");
//             return savedTemplates ? JSON.parse(savedTemplates) : [];
//         });
//         useEffect(() => {
//             const savedTemplates = localStorage.getItem("Template-Products");
//             if (savedTemplates) {
//                 setStoredData(JSON.parse(savedTemplates));
//             }
//         }, []);

//     const PARAMS = useSearchParams();
//     const Get_Params_Id = Number(PARAMS.get('id'));
//     const Selected_Product = storedData.find((item) => item.id === Get_Params_Id);
//     return (
//         <main>
//             {Selected_Product ? Selected_Product.id : "Selecte One"}
//         </main>
//     )
// }
"use client";
import React, { useRef, useState, useEffect } from "react";

const PhotopeaEditorComponent = () => {
  const iframeRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== "https://www.photopea.com") return;
      try {
        const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        if (data.status === "ready") {
          setIsLoading(false);
          setIsIframeLoaded(true);
        }
      } catch (error) {
        console.error("Failed to parse message from Photopea:", error);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const handleIframeLoad = () => {
    setIsIframeLoaded(true);
    setTimeout(() => setIsLoading(false), 5000);
  };

  return (
    <div className="w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
          <p>Photopea Editor...</p>
        </div>
      )}
      <iframe
        ref={iframeRef}
        src="https://www.photopea.com"
        className="w-full h-full min-h-screen"
        allow="fullscreen"
        title="Photopea Editor"
        onLoad={handleIframeLoad}
      />
    </div>
  );
};

export default PhotopeaEditorComponent;
