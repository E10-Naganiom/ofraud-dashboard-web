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
      <h3 className="font-semibold text-lg mb-4">Evidencia</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {evidence.map((item) => (
          <Dialog key={item.id}>
            <DialogTrigger asChild>
              <button className="overflow-hidden rounded-lg border focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                <img
                  src={item.url}
                  alt={`Evidencia ${item.id}`}
                  className="w-full h-full object-cover aspect-square transition-transform hover:scale-105"
                />
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-2">
              <img
                src={item.url}
                alt={`Evidencia ${item.id}`}
                className="max-h-[80vh] w-auto object-contain mx-auto"
              />
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
