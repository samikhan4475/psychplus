import { AdminType } from '@/enum'
import { ChartNavLink, VisitTypes } from '@/types'
import { Tabs } from '@/ui/messages/types'

const getNavLinks = (
  appointmentId: string | null,
  visitType: string | null,
  visitSequence: string | null,
  isFeatureLabOrdersFlagEnabled: boolean,
  isFeatureFlagEnabledForSecondPhaseFeatures: boolean,
  isFeatureFlagEnabledForImmunization: boolean
): ChartNavLink[] => {
  if (isHospitalCareVisit(visitType)) {
    visitType = `${visitType}/${visitSequence}`
  }
  const defaultBottomLinks = [
    {
      label: 'Treatment Team',
      href: '/treatment-team',
      conditions: [isFeatureFlagEnabledForSecondPhaseFeatures],
    },
    { label: 'Patient Info', href: '/patient-info' },
    { label: 'Referrals', href: '/referrals' },
    { label: 'PCP', href: '/pcp' },
    { label: 'Pharmacy', href: '/pharmacy' },
    {
      label: 'Staff Comments',
      href: appointmentId ? '/staffs-comments' : '/staff-comments',
    },
    // { label: 'Rating', href: '/rating' },
    { label: 'Notifications', href: '/notifications' },
    { label: 'Engagement', href: '/engagement' },
    // { label: 'Patient Tracking', href: '/patient-tracking' },
  ]
  const baseLinks = [
    { label: 'Scheduling History', href: '/scheduling-history' },
    { label: 'Notes', href: '/notes' },
    { label: 'Diagnosis', href: '/diagnosis' },
    { label: 'Medications', href: '/medications' },
    { label: 'Immunization', href: '/immunization-list',conditions: [isFeatureFlagEnabledForImmunization] },
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
    {
      label: 'Fit For Duty Evaluation',
      href: '/fit-for-duty',
      conditions: [visitType === VisitTypes.FitnessForDuty],
    },
    {
      label: 'Pre-Employment Evaluation',
      href: '/pre-employment',
      conditions: [visitType === VisitTypes.PreEmployment],
    },
    { label: 'HPI/Presenting Symptoms', href: '/hpi' },
    { label: 'History', href: '/histories' },
    { label: 'Questionnaires', href: '/questionnaires' },
    { label: 'Mental Status Exam', href: '/mse' },
    { label: 'Add On', href: '/add-on' },
    { label: 'Codes', href: '/codes' },
    {
      label: 'Diagnosis',
      href: '/diagnosis',
      conditions: [visitType !== VisitTypes.HospitalCareDischarge],
    },
    {
      label: 'Working Discharge Diagnosis',
      href: '/discharge-diagnosis',
      conditions: [visitType === VisitTypes.HospitalCareDischarge],
    },
    {
      label: 'Lab Orders',
      href: '/lab-orders',
      conditions: [isFeatureLabOrdersFlagEnabled],
    },
    { label: 'Review of System', href: '/ros' },
    { label: 'Vitals', href: '/vitals' },
    { label: 'Physical Exam', href: '/physical-exam' },
    { label: 'After Visit Summary', href: '/after-visit-summary' },
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
    { label: 'Immunization', href: '/immunization-list',conditions: [isFeatureFlagEnabledForImmunization] },
    {
      label: 'Hospital',
      href: '/hospital',
      conditions: [isHospitalCareVisit(visitType)],
    },
    {
      label: 'Hospital Order',
      href: '/hospital-order',
      conditions: [isHospitalCareVisit(visitType)],
    },
    { label: 'Follow Up', href: '/follow-up' },
    { label: 'Assessment & Plan', href: '/assessment-plan' },
    { label: 'Screening', href: '/screening' },
    { label: 'Procedures', href: '/procedures' },
    { label: 'Scheduling History', href: '/scheduling-history' },
    ...defaultBottomLinks,
  ]

  if (appointmentId) {
    return navLinks
  }

  return baseLinks
}

const getStaffNavLinks = ({
  isNonAdminProfileView,
  isFeatureFlagEnabled,
  staffId,
}: {
  isNonAdminProfileView?: boolean
  isFeatureFlagEnabled: boolean

  staffId?: string | null
}) => {
  const baseHref = isNonAdminProfileView ? `/user` : `/staff/${staffId}`

  return [
    {
      label: 'Dashboard',
      href: `${baseHref}/dashboard`,
      conditions: [isFeatureFlagEnabled],
    },
    {
      label: 'Profile',
      href: `${baseHref}/profile`,
    },
    {
      label: 'Organization & Practice',
      href: `${baseHref}/organization-practice`,
    },
    {
      label: 'Location',
      href: `${baseHref}/location`,
    },
    {
      label: 'Credentialing',
      href: `${baseHref}/credentialing`,
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
      label: 'Groups',
      href: `${baseHref}/groups`,
      conditions: [isFeatureFlagEnabled],
    },
    {
      label: 'Billing',
      href: `${baseHref}/billing`,
      conditions: [isFeatureFlagEnabled],
    },
    {
      label: 'Treatment Team',
      href: `${baseHref}/treatment-team`,
      conditions: [isFeatureFlagEnabled],
    },
    {
      label: 'License',
      href: `${baseHref}/license`,
      conditions: [isFeatureFlagEnabled],
    },
    {
      label: 'Malpractice',
      href: `${baseHref}/malpractice`,
      conditions: [isFeatureFlagEnabled],
    },
    {
      label: 'Forward Inbox',
      href: `${baseHref}/forward-inbox`,
      conditions: [isFeatureFlagEnabled],
    },
    {
      label: 'Policy',
      href: `${baseHref}/policy`,
      conditions: [isFeatureFlagEnabled],
    },
    {
      label: 'Tracking',
      href: `${baseHref}/tracking`,
      conditions: [isFeatureFlagEnabled],
    },
    {
      label: 'Practice',
      href: `${baseHref}/practice`,
      conditions: [isFeatureFlagEnabled],
    },
  ]
}

