'use client';
import { useEffect, useState, createContext } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from 'Firebase';
import { useSession } from 'next-auth/react';

export const MLData = createContext(null);
export default function MediaLibraryProvider({children}){

        const session = useSession();
        const Current_Email = session?.data?.user?.email;
        // Get Media Library of the current user
        const [MediaLibraryData, setMediaLibraryData] = useState([]);
        const [IsLoadingData, setIsLoadingData] = useState(true);
        useEffect(() => {
            if (!Current_Email) return;
        
            setIsLoadingData(true);
            const DocRef = doc(db, 'users', Current_Email);
        
            const unsubscribe = onSnapshot(DocRef, (docSnap) => {
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (data && Array.isArray(data.medialibrary)) {
                        setMediaLibraryData(data.medialibrary);
                    } else {
                        setMediaLibraryData([]);
                    }
                } else {
                    setMediaLibraryData([]);
                }
                setIsLoadingData(false);
            }, (error) => {
                console.error("Error fetching snapshot:", error);
                setIsLoadingData(false);
            });
        
            return () => unsubscribe();
        }, [Current_Email]);


    return (
        <MLData.Provider value={{MediaLibraryData, IsLoadingData}}>
            {children}
        </MLData.Provider>
    )
}