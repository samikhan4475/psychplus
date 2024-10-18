import { physicalExamWidgetSchema } from '../history/physical-exam-details/data'
import { PhysicalExamGroupDetailSection } from '../history/physical-exam-details/physical-exam-group-detail-section'
import { PhysicalExamGroupSelectSection } from '../physical-exam-group-select-section'
import { GroupSelectOption } from '../types'

const BLOCK_ID = 'cardiovascularCvs'

const BLOCK_TITLE = 'Cardiovascular (CVS)'

const CVS_OPTIONS: GroupSelectOption<string>[] = [
  {
    label: 'Normal',
    value: 'cvsNormal',
  },
  {
    label: 'Murmurs',
    value: 'cvsMurmurs',
  },
  {
    label: 'Hypertension (HTN)',
    value: 'cvsHypertensionHtn',
  },
  {
    label: 'Other',
    value: 'cvsOther',
    details: {
      type: 'text',
      label: 'Details',
      field: 'cvsOtherDetails',
    },
  },
]

const CardiovascularCvsBlock = ({
  normalChipsSelected,
  setNormalChipsSelected,
  isDetails,
  result,
}: {
  normalChipsSelected?: string[]
  setNormalChipsSelected?: (selected: string[]) => void
  isDetails?: boolean
  result?: physicalExamWidgetSchema
}) => {
  return (
    <>
      {isDetails ? (
        <PhysicalExamGroupDetailSection
          label={BLOCK_TITLE}
          field={BLOCK_ID}
          options={CVS_OPTIONS}
          result={result}
        />
      ) : (
        <PhysicalExamGroupSelectSection
          label={BLOCK_TITLE}
          field={BLOCK_ID}
          options={CVS_OPTIONS}
          normalChipsSelected={normalChipsSelected}
          setNormalChipsSelected={setNormalChipsSelected}
        />
      )}
    </>
  )
}

export { CardiovascularCvsBlock }
