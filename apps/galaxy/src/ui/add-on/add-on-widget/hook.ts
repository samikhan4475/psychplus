import { useEffect, useMemo, useState } from 'react'
import { CODESETS, SettingStatusCode } from '@/constants'
import { getCodeAttributeBoolean, useCodesetCodes } from '@/hooks'
import { Appointment } from '@/types'
import { getPreferenceSettings } from '@/ui/staff-preferences/client-actions'

const THERAPY_PSYCHOANALYSIS_OPTIONS = [
  { label: 'Therapy', value: 'therapy' },
  { label: 'Psychoanalysis', value: 'psychoanalysis' },
  { label: 'Neither', value: 'neither' },
]

const useTherapyPsychoAnalysisOptions = ({
  appointment,
}: {
  appointment?: Appointment
}) => {
  const [hideNeitherOption, setHideNeitherOption] = useState(false)
  const codes = useCodesetCodes(CODESETS.ServicesOffered)

  useEffect(() => {
    if (!appointment?.providerUserId) return
    const payload = {
      userId: appointment?.providerUserId,
      categoryValues: ['StaffPreference'],
      name: 'ShowNeitherOnTherapyTimeDependentVisitsValue',
      settingStatusCode: SettingStatusCode.Active,
    }
    getPreferenceSettings(payload).then((res) => {
      if (res.state === 'success') {
        setHideNeitherOption(res.data?.[0]?.content === 'No')
      }
    })
  }, [])

  const options = useMemo(() => {
    if (!appointment?.service) return THERAPY_PSYCHOANALYSIS_OPTIONS
    const selectedCode = codes.find(
      (service) => service?.value === appointment?.service,
    )
    if (!selectedCode) return THERAPY_PSYCHOANALYSIS_OPTIONS
    const isServiceTimeDependent = getCodeAttributeBoolean(
      selectedCode,
      'IsTimeDependent',
    )

    if (hideNeitherOption && isServiceTimeDependent) {
      return THERAPY_PSYCHOANALYSIS_OPTIONS.filter((o) => o.value !== 'neither')
    }
    return THERAPY_PSYCHOANALYSIS_OPTIONS
  }, [hideNeitherOption, appointment?.service])

  return options
}

export { useTherapyPsychoAnalysisOptions }
