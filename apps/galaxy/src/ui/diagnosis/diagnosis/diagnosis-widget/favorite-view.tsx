import { Table, Text } from '@radix-ui/themes'
import { StarIcon } from 'lucide-react'
import { LoadingPlaceholder } from '@/components'
import { FavouriteDiagnosisData } from '@/types'
import { useStore } from '../../store'
import { SearchFavorite } from './search-favorite'

const FavoriteView = () => {
  const {
    favouriteDiagnosisData,
    loadingFavouriteDiagnosis,
    workingDiagnosisData,
    updateWorkingDiagnosisData,
    markDiagnosisFavorites,
  } = useStore()

  const handleValueChange = async (favorite: FavouriteDiagnosisData) => {
    const isValueAlreadyExist = workingDiagnosisData.some(
      (item) => item.code === favorite.icd10Code,
    )
    if (isValueAlreadyExist) return

    const data = [
      ...workingDiagnosisData,
      {
        code: favorite.icd10Code,
        description: favorite.description,
        isFavorite: false,
        isActive: true,
      },
    ]
    updateWorkingDiagnosisData(data)
  }

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
              <Table.Row key={`${item.id ?? ''}-${index}`}>
                <Table.Cell
                  className="border-pp-table-border h-5 max-w-[280px] cursor-pointer truncate border-b px-1 py-0.5"
                  onClick={() => handleValueChange(item)}
                >
                  <Text className="text-[11px]">{item.description}</Text>
                </Table.Cell>

                <Table.Cell className="border-pp-table-border h-5 border-b px-0 py-0.5 text-right ">
                  <StarIcon
                    stroke="#A0B6DC"
                    fill="#A0B6DC"
                    height="15"
                    cursor="pointer"
                    width="15"
                    onClick={() =>
                      item.id &&
                      markDiagnosisFavorites(item, item.icd10Code, false)
                    }
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
