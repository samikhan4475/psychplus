import { ChartNavLink, VisitTypes } from '@/types'
import { Tabs } from '@/ui/messages/types'

const getNavLinks = (
  appointmentId: string | null,
  visitType: string | null,
  isFeatureLabOrdersFlagEnabled: boolean,
): ChartNavLink[] => {
  const defaultBottomLinks = [
    { label: 'Patient Info', href: '/patient-info' },
    { label: 'Referrals', href: '/referrals' },
    { label: 'PCP', href: '/pcp' },
    { label: 'Pharmacy', href: '/pharmacy' },
    {
      label: 'Staff Comments',
      href: '/staff-comments',
    },
    // { label: 'Rating', href: '/rating' },
    { label: 'Notifications', href: '/notifications' },
    // { label: 'Patient Tracking', href: '/patient-tracking' },
  ]
  const baseLinks = [
    { label: 'Scheduling History', href: '/scheduling-history' },
    { label: 'Notes', href: '/notes' },
    { label: 'Diagnosis', href: '/diagnosis' },
    { label: 'Medications', href: '/medications' },
    { label: 'Allergies', href: '/allergies' },
    {
      label: 'Lab Orders',
      href: '/lab-orders',
      conditions: [isFeatureLabOrdersFlagEnabled],
    },
    ...defaultBottomLinks,
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
    {
      label: 'Lab Orders',
      href: '/lab-orders',
      conditions: [isFeatureLabOrdersFlagEnabled],
    },
    { label: 'Review of System', href: '/ros' },
    { label: 'Vitals', href: '/vitals' },
    { label: 'Physical Exam', href: '/physical-exam' },
    {
      label: 'Therapy',
      href: '/therapy',
      conditions: [
        visitType === VisitTypes.FamilyPsychotherapy ||
          visitType === VisitTypes.IndividualPsychotherapy,
      ],
    },
    { label: 'Allergies', href: '/allergies' },
    { label: 'Medications', href: '/medications' },
    { label: 'Hospital', href: '/hospital' },
    { label: 'Follow Up', href: '/follow-up' },
    { label: 'Assessment & Plan', href: '/assessment-plan' },
    { label: 'Procedures', href: '/procedures' },
    { label: 'Scheduling History', href: '/scheduling-history' },
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
      label: 'Clinic Schedule',
      href: `${baseHref}/clinic-schedule`,
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
      label: 'Location',
      href: `${baseHref}/location`,
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

const getInboxNavLinks = ({
  isFeatureFlagEnabled,
  unreadCount,
}: {
  isFeatureFlagEnabled: boolean
  unreadCount: number
}) => {
  return [
    {
      label: 'Messages',
      conditions: [isFeatureFlagEnabled],
      links: [
        {
          label: 'Inbox',
          tab: Tabs.INBOX,
          unreadCount,
        },
        {
          label: 'Sent',
          tab: Tabs.SENT,
        },
        {
          label: 'Archived',
          tab: Tabs.ARCHIVED,
        },
        {
          label: 'Draft',
          tab: Tabs.DRAFT,
        },
      ],
    },
    {
      label: 'Notes',
      links: [
        {
          label: 'Pending Notes',
          tab: Tabs.PENDING_NOTES,
        },
        {
          label: 'Pending Cosigner Notes',
          tab: Tabs.PENDING_COSIGNER_NOTES,
        },
      ],
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

const isHospitalCareVisit = (visitType: string | null) =>
  !!visitType &&
  ['HospitalCare', 'PhpCare', 'NursingHomeCare'].some((type) =>
    visitType.includes(type),
  )

const getManagementNavLinks = (
  type: string | null,
  id: string | null,
  practiceId: string | null,
) => {
  const baseHref = `/management`

  if (type === 'organizations') {
    const orgBase = `${baseHref}/organization-practice/organizations/${id}`
    return [
      {
        label: 'Profile',
        href: `${orgBase}/organization-profile`,
      },
      {
        label: 'Practice',
        href: `${orgBase}/organization-practices`,
      },
      {
        label: 'Policies',
        href: `${orgBase}/organization-policies`,
      },
      {
        label: 'Staff',
        href: `${orgBase}/organization-staff`,
      },
      {
        label: 'Users',
        href: `${orgBase}/organization-users`,
      },
      {
        label: 'Roles & Permissions',
        href: `${orgBase}/roles-permissions`,
      },
    ]
  }

  if (type === 'practices' || practiceId) {
    const practiceBase = `${baseHref}/organization-practice/practices/${
      id ?? practiceId
    }`
    return [
      {
        label: 'Profile',
        href: `${practiceBase}/practices-profile`,
      },
      {
        label: 'Virtual Address',
        href: `${practiceBase}/practices-virtual-addresses`,
      },
      {
        label: 'Provider Types',
        href: `${practiceBase}/provider-types`,
      },
      {
        label: 'Clearing House Setup',
        href: `/management/clearinghouse/?practice=${id ?? practiceId}`,
      },
      {
        label: 'Plan List',
        href: `${practiceBase}/plan-list`,
      },
      {
        label: 'Settings',
        href: `${practiceBase}/practice-settings`,
      },
      {
        label: 'Staff',
        href: `${practiceBase}/staff`,
      },
      {
        label: 'Roles & Permissions',
        href: `${practiceBase}/roles-permissions`,
      },
    ]
  }

  return [
    {
      label: 'Coding',
      href: `${baseHref}/coding`,
    },
    {
      label: 'Staff',
      href: `${baseHref}/staff`,
    },
    {
      label: 'Clearinghouse Setup',
      href: `${baseHref}/clearinghouse`,
    },
    {
      label: 'Location',
      href: `${baseHref}/location`,
    },
    {
      label: 'Reports',
      href: `${baseHref}/reports`,
    },
    {
      label: 'Pharmacy',
      href: `${baseHref}/pharmacy`,
    },
    {
      label: 'Payer',
      href: `${baseHref}/payer`,
    },
    {
      label: 'Organization and Practice',
      href: `${baseHref}/organization-practice`,
    },
    {
      label: 'Assigning Authorities',
      href: `${baseHref}/assigning-authorities`,
    },
  ]
}

export {
  constructQuickNotesUrl,
  getNavLinks,
  isHospitalCareVisit,
  getStaffNavLinks,
  getManagementNavLinks,
  getInboxNavLinks,
}
