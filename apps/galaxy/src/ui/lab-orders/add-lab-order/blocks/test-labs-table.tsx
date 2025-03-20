import { Table } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import useTestLabs from '../hooks/use-test-labs'
import { LabOrderSchemaType } from '../lab-order-schema'
import { AddTestLabsDropDown } from './add-test-labs-dropdown'
import { ColumnHeader } from './column-header'
import { TestLabItem } from './test-lab-item'
import { TestLabsType } from './types'

const TestLabsTable = ({ isFormDisabled }: { isFormDisabled: boolean }) => {
  const { selectedTestLabList, onClickTestLabItem, onClickDelete } =
    useTestLabs()

  const form = useFormContext<LabOrderSchemaType>()
  const labLocationData = form.watch('labLocationData')

  return (
    <Table.Root className="flex-grow">
      <Table.Header>
        <ColumnHeader
          title="Tests/Labs"
          field="testLabs"
          rightComponent={
            <AddTestLabsDropDown
              onClickTestLabItem={onClickTestLabItem}
              isFormDisabled={isFormDisabled || !labLocationData}
            />
          }
        />
      </Table.Header>

      <Table.Body>
        {selectedTestLabList &&
          selectedTestLabList.length > 0 &&
          selectedTestLabList.map((item: TestLabsType, index: number) => (
            <TestLabItem
              key={item.id}
              index={index}
              onDelete={onClickDelete}
              testLabData={item}
            />
          ))}
      </Table.Body>
    </Table.Root>
  )
}

export { TestLabsTable }
