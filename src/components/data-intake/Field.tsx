import type { ReactNode } from "react";

export const inputClassName =
  "w-full border border-[#d1d5db] bg-white px-4 py-3 text-sm text-[#0c1425] placeholder-[#9ca3af] focus:border-[#1d4ed8] focus:ring-1 focus:ring-[#1d4ed8] focus:outline-none transition-colors aria-[invalid=true]:border-[#b91c1c]";

// Native select arrows sit flush against the border; draw one inset like the
// text instead, matching the chevron on SearchableSelect.
export const selectClassName = `${inputClassName} appearance-none bg-no-repeat bg-[position:right_1rem_center] bg-[url(data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2716%27%20height=%2716%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%236b7280%27%20stroke-width=%271.5%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cpath%20d=%27m6%209%206%206%206-6%27/%3E%3C/svg%3E)] pr-10`;
export const labelClassName = "block text-sm font-medium text-[#374151] mb-2";
export const hintClassName = "mt-2 text-xs text-[#6b7280]";
export const errorClassName = "mt-2 text-sm text-[#b91c1c]";

/** Props that tie an input to its error message for assistive technology. */
export function errorProps(id: string, error: string | undefined) {
  return error
    ? { "aria-invalid": true as const, "aria-describedby": `${id}-err` }
    : {};
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? (
    <p id={`${id}-err`} className={errorClassName}>
      {message}
    </p>
  ) : null;
}

export function Field({
  id,
  label,
  optional,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClassName}>
        {label}
        {optional && (
          <span className="font-normal text-[#6b7280]"> (optional)</span>
        )}
      </label>
      {children}
      <FieldError id={id} message={error} />
      {hint && <p className={hintClassName}>{hint}</p>}
    </div>
  );
}

export function SelectInput({
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
  return (
    <select
      id={id}
      className={selectClassName}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      {...errorProps(id, error)}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
