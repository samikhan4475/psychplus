import { GroupSelectSection } from '@/components'
import { MseGroupDetailSection } from '../history/mse-details/mse-group-detail-section'
import { MseWidgetSchemaType } from '../mse-widget-schema'
import { GroupSelectOption } from '../types'

const BLOCK_ID = 'thoughtProcess'

const BLOCK_TITLE = 'Thought Process'

const BLOCK_OPTIONS: GroupSelectOption<string>[] = [
  {
    label: 'Linear',
    value: 'thpLinear',
  },
  {
    label: 'Loose',
    value: 'thpLoose',
  },
  {
    label: 'Circumstantial',
    value: 'thpCircumstantial',
  },
  {
    label: 'Tangential',
    value: 'thpTangential',
  },
  {
    label: 'Flight of ideas',
    value: 'thpFlightOfIdeas',
  },
  {
    label: 'Disorganized',
    value: 'thpDisorganized',
  },
  {
    label: 'Concrete',
    value: 'thpConcrete',
  },
  {
    label: 'Blocking',
    value: 'thpBlocking',
  },
  {
    label: 'Other',
    value: 'thpOther',
    details: {
      type: 'text',
      field: 'thpOtherDetails',
    },
  },
]

const ThoughtProcessBlock = ({ result }: { result?: MseWidgetSchemaType }) => {
  return (
    <>
      {result ? (
        <MseGroupDetailSection
          label={BLOCK_TITLE}
          field={BLOCK_ID}
          options={BLOCK_OPTIONS}
          result={result}
        />
      ) : (
        <GroupSelectSection
          label={BLOCK_TITLE}
          field={BLOCK_ID}
          options={BLOCK_OPTIONS}
        />
      )}
    </>
  )
}

export { ThoughtProcessBlock }
