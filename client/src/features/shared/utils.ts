export const formatCurrency = (
  value?: number | string | null,
  {
    locale = "en-US",
    currency = "USD",
    hideZero = false,
  }: {
    locale?: string;
    currency?: string;
    hideZero?: boolean;
  } = {}
) => {
  if (value == null || value === "") return "";

  const num = Number(value);
  if (Number.isNaN(num)) return "";

  if (hideZero && num === 0) return "";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};

export const formatUSD = (value?: number | string | null) =>
  formatCurrency(value, {
    locale: "en-US",
    currency: "USD",
    hideZero: true,
});

// parse input "$1,000" → 1000
export const parseCurrency = (value: unknown): number => {
  if (value == null) return 0;

  const raw = String(value).replace(/[$,\s]/g, "");
  const num = Number(raw);

  return Number.isNaN(num) ? 0 : num;
};

export const parseCurrencyInput = (value: unknown): string => {
  if (value == null) return "";

  const raw = String(value);

  let sanitized = raw.replace(/[^0-9.-]/g, "");

  sanitized = sanitized.replace(/(?!^)-/g, "");

  const parts = sanitized.split(".");
  if (parts.length > 2) {
    sanitized = `${parts[0]}.${parts.slice(1).join("")}`;
  }

  return sanitized;
};

// Get the previous month in "YYYY/MM" format
export const getPreviousMonthLabel = () => {
  const now = new Date();
  const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  return `${prev.getFullYear()}/${String(prev.getMonth() + 1).padStart(2, "0")}`;
};