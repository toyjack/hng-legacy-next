'use client';

import { useState } from 'react';
import { TabContainerProps } from '@/types/components';
import { cn } from '@/lib/utils';

function TabContainer({ 
  tabs, 
  defaultActiveTab = 0,
  variant = 'default',
  onTabChange,
  className,
  children 
}: TabContainerProps) {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  const handleTabChange = (index: number) => {
    if (tabs[index]?.disabled) return;
    
    setActiveTab(index);
    if (onTabChange) {
      onTabChange(index);
    }
  };

  const baseClasses = 'tabs w-full';
  
  const variants = {
    default: 'tabs-lifted',
    lifted: 'tabs-lifted',
    boxed: 'tabs-boxed',
  };

  const tabsClasses = cn(
    baseClasses,
    variants[variant],
    className
  );

  const uniqueName = `tabs_${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={tabsClasses}>
      {tabs.map((tab, index) => (
        <div key={index}>
          <input
            type="radio"
            name={uniqueName}
            className={cn(
              'tab',
              tab.disabled && 'tab-disabled opacity-50 cursor-not-allowed'
            )}
            aria-label={tab.label}
            checked={activeTab === index}
            onChange={() => handleTabChange(index)}
            disabled={tab.disabled}
          />
          <div className="tab-content bg-base-100 border-base-300 rounded-box p-6">
            {tab.content}
          </div>
        </div>
      ))}
      {children && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </div>
  );
}

export default TabContainer;