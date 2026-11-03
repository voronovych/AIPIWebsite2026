"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";

import {
  CAN_EXPORT_OPTIONS,
  NOT_LISTED,
  PRESENT,
  TOOL_CATEGORIES,
  type IntakeTool,
  getToolName,
  getYears,
  needsCustomName,
  validateTool,
} from "@/utils/dataIntake";

import {
  Field,
  FieldError,
  SelectInput,
  errorClassName,
  errorProps,
  inputClassName,
  selectClassName,
} from "./Field";

export const SEARCH_INPUT_ID = "di-search";

const YEARS = getYears();
const MAX_RESULTS = 40;

const linkButtonClassName =
  "text-sm font-medium text-[#1d4ed8] hover:text-[#1e40af] hover:underline";
const addedBadgeClassName =
  "shrink-0 bg-[#eff6ff] px-2 py-0.5 text-xs font-medium text-[#1d4ed8]";
const itemButtonClassName =
  "flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-[#0c1425] hover:bg-[#f9fafb] focus-visible:bg-[#f9fafb] focus-visible:outline-none";

type Editing = { index: number | null; draft: IntakeTool; anchor: string };

function emptyTool(category: string, item: string): IntakeTool {
  return {
    category,
    item,
    customName: "",
    startYear: "",
    endYear: PRESENT,
    contents: "",
    size: "",
    canExport: "",
  };
}

