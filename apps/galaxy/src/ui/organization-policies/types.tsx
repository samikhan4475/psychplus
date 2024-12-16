import { DateValue } from "react-aria-components";

interface Policy {
  type?: string;
  insuranceDate: DateValue | string | null;
  status?: string;
  policyName?: string;
  policy?: string;
  policyId?: string;
  signingDate: DateValue | string | null;
  practice?: string;
  organization?: string;
}

export type { Policy }