const getPreferredPartnerNavLinks = ({ ppId }: { ppId?: string | null }) => {
  const baseHref = `/preferred-partner/${ppId}`

  return [
    {
      label: 'Profile',
      href: `${baseHref}/profile`,
    },
    {
      label: 'Users',
      href: `${baseHref}/users`,
    },
  ]
}
const getPracticePlanNavLinks = ({ ppId }: { ppId?: string | null }) => {
  const baseHref = `/practice-plan/${ppId}`

  return [
    {
      label: 'Contract',
      href: `${baseHref}/contract`,
    },
    {
      label: 'Fee Schedule',
      href: `${baseHref}/fee-schedule`,
    },
    {
      label: 'Plan Fee Schedule Logic',
      href: `${baseHref}/plan-fee-schedule-logic`,
    },
    {
      label: 'State',
      href: `${baseHref}/state`,
    },
    {
      label: 'General Rules',
      href: `${baseHref}/general-rules`,
    },
    {
      label: 'Provider Network Status',
      href: `${baseHref}/provider-network-status`,
    },
    {
      label: 'Plan Address',
      href: `${baseHref}/plan-address`,
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
    {
      label: 'Orders',
      links: [
        {
          label: 'Lab Orders',
          tab: Tabs.LAB_ORDERS,
        },
        {
          label: 'Lab Results',
          tab: Tabs.LAB_RESULTS,
        },
        {
          label: 'Medication Orders',
          tab: Tabs.MEDICATION_ORDERS,
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
  return `/p-chart/${patientId}/${appointmentId}/quicknotes?id=${appointmentId}&visitType=${
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
  roleId: string | null,
  practiceId: string | null,
  staffTypes?: string[],
  segments?: string[],
) => {
  const baseHref = `/management`
  const isSuperAdmin = !!staffTypes?.includes(AdminType.SUPER_ADMIN)
  const isOrgAdmin = !!staffTypes?.includes(AdminType.ORG_ADMIN)
  const isPracticeAdmin = !!staffTypes?.includes(AdminType.PRACTICE_ADMIN)
  const secondSegment = (segments && segments[1]) || null

  if (roleId && type && id) {
    const roleBase = `${baseHref}/organization-practice/${type}/${id}/organization-roles-permissions/${roleId}`

    return [
      {
        label: 'Profile',
        href: `${roleBase}/profile`,
      },
      {
        label: 'Permissions',
        href: `${roleBase}/permissions`,
      },
    ]
  }

  if (type === 'organizations' && (isSuperAdmin || isOrgAdmin)) {
    // if the user is not super admin and trying to navigate into management then only show organization tabs
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
      // {
      //   label: 'Policies',
      //   href: `${orgBase}/organization-policies`, // will be enabled when the BE part is ready
      // },
      {
        label: 'Staff',
        href: `${orgBase}/organization-staff`,
      },
      {
        label: 'Staff Roles',
        href: `${orgBase}/organization-staff-roles`,
      },
      {
        label: 'Users',
        href: `${orgBase}/organization-users`,
      },
      {
        label: 'Roles & Permissions',
        href: `${orgBase}/organization-roles-permissions`,
      },
    ]
  }

  if (
    (type === 'practices' || practiceId) &&
    (isPracticeAdmin || isSuperAdmin || isOrgAdmin)
  ) {
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
        href: `${practiceBase}/practice-staff`,
      },
      {
        label: 'Staff Roles',
        href: `${practiceBase}/practice-staff-roles`,
      },
    ]
  }

  if (secondSegment === 'location') {
    const locationBase = `/management/location/${id}`
    return [
      {
        label: 'Profile',
        href: `#`,
        disabled: true,
      },
      {
        label: 'Practice',
        href: `${locationBase}/practice`,
      },
      {
        label: 'Formulary Medications',
        href: `#`,
        disabled: true,
      },
      {
        label: 'Analytics',
        href: `#`,
        disabled: true,
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
      label: 'Visits',
      href: `${baseHref}/visits`,
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
      label: 'State',
      href: `${baseHref}/states`,
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
      label: 'Credentialing',
      href: `${baseHref}/credentialing`,
    },
    {
      label: 'Preferred Partner',
      href: `${baseHref}/preferred-partner`,
    },
    {
      label: 'Assigning Authorities',
      href: `${baseHref}/assigning-authorities`,
    },
    {
      label: 'Engagement',
      href: `${baseHref}/engagement`,
    },
    {
      label: 'Schedule',
      href: `${baseHref}/schedule`,
    },
  ]
}

export {
  constructQuickNotesUrl,
  getNavLinks,
  isHospitalCareVisit,
  getPracticePlanNavLinks,
  getStaffNavLinks,
  getPreferredPartnerNavLinks,
  getManagementNavLinks,
  getInboxNavLinks,
}
