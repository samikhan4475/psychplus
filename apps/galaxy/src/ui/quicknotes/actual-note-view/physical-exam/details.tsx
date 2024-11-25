import { PhysicalExamWidgetSchemaType } from '@/ui/physical-exam/physical-exam-widget/physical-exam-widget-schema'
import { BlockContainer, LabelAndValue } from '../shared'
import { renderDataWithOther } from '../utils'

interface Props<T> {
  data: T
}

const Details = ({ data }: Props<PhysicalExamWidgetSchemaType>) => {
  const labelMapping: Record<string, string> = {
    general: 'General',
    skin: 'Skin',
    heent: 'HEENT',
    neck: 'Neck',
    lymphNodes: 'Lymph Nodes',
    chest: 'Chest',
    cardiovascularCvs: 'Cardiovascular (CVS)',
    lungs: 'Lungs',
    gastrointestinalGi: 'Gastrointestinal (GI)',
    adhdHyperactive: 'ADHD/Hyperactive',
    gynecologicalGyn: 'Gynecological (Gyn)',
    genitourinaryGu: 'Genitourinary (GU)',
    centralNervousSystemCns: 'Central Nervous System (CNS)',
    musculoskeletal: 'Musculoskeletal',
    nutrition: 'Nutrition',
    psychiatric: 'Psychiatric',
    cranialNervesExam: 'Neurological Examination of Cranial Nerves',
  }

  return (
    <BlockContainer heading="Physical Exam">
      {Object.entries(data).map(([key, value]) => {
        const label =
          labelMapping[key] ||
          key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (str) => str.toUpperCase())

        if (Array.isArray(value) && value.length > 0) {
          return (
            <LabelAndValue
              key={key}
              label={`${label}:`}
              value={renderDataWithOther(key, value, data)}
            />
          )
        }

        return null
      })}
    </BlockContainer>
  )
}

export { Details }
