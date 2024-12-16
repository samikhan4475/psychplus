import { AddressFieldsGroup } from '@/components'

const AddressGroup = () => {
  return (
      <AddressFieldsGroup
        columnsPerRow='2'
        isFilter
        direction='row'
        required={false}
        fieldContainerClassName="flex-row"
        className="flex-row flex"
        stateFieldContainerClassName="w-[70%]"
        fieldLabelClassName="!text1 text-[12px]"
      />
  )
}

export { AddressGroup }
