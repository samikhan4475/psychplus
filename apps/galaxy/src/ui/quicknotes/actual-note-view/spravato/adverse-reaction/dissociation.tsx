import { Flex } from '@radix-ui/themes'
import { SpravatoWidgetSchemaType } from '@/ui/procedures/spravato-tab/spravato-widget-schema'
import { LabelAndValue } from '../../shared'

const Dissociation = ({ data }: { data: SpravatoWidgetSchemaType }) => {
  const dissociation =
    data['dissociation' as keyof SpravatoWidgetSchemaType]?.toString()
  const dissociationOnsetOfSymptoms =
    data[
      'dissociationOnsetOfSymptoms' as keyof SpravatoWidgetSchemaType
    ]?.toString()
  const dissociationSymptomsResolved =
    data[
      'dissociationSymptomsResolved' as keyof SpravatoWidgetSchemaType
    ]?.toString()
  const dissociationTimeSinceAdministration =
    data[
      'dissociationTimeSinceAdministration' as keyof SpravatoWidgetSchemaType
    ]?.toString()

  return (
    <Flex direction="row" gap="1">
      <LabelAndValue
        label="Dissociation"
        value={dissociation === 'no' ? 'No' : 'Yes'}
      />
      {dissociation === 'yes' && (
        <>
          <LabelAndValue
            label="Indicate the onset of symptoms from the start of administration"
            value={dissociationOnsetOfSymptoms}
          />
          <LabelAndValue
            label="Did symptoms resolve within 2-hours of administration?"
            value={dissociationSymptomsResolved}
          />
          {dissociationSymptomsResolved === 'no' && (
            <LabelAndValue
              label="If greater than 2-hours, specify time since administration"
              value={dissociationTimeSinceAdministration}
            />
          )}
        </>
      )}
    </Flex>
  )
}

export { Dissociation }
