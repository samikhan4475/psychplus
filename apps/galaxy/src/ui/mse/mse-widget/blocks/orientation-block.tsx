import { GroupSelectSection } from '@/components'
import { ERROR_ID } from '../constants'
import { MseGroupDetailSection } from '../history/mse-details/mse-group-detail-section'
import { MseWidgetSchemaType } from '../mse-widget-schema'
import { GroupSelectOption } from '../types'

const BLOCK_ID = 'orientation'

const BLOCK_TITLE = 'Orientation'

const BLOCK_OPTIONS: GroupSelectOption<string>[] = [
  {
    label: 'Name',
    value: 'oriName',
  },
  {
    label: 'Place',
    value: 'oriPlace',
  },
  {
    label: 'Date',
    value: 'oriDate',
  },
  {
    label: 'Time',
    value: 'oriTime',
  },
  {
    label: 'Other',
    value: 'oriOther',
    details: {
      type: 'text',
      field: 'oriOtherDetails',
    },
  },
]

const OrientationBlock = ({ result }: { result?: MseWidgetSchemaType }) => {
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
          errorField={ERROR_ID}
        />
      )}
    </>
  )
}

export { OrientationBlock }
