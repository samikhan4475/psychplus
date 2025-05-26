import { AddressFieldsGroup } from '@/components'

const AddressGroup = () => {
  return (
    <AddressFieldsGroup
      columnsPerRow="2"
      isFilter
      direction="row"
      required={false}
      fieldContainerClassName="flex-row"
      className="flex flex-row"
      stateFieldContainerClassName="w-[70%]"
      fieldLabelClassName="!text1 text-[12px]"
      addAreaCode={false}
    />
  )
}

export { AddressGroup }
