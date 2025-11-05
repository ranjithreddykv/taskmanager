import React from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Tabs = ({ tabs, selected, setSelected, children }) => {
  return (
    <div className="w-full px-1 sm:px-0">
      <div className="flex space-x-6 rounded-xl p-1 border-b">
        {tabs.map((tab, index) => (
          <button
            key={index + tab.title}
            onClick={() => setSelected(index)}
            className={classNames(
              "w-fit flex items-center outline-none gap-2 px-3 py-2.5 text-base font-medium leading-5 bg-white",
              selected === index
                ? "text-blue-700 border-b-2 border-blue-600"
                : "text-gray-800 hover:text-blue-800"
            )}
          >
            {tab.icon}
            <span>{tab.title}</span>
          </button>
        ))}
      </div>

      {/* Content area */}
      <div className="w-full mt-4">{children}</div>
    </div>
  );
};

export default Tabs;
