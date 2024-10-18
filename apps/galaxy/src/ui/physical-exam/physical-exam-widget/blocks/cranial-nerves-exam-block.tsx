import { physicalExamWidgetSchema } from '../history/physical-exam-details/data'
import { PhysicalExamGroupDetailSection } from '../history/physical-exam-details/physical-exam-group-detail-section'
import { PhysicalExamGroupSelectSection } from '../physical-exam-group-select-section'
import { GroupSelectOption } from '../types'

const CNE_OPTIONS = [
  { label: 'Olfactory', value: 'cneOlfactory' },
  { label: 'Optical', value: 'cneOptical' },
  { label: 'Trochlear', value: 'cneTrochlear' },
  { label: 'Trigeminal', value: 'cneTrigeminal' },
  { label: 'Abducens', value: 'cneAbducens' },
  { label: 'Facial', value: 'cneFacial' },
  { label: 'Auditory', value: 'cneAuditory' },
  { label: 'Glossopharyngeal', value: 'cneGlossopharyngeal' },
  { label: 'Vagus', value: 'cneVagus' },
  { label: 'Spinal Accessory', value: 'cneSpinalAccessory' },
  { label: 'Hypoglossal', value: 'cneHypoglossal' },
]

const cneOptions: GroupSelectOption<string>[] = [
  ...CNE_OPTIONS.map((nerve) => ({
    ...nerve,
    radioOption: [
      { label: 'Normal', value: `${nerve.value}Normal` },
      { label: 'Abnormal', value: `${nerve.value}Abnormal` },
    ],
  })),
  {
    label: 'Other',
    value: 'cneOther',
    details: {
      type: 'text',
      label: 'Details',
      field: 'cneOtherDetails',
    },
  },
]

const BLOCK_ID = 'cranialNervesExam'

const BLOCK_TITLE = 'Cranial Nerves Exam'

const CranialNervesExamBlock = ({
  normalChipsSelected,
  setNormalChipsSelected,
  isDetails,
  result,
  dependentNormalValues,
}: {
  normalChipsSelected?: string[]
  setNormalChipsSelected?: (selected: string[]) => void
  isDetails?: boolean
  result?: physicalExamWidgetSchema
  dependentNormalValues?: string[]
}) => {
  return (
    <>
      {isDetails ? (
        <PhysicalExamGroupDetailSection
          label={BLOCK_TITLE}
          field={BLOCK_ID}
          options={cneOptions}
          result={result}
        />
      ) : (
        <PhysicalExamGroupSelectSection
          label={'Cranial Nerves Exam'}
          field={'cranialNervesExam'}
          options={cneOptions}
          normalChipsSelected={normalChipsSelected}
          setNormalChipsSelected={setNormalChipsSelected}
          dependentNormalValues={dependentNormalValues}
        />
      )}
    </>
  )
}

export { CranialNervesExamBlock }
