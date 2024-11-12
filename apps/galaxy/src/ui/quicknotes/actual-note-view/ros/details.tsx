import {
  CARDIOVASCULAR_BLOCK_OPTIONS,
  CONSTITUTIONAL_BLOCK_OPTIONS,
  EYE_BLOCK_OPTIONS,
  EYE_MOUTH_BLOCK_OPTIONS,
  GASTROINTESTINAL_BLOCK_OPTIONS,
  GENITOURINARY_BLOCK_OPTIONS,
  MUSCULORSKELETAL_BLOCK_OPTIONS,
  NEURO_BLOCK_OPTIONS,
  RESPIRATORY_BLOCK_OPTIONS,
  SKIN_BLOCK_OPTIONS,
} from '@/ui/ros/ros-widget/blocks'
import { RosWidgetSchemaType } from '@/ui/ros/ros-widget/ros-widget-schema'
import { getSelectedOptions } from '@/utils/note'
import { BlockContainer, LabelAndValue } from '../shared'

interface Props<T> {
  data: T
}

const BLOCK_FIELD_MAP = [
  {
    label: 'Constitutional',
    options: CONSTITUTIONAL_BLOCK_OPTIONS,
    dataField: 'constitutional' as keyof RosWidgetSchemaType,
    otherField: 'ctOtherDetails',
  },
  {
    label: 'ENT/Mouth',
    options: EYE_MOUTH_BLOCK_OPTIONS,
    dataField: 'entMouth' as keyof RosWidgetSchemaType,
    otherField: 'entOtherDetails',
  },
  {
    label: 'Eyes',
    options: EYE_BLOCK_OPTIONS,
    dataField: 'eyes' as keyof RosWidgetSchemaType,
    otherField: 'eyesOtherDetails',
  },
  {
    label: 'Cardiovascular',
    options: CARDIOVASCULAR_BLOCK_OPTIONS,
    dataField: 'cardiovascular' as keyof RosWidgetSchemaType,
    otherField: 'cvsOtherDetails',
  },
  {
    label: 'Respiratory',
    options: RESPIRATORY_BLOCK_OPTIONS,
    dataField: 'respiratory' as keyof RosWidgetSchemaType,
    otherField: 'resOtherDetails',
  },
  {
    label: 'Gastrointestinal',
    options: GASTROINTESTINAL_BLOCK_OPTIONS,
    dataField: 'gastrointestinal' as keyof RosWidgetSchemaType,
    otherField: 'giOtherDetails',
  },
  {
    label: 'Genitourinary',
    options: GENITOURINARY_BLOCK_OPTIONS,
    dataField: 'genitourinary' as keyof RosWidgetSchemaType,
    otherField: 'guOtherDetails',
  },
  {
    label: 'Skin',
    options: SKIN_BLOCK_OPTIONS,
    dataField: 'skin' as keyof RosWidgetSchemaType,
    otherField: 'sknOtherDetails',
  },
  {
    label: 'Musculoskeletal',
    options: MUSCULORSKELETAL_BLOCK_OPTIONS,
    dataField: 'musculoskeletal' as keyof RosWidgetSchemaType,
    otherField: 'msuOtherDetails',
  },
  {
    label: 'Neuro',
    options: NEURO_BLOCK_OPTIONS,
    dataField: 'neuro' as keyof RosWidgetSchemaType,
    otherField: 'neuOtherDetails',
  },
]

const Details = ({ data }: Props<RosWidgetSchemaType>) => {
  return (
    <BlockContainer heading="ROS (Review of System)">
      {BLOCK_FIELD_MAP.map((block) => {
        let selectedOptions = getSelectedOptions(
          block.options,
          data[block.dataField] as string[],
        )

        if (selectedOptions.includes('Other') && block.otherField) {
          const otherValue = data[block.otherField as keyof RosWidgetSchemaType]
          if (otherValue) {
            selectedOptions = selectedOptions.replace(
              /\bOther\b/,
              `Other: ${otherValue as string}`,
            )
          }
        }

        return selectedOptions ? (
          <LabelAndValue
            key={block.label}
            label={`${block.label}:`}
            value={selectedOptions}
          />
        ) : null
      })}
    </BlockContainer>
  )
}

export { Details }
