'use client';
import { db } from "Firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { ImageUp, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * MediaUploader component that handles file selection, preview,
 * upload to Cloudinary, and saving to Firestore
 * 
 * @param {Object} props 
 * @param {string} props.uploadPreset - Cloudinary upload preset
 * @param {string} props.cloudName - Cloudinary cloud name
 * @param {Function} props.onUploadComplete - Callback function after upload completes
 * @param {Function} props.onUploadError - Callback function if upload fails
 * @param {string} props.buttonText - Custom text for upload button
 * @param {string} props.fieldName - Field name in Firestore to update
 * @returns {JSX.Element}
 */
export default function UploadBtn({
  uploadPreset = "Dopify.ma",
  cloudName = "dipa1pgem",
  onUploadComplete,
  onUploadError,
  buttonText = "Upload Media",
  fieldName = "medialibrary"
}) {
  // Current user
  const session = useSession();
  const Current_Email = session?.data?.user?.email;
  
  // States for file handling
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // Handle file selection
  const handleChooseFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is an accepted image type
      const fileType = file.type;
      if (!fileType.match(/^image\/(jpeg|jpg|png)$/)) {
        showNotification('Only JPEG, JPG, and PNG files are accepted', 'error');
        return;
      }

      setSelectedFile(file);
      const URLImage = URL.createObjectURL(file);
      setImagePreview(URLImage);
      showNotification('File selected, ready to upload', 'info');
    }
  };

  // Clean up preview URLs when component unmounts or when preview changes
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // Handle canceling file upload
  const handleCancelImport = () => {
    setSelectedFile(null);
    setImagePreview(null);
    showNotification('Upload canceled', 'info');
  };

  // Show notification
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    
    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 5000);
  };

  // Handle uploading to Cloudinary and saving to Firestore
  const handleSaveImport = async () => {
    if (!selectedFile) {
      showNotification('No file selected', 'error');
      return;
    }

    if (!Current_Email) {
      showNotification('User not authenticated', 'error');
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", uploadPreset);
    formData.append("cloud_name", cloudName);
    const DocRef = doc(db, 'users', Current_Email);

    try {
      setIsLoading(true);
      showNotification('In process...', 'info');
      
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image !');
      }

      const data = await response.json();
      
    //   showNotification('Saved Successful', 'success');
      await updateDoc(DocRef, {
        [fieldName]: arrayUnion(data.secure_url)
      });

      showNotification('Upload successful!', 'success');
      
      // Call the onUploadComplete callback if provided
      if (onUploadComplete && typeof onUploadComplete === 'function') {
        onUploadComplete(data.secure_url);
      }
    } catch (error) {
      console.error(error);
      showNotification(`Error: ${error.message}`, 'error');
      
      // Call the onUploadError callback if provided
      if (onUploadError && typeof onUploadError === 'function') {
        onUploadError(error);
      }
    } finally {
      setImagePreview(null);
      setSelectedFile(null);
      setIsLoading(false);
    }
  };
  return (
    <div className="relative">
      {/* Upload Button */}
      <label 
        htmlFor="Upload-Image"
        className="bg-black border border-dashed border-white rounded-full 
        px-6 py-1.5 text-white font-semibold cursor-pointer hover:bg-black/80 
        flex items-center justify-center gap-2"
      >
        <input 
          type="file" 
          id="Upload-Image" 
          className="hidden"
          onChange={handleChooseFile}
          accept="image/jpeg,image/jpg,image/png" 
        />
        <ImageUp size={20}/> {buttonText}
      </label>

      {/* Preview Modal */}
      {imagePreview !== null && (
        <div className="fixed w-full h-screen bg-violet-500/40 left-0 top-0 z-30 
          flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg border border-neutral-200 shadow-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Image Preview</h3>
              <button onClick={handleCancelImport} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            
            <div className="relative w-[350px] h-[350px] overflow-hidden rounded-lg border border-neutral-200 shadow">
              <Image src={imagePreview} alt="Preview" fill className="object-contain"/>
            </div>
            
            <div className="flex gap-2 justify-end pt-4">
              <button 
                onClick={handleCancelImport} 
                className="py-1 px-4 cursor-pointer rounded-lg border bg-neutral-100 border-neutral-300 shadow hover:bg-neutral-200"
              >
                Cancel
              </button>
              <button 
                disabled={isLoading} 
                onClick={handleSaveImport} 
                className={`py-1 px-4 cursor-pointer rounded-lg border 
                text-white font-semibold ${isLoading ? "bg-violet-600/50 cursor-not-allowed" : "bg-violet-600 hover:bg-violet-700"}`}
              >
                {isLoading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification.show && (
        <div className={`fixed bottom-4 right-4 p-3 rounded-lg shadow-lg z-50 transition-all duration-300 delay-200 
          ${notification.type === 'error' ? 'bg-red-500 text-white' : 
            notification.type === 'success' ? 'bg-green-500 text-white' : 
            'bg-blue-500 text-white'}`}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
}