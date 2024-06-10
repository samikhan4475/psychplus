import { PlusIcon } from '@radix-ui/react-icons'
import { Button, Flex, Text } from '@radix-ui/themes'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { DataTable } from '@psychplus/ui/data-table'
import { SchemaType } from './add-template-form'
import { Columns } from './columns'

const ParametersTable = () => {
  const { control, getFieldState, formState } = useFormContext<SchemaType>()
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'reportTemplateParameters',
  })
  const state = getFieldState('reportTemplateParameters', formState)

  const addRow = () => {
    const newParameter = {
      reportParameterCode: '',
      displayName: '',
      resourceStatus: 'Active',
    }
    append(newParameter)
  }

  return (
    <>
      <Flex gap="2" align="center" className="text-[12px] font-[510]">
        Run Parameters<span className="text-[#FF0000]">*</span>
        <Button
          variant="outline"
          type="button"
          className="h-6 cursor-pointer bg-[#FFF] px-2 text-[12px] text-[#000000] [box-shadow:inset_0_0_0_0.4px_#9E9898CC]"
          onClick={addRow}
        >
          <PlusIcon width={12} height={12} />
          Add
        </Button>
      </Flex>
      {state.error && (
        <Text size="2" color="red">
          {state.error?.root?.message
            ? state.error?.root?.message
            : state.error?.message}
        </Text>
      )}
      <DataTable
        tHeadClass="bg-[#F0F4FF]"
        thClass="[box-shadow:inset_0_0_0_0.2px_#0134DB72]"
        tableClass="[box-shadow:inset_0_0_0_0.2px_#0134DBB72]"
        columnCellClass="[box-shadow:inset_0_0_0_0.2px_#0134DB72] pl-1"
        columns={Columns(move, remove, fields.length)}
        data={fields}
      />
    </>
  )
}

export { ParametersTable }
