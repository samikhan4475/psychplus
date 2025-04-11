const DEFAULT_ICON_PATH = '/images/notification-icons'

const PurposeCodePaths: Record<string, string> = {
  card: `${DEFAULT_ICON_PATH}/card.svg`,
  draft: `${DEFAULT_ICON_PATH}/draft.svg`,
  logo: `${DEFAULT_ICON_PATH}/psychpluslogo.svg`,
  rating: `${DEFAULT_ICON_PATH}/rating.svg`,
}

const iconMapping = {
  draft: ['OtpCode', 'ConsentRequest'],
  logo: ['Staff', 'TemplateMessage', 'Appointment'],
  rating: ['PatientSignup'],
  card: ['Subscription', 'SubscriptionRenewed', 'SubscriptionCancel'],
}

const getPurposeCodeIconPath = (purposeCode: string): string => {
  for (const [iconCategory, codes] of Object.entries(iconMapping)) {
    if (codes.some((item) => purposeCode.startsWith(item))) {
      return PurposeCodePaths[iconCategory]
    }
  }

  return PurposeCodePaths.logo
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

export { getPurposeCodeIconPath, getTimeAgo }
