import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import React, { Fragment } from "react";
import { BsChevronExpand } from "react-icons/bs";
import { MdCheck } from "react-icons/md";

const SelectedList = ({ lists = [], selected, setSelected, label }) => {
  return (
    <div className="w-full">
      {label && (
        <p className="mb-1 text-sm font-medium text-slate-800">{label}</p>
      )}

      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          {/* Dropdown Button */}
          <ListboxButton className="relative w-full cursor-pointer rounded-lg bg-white border border-gray-300 pl-3 pr-10 py-2 text-left text-sm text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2">
            <span className="block truncate">
              {selected || "Select an option..."}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <BsChevronExpand
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>

          {/* Options List */}
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none">
              {lists.length > 0 ? (
                lists.map((list, index) => (
                  <ListboxOption
                    key={index}
                    value={list}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                        active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                      }`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {typeof list === "object" ? list.name : list}
                        </span>
                        {selected && (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <MdCheck className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </ListboxOption>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500">
                  No options available
                </div>
              )}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default SelectedList;
