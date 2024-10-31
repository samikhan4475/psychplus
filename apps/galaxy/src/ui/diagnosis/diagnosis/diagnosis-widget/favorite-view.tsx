import { Table, Text } from '@radix-ui/themes'
import { StarIcon } from 'lucide-react'
import { LoadingPlaceholder } from '@/components'
import { useStore } from '../../store'
import { SearchFavorite } from './search-favorite'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'


interface FavoriteViewProps {
  patientId: string
}

const FavoriteView = ({ patientId }: FavoriteViewProps) => {
  const {
    favouriteDiagnosisData,
    loadingFavouriteDiagnosis,
    unmarkDiagnosisFavorites,
    workingDiagnosisData,
    updateWorkingDiagnosisData
  } = useStore()

  const handleValueChange = async (value: string) => {

    const isValueAlreadyExist = workingDiagnosisData.some(
      (item) => item.sectionItemValue === value
    );

    if (!isValueAlreadyExist) {
      const data = [
        ...workingDiagnosisData,
        {
          pid: Number(patientId),
          sectionName: QuickNoteSectionName.QuickNoteSectionDiagnosis,
          sectionItem: value,
          sectionItemValue: value,
        },
      ];
      updateWorkingDiagnosisData(patientId, data);
    }
  };

  return (
    <>
      <Text className="bg-pp-bg-table-label mb-2 px-2 py-1 font-bold">
        Favorites
      </Text>
      <SearchFavorite />
      {loadingFavouriteDiagnosis && <LoadingPlaceholder className="mt-5" />}
      <Table.Root>
        <Table.Body className="align-middle">
          {favouriteDiagnosisData.map((item, index) => {
            return (
              <Table.Row key={`${item.id ?? ''}-${index}`} >
                <Table.Cell className="border-pp-table-border cursor-pointer h-5 border-b px-1 py-0.5 truncate max-w-[280px]"
                  onClick={() => handleValueChange(item.description)}
                >
                  <Text className="text-[11px]" >{item.description}</Text>
                </Table.Cell>

                <Table.Cell className="border-pp-table-border h-5 border-b px-0 py-0.5 text-right ">
                  <StarIcon
                    stroke="#A0B6DC"
                    fill="#A0B6DC"
                    height="15"
                    cursor="pointer"
                    width="15"
                    onClick={() => item.id && unmarkDiagnosisFavorites(item.icd10Code, item.id)}
                  />
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table.Root>
    </>
  )
}

export { FavoriteView }
