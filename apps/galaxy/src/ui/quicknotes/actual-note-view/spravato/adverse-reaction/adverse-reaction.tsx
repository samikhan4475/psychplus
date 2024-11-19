import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { SpravatoWidgetSchemaType } from '@/ui/procedures/spravato-tab/spravato-widget-schema'
import { LabelAndValue } from '../../shared'
import { LabelAndValueColumn } from '../label-and-value-column'
import { Dissociation } from './dissociation'
import { Sedation } from './sedation'

const FIELDS = [
  {
    label: 'Dizziness/Vertigo',
    field: 'dizzinessAndVertigo',
  },
  {
    label: 'Nausea/Vomiting',
    field: 'nauseaAndVomiting',
  },
  {
    label: 'Anxiety',
    field: 'anxiety',
  },
  {
    label: 'Lethargy',
    field: 'lethargy',
  },
  {
    label: 'Increased Blood Pressure',
    field: 'increasedInBloodPressure',
  },
  {
    label: 'Respiratory Changes',
    field: 'respiratoryChanges',
  },
]

const ADVERSE_EVENT_FIELDS = [
  {
    label: 'Occurrence',
    field: 'occurrenceDuration',
  },
  {
    label: 'Date of Event',
    field: 'dateOfEvent',
  },
  {
    label: 'The Event Resulted In',
    field: 'eventResultedIn',
  },
]

const AdverseReaction = ({ data }: { data: SpravatoWidgetSchemaType }) => {
  const adverseEventQuestion =
    data['adverseEventQuestion' as keyof SpravatoWidgetSchemaType]?.toString()

  return (
    <Flex direction="column" gap="2">
      <Text className="whitespace-nowrap text-3 font-[600]">
        Adverse Reaction
      </Text>
      <Sedation data={data} />
      <Dissociation data={data} />
      {FIELDS.map((item) => (
        <LabelAndValue
          key={item.field}
          label={`${item.label}:`}
          value={
            data[item.field as keyof SpravatoWidgetSchemaType]?.toString() ===
            'no'
              ? 'No'
              : 'Yes'
          }
        />
      ))}
      <LabelAndValueColumn
        value={
          data[
            'adverseEventQuestion' as keyof SpravatoWidgetSchemaType
          ]?.toString() === 'no'
            ? 'No'
            : 'Yes'
        }
        label="Did the patient experience any serious adverse events during treatment or since the last treatment session? This includes event that result in patient hospitalization, a disability or permanent damage, death, required medical intervention, or was life threatening?"
      />
      {adverseEventQuestion === 'yes' && (
        <>
          <LabelAndValueColumn
            value={
              data[
                'adverseEventText' as keyof SpravatoWidgetSchemaType
              ]?.toString() ?? ''
            }
            label="Adverse Event (if applicable)"
          />
          {ADVERSE_EVENT_FIELDS.map((item) => (
            <React.Fragment key={item.field}>
              <LabelAndValue
                label={`${item.label}:`}
                value={data[
                  item.field as keyof SpravatoWidgetSchemaType
                ]?.toString()}
              />
              {item.field === 'eventResultedIn' &&
                data[
                  'eventResultedIn' as keyof SpravatoWidgetSchemaType
                ]?.toString() === 'Other' && (
                  <LabelAndValueColumn
                    value={
                      data[
                        'otherText' as keyof SpravatoWidgetSchemaType
                      ]?.toString() ?? ''
                    }
                    label="Other"
                  />
                )}
            </React.Fragment>
          ))}
          <LabelAndValue
            label="Did the Event Resolve?"
            value={
              data[
                'eventResolution' as keyof SpravatoWidgetSchemaType
              ]?.toString() === 'no'
                ? 'No'
                : 'Yes'
            }
          />
        </>
      )}
    </Flex>
  )
}

export { AdverseReaction }
