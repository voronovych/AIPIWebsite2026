"use client";

import { type KeyboardEvent, useMemo, useState } from "react";

import { errorProps, inputClassName } from "./Field";

/** Lowercased and accent-free, so "cote" finds "Côte d'Ivoire". */
function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

/**
 * Type-to-filter dropdown for long option lists. A native select with
 * hundreds of options opens as a full-screen menu on macOS; this keeps the
 * list at a fixed height under the input.
 */
export default function SearchableSelect({
  id,
  value,
  onChange,
  placeholder,
  options,
  error,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: readonly string[];
  error?: string;
}) {
  // null while not typing, so the input shows the chosen value.
  const [query, setQuery] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const listId = `${id}-listbox`;
  const optionId = (index: number) => `${id}-option-${index}`;

  const matches = useMemo(() => {
    const normalizedQuery = normalize(query ?? "");
    if (!normalizedQuery) return options;

    const startsWith: string[] = [];
    const contains: string[] = [];
    for (const option of options) {
      const normalizedOption = normalize(option);
      if (normalizedOption.startsWith(normalizedQuery)) startsWith.push(option);
      else if (normalizedOption.includes(normalizedQuery)) contains.push(option);
    }
    return [...startsWith, ...contains];
  }, [options, query]);

  function scrollToOption(index: number, block: ScrollLogicalPosition) {
    requestAnimationFrame(() =>
      document.getElementById(optionId(index))?.scrollIntoView({ block }),
    );
  }

  function openList() {
    const selectedIndex = matches.indexOf(value);
    setOpen(true);
    setActiveIndex(selectedIndex);
    if (selectedIndex >= 0) scrollToOption(selectedIndex, "center");
  }

  function select(option: string) {
    onChange(option);
    setQuery(null);
    setOpen(false);
  }

  /** Leaving the field keeps an exact typed match, otherwise the prior choice. */
  function close() {
    if (query !== null) {
      const typed = normalize(query);
      const exact = options.find((option) => normalize(option) === typed);
      if (exact) onChange(exact);
    }
    setQuery(null);
    setOpen(false);
  }

  function moveActive(next: number) {
    setActiveIndex(next);
    scrollToOption(next, "nearest");
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!open) openList();
      else moveActive(Math.min(activeIndex + 1, matches.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (open) moveActive(Math.max(activeIndex - 1, 0));
    } else if (event.key === "Enter" && open) {
      // Pick the highlighted option rather than submitting the form.
      event.preventDefault();
      if (matches[activeIndex]) select(matches[activeIndex]);
      else close();
    } else if (event.key === "Escape" && open) {
      event.preventDefault();
      setQuery(null);
      setOpen(false);
    }
  }

  return (
    <div className="relative">
      <input
        id={id}
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={
          open && matches[activeIndex] ? optionId(activeIndex) : undefined
        }
        autoComplete="off"
        className={`${inputClassName} pr-10`}
        placeholder={placeholder}
        value={query ?? value}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
          setActiveIndex(event.target.value.trim() ? 0 : -1);
        }}
        onClick={() => {
          if (!open) openList();
        }}
        onKeyDown={handleKeyDown}
        onBlur={close}
        {...errorProps(id, error)}
      />
      <svg
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#6b7280]"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>

      {open && (
        <ul
          id={listId}
          role="listbox"
          // Keeps focus in the input when clicking an option or the scrollbar.
          onMouseDown={(event) => event.preventDefault()}
          className="absolute z-20 mt-1 max-h-64 w-full overflow-y-auto border border-[#d1d5db] bg-white py-1 shadow-lg"
        >
          {matches.length > 0 ? (
            matches.map((option, index) => (
              <li
                key={option}
                id={optionId(index)}
                role="option"
                aria-selected={option === value}
                onClick={() => select(option)}
                onMouseMove={() => {
                  if (index !== activeIndex) setActiveIndex(index);
                }}
                className={`cursor-pointer px-4 py-2 text-sm ${
                  index === activeIndex
                    ? "bg-[#eff6ff] text-[#1d4ed8]"
                    : "text-[#0c1425]"
                } ${option === value ? "font-semibold" : ""}`}
              >
                {option}
              </li>
            ))
          ) : (
            <li
              role="option"
              aria-selected={false}
              aria-disabled="true"
              className="px-4 py-2 text-sm text-[#6b7280]"
            >
              No matches
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
