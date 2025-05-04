"use client";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";
import { SelectDropdownProps } from "../utils/Types";

export default function SelectDropdown({
  label,
  options,
  selected,
  onChange,
  labelStyle,
  optionStyle,
  buttonStyle,
}: SelectDropdownProps) {
  return (
    <div className="relative">
      <Listbox value={selected} onChange={onChange}>
        <Label
          className={`block ${labelStyle}`}
        >
          {label}
        </Label>
        <div className="relative mt-2">
          <ListboxButton className={`flex gap-2.5 justify-between items-center w-full cursor-default rounded-md bg-white text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm py-4 px-3 ${buttonStyle}`}>
            {selected.name}
            <ChevronUpDownIcon
              aria-hidden="true"
              className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
            />
          </ListboxButton>

          <ListboxOptions
            transition
            className="absolute z-10 mt-1 max-h-56 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm w-full"
          >
            {options.map((option) => (
              <ListboxOption
                key={option.id}
                value={option}
                className={`group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden ${optionStyle}`}
              >
                <span>{option.name}</span>

                <span className="absolute inset-y-0 right-0 flex items-center px-2 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                  <CheckIcon aria-hidden="true" className="size-5" />
                </span>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
}
