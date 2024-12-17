interface Users {
  id?: string;
  userHistory?: string;
  name: string;
  ptStatus?: string;
  p?: string;
  pElapsed?: string;
  i?: string;
  iElapsed?: string;
  pc?: string;
  cc?: string;
  age?: number;
  gen?: string;
  mrn?: string;
  referralDate?: string;
  dob?: string | null;
  phone?: string;
  ss?: string;
  email?: string;
  comments?: string;
  residenceState?: string;
  city?: string;
  zip?: string;
  guardian?: string;
  organization?: string;
  practice?: string;
  insurance?: string;
  userCreated?: string;
  nextVisit?: string | null;
  contactInitiated?: string;
  createdBy?: string;
  visitHx?: string;
  service?: string;
  servicesStatus?: string;
  referredByName?: string;
  visitDateTime?: string;
  ptVerification?: string;
  updatedDate?: string;
  updatedBy?: string;
}

export type { Users }