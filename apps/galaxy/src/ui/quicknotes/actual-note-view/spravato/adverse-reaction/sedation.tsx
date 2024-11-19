import { Flex } from '@radix-ui/themes'
import { SpravatoWidgetSchemaType } from '@/ui/procedures/spravato-tab/spravato-widget-schema'
import { LabelAndValue } from '../../shared'

const Sedation = ({ data }: { data: SpravatoWidgetSchemaType }) => {
  const sedation =
    data['sedation' as keyof SpravatoWidgetSchemaType]?.toString()
  const sedationOnsetOfSymptoms =
    data[
      'sedationOnsetOfSymptoms' as keyof SpravatoWidgetSchemaType
    ]?.toString()
  const sedationSymptomsResolved =
    data[
      'sedationSymptomsResolved' as keyof SpravatoWidgetSchemaType
    ]?.toString()
  const sedationTimeSinceAdministration =
    data[
      'sedationTimeSinceAdministration' as keyof SpravatoWidgetSchemaType
    ]?.toString()

  return (
    <Flex direction="row" gap="1">
      <LabelAndValue
        label="Sedation"
        value={sedation === 'no' ? 'No' : 'Yes'}
      />
      {sedation === 'yes' && (
        <>
          <LabelAndValue
            label="Indicate the onset of symptoms from the start of administration"
            value={sedationOnsetOfSymptoms}
          />
          <LabelAndValue
            label="Did symptoms resolve within 2-hours of administration?"
            value={sedationSymptomsResolved}
          />
          {sedationSymptomsResolved === 'no' && (
            <LabelAndValue
              label="If greater than 2-hours, specify time since administration"
              value={sedationTimeSinceAdministration}
            />
          )}
        </>
      )}
    </Flex>
  )
}

export { Sedation }
