/**
 * Data intake form: option lists, the shape of a submission, and its
 * validation rules. Shared by the form, which checks each step before moving
 * on, and the server action, which re-checks everything because server
 * functions accept direct POSTs.
 */

export const STEPS = ["Company", "Data estimate", "Systems"] as const;

export const PRESENT = "Present";
export const NOT_LISTED = "Not listed";
export const MAX_TOOLS = 150;

const FIRST_YEAR = 1950;

/** Current year down to 1950, newest first. */
export function getYears(): string[] {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: currentYear - FIRST_YEAR + 1 }, (_, index) =>
    String(currentYear - index),
  );
}

export const COUNTRIES: readonly string[] = [
  "United States",
  "Canada",
  "United Kingdom",
  "India",
  "Australia",
  "Germany",
  "France",
  "Mexico",
  "Brazil",
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Côte d'Ivoire",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czechia",
  "Democratic Republic of the Congo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "Gabon",
  "Gambia",
  "Georgia",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "São Tomé and Príncipe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Türkiye",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

export const INDUSTRY_GROUPS: readonly {
  group: string;
  options: readonly string[];
}[] = [
  {
    group: "Operations & Industry",
    options: [
      "Manufacturing & industrials",
      "Transport & logistics",
      "Construction & real estate",
      "Professional services (accounting, legal, consulting)",
      "Financial services & insurance",
      "Consumer & retail",
      "Hospitality & food",
      "Energy & utilities",
      "Agriculture",
      "Other operations & industry",
    ],
  },
  {
    group: "Software & Technology",
    options: [
      "Software & IT",
      "SaaS products",
      "Agencies & dev shops",
      "IT services & consulting",
      "Hardware & devices",
      "Data & infrastructure",
      "Other software & technology",
    ],
  },
  {
    group: "Healthcare & Life Sciences",
    options: [
      "Healthcare",
      "Providers & clinics",
      "Dental & veterinary",
      "Payers & insurers",
      "Diagnostics & imaging",
      "Life sciences & pharma",
      "Other healthcare & life sciences",
    ],
  },
  {
    group: "Media, Education & Public Sector",
    options: [
      "Media & publishing",
      "Marketing & advertising",
      "Telecommunications",
      "Education",
      "Government & public sector",
      "Nonprofit",
      "Other",
    ],
  },
];

const INDUSTRIES: readonly string[] = INDUSTRY_GROUPS.flatMap(
  (group) => group.options,
);

export const STATUS_OPTIONS: readonly string[] = [
  "Operating",
  "No longer operating",
  "Partially operating / winding down",
  "Not sure",
];

export const REVENUE_OPTIONS: readonly string[] = [
  "Under $1M",
  "$1M–$5M",
  "$5M–$10M",
  "$10M–$25M",
  "$25M–$50M",
  "$50M–$100M",
  "$100M+",
  "Not sure / prefer not to say",
];

export const VOLUME_OPTIONS: readonly string[] = [
  "Under 100 GB",
  "100 GB–1 TB",
  "1–10 TB",
  "10–50 TB",
  "50–250 TB",
  "250 TB+",
  "Not sure",
];

export const TRANSFER_OPTIONS: readonly string[] = [
  "Within 24–48h",
  "Within a week",
  "Within 2–4 weeks",
  "More than a month",
];

export const EXPORT_ABILITY_OPTIONS: readonly string[] = [
  "Yes",
  "Yes, with some guidance",
  "No, we need help",
  "Not sure",
];

export const CAN_EXPORT_OPTIONS: readonly string[] = ["Yes", "No", "Not sure"];

export const HEARD_FROM_OPTIONS: readonly string[] = [
  "Email",
  "LinkedIn",
  "Social media",
  "Referral",
  "Other",
];

export const TOOL_CATEGORIES: readonly {
  category: string;
  items: readonly string[];
}[] = [
  {
    category: "Accounting & finance",
    items: [
      "QuickBooks",
      "Avalara",
      "Bill.com",
      "Brex",
      "Expensify",
      "FreshBooks",
      "Melio",
      "Ramp",
      "Sage",
      "SAP Concur",
      "Wave Accounting",
      "Xero",
      "Zoho Books",
      "Other accounting or finance system",
    ],
  },
  {
    category: "Claims & revenue cycle",
    items: [
      "Waystar",
      "Availity",
      "Change Healthcare",
      "Payer contracts",
      "Tebra (Kareo)",
      "Other claims or RCM platform",
    ],
  },
  {
    category: "Clinical & practice systems",
    items: [
      "Dictation / scribe audio",
      "Epic",
      "athenahealth",
      "Dentrix",
      "e-Prescribing",
      "eClinicalWorks",
      "ezyVet",
      "MEDITECH",
      "NextGen Healthcare",
      "Open Dental",
      "Oracle Health (Cerner)",
      "Patient portal",
      "Veradigm (Allscripts)",
      "Other EHR or practice management system",
    ],
  },
  {
    category: "Code & engineering",
    items: [
      "GitHub",
      "GitLab",
      "Self-hosted Git",
      "Azure DevOps",
      "Bitbucket",
      "CI/CD logs",
      "CircleCI",
      "Jenkins",
      "Other code repository",
    ],
  },
  {
    category: "Custom & legacy",
    items: [
      "Homegrown internal system",
      "Microsoft Access",
      "Spreadsheets nobody replaced",
      "AS/400 or mainframe",
      "FileMaker",
      "Other custom or legacy system",
    ],
  },
  {
    category: "Databases & warehouses",
    items: [
      "PostgreSQL",
      "Amazon Redshift",
      "Amazon S3",
      "Databricks",
      "Google BigQuery",
      "Microsoft SQL Server",
      "MongoDB",
      "MySQL",
      "Oracle Database",
      "Snowflake",
      "Other database or warehouse",
    ],
  },
  {
    category: "ERP & business management",
    items: [
      "Acumatica",
      "Epicor",
      "Infor",
      "Microsoft Dynamics 365",
      "NetSuite",
      "Odoo",
      "Oracle ERP",
      "Sage Intacct",
      "SAP",
      "SYSPRO",
      "Other ERP system",
    ],
  },
  {
    category: "Field service & construction",
    items: [
      "ServiceTitan",
      "Autodesk Construction Cloud",
      "Bluebeam",
      "Buildertrend",
      "Housecall Pro",
      "Jobber",
      "Procore",
      "Other field service or construction system",
    ],
  },
  {
    category: "Files, documents & communication",
    items: [
      "Slack",
      "Email archive",
      "Google Workspace",
      "Microsoft 365",
      "Notion",
      "On-prem file server",
      "Scanned paper archive",
      "Adobe Acrobat",
      "Box",
      "Canva",
      "Confluence",
      "DocuSign",
      "Dropbox",
      "Evernote",
      "Figma",
      "Google Drive",
      "Google Meet",
      "Microsoft Teams",
      "Miro",
      "OneDrive",
      "SharePoint",
      "Webex",
      "Zoom",
      "Other file storage or comms tool",
    ],
  },
  {
    category: "Fleet, transport & logistics",
    items: [
      "Flexport",
      "Geotab",
      "McLeod Software",
      "Motive",
      "Samsara",
      "Other fleet or logistics system",
    ],
  },
  {
    category: "Imaging & diagnostics",
    items: [
      "Sectra PACS",
      "Whole-slide pathology images",
      "Fujifilm Synapse",
      "Radiology reporting system",
      "Other PACS or imaging archive",
    ],
  },
  {
    category: "Inventory, warehouse & procurement",
    items: [
      "Blue Yonder",
      "Cin7",
      "Coupa",
      "Fishbowl Inventory",
      "Katana",
      "Manhattan Associates",
      "SAP Ariba",
      "ShipStation",
      "Zoho Inventory",
      "Other inventory or warehouse system",
    ],
  },
  {
    category: "Manufacturing & design",
    items: [
      "SolidWorks",
      "Altium Designer",
      "AutoCAD",
      "MES (manufacturing execution)",
      "Onshape",
      "Plex",
      "Tulip",
      "Other CAD or manufacturing system",
    ],
  },
  {
    category: "People & payroll",
    items: [
      "ADP",
      "BambooHR",
      "Deel",
      "Greenhouse",
      "Gusto",
      "Justworks",
      "Lever",
      "Paychex",
      "Rippling",
      "TriNet",
      "UKG",
      "Workday",
      "Other payroll or HR system",
    ],
  },
  {
    category: "Point of sale, payments & e-commerce",
    items: [
      "Square",
      "Toast",
      "Adobe Commerce (Magento)",
      "Amazon Seller Central",
      "BigCommerce",
      "Clover",
      "Etsy",
      "Lightspeed",
      "PayPal",
      "Shopify",
      "Stripe",
      "WooCommerce",
      "Other POS or payments system",
    ],
  },
  {
    category: "Production & monitoring",
    items: [
      "Sentry",
      "PagerDuty",
      "Datadog",
      "Elastic",
      "Grafana",
      "New Relic",
      "Splunk",
      "Other monitoring or logging tool",
    ],
  },
  {
    category: "Projects & work tracking",
    items: [
      "Jira",
      "Linear",
      "Airtable",
      "Asana",
      "Basecamp",
      "ClickUp",
      "monday.com",
      "Smartsheet",
      "Trello",
      "Wrike",
      "Other project or work tracking tool",
    ],
  },
  {
    category: "Research & life sciences",
    items: [
      "Clinical trial data",
      "Illumina sequencing data",
      "Benchling",
      "LabWare LIMS",
      "Medidata Rave",
      "REDCap",
      "Registry data",
      "Veeva Vault",
      "Wearable / sensor data",
      "Other LIMS or research system",
    ],
  },
  {
    category: "Sales, marketing & support",
    items: [
      "Constant Contact",
      "Freshdesk",
      "Gong",
      "HubSpot",
      "Intercom",
      "Klaviyo",
      "Mailchimp",
      "Pipedrive",
      "Salesforce",
      "Twilio",
      "Zendesk",
      "Zoho CRM",
      "Other CRM or support system",
    ],
  },
];

export type IntakeTool = {
  category: string;
  item: string;
  customName: string;
  startYear: string;
  endYear: string;
  contents: string;
  size: string;
  canExport: string;
};

export type IntakeData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  companyName: string;
  website: string;
  country: string;
  description: string;
  startYear: string;
  endYear: string;
  status: string;
  fte: string;
  ftePeak: string;
  contractors: string;
  industry: string;
  revenue: string;
  volume: string;
  languages: string;
  transfer: string;
  exportAbility: string;
  heardFrom: string;
  notes: string;
  tools: IntakeTool[];
  consent: boolean;
};

