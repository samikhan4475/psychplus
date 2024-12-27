import { Table } from '@radix-ui/themes'
import useTestLabs from '../hooks/use-test-labs'
import { AddTestLabsDropDown } from './add-test-labs-dropdown'
import { ColumnHeader } from './column-header'
import { TestLabItem } from './test-lab-item'
import { TestLabsType } from './types'

const TestLabsTable = () => {
  const {
    getSearchedTestLabs,
    testLabsList,
    selectedTestLabList,
    onClickTestLabItem,
    onClickDelete,
    loading,
  } = useTestLabs()

  return (
    <Table.Root className="flex-grow">
      <Table.Header>
        <ColumnHeader
          title="Tests/Labs"
          field="testLabs"
          rightComponent={
            <AddTestLabsDropDown
              getSearchedTestLabs={getSearchedTestLabs}
              testLabsList={testLabsList}
              onClickTestLabItem={onClickTestLabItem}
              loading={loading}
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
