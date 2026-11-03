"use server";

import { randomUUID } from "node:crypto";

import {
  type IntakeData,
  type IntakeTool,
  MAX_TOOLS,
  PRESENT,
  getToolName,
  validateIntake,
} from "@/utils/dataIntake";
import { isValidIntakeToken } from "@/utils/dataIntakeAccess";
import { saveIntakeSubmission } from "@/utils/saveIntakeSubmission";
import { sendFormEmail } from "@/utils/sendFormEmail";

const NOTIFY_ADDRESS = "cmorehouse@aipisolutions.com";

export type IntakeResult = { ok: true } | { ok: false; error: string };

type Submission = IntakeData & { id: string; submittedAt: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Reads a text value, trimming whitespace and capping length to bound abuse. */
function readString(
  source: Record<string, unknown>,
  key: string,
  maxLength: number,
): string {
  const value = source[key];
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function parseTool(input: unknown): IntakeTool {
  const source = isRecord(input) ? input : {};
  return {
    category: readString(source, "category", 100),
    item: readString(source, "item", 200),
    customName: readString(source, "customName", 200),
    startYear: readString(source, "startYear", 10),
    endYear: readString(source, "endYear", 10),
    contents: readString(source, "contents", 1000),
    size: readString(source, "size", 100),
    canExport: readString(source, "canExport", 20),
  };
}

/** Rebuilds the submission from untrusted input, keeping only known fields. */
function parseIntakeData(input: unknown): IntakeData {
  const source = isRecord(input) ? input : {};
  const tools = Array.isArray(source.tools)
    ? source.tools.slice(0, MAX_TOOLS + 1).map(parseTool)
    : [];

  return {
    firstName: readString(source, "firstName", 100),
    lastName: readString(source, "lastName", 100),
    email: readString(source, "email", 254),
    phone: readString(source, "phone", 50),
    role: readString(source, "role", 200),
    companyName: readString(source, "companyName", 200),
    website: readString(source, "website", 300),
    country: readString(source, "country", 100),
    description: readString(source, "description", 5000),
    startYear: readString(source, "startYear", 10),
    endYear: readString(source, "endYear", 10),
    status: readString(source, "status", 100),
    fte: readString(source, "fte", 20),
    ftePeak: readString(source, "ftePeak", 20),
    contractors: readString(source, "contractors", 20),
    industry: readString(source, "industry", 100),
    revenue: readString(source, "revenue", 100),
    volume: readString(source, "volume", 100),
    languages: readString(source, "languages", 500),
    transfer: readString(source, "transfer", 100),
    exportAbility: readString(source, "exportAbility", 100),
    heardFrom: readString(source, "heardFrom", 100),
    notes: readString(source, "notes", 10000),
    tools,
    consent: source.consent === true,
  };
}

function formatPeriod(startYear: string, endYear: string): string {
  return `${startYear || "?"} – ${endYear === PRESENT ? "present" : endYear}`;
}

function formatSubmission(submission: Submission, storedAt: string | undefined): string {
  const value = (text: string) => text || "(not provided)";
  const block = (text: string) =>
    text ? text.split("\n").map((line) => `  ${line}`).join("\n") : "  (not provided)";

  const tools = submission.tools.flatMap((tool, index) => [
    `${index + 1}. ${getToolName(tool)} (${tool.category})`,
    `   Used: ${formatPeriod(tool.startYear, tool.endYear)}`,
    `   What's in it: ${value(tool.contents)}`,
    `   Approx. export size: ${value(tool.size)}`,
    `   Can it export?: ${value(tool.canExport)}`,
    "",
  ]);

  return [
    "New data intake submission from aipisolutions.com",
    "",
    `Submission ID: ${submission.id}`,
    `Submitted: ${submission.submittedAt}`,
    storedAt
      ? `Saved to: ${storedAt}`
      : "Saved to: NOT SAVED. Saving to the server failed, so this email is the only copy.",
    "",
    "=== 1. COMPANY ===",
    `First name: ${submission.firstName}`,
    `Last name: ${submission.lastName}`,
    `Work email: ${submission.email}`,
    `Phone number: ${value(submission.phone)}`,
    `Your role: ${value(submission.role)}`,
    `Company name: ${submission.companyName}`,
    `Company website: ${value(submission.website)}`,
    `Country: ${submission.country}`,
    "What the company does:",
    block(submission.description),
    "",
    "=== 2. DATA ESTIMATE ===",
    `Operating period: ${formatPeriod(submission.startYear, submission.endYear)}`,
    `Operating status: ${submission.status}`,
    `Team size, full-time now: ${submission.fte}`,
    `Team size, full-time at peak: ${value(submission.ftePeak)}`,
    `Team size, contractors: ${value(submission.contractors)}`,
    `Industry: ${submission.industry}`,
    `Average annual revenue: ${submission.revenue}`,
    `Total data volume, all storage combined: ${submission.volume}`,
    `Language of records: ${value(submission.languages)}`,
    `How soon could you transfer your data?: ${submission.transfer}`,
    `Can your team export and upload?: ${submission.exportAbility}`,
    `How did you hear about us?: ${value(submission.heardFrom)}`,
    "Anything else we should know?:",
    block(submission.notes),
    "",
    `=== 3. SYSTEMS (${submission.tools.length}) ===`,
    ...tools,
    `Consent to be contacted about licensing and to share with licensing partners: ${
      submission.consent ? "Yes" : "No"
    }`,
  ].join("\n");
}

export async function submitDataIntake(
  token: string,
  input: unknown,
): Promise<IntakeResult> {
  if (!isValidIntakeToken(token)) {
    return {
      ok: false,
      error: "This form link isn’t valid. Please check the link you were sent.",
    };
  }

  const data = parseIntakeData(input);
  const invalid = validateIntake(data);

  if (invalid) {
    return { ok: false, error: invalid.message };
  }

  const submission: Submission = {
    id: randomUUID(),
    submittedAt: new Date().toISOString(),
    ...data,
  };

  // Saved first so the email can say where the stored copy is. A failed save
  // is reported in the email rather than to the visitor, since the email
  // still carries every answer.
  let storedAt: string | undefined;

  try {
    storedAt = await saveIntakeSubmission(submission);
  } catch (error) {
    console.error("Data intake submission failed to save:", error);
  }

  try {
    await sendFormEmail({
      to: NOTIFY_ADDRESS,
      subject: `Data intake from ${submission.companyName.replace(/\s+/g, " ")}`,
      replyTo: submission.email,
      text: formatSubmission(submission, storedAt),
    });
  } catch (error) {
    console.error("Data intake submission failed to send:", error);
    return {
      ok: false,
      error: `Something went wrong sending your answers. Please try again, or email ${NOTIFY_ADDRESS}.`,
    };
  }

  return { ok: true };
}
