const DEFAULT_ICON_PATH = '/images/notification-icons'

const PurposeCodePaths: Record<string, string> = {
  card: `${DEFAULT_ICON_PATH}/card.svg`,
  draft: `${DEFAULT_ICON_PATH}/draft.svg`,
  logo: `${DEFAULT_ICON_PATH}/psychpluslogo.svg`,
  rating: `${DEFAULT_ICON_PATH}/rating.svg`,
}

enum Purpose_Code_Types {
  CreditCardRequest = 'CreditCardRequest',
  Appointment = 'Appointment',
  InsuranceRequest = 'InsuranceRequest',
  Questionnaire = 'Questionnaire',
  Subscription = 'Subscription',
  OtpCode = 'OtpCode',
  ConsentRequest = 'ConsentRequest',
  PatientSignup = 'PatientSignup',
  Staff = 'Staff',
  TemplateMessage = 'TemplateMessage',
}

const iconMapping = {
  draft: [
    Purpose_Code_Types.OtpCode,
    Purpose_Code_Types.ConsentRequest,
    Purpose_Code_Types.Questionnaire,
    Purpose_Code_Types.InsuranceRequest,
  ],
  logo: [
    Purpose_Code_Types.Staff,
    Purpose_Code_Types.TemplateMessage,
    Purpose_Code_Types.Appointment,
  ],
  rating: [Purpose_Code_Types.PatientSignup],
  card: [
    Purpose_Code_Types.CreditCardRequest,
    Purpose_Code_Types.Subscription,
    `${Purpose_Code_Types.Subscription}Renewed`,
    `${Purpose_Code_Types.Subscription}Cancel`,
  ],
}

const appointmentCodes = [
  `${Purpose_Code_Types.Appointment}Reminder`,
  `${Purpose_Code_Types.Appointment}Rescheduled`,
  `${Purpose_Code_Types.Appointment}Cancel`,
  `${Purpose_Code_Types.Appointment}NoShow`,
  `${Purpose_Code_Types.Appointment}Checkout`,
]

const purposeCodePaths = {
  ['home']: appointmentCodes,
  ['billing/credit-debit-cards']: [Purpose_Code_Types.CreditCardRequest],
  ['billing/insurance']: [Purpose_Code_Types.InsuranceRequest],
}

const purposeLabels: Record<string, string> = Object.fromEntries([
  ...appointmentCodes.map((code) => [code, 'Open Appointments']),
  [Purpose_Code_Types.CreditCardRequest, 'Update Card'],
  [Purpose_Code_Types.InsuranceRequest, 'Update Insurance'],
  [Purpose_Code_Types.Questionnaire, 'Go to Questionnaire'],
])

const getPurposeCodeMeta = (
  purposeCode: string,
): { route?: string; iconPath: string; label: string | undefined } => {
  let route: string | undefined = undefined

  for (const [path, codes] of Object.entries(purposeCodePaths)) {
    if (codes.includes(purposeCode as Purpose_Code_Types)) {
      route = `/${path}`
      break
    }
  }

  let iconPath = PurposeCodePaths.logo
  for (const [category, codes] of Object.entries(iconMapping)) {
    if (codes.some((prefix) => purposeCode.startsWith(prefix))) {
      iconPath = PurposeCodePaths[category]
      break
    }
  }
  const label = purposeLabels[purposeCode]
  return { route, iconPath, label }
}

const createScrollRestorer = (container: HTMLElement | null) => {
  const prevScrollHeight = container?.scrollHeight ?? 0
  const prevScrollTop = container?.scrollTop ?? 0

  return () => {
    setTimeout(() => {
      if (container) {
        const newScrollHeight = container.scrollHeight
        container.scrollTop = newScrollHeight - prevScrollHeight + prevScrollTop
      }
    }, 0)
  }
}

const getTimeAgo = (date: Date): string => {
  const diffInSeconds = Math.floor(
    (new Date().getTime() - date.getTime()) / 1000,
  )

  const units = [
    { threshold: 60, unit: 'sec', divisor: 1 },
    { threshold: 3600, unit: 'min', divisor: 60 },
    { threshold: 86400, unit: 'hr', divisor: 3600 },
    { threshold: 604800, unit: 'day', divisor: 86400 },
    { threshold: 2419200, unit: 'week', divisor: 604800 },
    { threshold: 29030400, unit: 'month', divisor: 2419200 },
  ]

  if (diffInSeconds < 60)
    return `${diffInSeconds} sec${diffInSeconds === 1 ? '' : 's'} ago`

  for (const { threshold, unit, divisor } of units) {
    if (diffInSeconds < threshold) {
      const value = Math.floor(diffInSeconds / divisor)
      return `${value} ${unit}${value === 1 ? '' : 's'} ago`
    }
  }

  const years = Math.floor(diffInSeconds / 29030400)
  return `${years} year${years === 1 ? '' : 's'} ago`
}

export {
  getPurposeCodeMeta,
  getTimeAgo,
  createScrollRestorer,
  Purpose_Code_Types,
}