export type IntakeField = keyof IntakeData;

export type FieldError = { field: IntakeField; message: string };

export const EMPTY_INTAKE: IntakeData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  role: "",
  companyName: "",
  website: "",
  country: "",
  description: "",
  startYear: "",
  endYear: PRESENT,
  status: "Operating",
  fte: "",
  ftePeak: "",
  contractors: "",
  industry: "",
  revenue: "",
  volume: "",
  languages: "",
  transfer: "",
  exportAbility: "",
  heardFrom: "",
  notes: "",
  tools: [],
  consent: false,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const COUNT_PATTERN = /^\d{1,7}$/;

function isBlank(value: string): boolean {
  return !value.trim();
}

function isValidYear(value: string): boolean {
  return (
    /^\d{4}$/.test(value) &&
    Number(value) >= FIRST_YEAR &&
    Number(value) <= new Date().getFullYear()
  );
}

/**
 * True for the "Other …" catch-all entries, which need the visitor to name the
 * actual system. Systems typed in by hand are already named.
 */
export function needsCustomName(tool: Pick<IntakeTool, "category" | "item">): boolean {
  return tool.category !== NOT_LISTED && tool.item.startsWith("Other ");
}

export function getToolName(tool: IntakeTool): string {
  return (needsCustomName(tool) ? tool.customName : tool.item).trim();
}

