import { PhysicalExamGroupSelectSection } from '../physical-exam-group-select-section'

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

const CranialNervesExamBlock = ({
  normalChipsSelected,
  setNormalChipsSelected,
}: {
  normalChipsSelected: string[]
  setNormalChipsSelected: (selected: string[]) => void
}) => {
  return (
    <PhysicalExamGroupSelectSection
      label={'Cranial Nerves Exam'}
      field={'cranialNervesExam'}
      options={[
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
          details: { type: 'text', label: 'Details', field: 'cneOtherDetails' },
        },
      ]}
      normalChipsSelected={normalChipsSelected}
      setNormalChipsSelected={setNormalChipsSelected}
    />
  )
}

export { CranialNervesExamBlock }
