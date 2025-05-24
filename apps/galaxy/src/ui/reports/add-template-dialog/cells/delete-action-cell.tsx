import { Flex } from '@radix-ui/themes'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { DeleteIcon } from '@/components/icons'
import { TemplateSchemaType } from '../schema'

interface DeleteActionCellProps {
  index: number
  remove: (index: number) => void
}

const DeleteActionCell = ({ index, remove }: DeleteActionCellProps) => {
  const { control } = useFormContext<TemplateSchemaType>()
  const { fields } = useFieldArray({
    control,
    name: 'parameters',
  })

  const isDateFilterExists =
    fields.some((field) => field.parameterCode === 'DateFilterType') &&
    (fields[index].parameterCode === 'StartDate' ||
      fields[index].parameterCode === 'EndDate')
  
  if (isDateFilterExists) return <></>
  return (
    <Flex
      justify="center"
      align="center"
      className="mx-auto"
      onClick={() => remove(index)}
    >
      <DeleteIcon className="text-pp-icon-sub bg-pp-icon-sub cursor-pointer" />
    </Flex>
  )
}

export { DeleteActionCell }
