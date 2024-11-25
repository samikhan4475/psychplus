const getNavLinks = (appointmentId: string | null) => {
  const defaultBottomLinks = [
    { label: 'Patient Info', href: '/patient-info' },
    { label: 'Referrals', href: '/referrals' },
    { label: 'PCP', href: '/pcp' },
    { label: 'Pharmacy', href: '/pharmacy' },
    { label: 'Staff Comments', href: '/staff-comments' },
    { label: 'Scheduling History', href: '/scheduling-history' },
    // { label: 'Rating', href: '/rating' },
    // { label: 'Notifications', href: '/notifications' },
    // { label: 'Patient Tracking', href: '/patient-tracking' },
  ]
  const baseLinks = [
    { label: 'Scheduling History', href: '/scheduling-history' },
    { label: 'Notes', href: '/notes' },
    { label: 'Diagnosis', href: '/diagnosis' },
    { label: 'Medications', href: '/medications' },
    { label: 'Drug History', href: '/drug-history' },
    { label: 'Allergies', href: '/allergies' },
    { label: 'Treatment Plan', href: '/treatment-plan' },
    ...defaultBottomLinks,
    { label: 'Procedures', href: '/procedures' },
    { label: 'Billing History', href: '/billing-history' },
  ]

  const navLinks = [
    { label: 'Quick Notes', href: '/quicknotes' },
    { label: 'Notes', href: '/notes' },
    { label: 'HPI/Presenting Symptoms', href: '/hpi' },
    { label: 'History', href: '/histories' },
    { label: 'Questionnaires', href: '/questionnaires' },
    { label: 'Mental Status Exam', href: '/mse' },
    { label: 'Add On', href: '/add-on' },
    { label: 'Codes', href: '/codes' },
    { label: 'Diagnosis', href: '/diagnosis' },
    { label: 'Lab Orders', href: '/lab-orders' },
    { label: 'Review of System', href: '/ros' },
    { label: 'Vitals', href: '/vitals' },
    { label: 'Physical Exam', href: '/physical-exam' },
    { label: 'Medical History', href: '/medical-history' },
    { label: 'Therapy', href: '/therapy' },
    { label: 'Allergies', href: '/allergies' },
    { label: 'Medications', href: '/medications' },
    { label: 'Hospital', href: '/hospital' },
    { label: 'Injection', href: '/injection' },
    { label: 'Follow Up', href: '/follow-up' },
    { label: 'Assessment & Plan', href: '/assessment-plan' },
    { label: 'Procedures', href: '/procedures' },
    ...defaultBottomLinks,
  ]

  if (appointmentId) {
    return navLinks
  }

  return baseLinks
}

const getStaffNavLinks = (staffId: string | null) => {
  const baseHref = `/staff/${staffId}`

  return [
    {
      label: 'Dashboard',
      href: `${baseHref}/dashboard`,
    },
    {
      label: 'Profile',
      href: `${baseHref}/profile`,
    },
    {
      label: 'Credentialing',
      href: `${baseHref}/credentialing`,
    },
    {
      label: 'License',
      href: `${baseHref}/license`,
    },
    {
      label: 'Malpractice',
      href: `${baseHref}/malpractice`,
    },
    {
      label: 'Preferences',
      href: `${baseHref}/preferences`,
    },
    {
      label: 'Clinic Scheduler',
      href: `${baseHref}/clinic-scheduler`,
    },
    {
      label: 'Forward Inbox',
      href: `${baseHref}/forward-inbox`,
    },
    {
      label: 'Groups',
      href: `${baseHref}/groups`,
    },
    {
      label: 'Billing',
      href: `${baseHref}/billing`,
    },
    {
      label: 'Policy',
      href: `${baseHref}/policy`,
    },
    {
      label: 'Tracking',
      href: `${baseHref}/tracking`,
    },
    {
      label: 'Location / Zone',
      href: `${baseHref}/location-zone`,
    },
    {
      label: 'Treatment Team',
      href: `${baseHref}/treatment-team`,
    },
    {
      label: 'Practice',
      href: `${baseHref}/practice`,
    },
  ]
}

const constructQuickNotesUrl = (
  patientId: number,
  appointmentId: number,
  visitType: string | undefined,
  visitSequence: string,
) => {
  return `/chart/${patientId}/quicknotes?id=${appointmentId}&visitType=${
    visitType ?? ''
  }&visitSequence=${visitSequence ?? ''}`
}

const isHospitalCareVisit = (visitType: string | null) => {
  return visitType?.includes('HospitalCare')
}

export {
  constructQuickNotesUrl,
  getNavLinks,
  isHospitalCareVisit,
  getStaffNavLinks,
}
