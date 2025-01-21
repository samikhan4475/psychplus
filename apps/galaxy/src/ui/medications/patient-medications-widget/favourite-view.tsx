import { Table, Text } from '@radix-ui/themes'
import { StarIcon } from 'lucide-react'
import { useStore } from '@/ui/diagnosis/store'
import { SearchFavorite } from './search-favourite'

const FavoriteView = () => {
  const handleValueChange = async (value: string) => {
    console.log(value)
  }

  const { favouriteDiagnosisData } = useStore()

  return (
    <>
      <Text className="bg-pp-bg-table-label mb-2 px-2 py-1 font-bold">
        Favorites
      </Text>
      <SearchFavorite />
      <Table.Root>
        <Table.Body className="align-middle">
          {favouriteDiagnosisData.map((item, index) => {
            return (
              <Table.Row key={`${item.id ?? ''}-${index}`}>
                <Table.Cell
                  className="border-pp-table-border h-5 max-w-[280px] cursor-pointer truncate border-b px-1 py-0.5"
                  onClick={() => handleValueChange(item.description)}
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
