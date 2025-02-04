import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { useDeepCompareMemo } from '@/hooks/use-deep-compare-memo'
import { QuickNoteSectionItem, SelectOptionType } from '@/types'
import { transformIn } from '@/ui/assessment-plan/tcm-widget/data'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { AddonsTable, ModifierTable, PrimaryCodeTable } from '../blocks'
import { CodesWidgetSchemaType } from '../codes-widget-schema'
import { VisitProps } from '../types'
import { restrictedCodesTCM } from '../utils'

const Tcm = ({
  cptAddOnsCodes,
  cptPrimaryCodes,
  cptmodifierCodes,
  appointment,
  patientId,
  tcmData = [],
  isQuicknoteView,
}: VisitProps) => {
  const [updatedPrimaryCodes, setUpdatedPrimaryCodes] = useState([
    ...cptPrimaryCodes,
  ])
  const form = useFormContext<CodesWidgetSchemaType>()
  const [isDisabled, setIsDisabled] = useState(true)
  const formValues = form.getValues()

  const handleTCMCodes = async () => {
    let data: QuickNoteSectionItem[] = isQuicknoteView ? memoizedTcmData : []
    if (!isQuicknoteView) {
      const response = await getQuickNoteDetailAction(patientId, [
        QuickNoteSectionName.QuicknoteSectionTcm,
      ])
      if (response.state === 'error') return toast.error(response.state)
      data = response.data
    }

    const tcmSchema = transformIn(data, appointment)
    const hasHospitalDetails =
      !!tcmSchema?.dcHospitalName &&
      !!tcmSchema?.tcmDate &&
      !!tcmSchema?.tcmResults
    const hasPrimaryCodes = formValues.cptPrimaryCodes.length > 0
    let shouldDisableCodes = hasHospitalDetails && hasPrimaryCodes

    if (
      hasPrimaryCodes &&
      !formValues.cptPrimaryCodes.some((code) => restrictedCodesTCM.has(code))
    ) {
      shouldDisableCodes = false
    }

    const updatedCodes = cptPrimaryCodes.map((code) =>
      restrictedCodesTCM.has(code.value)
        ? disableCode(code, true)
        : disableCode(code, shouldDisableCodes),
    )

    setIsDisabled(false)
    setUpdatedPrimaryCodes(updatedCodes)
  }

  const memoizedCptPrimaryCodes = useDeepCompareMemo(
    () => cptPrimaryCodes,
    [cptPrimaryCodes],
  )

  const memoizedTcmData = useDeepCompareMemo(() => tcmData, [tcmData])

  useEffect(() => {
    handleTCMCodes()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointment, patientId, memoizedCptPrimaryCodes, memoizedTcmData])

  return (
    <>
      <PrimaryCodeTable codes={updatedPrimaryCodes} isDisabled={isDisabled} />
      <ModifierTable codes={cptmodifierCodes} isDisabled />
      <AddonsTable codes={cptAddOnsCodes} isDisabled />
    </>
  )
}
const disableCode = (code: SelectOptionType, disabled: boolean) => ({
  ...code,
  disabled,
})
export { Tcm }
