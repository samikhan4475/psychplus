export function getPrefix(value: string) {
  const regex = /^(.*?)(Normal|Abnormal)$/
  const match = value.match(regex)
  return match ? match[1] : null // Return the prefix if matched, otherwise null
}

export function getAlternate(value: string) {
  if (value.includes('Normal')) {
    return value.replace('Normal', 'Abnormal')
  } else if (value.includes('Abnormal')) {
    return value.replace('Abnormal', 'Normal')
  }
  return ''
}

export function removeValueFromArray(array: string[], value?: string) {
  return array.filter((item) => item !== value)
}

export const normal = [
  'gnNormal',
  'sknNormal',
  'hntNormal',
  'nkNormal',
  'lnNormal',
  'chsNormal',
  'cvsNormal',
  'giNormal',
  'gynNormal',
  'guNormal',
  'cnsNormal',
  'msuNormal',
  'nutNormal',
  'psyNormal',
  'lngNormal',
  'cneOlfactoryNormal',
  'cneOlfactory',
  'cneOpticalNormal',
  'cneOptical',
  'cneTrochlearNormal',
  'cneTrochlear',
  'cneTrigeminalNormal',
  'cneTrigeminal',
  'cneAbducensNormal',
  'cneAbducens',
  'cneFacialNormal',
  'cneFacial',
  'cneAuditoryNormal',
  'cneAuditory',
  'cneGlossopharyngealNormal',
  'cneGlossopharyngeal',
  'cneVagusNormal',
  'cneVagus',
  'cneSpinalAccessoryNormal',
  'cneSpinalAccessory',
  'cneHypoglossalNormal',
  'cneHypoglossal',
]

export function containsAbnormal(array: string[]) {
  return array.some((value) => value.includes('Abnormal'))
}
