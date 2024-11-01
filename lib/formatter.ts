const defaultCurrency = "EUR";
const defaultLocale = "eu-EUR";
const defaultDateStyle: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "short",
  year: "numeric",
};
const timeStyle: Intl.DateTimeFormatOptions = {
  hour: "numeric",
  minute: "numeric",
};

const currencyStyle: Intl.NumberFormatOptions = {
  style: "currency",
  currency: defaultCurrency,
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
};

type Currency = {
  value: number | bigint;
  currency?: string;
  locale?: string;
};

type DateType = {
  date: string;
  locale?: string;
  dateStyle?: Intl.DateTimeFormatOptions;
};

export const formatCurrency = ({
  value,
  currency = defaultCurrency,
  locale = defaultLocale,
}: Currency): any => {
  try {
    return new Intl.NumberFormat(locale, { ...currencyStyle, currency })
      .format(value)
      .replace(/^(\D+)/, "$1 ");
  } catch {
    return value;
  }
};

export const formatDate = ({
  date,
  locale = defaultLocale,
  dateStyle = defaultDateStyle,
}: DateType): any => {
  try {
    return new Intl.DateTimeFormat(locale, dateStyle).format(new Date(date));
  } catch {
    return date;
  }
};

export const getCurrencySymbol = (
  currency: string = defaultCurrency,
  locale: string = defaultLocale
): string | undefined => {
  try {
    return new Intl.NumberFormat(locale, { ...currencyStyle, currency })
      .formatToParts(1)
      .find((x) => x.type === "currency")?.value;
  } catch {
    return "";
  }
};
