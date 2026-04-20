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

export const formatUSD = (
  value?: number | string | null,
  options?: { hideZero?: boolean }
) =>
  formatCurrency(value, {
    locale: "en-US",
    currency: "USD",
    hideZero: options?.hideZero ?? false, // ❗ default = false
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

export const isValidDate = (value: string): boolean => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return false;
  }

  const [year, month, day] = value.split("-").map(Number);

  return (
    date.getFullYear() === year &&
    date.getMonth() + 1 === month &&
    date.getDate() === day
  );
};

/**
 * Compare two date strings (yyyy/MM/dd) and check if they are in the same month.
 */
export const isSameMonth = (date1: string, date2: string): boolean => {
  if (!date1 || !date2) return false;

  const [y1, m1] = date1.split("/");
  const [y2, m2] = date2.split("/");

  return y1 === y2 && m1 === m2;
};

/**
 * Get month (MM) from date string format "yyyy/MM"
 */
export const getMonth = (date: string): string => {
  if (!date) return "";

  const [, month] = date.split("/");
  return month ?? "";
};

export const getYearMonth = (date: string): string => {
  return date?.slice(0, 7) ?? "";
};
