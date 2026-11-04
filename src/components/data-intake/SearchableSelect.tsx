"use client";

import { type KeyboardEvent, useMemo, useRef, useState } from "react";

import { inputClassName } from "./Field";

/** Lowercased and accent-free, so "cote" finds "Côte d'Ivoire". */
function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

/**
 * Type-to-filter dropdown for long option lists. A native select with many
 * options opens as a full-screen menu on macOS; this keeps the list at a
 * fixed height under the input.
 */
export default function SearchableSelect({
  id,
  value,
  onChange,
  placeholder,
  options,
  error,
  errorId,
  ariaLabel,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: readonly string[];
  error?: string;
  /** Element holding the error message, when it isn't `${id}-err`. */
  errorId?: string;
  ariaLabel?: string;
}) {
  // null while not typing, so the input shows the chosen value.
  const [query, setQuery] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const listRef = useRef<HTMLUListElement>(null);
  // Set when Tab accepts the highlighted option, so the blur that follows
  // doesn't overwrite it with an exact match of the typed text.
  const acceptedRef = useRef(false);
  // Tab only accepts a highlight the visitor chose with the keyboard; one left
  // under a resting mouse pointer would otherwise change the value silently.
  const keyboardHighlightRef = useRef(true);
  // The value when the list opened, restored by Escape.
  const valueOnOpenRef = useRef(value);
  const listId = `${id}-listbox`;
  const optionId = (index: number) => `${id}-option-${index}`;

  const matches = useMemo(() => {
    const normalizedQuery = normalize(query ?? "");
    if (!normalizedQuery) return options;

    const exact: string[] = [];
    const startsWith: string[] = [];
    const contains: string[] = [];
    for (const option of options) {
      const normalizedOption = normalize(option);
      if (normalizedOption === normalizedQuery) exact.push(option);
      else if (normalizedOption.startsWith(normalizedQuery)) startsWith.push(option);
      else if (normalizedOption.includes(normalizedQuery)) contains.push(option);
    }
    return [...exact, ...startsWith, ...contains];
  }, [options, query]);

  /** Scrolls the list, not the page, so the option is visible. */
  function scrollToOption(index: number, center: boolean) {
    requestAnimationFrame(() => {
      const list = listRef.current;
      const option = document.getElementById(optionId(index));
      if (!list || !option) return;

      const top = option.offsetTop;
      const bottom = top + option.offsetHeight;
      if (center) {
        list.scrollTop = top - (list.clientHeight - option.offsetHeight) / 2;
      } else if (top < list.scrollTop) {
        list.scrollTop = top;
      } else if (bottom > list.scrollTop + list.clientHeight) {
        list.scrollTop = bottom - list.clientHeight;
      }
    });
  }

  /** Scrolls the page just enough to show the whole list. */
  function revealList() {
    requestAnimationFrame(() =>
      listRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" }),
    );
  }

  function openList() {
    const selectedIndex = matches.indexOf(value);
    valueOnOpenRef.current = value;
    keyboardHighlightRef.current = true;
    setOpen(true);
    setActiveIndex(selectedIndex);
    revealList();
    if (selectedIndex >= 0) scrollToOption(selectedIndex, true);
  }

  function select(option: string) {
    onChange(option);
    setQuery(null);
    setOpen(false);
  }

  /** Leaving the field keeps an exact typed match, otherwise the prior choice. */
  function close() {
    if (acceptedRef.current) {
      acceptedRef.current = false;
    } else if (query !== null) {
      const typed = normalize(query);
      const exact = options.find((option) => normalize(option) === typed);
      if (exact) onChange(exact);
    }
    setQuery(null);
    setOpen(false);
  }

  function moveActive(next: number) {
    keyboardHighlightRef.current = true;
    setActiveIndex(next);
    scrollToOption(next, false);
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
      // Pick the highlighted option; don't let an enclosing form or editor
      // also treat this Enter as submit/save.
      event.preventDefault();
      event.stopPropagation();
      if (matches[activeIndex]) select(matches[activeIndex]);
      else close();
    } else if (event.key === "Escape" && open) {
      // Close only the list, not an enclosing editor.
      event.preventDefault();
      event.stopPropagation();
      if (value !== valueOnOpenRef.current) onChange(valueOnOpenRef.current);
      setQuery(null);
      setOpen(false);
    } else if (event.key === "Tab" && open && keyboardHighlightRef.current && matches[activeIndex]) {
      acceptedRef.current = true;
      select(matches[activeIndex]);
    }
  }

  return (
    <div className="relative">
      <input
        id={id}
        type="text"
        role="combobox"
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={
          open && matches[activeIndex] ? optionId(activeIndex) : undefined
        }
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? (errorId ?? `${id}-err`) : undefined}
        autoComplete="off"
        className={`${inputClassName} pr-10`}
        placeholder={placeholder}
        value={query ?? value}
        onChange={(event) => {
          const text = event.target.value;
          if (!open) {
            valueOnOpenRef.current = value;
            setOpen(true);
            revealList();
          }
          setQuery(text);
          setActiveIndex(text.trim() ? 0 : -1);
          keyboardHighlightRef.current = true;
          // An exact match counts straight away, so a value filled in by the
          // browser (which never blurs the field) is still saved.
          const typed = normalize(text);
          const exact = options.find((option) => normalize(option) === typed);
          if (exact && exact !== value) onChange(exact);
        }}
        onClick={() => {
          if (!open) openList();
        }}
        onFocus={() => {
          acceptedRef.current = false;
        }}
        onKeyDown={handleKeyDown}
        onBlur={close}
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
          ref={listRef}
          id={listId}
          role="listbox"
          // Keeps focus in the input when clicking an option or the scrollbar.
          onMouseDown={(event) => event.preventDefault()}
          className="absolute z-20 mt-1 max-h-64 w-full overflow-y-auto overscroll-contain border border-[#d1d5db] bg-white py-1 shadow-lg"
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
                  keyboardHighlightRef.current = false;
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
