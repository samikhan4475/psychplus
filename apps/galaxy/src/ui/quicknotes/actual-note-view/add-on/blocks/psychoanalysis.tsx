import { AddOnWidgetSchemaType } from '@/ui/add-on/add-on-widget/add-on-widget-schema'
import { LabelAndValue } from '../../shared'

const formatList = (
  items: (
    | {
        value?: string
        display?: string
      }
    | undefined
  )[],
) =>
  items
    .map((item) => item?.display)
    .filter(Boolean)
    .join(', ')

const DEFAULT_PSYCHOANALYSIS_TEXT = `Patient displayed transference possibly resulting from unconscious conflicts.
Provider encouraged reflection on past experiences impacting the patient's life and explored repressed thoughts to identify root causes of psychological distress.
Continued support and discussion are recommended.`

const PsychoanalysisBlock = ({ data }: { data: AddOnWidgetSchemaType }) => {
  if (!data.therapy || data.therapyPsychoanalysis !== 'psychoanalysis')
    return null
  return (
    <LabelAndValue
      label="Psychoanalysis"
      value={`Conducted psychoanalysis in this session interacting with the patient.
        Descriptions of transference include: ${formatList(
        data.transferenceDescription || [],
      )}.
        Psychoanalytic techniques used include: ${formatList(
        data.psychoanalyticTechnique || [],
      )}.
        ${data.additionalPsychoAnalysisDetail ? data.additionalPsychoAnalysisDetail : DEFAULT_PSYCHOANALYSIS_TEXT}`}
    />
  )
}

export { PsychoanalysisBlock }
