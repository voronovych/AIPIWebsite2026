"use client";

import { Fragment, useMemo, useState } from "react";
import { flushSync } from "react-dom";

import {
  CAN_EXPORT_OPTIONS,
  NOT_LISTED,
  PRESENT,
  TOOL_CATEGORIES,
  TOOL_MAX_LENGTH,
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
} from "./Field";
import SearchableSelect from "./SearchableSelect";

export const SEARCH_INPUT_ID = "di-search";
export const TOOL_SAVE_ID = "di-tool-save";

const YEARS = getYears();
const END_YEARS = [PRESENT, ...YEARS];
const MAX_RESULTS = 40;

const linkButtonClassName =
  "text-sm font-medium text-[#1d4ed8] hover:text-[#1e40af] hover:underline";
const addedBadgeClassName =
  "shrink-0 bg-[#eff6ff] px-2 py-0.5 text-xs font-medium text-[#1d4ed8]";
const itemButtonClassName =
  "flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-[#0c1425] hover:bg-[#f9fafb] focus-visible:bg-[#f9fafb] focus-visible:outline-none";

/**
 * The system currently open in the editor. Held by the form rather than the
 * picker so unsaved input survives switching steps.
 */
export type ToolEditing = {
  /** Position in the added list, or null for a system not added yet. */
  index: number | null;
  draft: IntakeTool;
  original: IntakeTool;
  /** Where the editor is shown: under its list item or its added row. */
  anchor: string;
  /** Message shown in the editor, e.g. when Submit finds it unfinished. */
  notice?: string;
};

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

function toolIdPrefix(tool: IntakeTool): string {
  return `tool-${tool.category}-${tool.item}`.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
}

/**
 * Resolves an open editor before moving on (Submit, or opening another
 * system): untouched editors are dropped, finished changes are kept, and
 * unfinished ones return the reason so nothing is silently lost.
 */
export function settleEditor(
  editing: ToolEditing | null,
  tools: IntakeTool[],
): { ok: true; tools: IntakeTool[] } | { ok: false; message: string } {
  if (!editing || JSON.stringify(editing.draft) === JSON.stringify(editing.original)) {
    return { ok: true, tools };
  }

  const message = validateTool(editing.draft);
  if (message) return { ok: false, message };

  return {
    ok: true,
    tools:
      editing.index === null
        ? [...tools, editing.draft]
        : tools.map((tool, index) => (index === editing.index ? editing.draft : tool)),
  };
}

/** Moves focus to the open editor's Add/Save button, e.g. to show its notice. */
export function focusEditor() {
  const button = document.getElementById(TOOL_SAVE_ID);
  button?.scrollIntoView({ behavior: "smooth", block: "center" });
  button?.focus({ preventScroll: true });
}

