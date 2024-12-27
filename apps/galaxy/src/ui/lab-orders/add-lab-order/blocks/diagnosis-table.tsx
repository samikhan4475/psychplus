import { Table } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import useDiagnosis from '../hooks/use-diagnosis'
import { AddDiagnosisDropDown } from './add-dignosis-dropdown'
import { ColumnHeader } from './column-header'
import { DiagnosisItem } from './diagnosis-item'
import { DiagnosisType } from './types'

const DiagnosisTable = () => {
  const {
    getSearchedDiagnosis,
    diagnosisList,
    selectedDiagnosisList,
    onClickDiagnosisItem,
    onClickDelete,
    loading,
    tableLoading,
  } = useDiagnosis()

  return (
    <Table.Root className="flex-grow">
      <Table.Header>
        <ColumnHeader
          title="Diagnosis"
          field="diagnosis"
          rightComponent={
            <AddDiagnosisDropDown
              getSearchedDiagnosis={getSearchedDiagnosis}
              diagnosisList={diagnosisList}
              onClickDiagnosisItem={onClickDiagnosisItem}
              loading={loading}
            />
          }
        />
      </Table.Header>

      <Table.Body>
        {tableLoading ? (
          <LoadingPlaceholder />
        ) : (
          selectedDiagnosisList.length > 0 &&
          selectedDiagnosisList.map((item: DiagnosisType, index: number) => (
            <DiagnosisItem
              key={item.id}
              diagnosisData={item}
              index={index}
              onDelete={onClickDelete}
            />
          ))
        )}
      </Table.Body>
    </Table.Root>
  )
}

export { DiagnosisTable }
