import { Table, Text } from '@radix-ui/themes'
import { StarIcon } from 'lucide-react'
import { Favorites_Data } from '../constants'
import { SearchFavorite } from './search-favorite'

const FavoriteView = () => {
  return (
    <>
      <Text className="bg-pp-bg-table-label mb-2 px-2 py-1 font-bold">
        Favorites
      </Text>
      <SearchFavorite />
      <Table.Root>
        <Table.Body className="align-middle">
          {Favorites_Data.map((item, index) => (
            <Table.Row key={item.id + index}>
              <Table.Cell className="border-pp-table-border h-5 border-b px-1 py-0.5">
                <Text>{item.text}</Text>
              </Table.Cell>

              <Table.Cell className="border-pp-table-border h-5 border-b px-1 py-0.5">
                <StarIcon stroke="#A0B6DC" fill="#A0B6DC" />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  )
}

export { FavoriteView }
