'use client'
import { useEffect, useState } from 'react';

export default function CalculateImageSize({ IMAGESELECTED }: { IMAGESELECTED: string }) {
    const [sizeInBytes, setSizeInBytes] = useState<number | null>(null);

    useEffect(() => {
        const getImageSize = async () => {
            try {
                const res = await fetch(IMAGESELECTED);
                const blob = await res.blob();
                setSizeInBytes(blob.size);
            } catch (error) {
                console.error("Error loading image:", error);
                setSizeInBytes(null);
            }
        };

        getImageSize();
    }, [IMAGESELECTED]);

    return (
        <p className="text-[12px] para-color text-center">
            {sizeInBytes !== null ? `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB` : "Loading..."}
        </p>
    );
}
