'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Globe } from 'lucide-react';

const incidentData = [
  { name: 'Phishing', value: 1250, percentage: 42.5, color: '#FCD34D' },
  { name: 'Malware', value: 850, percentage: 28.9, color: '#3B82F6' },
  { name: 'Ransomware', value: 520, percentage: 17.7, color: '#EF4444' },
  { name: 'Llamadas', value: 320, percentage: 10.9, color: '#10B981' },
];

const TOTAL_SESSIONS = 2940;

export default function IncidentsPieChart() {
  return (
    <div className="bg-brand-background-subtle rounded-2xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-start gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white">
          <Globe className="w-5 h-5 text-orange-500" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-brand-text-primary">
            Incidentes más comunes
          </h3>
        </div>
      </div>

      {/* Total Count */}
      <div className="mb-2">
        <div className="text-4xl font-bold text-brand-text-primary">
          {TOTAL_SESSIONS.toLocaleString()}
        </div>
        <div className="text-sm text-brand-text-secondary">
          Total de sesiones • Por fuente
        </div>
      </div>

      {/* Chart and Legend */}
      <div className="flex flex-col lg:flex-row items-center gap-8 mt-6">
        {/* Pie Chart */}
        <div className="w-full lg:w-1/2">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={incidentData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {incidentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="w-full lg:w-1/2 space-y-4">
          {incidentData.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-base text-brand-text-primary font-medium">
                  {item.name}
                </span>
              </div>
              <div className="text-right">
                <div className="text-base font-semibold text-brand-text-primary">
                  {item.value.toLocaleString()}
                </div>
                <div className="text-sm text-brand-text-secondary">
                  {item.percentage}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
