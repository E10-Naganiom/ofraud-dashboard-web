/**
 * Component: EvidenceGallery
 * Displays a gallery of incident evidence images with a modal for full-size view.
 */

import * as React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import type { Evidence } from '@/lib/types/incident.types';

interface EvidenceGalleryProps {
  evidence: Evidence[];
}

/**
 * Build the correct URL for evidence images
 * @param url - The URL path from the backend (e.g., "/public/uploads/image.jpg")
 * @returns Full URL to the backend
 */
function getEvidenceUrl(url: string): string {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://10.48.238.60:3000';
  
  // If URL already starts with http, return as is (full URL)
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // Remove leading slash if present
  const cleanUrl = url.startsWith('/') ? url.slice(1) : url;
  
  // Simply append to backend URL - don't add /public since it's already in the URL
  return `${backendUrl}/${cleanUrl}`;
}

/**
 * Renders a grid of evidence thumbnails.
 * Clicking a thumbnail opens a full-size image in a modal dialog.
 */
export default function EvidenceGallery({ evidence }: EvidenceGalleryProps) {
  if (!evidence || evidence.length === 0) {
    return (
      <div>
        <h3 className="font-semibold text-lg mb-2">Evidencia</h3>
        <p className="text-gray-500">Sin evidencia adjunta.</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-semibold text-lg mb-4">Evidencia ({evidence.length})</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {evidence.map((item) => {
          const imageUrl = getEvidenceUrl(item.url);
          
          // Debug log
          console.log('Evidence URL:', item.url, '→', imageUrl);
          
          return (
            <Dialog key={item.id}>
              <DialogTrigger asChild>
                <button className="overflow-hidden rounded-lg border focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:border-blue-500 transition-colors">
                  <img
                    src={imageUrl}
                    alt={`Evidencia ${item.id}`}
                    className="w-full h-full object-cover aspect-square transition-transform hover:scale-105"
                    onError={(e) => {
                      // Fallback if image fails to load
                      console.error(`Failed to load image: ${imageUrl}`);
                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect width="200" height="200" fill="%23ddd"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%23999"%3EImagen no disponible%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl p-2">
                <img
                  src={imageUrl}
                  alt={`Evidencia ${item.id}`}
                  className="max-h-[80vh] w-auto object-contain mx-auto"
                  onError={(e) => {
                    console.error(`Failed to load full image: ${imageUrl}`);
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect width="400" height="400" fill="%23ddd"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="18" fill="%23999"%3EImagen no disponible%3C/text%3E%3C/svg%3E';
                  }}
                />
              </DialogContent>
            </Dialog>
          );
        })}
      </div>
    </div>
  );
}