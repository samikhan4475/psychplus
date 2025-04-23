'use client'

import React from 'react'
import { ScrollArea, Table, Text } from '@radix-ui/themes'
import { FavoriteIcon } from './favorite-icon'

const favouriteDiagnosisData = [
  { id: 1, description: 'Hypertension' },
  { id: 2, description: 'Diabetes Mellitus' },
  { id: 3, description: 'Asthma' },
  { id: 4, description: 'Migraine' },
  {
    id: 5,
    description: 'Chronic Kidney Disease ?',
  },
]

const FavoriteList = () => {
  return (
    <ScrollArea className="max-h-[300px]">
      <Table.Root>
        <Table.Body className="align-middle">
          {favouriteDiagnosisData?.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell className="border-pp-table-border h-5 w-full cursor-pointer truncate border-b px-2 py-1">
                <Text className="truncate text-[12px] font-medium">
                  {item.description}
                </Text>
              </Table.Cell>

              <Table.Cell className="border-pp-table-border h-5 border-b px-2 py-1 text-right">
                <FavoriteIcon name="drug" />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </ScrollArea>
  )
}

export { FavoriteList }
