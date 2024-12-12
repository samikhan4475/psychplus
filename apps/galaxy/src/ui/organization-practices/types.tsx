interface PracticeDetails {
  practiceName?: string;
  npi?: string;
  tin?: string;
  taxonomyCode?: string;
  clia?: string;
  organization?: string;
  phone?: string;
  fax?: string;
  primaryAddress?: string;
  primaryAddress2?: string;
  city?: string;
  provider?: string;
  state?: string;
  zip?: string;
  payAddress?: string;
  status?: string;
}

interface PracticesHistory {
  user?: string;
  date?: string;
  status?: string;
}
export type { PracticeDetails, PracticesHistory }