export function validateTool(tool: IntakeTool): string {
  const name = getToolName(tool) || "a tool";

  if (needsCustomName(tool) && isBlank(tool.customName)) {
    return `Please name the ${tool.item.slice("Other ".length)}.`;
  }
  if (isBlank(tool.item)) return "Please name the tool.";
  if (!isValidYear(tool.startYear)) {
    return `Please pick the year you started using ${name}.`;
  }
  if (tool.endYear !== PRESENT && !isValidYear(tool.endYear)) {
    return `Please pick when you stopped using ${name}.`;
  }
  if (tool.endYear !== PRESENT && Number(tool.endYear) < Number(tool.startYear)) {
    return `${name}: the end year is before the start year.`;
  }
  if (tool.canExport && !CAN_EXPORT_OPTIONS.includes(tool.canExport)) {
    return `${name}: please pick an export answer.`;
  }
  return "";
}

/** Returns the first problem on the given step, in the order fields appear. */
export function validateStep(step: number, data: IntakeData): FieldError | null {
  const fail = (field: IntakeField, message: string) => ({ field, message });

  if (step === 0) {
    if (isBlank(data.firstName)) return fail("firstName", "Please add your first name.");
    if (isBlank(data.lastName)) return fail("lastName", "Please add your last name.");
    if (!EMAIL_PATTERN.test(data.email.trim())) {
      return fail("email", "Please enter a valid work email.");
    }
    if (isBlank(data.companyName)) return fail("companyName", "Please add your company name.");
    if (!COUNTRIES.includes(data.country)) return fail("country", "Please choose your country.");
    if (isBlank(data.description)) {
      return fail("description", "Please tell us in a sentence or two what your company does.");
    }
  }

  if (step === 1) {
    if (!isValidYear(data.startYear)) {
      return fail("startYear", "Please pick the year the company started operating.");
    }
    if (data.endYear !== PRESENT && !isValidYear(data.endYear)) {
      return fail("endYear", "Please pick when the company stopped operating.");
    }
    if (data.endYear !== PRESENT && Number(data.endYear) < Number(data.startYear)) {
      return fail("endYear", "The end year is before the starting year.");
    }
    if (!STATUS_OPTIONS.includes(data.status)) {
      return fail("status", "Please choose the company’s operating status.");
    }
    if (!COUNT_PATTERN.test(data.fte.trim())) {
      return fail("fte", "Please enter the number of current full-time employees (0 if none).");
    }
    if (data.ftePeak.trim() && !COUNT_PATTERN.test(data.ftePeak.trim())) {
      return fail("ftePeak", "Peak full-time employees should be a whole number.");
    }
    if (data.contractors.trim() && !COUNT_PATTERN.test(data.contractors.trim())) {
      return fail("contractors", "Contractors should be a whole number.");
    }
    if (!INDUSTRIES.includes(data.industry)) return fail("industry", "Please choose an industry.");
    if (!REVENUE_OPTIONS.includes(data.revenue)) {
      return fail("revenue", "Please choose an annual revenue range.");
    }
    if (!VOLUME_OPTIONS.includes(data.volume)) {
      return fail("volume", "Please estimate your total data volume.");
    }
    if (!TRANSFER_OPTIONS.includes(data.transfer)) {
      return fail("transfer", "Please tell us how soon you could transfer your data.");
    }
    if (!EXPORT_ABILITY_OPTIONS.includes(data.exportAbility)) {
      return fail("exportAbility", "Please tell us whether your team can export and upload.");
    }
    if (data.heardFrom && !HEARD_FROM_OPTIONS.includes(data.heardFrom)) {
      return fail("heardFrom", "Please re-check how you heard about us.");
    }
  }

  if (step === 2) {
    if (data.tools.length === 0) {
      return fail("tools", "Please add at least one system your company uses or has used.");
    }
    if (data.tools.length > MAX_TOOLS) {
      return fail("tools", `Please list at most ${MAX_TOOLS} systems.`);
    }
    for (const tool of data.tools) {
      const message = validateTool(tool);
      if (message) return fail("tools", message);
    }
    if (!data.consent) {
      return fail("consent", "Please confirm AiPi Solutions may contact you about licensing this data.");
    }
  }

  return null;
}

/** Validates every step, for the final server-side check. */
export function validateIntake(data: IntakeData): FieldError | null {
  for (let step = 0; step < STEPS.length; step++) {
    const error = validateStep(step, data);
    if (error) return error;
  }
  return null;
}
