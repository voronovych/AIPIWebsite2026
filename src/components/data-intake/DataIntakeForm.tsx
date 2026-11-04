"use client";

import {
  type FormEvent,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { unstable_isUnrecognizedActionError } from "next/navigation";

import { type IntakeResult, submitDataIntake } from "@/app/data-intake/actions";
import {
  COUNTRIES,
  EMPTY_INTAKE,
  EXPORT_ABILITY_OPTIONS,
  type FieldError as IntakeFieldError,
  HEARD_FROM_OPTIONS,
  INDUSTRY_GROUPS,
  type IntakeData,
  type IntakeField,
  MAX_LENGTH,
  PRESENT,
  REVENUE_OPTIONS,
  STATUS_OPTIONS,
  STEPS,
  TRANSFER_OPTIONS,
  VOLUME_OPTIONS,
  getYears,
  validateStep,
} from "@/utils/dataIntake";

import {
  Field,
  FieldError,
  SelectInput,
  errorProps,
  hintClassName,
  inputClassName,
  labelClassName,
  selectClassName,
} from "./Field";
import SearchableSelect from "./SearchableSelect";
import SystemsPicker, {
  SEARCH_INPUT_ID,
  type ToolEditing,
  focusEditor,
  settleEditor,
} from "./SystemsPicker";

const CONTACT_ADDRESS = "cmorehouse@aipisolutions.com";
const DRAFT_KEY = "aipi-data-intake-draft-v1";
const YEARS = getYears();
const END_YEARS = [PRESENT, ...YEARS];

const STEP_COPY = [
  {
    title: "Tell us about your company",
    sub: "A few details to get started. We won’t share any information without your consent.",
  },
  {
    title: "Help us estimate your data’s value",
    sub: "A few details about your business help us understand the potential size and value of your dataset. Estimates are fine.",
  },
  {
    title: "Which systems hold your records?",
    sub: "Add every system you use now or used before, with the years you used it. The strongest datasets usually span 8 or more.",
  },
];

const NETWORK_ERROR = `We could not reach the server. Please check your connection and try again, or email ${CONTACT_ADDRESS}.`;
// Server functions are tied to a deployment; a page left open across one
// can't call the new version until it reloads.
const STALE_PAGE_ERROR =
  "This page was updated while you were filling it in. Please reload the page and click Submit again; your answers will still be there.";

type Draft = { data: IntakeData; step: number };

const TOOL_FIELDS = ["category", "item", "customName", "startYear", "endYear", "contents", "size", "canExport"];

/** True when a saved draft has the shape the form renders; anything else is discarded. */
function isIntakeData(value: Record<string, unknown>): value is IntakeData {
  return (
    Object.entries(EMPTY_INTAKE).every(([key, fallback]) =>
      Array.isArray(fallback) ? Array.isArray(value[key]) : typeof value[key] === typeof fallback,
    ) &&
    (value.tools as unknown[]).every(
      (tool) =>
        typeof tool === "object" &&
        tool !== null &&
        TOOL_FIELDS.every((field) => typeof (tool as Record<string, unknown>)[field] === "string"),
    )
  );
}

// Drafts are a convenience so a long form survives a reload; storage can be
// unavailable (private browsing, blocked site data), so failures are ignored.
function readDraft(): Draft | null {
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || !parsed.data) return null;
    const data = { ...EMPTY_INTAKE, ...parsed.data };
    if (!isIntakeData(data)) return null;
    const step = Number(parsed.step);
    return {
      data,
      step: Number.isInteger(step) ? Math.min(Math.max(step, 0), STEPS.length - 1) : 0,
    };
  } catch {
    return null;
  }
}

function writeDraft(draft: Draft | null) {
  try {
    if (draft) window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    else window.localStorage.removeItem(DRAFT_KEY);
  } catch {}
}

function inputId(field: IntakeField): string {
  return field === "tools" ? SEARCH_INPUT_ID : `di-${field}`;
}

const subscribeToNothing = () => () => {};

export default function DataIntakeForm({ token }: { token: string }) {
  // The saved draft lives in browser storage, so the server renders an empty
  // form and the client remounts it with the draft once storage is readable.
  const isClient = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );

  return (
    <IntakeSteps
      key={isClient ? "client" : "server"}
      token={token}
      draft={isClient ? readDraft() : null}
      ready={isClient}
    />
  );
}

