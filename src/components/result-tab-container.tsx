import React from 'react';

function ResultTabContainer({ children }: { children: React.ReactNode }) {
  const items = React.Children.toArray(children);

  return (
    <div className="tabs tabs-lift">
      {items.map((child, index) => (
        <React.Fragment key={index}>
          <input
            type="radio"
            name="my_tabs_3"
            className="tab"
            aria-label={`Tab ${index + 1}`}
            {...(index === 0 ? { defaultChecked: true } : {})}
          />
          <div className="tab-content bg-base-100 border-base-300 p-6">
            {child}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
export default ResultTabContainer