
import { cn } from "@/lib/utils/cn";

interface Tab {
  id: string;
  label: string;
}

const tabs: Tab[] = [
  { id: "all", label: "Todos" },
  { id: "pending", label: "Pendientes" },
  { id: "approved", label: "Aprobados" },
  { id: "rejected", label: "Rechazados" },
];

interface IncidentStatusTabsProps {
  activeTab: string;
  onTabClick: (tabId: string) => void;
  counts: {
    all: number;
    pending: number;
    approved: number;
    rejected: number;
  };
  className?: string;
}

export default function IncidentStatusTabs({
  activeTab,
  onTabClick,
  counts,
  className,
}: IncidentStatusTabsProps) {
  return (
    <div className={cn("border-b", className)}>
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabClick(tab.id)}
            className={cn(
              tab.id === activeTab
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
              "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
            )}
            aria-current={tab.id === activeTab ? "page" : undefined}
          >
            {tab.label}
            {counts[tab.id as keyof typeof counts] > 0 && (
              <span
                className={cn(
                  tab.id === activeTab
                    ? "bg-indigo-100 text-indigo-600"
                    : "bg-gray-100 text-gray-900",
                  "hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block"
                )}
              >
                {counts[tab.id as keyof typeof counts]}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}