function IntakeSteps({
  token,
  draft,
  ready,
}: {
  token: string;
  draft: Draft | null;
  ready: boolean;
}) {
  const [data, setData] = useState<IntakeData>(draft?.data ?? EMPTY_INTAKE);
  const [step, setStep] = useState(draft?.step ?? 0);
  const [fieldError, setFieldError] = useState<IntakeFieldError | null>(null);
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [editingTool, setEditingTool] = useState<ToolEditing | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (ready && !submitted) writeDraft({ data, step });
  }, [data, step, ready, submitted]);

  function setField<K extends IntakeField>(field: K, value: IntakeData[K]) {
    setData((current) => ({ ...current, [field]: value }));
    setFieldError((current) => (current?.field === field ? null : current));
  }

  function errorFor(field: IntakeField): string | undefined {
    return fieldError?.field === field ? fieldError.message : undefined;
  }

  /** Binds a text input to its field, with its id and error wiring. */
  function bind(field: keyof typeof MAX_LENGTH) {
    const id = inputId(field);
    return {
      id,
      value: data[field],
      maxLength: MAX_LENGTH[field],
      onChange: (event: { target: { value: string } }) =>
        setField(field, event.target.value),
      ...errorProps(id, errorFor(field)),
    };
  }

  function goToStep(next: number) {
    setFormError("");
    setFieldError(null);
    setStep(next);
    requestAnimationFrame(() => {
      if ((cardRef.current?.getBoundingClientRect().top ?? 0) < 0) {
        cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      headingRef.current?.focus({ preventScroll: true });
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const isLastStep = step === STEPS.length - 1;
    let candidate = data;

    if (isLastStep) {
      // A system still open in the editor is included if it's finished;
      // otherwise the editor says what's missing, rather than it being dropped.
      const settled = settleEditor(editingTool, data.tools);
      if (!settled.ok) {
        if (editingTool) setEditingTool({ ...editingTool, notice: settled.message });
        setFormError("");
        setFieldError(null);
        focusEditor();
        return;
      }
      if (settled.tools !== data.tools) {
        candidate = { ...data, tools: settled.tools };
        setData(candidate);
      }
      setEditingTool(null);
    }

    // Continue checks only this step. Submit checks every step, since the
    // tabs let visitors move ahead without finishing earlier ones.
    const stepsToCheck = isLastStep ? STEPS.map((_, index) => index) : [step];
    const problem = stepsToCheck
      .map((index) => ({ index, invalid: validateStep(index, candidate) }))
      .find(({ invalid }) => invalid);

    if (problem?.invalid) {
      const { invalid } = problem;
      setFormError("");
      setFieldError(invalid);
      setStep(problem.index);
      requestAnimationFrame(() => {
        const element = document.getElementById(inputId(invalid.field));
        element?.scrollIntoView({ behavior: "smooth", block: "center" });
        element?.focus({ preventScroll: true });
      });
      return;
    }

    if (!isLastStep) {
      goToStep(step + 1);
      return;
    }

    setFormError("");
    setSubmitting(true);

    let result: IntakeResult;
    try {
      result = await submitDataIntake(token, candidate);
    } catch (error) {
      console.error("Data intake submission failed:", error);
      result = {
        ok: false,
        error: unstable_isUnrecognizedActionError(error) ? STALE_PAGE_ERROR : NETWORK_ERROR,
      };
    }

    setSubmitting(false);

    if (!result.ok) {
      setFormError(result.error);
      return;
    }

    writeDraft(null);
    setSubmitted(true);
    requestAnimationFrame(() => headingRef.current?.focus());
  }

  if (submitted) {
    return (
      <div ref={cardRef} className="border border-[#e5e7eb] bg-white px-6 py-10 sm:px-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#1d4ed8]">
          Submission received
        </p>
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="mt-3 text-2xl font-bold tracking-tight text-[#0c1425] focus:outline-none"
        >
          Thanks, {data.firstName.trim()}. We’ve got your answers.
        </h2>
        <p className="mt-4 text-sm leading-6 text-[#4b5563]">
          Our team reviews every submission and will email you at{" "}
          <strong className="text-[#0c1425]">{data.email.trim()}</strong> with
          next steps for {data.companyName.trim()}. If anything changes in the
          meantime, write to{" "}
          <a href={`mailto:${CONTACT_ADDRESS}`} className="text-[#1d4ed8] hover:underline">
            {CONTACT_ADDRESS}
          </a>
          .
        </p>
      </div>
    );
  }

  const copy = STEP_COPY[step];
  const periodError = errorFor("startYear") ?? errorFor("endYear");

  return (
    <div ref={cardRef} className="border border-[#e5e7eb] bg-white">
      <ol aria-label="Progress" className="flex border-b border-[#e5e7eb]">
        {STEPS.map((name, index) => {
          const state =
            index === step ? "current" : validateStep(index, data) ? "todo" : "done";
          return (
            <li key={name} className="flex-1" aria-current={index === step ? "step" : undefined}>
              <button
                type="button"
                disabled={submitting}
                onClick={() => goToStep(index)}
                className={`flex w-full items-center justify-center gap-1.5 border-b-2 px-2 py-4 text-xs font-medium sm:text-sm ${
                  state === "current"
                    ? "border-[#1d4ed8] text-[#0c1425]"
                    : state === "done"
                      ? "border-transparent text-[#1d4ed8] hover:text-[#1e40af]"
                      : "border-transparent text-[#6b7280] hover:text-[#0c1425]"
                } disabled:cursor-default`}
              >
                {state === "done" && (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5.5 12.5l4 4 9-9.5" />
                  </svg>
                )}
                <span>
                  {index + 1}. {name}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <form onSubmit={handleSubmit} noValidate className="px-6 py-8 sm:px-10 sm:py-10">
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="text-2xl font-bold tracking-tight text-[#0c1425] focus:outline-none"
        >
          {copy.title}
        </h2>
        <p className="mt-3 text-sm leading-6 text-[#4b5563]">{copy.sub}</p>

        <div className="mt-8 space-y-6">
          {step === 0 && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <Field id="di-firstName" label="First name" error={errorFor("firstName")}>
                  <input {...bind("firstName")} className={inputClassName} autoComplete="given-name" required />
                </Field>
                <Field id="di-lastName" label="Last name" error={errorFor("lastName")}>
                  <input {...bind("lastName")} className={inputClassName} autoComplete="family-name" required />
                </Field>
              </div>
              <Field id="di-email" label="Work email" error={errorFor("email")}>
                <input {...bind("email")} type="email" className={inputClassName} autoComplete="email" required />
              </Field>
              <div className="grid gap-6 sm:grid-cols-2 sm:gap-4">
                <Field id="di-phone" label="Phone number" optional>
                  <input {...bind("phone")} type="tel" className={inputClassName} autoComplete="tel" />
                </Field>
                <Field id="di-role" label="Your role" optional>
                  <input {...bind("role")} className={inputClassName} autoComplete="organization-title" />
                </Field>
              </div>
              <Field id="di-companyName" label="Company name" error={errorFor("companyName")}>
                <input {...bind("companyName")} className={inputClassName} autoComplete="organization" required />
              </Field>
              <Field id="di-website" label="Company website" optional>
                <input {...bind("website")} type="url" className={inputClassName} autoComplete="url" placeholder="example.com" />
              </Field>
              <Field id="di-country" label="Country" error={errorFor("country")}>
                <SearchableSelect
                  id="di-country"
                  value={data.country}
                  onChange={(value) => setField("country", value)}
                  placeholder="Select country"
                  options={COUNTRIES}
                  error={errorFor("country")}
                />
              </Field>
              <Field
                id="di-description"
                label="What the company does"
                hint="One or two sentences, including your sector."
                error={errorFor("description")}
              >
                <textarea {...bind("description")} className={`${inputClassName} resize-none`} rows={3} required />
              </Field>
            </>
          )}

          {step === 1 && (
            <>
              <fieldset>
                <legend className={labelClassName}>Operating period</legend>
                <div className="grid grid-cols-2 gap-4">
                  <SearchableSelect
                    id="di-startYear"
                    ariaLabel="Starting year"
                    value={data.startYear}
                    onChange={(value) => setField("startYear", value)}
                    placeholder="Starting year"
                    options={YEARS}
                    error={errorFor("startYear")}
                    errorId="di-period-err"
                  />
                  <SearchableSelect
                    id="di-endYear"
                    ariaLabel="Ending year"
                    value={data.endYear}
                    onChange={(value) => setField("endYear", value)}
                    placeholder="Ending year"
                    options={END_YEARS}
                    error={errorFor("endYear")}
                    errorId="di-period-err"
                  />
                </div>
                <FieldError id="di-period" message={periodError} />
              </fieldset>

              <Field id="di-status" label="Operating status" error={errorFor("status")}>
                <SelectInput
                  id="di-status"
                  value={data.status}
                  onChange={(value) => setField("status", value)}
                  placeholder="Select status"
                  options={STATUS_OPTIONS}
                  error={errorFor("status")}
                />
              </Field>

              <fieldset>
                <legend className={labelClassName}>Team size</legend>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Field id="di-fte" label="Full-time now" error={errorFor("fte")}>
                    <input {...bind("fte")} inputMode="numeric" className={inputClassName} required />
                  </Field>
                  <Field id="di-ftePeak" label="Full-time at peak" error={errorFor("ftePeak")}>
                    <input {...bind("ftePeak")} inputMode="numeric" className={inputClassName} />
                  </Field>
                  <Field id="di-contractors" label="Contractors" error={errorFor("contractors")}>
                    <input {...bind("contractors")} inputMode="numeric" className={inputClassName} />
                  </Field>
                </div>
                <p className={hintClassName}>
                  Current counts; enter 0 where none. Peak and contractors are optional.
                </p>
              </fieldset>

              <Field id="di-industry" label="Industry" error={errorFor("industry")}>
                <select
                  id="di-industry"
                  className={selectClassName}
                  value={data.industry}
                  onChange={(event) => setField("industry", event.target.value)}
                  {...errorProps("di-industry", errorFor("industry"))}
                >
                  <option value="">Select industry</option>
                  {INDUSTRY_GROUPS.map(({ group, options }) => (
                    <optgroup key={group} label={group}>
                      {options.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </Field>

              <Field id="di-revenue" label="Average annual revenue" error={errorFor("revenue")}>
                <SelectInput
                  id="di-revenue"
                  value={data.revenue}
                  onChange={(value) => setField("revenue", value)}
                  placeholder="Select range"
                  options={REVENUE_OPTIONS}
                  error={errorFor("revenue")}
                />
              </Field>

              <Field id="di-volume" label="Total data volume, all storage combined" error={errorFor("volume")}>
                <SelectInput
                  id="di-volume"
                  value={data.volume}
                  onChange={(value) => setField("volume", value)}
                  placeholder="Select volume"
                  options={VOLUME_OPTIONS}
                  error={errorFor("volume")}
                />
              </Field>

              <Field
                id="di-languages"
                label="Language of records"
                optional
                hint="List every language that appears materially in the records."
              >
                <input {...bind("languages")} className={inputClassName} placeholder="e.g. English, Spanish" />
              </Field>

              <div className="grid gap-6 sm:grid-cols-2 sm:gap-4">
                <Field id="di-transfer" label="How soon could you transfer your data?" error={errorFor("transfer")}>
                  <SelectInput
                    id="di-transfer"
                    value={data.transfer}
                    onChange={(value) => setField("transfer", value)}
                    placeholder="Select"
                    options={TRANSFER_OPTIONS}
                    error={errorFor("transfer")}
                  />
                </Field>
                <Field id="di-exportAbility" label="Can your team export and upload?" error={errorFor("exportAbility")}>
                  <SelectInput
                    id="di-exportAbility"
                    value={data.exportAbility}
                    onChange={(value) => setField("exportAbility", value)}
                    placeholder="Select"
                    options={EXPORT_ABILITY_OPTIONS}
                    error={errorFor("exportAbility")}
                  />
                </Field>
              </div>

              <Field id="di-heardFrom" label="How did you hear about us?" optional error={errorFor("heardFrom")}>
                <SelectInput
                  id="di-heardFrom"
                  value={data.heardFrom}
                  onChange={(value) => setField("heardFrom", value)}
                  placeholder="Select"
                  options={HEARD_FROM_OPTIONS}
                  error={errorFor("heardFrom")}
                />
              </Field>

              <Field id="di-notes" label="Anything else we should know?" optional>
                <textarea {...bind("notes")} className={`${inputClassName} resize-none`} rows={4} />
              </Field>
            </>
          )}

          {step === 2 && (
            <>
              <SystemsPicker
                tools={data.tools}
                onChange={(tools) => setField("tools", tools)}
                editing={editingTool}
                onEditingChange={setEditingTool}
                error={errorFor("tools")}
              />
              <div>
                <label className="flex items-start gap-3 text-sm leading-6 text-[#374151]">
                  <input
                    id="di-consent"
                    type="checkbox"
                    checked={data.consent}
                    onChange={(event) => setField("consent", event.target.checked)}
                    className="mt-1 h-4 w-4 shrink-0 accent-[#1d4ed8]"
                    {...errorProps("di-consent", errorFor("consent"))}
                  />
                  <span>
                    I agree that AiPi Solutions may contact me about licensing
                    this data and may share these answers with prospective
                    licensing partners.
                  </span>
                </label>
                <FieldError id="di-consent" message={errorFor("consent")} />
              </div>
            </>
          )}
        </div>

        {formError && (
          <p role="alert" className="mt-6 text-sm text-[#b91c1c]">
            {formError}
          </p>
        )}
        <p role="alert" className="sr-only">
          {fieldError?.message ?? ""}
        </p>

        <div className="mt-8 flex gap-3">
          {step > 0 && (
            <button
              type="button"
              disabled={submitting}
              onClick={() => goToStep(step - 1)}
              className="border border-[#d1d5db] px-6 py-3 text-base font-semibold text-[#0c1425] transition-colors hover:bg-[#f9fafb] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Back
            </button>
          )}
          <button
            type="submit"
            disabled={!ready || submitting}
            className="flex-1 bg-[#1d4ed8] py-3 text-base font-semibold text-white transition-colors hover:bg-[#1e40af] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {step < STEPS.length - 1 ? "Continue" : submitting ? "Submitting…" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
