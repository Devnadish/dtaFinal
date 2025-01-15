import { formatDistanceToNow } from "date-fns";
import { ar, enUS, Locale } from "date-fns/locale"; // Import supported locales
import { getLocale } from "next-intl/server";
import { ReactNode } from "react";

// Map of supported locales in your application
const supportedLocales = {
  ar: ar, // Arabic
  en: enUS, // English (United States)
};

// Define the props interface
interface FormattedDateProps {
  date: Date;
  icon?: ReactNode; // Optional icon
}

async function FormattedDate({ date, icon }: FormattedDateProps) {
  const locale = await getLocale();

  // Type guard to ensure locale is a valid key
  const isValidLocale = (
    locale: string
  ): locale is keyof typeof supportedLocales => {
    return locale in supportedLocales;
  };

  // Utility function to format dates using date-fns and dynamic locale
  const formatDate = (date: Date): string => {
    const selectedLocale = isValidLocale(locale)
      ? supportedLocales[locale]
      : enUS; // Fallback to English if locale is not supported
    return formatDistanceToNow(date, {
      addSuffix: true,
      locale: selectedLocale,
    });
  };

  return (
    <time className="flex items-center gap-2">
      {icon} {/* Show the icon only if it is provided */}
      <span className="text-xs text-muted-foreground">{formatDate(date)}</span>
    </time>
  );
}

export default FormattedDate;
