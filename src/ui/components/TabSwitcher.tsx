import type { ReactNode } from 'react';

interface Tab {
  id: string;
  label: string;
  icon: ReactNode;
}

interface TabSwitcherProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

export const TabSwitcher = ({ tabs, activeTab, onChange }: TabSwitcherProps) => {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`
            flex items-center gap-2 px-6 py-6 rounded-2xl font-medium transition-all duration-200
            ${
              activeTab === tab.id
                ? 'bg-[#2b3d9d] text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-700 shadow-sm'
            }
          `}
        >
          <span className="text-2xl">{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};
