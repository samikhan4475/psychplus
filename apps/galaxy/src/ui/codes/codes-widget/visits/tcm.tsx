import { useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { SelectOptionType } from '@/types'
import { transformIn } from '@/ui/assessment-plan/tcm-widget/data'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { AddonsTable, ModifierTable, PrimaryCodeTable } from '../blocks'
import { CodesWidgetSchemaType } from '../codes-widget-schema'
import { VisitProps } from '../types'

const Tcm = ({
  cptAddOnsCodes,
  cptPrimaryCodes,
  cptmodifierCodes,
  appointment,
  patientId,
}: VisitProps) => {
  const [updatedPrimaryCodes, setUpdatedPrimaryCodes] = useState([
    ...cptPrimaryCodes,
  ])
  const form = useFormContext<CodesWidgetSchemaType>()
  const [isDisabled, setIsDisabled] = useState(true)
  const formValues = form.getValues()
  const handleTCMCodes = async () => {
    const disableCode = (code: SelectOptionType, disabled: boolean) => ({
      ...code,
      disabled,
    })
    const response = await getQuickNoteDetailAction(patientId, [
      QuickNoteSectionName.QuicknoteSectionTcm,
      appointment.appointmentId + '',
    ])

    const updatedCodes = cptPrimaryCodes.map((code) => {
      const isSpecificCode = code.value === '99496' || code.value === '99495'
      if (isSpecificCode) {
        return disableCode(code, true)
      }
      if (response.state === 'success') {
        const data = transformIn(response?.data)
        const hasHospitalDetails =
          data.dcHospitalName !== '' && data.dcHospitalServiceType !== ''
        const hasPrimaryCodes = formValues.cptPrimaryCodes.length > 0
        if (hasHospitalDetails && hasPrimaryCodes) {
          return disableCode(code, true)
        }
      }
      setIsDisabled(false)
      return disableCode(code, false)
    })
    setUpdatedPrimaryCodes(updatedCodes)
  }

  const memoizedCptPrimaryCodes = useMemo(
    () => cptPrimaryCodes,

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(cptPrimaryCodes)],
  )

  useEffect(() => {
    handleTCMCodes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointment, patientId, memoizedCptPrimaryCodes])

  return (
    <>
      <PrimaryCodeTable codes={updatedPrimaryCodes} isDisabled={isDisabled} />
      <ModifierTable codes={cptmodifierCodes} isDisabled />
      <AddonsTable codes={cptAddOnsCodes} isDisabled />
    </>
  )
}

export { Tcm }