function ToolEditor({
  editing,
  onChange,
  onSave,
  onCancel,
}: {
  editing: ToolEditing;
  onChange: (editing: ToolEditing) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  const [error, setError] = useState("");
  const { draft } = editing;
  const isNew = editing.index === null;
  const askName = needsCustomName(draft);
  const idPrefix = toolIdPrefix(draft);
  const message = error || editing.notice;

  function update<K extends keyof IntakeTool>(key: K, value: IntakeTool[K]) {
    onChange({ ...editing, draft: { ...draft, [key]: value }, notice: undefined });
  }

  function save() {
    const problem = validateTool(draft);
    if (problem) {
      setError(problem);
      return;
    }
    onSave();
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
            className={inputClassName}
            value={draft.customName}
            maxLength={TOOL_MAX_LENGTH.customName}
            onChange={(event) => update("customName", event.target.value)}
            placeholder="Name of the tool"
          />
        </Field>
      )}

      <div className="grid gap-5 sm:grid-cols-2 sm:gap-4">
        <Field id={`${idPrefix}-start`} label="Used from">
          <SearchableSelect
            id={`${idPrefix}-start`}
            value={draft.startYear}
            onChange={(value) => update("startYear", value)}
            placeholder="Start year"
            options={YEARS}
          />
        </Field>
        <Field id={`${idPrefix}-end`} label="Until">
          <SearchableSelect
            id={`${idPrefix}-end`}
            value={draft.endYear}
            onChange={(value) => update("endYear", value)}
            placeholder="End year"
            options={END_YEARS}
          />
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
          maxLength={TOOL_MAX_LENGTH.contents}
          onChange={(event) => update("contents", event.target.value)}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2 sm:gap-4">
        <Field id={`${idPrefix}-size`} label="Approx. export size" optional>
          <input
            id={`${idPrefix}-size`}
            className={inputClassName}
            value={draft.size}
            maxLength={TOOL_MAX_LENGTH.size}
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

      {message && (
        <p role="alert" className={errorClassName}>
          {message}
        </p>
      )}

      <button
        id={TOOL_SAVE_ID}
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
  editing,
  onEditingChange,
  error,
}: {
  tools: IntakeTool[];
  onChange: (tools: IntakeTool[]) => void;
  editing: ToolEditing | null;
  onEditingChange: (editing: ToolEditing | null) => void;
  error?: string;
}) {
  const [query, setQuery] = useState("");
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const normalizedQuery = query.trim().toLowerCase();
  const trimmedQuery = query.trim();

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

  /** Opens an editor, first keeping or flagging whatever was open before. */
  function startEditing(next: ToolEditing) {
    // Already open: keep its unsaved input rather than reopening it empty.
    if (editing?.anchor === next.anchor) {
      focusEditor();
      return;
    }

    const settled = settleEditor(editing, tools);
    if (!settled.ok) {
      if (editing) onEditingChange({ ...editing, notice: settled.message });
      focusEditor();
      return;
    }
    // Finished changes are kept. New systems are appended, so the indexes
    // of existing ones (and of `next`) don't move. Rendered synchronously so
    // focus moves now, not a frame later when the visitor may be typing.
    flushSync(() => {
      if (settled.tools !== tools) onChange(settled.tools);
      onEditingChange(next);
    });

    const firstField = needsCustomName(next.draft) ? "name" : "start";
    document.getElementById(`${toolIdPrefix(next.draft)}-${firstField}`)?.focus();
  }

  /** "Other …" entries can be added many times; anything else opens its existing entry. */
  function openItem(category: string, item: string) {
    const index = needsCustomName({ category, item })
      ? -1
      : tools.findIndex((tool) => tool.category === category && tool.item === item);

    if (index >= 0) {
      startEditing({ index, draft: tools[index], original: tools[index], anchor: `added::${index}` });
    } else {
      const draft = emptyTool(category, item);
      startEditing({ index: null, draft, original: draft, anchor: `${category}::${item}` });
    }
  }

  function saveEditing() {
    const settled = settleEditor(editing, tools);
    if (settled.ok && settled.tools !== tools) onChange(settled.tools);
    onEditingChange(null);
  }

  function removeTool(index: number) {
    onChange(tools.filter((_, current) => current !== index));

    // Keep an editor open on another system, pointing at its new position.
    if (editing?.index === index) {
      onEditingChange(null);
    } else if (editing?.index != null && editing.index > index) {
      onEditingChange({ ...editing, index: editing.index - 1, anchor: `added::${editing.index - 1}` });
    }
  }

  const editor = editing && (
    <ToolEditor
      editing={editing}
      onChange={onEditingChange}
      onSave={saveEditing}
      onCancel={() => onEditingChange(null)}
    />
  );

  // The editor normally sits under the item that opened it. If that item is
  // no longer shown (search changed, category collapsed, step revisited),
  // show it above the list so unsaved input stays visible.
  const anchorShown =
    !!editing &&
    (editing.index !== null ||
      (normalizedQuery
        ? editing.anchor === `${NOT_LISTED}::${trimmedQuery}` ||
          results.some(({ category, item }) => editing.anchor === `${category}::${item}`)
        : editing.anchor.startsWith(`${openCategory}::`)));

  function editorSlot(anchor: string) {
    return editing?.anchor === anchor && anchorShown ? <li>{editor}</li> : null;
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
                      startEditing({ index, draft: tool, original: tool, anchor: `added::${index}` })
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
            maxLength={TOOL_MAX_LENGTH.item}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") event.preventDefault();
            }}
            {...errorProps(SEARCH_INPUT_ID, error)}
          />
        </div>
        <FieldError id={SEARCH_INPUT_ID} message={error} />
      </div>

      {editing && !anchorShown && (
        <div className="border border-[#e5e7eb]">{editor}</div>
      )}

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
