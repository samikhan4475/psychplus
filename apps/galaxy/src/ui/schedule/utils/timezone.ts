import { SharedCode } from "@/types";

const getTimeZoneAbbreviation = (timeZone: string, codesets: SharedCode[]): string | null => {
  const match = codesets?.find((code) => timeZone === code.value);
  return match ? match.display : null;
};

export { getTimeZoneAbbreviation }