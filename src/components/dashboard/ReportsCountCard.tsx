'use client';

import { Eye } from 'lucide-react';

const TOTAL_REPORTS = 847;

export default function ReportsCountCard() {
  return (
    <div className="bg-brand-background-subtle rounded-2xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white">
          <Eye className="w-5 h-5 text-orange-500" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-brand-text-primary">
            Número de Reportes
          </h3>
        </div>
      </div>

      {/* Total Count */}
      <div className="mt-6">
        <div className="text-5xl font-bold text-brand-text-primary">
          {TOTAL_REPORTS.toLocaleString()}
        </div>
        <div className="text-sm text-brand-text-secondary mt-2">
          Reportes totales registrados
        </div>
      </div>
    </div>
  );
}