function ToolEditor({
  draft: initialDraft,
  isNew,
  onSave,
  onCancel,
}: {
  draft: IntakeTool;
  isNew: boolean;
  onSave: (tool: IntakeTool) => void;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState(initialDraft);
  const [error, setError] = useState("");
  const firstInputRef = useRef<HTMLInputElement | HTMLSelectElement | null>(null);
  const askName = needsCustomName(draft);
  const idPrefix = `tool-${draft.category}-${draft.item}`
    .replace(/[^a-z0-9]+/gi, "-")
    .toLowerCase();

  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  function update<K extends keyof IntakeTool>(key: K, value: IntakeTool[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function save() {
    const message = validateTool(draft);
    if (message) {
      setError(message);
      return;
    }
    onSave(draft);
  }

  return (
    <div
      role="group"
      aria-label={`${isNew ? "Add" : "Edit"} ${askName ? "a system" : draft.item}`}
      className="space-y-5 border-t border-[#e5e7eb] bg-[#f9fafb] px-4 py-5"
      onKeyDown={(event) => {
        if (event.key === "Escape") onCancel();
        if (event.key === "Enter" && event.target instanceof HTMLInputElement) {
          // Keep Enter from submitting the whole form.
          event.preventDefault();
          save();
        }
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm font-semibold text-[#0c1425]">
          {askName ? draft.customName || draft.item : draft.item}
        </p>
        <button
          type="button"
          aria-label="Close"
          onClick={onCancel}
          className="-m-1 p-1 text-[#6b7280] hover:text-[#0c1425]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />
          </svg>
        </button>
      </div>

      {askName && (
        <Field id={`${idPrefix}-name`} label="Which system?">
          <input
            id={`${idPrefix}-name`}
            ref={(element) => {
              firstInputRef.current = element;
            }}
            className={inputClassName}
            value={draft.customName}
            onChange={(event) => update("customName", event.target.value)}
            placeholder="Name of the tool"
          />
        </Field>
      )}

      <div className="grid grid-cols-2 gap-4">
        <Field id={`${idPrefix}-start`} label="Used from">
          <select
            id={`${idPrefix}-start`}
            ref={(element) => {
              if (!askName) firstInputRef.current = element;
            }}
            className={selectClassName}
            value={draft.startYear}
            onChange={(event) => update("startYear", event.target.value)}
          >
            <option value="">Start year</option>
            {YEARS.map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>
        </Field>
        <Field id={`${idPrefix}-end`} label="Until">
          <select
            id={`${idPrefix}-end`}
            className={selectClassName}
            value={draft.endYear}
            onChange={(event) => update("endYear", event.target.value)}
          >
            <option value={PRESENT}>Present</option>
            {YEARS.map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        id={`${idPrefix}-contents`}
        label="What’s in it"
        optional
        hint="e.g. invoices, POs, payments, general ledger"
      >
        <input
          id={`${idPrefix}-contents`}
          className={inputClassName}
          value={draft.contents}
          onChange={(event) => update("contents", event.target.value)}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2 sm:gap-4">
        <Field id={`${idPrefix}-size`} label="Approx. export size" optional>
          <input
            id={`${idPrefix}-size`}
            className={inputClassName}
            value={draft.size}
            placeholder="e.g. 35 GB"
            onChange={(event) => update("size", event.target.value)}
          />
        </Field>
        <Field id={`${idPrefix}-export`} label="Can it export?" optional>
          <SelectInput
            id={`${idPrefix}-export`}
            value={draft.canExport}
            onChange={(value) => update("canExport", value)}
            placeholder="Select"
            options={CAN_EXPORT_OPTIONS}
          />
        </Field>
      </div>

      {error && (
        <p role="alert" className={errorClassName}>
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={save}
        className="w-full bg-[#1d4ed8] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1e40af]"
      >
        {isNew ? "Add" : "Save"}
      </button>
    </div>
  );
}

export default function SystemsPicker({
  tools,
  onChange,
  error,
}: {
  tools: IntakeTool[];
  onChange: (tools: IntakeTool[]) => void;
  error?: string;
}) {
  const [query, setQuery] = useState("");
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [editing, setEditing] = useState<Editing | null>(null);
  const normalizedQuery = query.trim().toLowerCase();

  const results = useMemo(
    () =>
      normalizedQuery
        ? TOOL_CATEGORIES.flatMap(({ category, items }) =>
            items
              .filter(
                (item) =>
                  item.toLowerCase().includes(normalizedQuery) ||
                  category.toLowerCase().includes(normalizedQuery),
              )
              .map((item) => ({ category, item })),
          ).slice(0, MAX_RESULTS)
        : [],
    [normalizedQuery],
  );

  /** "Other …" entries can be added many times; anything else opens its existing entry. */
  function openItem(category: string, item: string) {
    const index = needsCustomName({ category, item })
      ? -1
      : tools.findIndex((tool) => tool.category === category && tool.item === item);

    if (index >= 0) {
      setEditing({ index, draft: tools[index], anchor: `added::${index}` });
    } else {
      setEditing({
        index: null,
        draft: emptyTool(category, item),
        anchor: `${category}::${item}`,
      });
    }
  }

  function saveTool(tool: IntakeTool) {
    if (!editing) return;
    onChange(
      editing.index === null
        ? [...tools, tool]
        : tools.map((existing, index) => (index === editing.index ? tool : existing)),
    );
    setEditing(null);
  }

  function removeTool(index: number) {
    onChange(tools.filter((_, current) => current !== index));
    setEditing(null);
  }

  function editorSlot(anchor: string) {
    if (editing?.anchor !== anchor) return null;
    return (
      <li>
        <ToolEditor
          draft={editing.draft}
          isNew={editing.index === null}
          onSave={saveTool}
          onCancel={() => setEditing(null)}
        />
      </li>
    );
  }

  function itemRow(category: string, item: string, showCategory: boolean) {
    const anchor = `${category}::${item}`;
    const added =
      !needsCustomName({ category, item }) &&
      tools.some((tool) => tool.category === category && tool.item === item);

    return (
      <Fragment key={anchor}>
        <li>
          <button
            type="button"
            className={itemButtonClassName}
            onClick={() => openItem(category, item)}
          >
            <span className="min-w-0 flex-1">
              <span className="block">{item}</span>
              {showCategory && (
                <span className="block text-xs text-[#6b7280]">{category}</span>
              )}
            </span>
            {added && <span className={addedBadgeClassName}>Added</span>}
          </button>
        </li>
        {editorSlot(anchor)}
      </Fragment>
    );
  }

  const trimmedQuery = query.trim();

  return (
    <div className="space-y-6">
      {tools.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-semibold text-[#0c1425]">
            Added ({tools.length})
          </p>
          <ul className="divide-y divide-[#e5e7eb] border border-[#e5e7eb]">
            {tools.map((tool, index) => (
              <Fragment key={`added-${index}`}>
                <li className="flex items-center gap-4 px-4 py-3">
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-[#0c1425]">
                      {getToolName(tool)}
                    </span>
                    <span className="block text-xs text-[#6b7280]">
                      {tool.category} · {tool.startYear || "?"}–
                      {tool.endYear === PRESENT ? "present" : tool.endYear}
                    </span>
                  </span>
                  <button
                    type="button"
                    className={linkButtonClassName}
                    onClick={() =>
                      setEditing({ index, draft: tool, anchor: `added::${index}` })
                    }
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className={linkButtonClassName}
                    onClick={() => removeTool(index)}
                  >
                    Remove
                  </button>
                </li>
                {editorSlot(`added::${index}`)}
              </Fragment>
            ))}
          </ul>
        </div>
      )}

      <div>
        <label htmlFor={SEARCH_INPUT_ID} className="sr-only">
          Search systems
        </label>
        <div className="relative">
          <svg className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 4 4" />
          </svg>
          <input
            id={SEARCH_INPUT_ID}
            type="search"
            className={`${inputClassName} pl-11`}
            placeholder="Search systems"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") event.preventDefault();
            }}
            {...errorProps(SEARCH_INPUT_ID, error)}
          />
        </div>
        <FieldError id={SEARCH_INPUT_ID} message={error} />
      </div>

      {normalizedQuery ? (
        <ul className="divide-y divide-[#e5e7eb] border border-[#e5e7eb]">
          {results.map(({ category, item }) => itemRow(category, item, true))}
          <li>
            <button
              type="button"
              className={itemButtonClassName}
              onClick={() => openItem(NOT_LISTED, trimmedQuery)}
            >
              <span className="min-w-0 flex-1">
                Add “{trimmedQuery}” as a system not listed
              </span>
            </button>
          </li>
          {editorSlot(`${NOT_LISTED}::${trimmedQuery}`)}
        </ul>
      ) : (
        <ul className="divide-y divide-[#e5e7eb] border border-[#e5e7eb]">
          {TOOL_CATEGORIES.map(({ category, items }) => {
            const isOpen = openCategory === category;
            const addedCount = tools.filter((tool) => tool.category === category).length;

            return (
              <li key={category}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenCategory(isOpen ? null : category)}
                  className="flex w-full items-center gap-3 px-4 py-4 text-left text-sm font-medium text-[#0c1425] hover:bg-[#f9fafb] focus-visible:bg-[#f9fafb] focus-visible:outline-none"
                >
                  <span className="min-w-0 flex-1">{category}</span>
                  {addedCount > 0 && (
                    <span className={addedBadgeClassName}>{addedCount} added</span>
                  )}
                  <svg className={`shrink-0 text-[#6b7280] transition-transform ${isOpen ? "rotate-180" : ""}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {isOpen && (
                  <ul className="divide-y divide-[#e5e7eb] border-t border-[#e5e7eb] bg-white pl-4">
                    {items.map((item) => itemRow(category, item, false))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
