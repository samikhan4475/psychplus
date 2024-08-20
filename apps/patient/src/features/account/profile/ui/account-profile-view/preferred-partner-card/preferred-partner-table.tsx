'use client'

import React from 'react'
import { PreferredPartner } from '@psychplus-v2/types'
import { cn, getSlashedDateString } from '@psychplus-v2/utils'
import { Flex, Table, Text } from '@radix-ui/themes'
import { EmptyFileIcon, FeatureEmpty } from '@/components-v2'
import { AccountProfileAccordion } from '@/features/account/profile/ui/account-profile-view/account-profile-accordion.tsx'

interface Props {
  data: PreferredPartner[]
  headerClassName?: string
}

const PreferredPartnerTable = ({ data, headerClassName }: Props) => {
  return (
    <AccountProfileAccordion
      title="Preferred Partner"
      editable={false}
      content={() => renderPreferredPartnerTableClient(data, headerClassName)}
    />
  )
}

const renderPreferredPartnerTableClient = (
  data: PreferredPartner[],
  headerClassName: string | undefined,
) => (
  <PreferredPartnerTableClient data={data} headerClassName={headerClassName} />
)

const PreferredPartnerTableClient = ({ data, headerClassName }: Props) => {
  return (
    <Table.Root variant="ghost" size="2" className="w-full">
      <Table.Header className={cn('bg-[#F0F4FF]', headerClassName)}>
        <Table.Row>
          <ColumnHeader>PP ID</ColumnHeader>
          <ColumnHeader>PP Name</ColumnHeader>
          <ColumnHeader>PP Premium Status</ColumnHeader>
          <ColumnHeader>PP Payer Status</ColumnHeader>
          <ColumnHeader>PP User ID</ColumnHeader>
          <ColumnHeader>PP User Type</ColumnHeader>
          <ColumnHeader>Users in ID</ColumnHeader>
          <ColumnHeader>PP User Status</ColumnHeader>
          <ColumnHeader>Start Date</ColumnHeader>
          <ColumnHeader>Term Date</ColumnHeader>
          <ColumnHeader>Priority</ColumnHeader>
        </Table.Row>
      </Table.Header>

      <Table.Body className="border-[#D9E2FC]; border-b border-solid">
        {data.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={11}>
              <FeatureEmpty
                description="No preffered parner added yet"
                Icon={EmptyFileIcon}
              />
            </Table.Cell>
          </Table.Row>
        )}

        {data.map((row) => (
          <Table.Row key={row.id}>
            <TableCell text={row.id} />
            <TableCell text={row.name} />
            <TableCell text={row.subscriptionStatus} />
            <TableCell text={row.payerStatus} />
            <TableCell text={row.userNumber} />
            <TableCell text={row.userType} />
            <TableCell text={row.totalIds} />
            <TableCell text={row.userStatus} />
            <TableCell text={getSlashedDateString(row.addDate)} />
            <TableCell text={getSlashedDateString(row.termDate)} />
            <TableCell text={row.isPrimaryPartner ? 'Primary' : 'Secondary'} />
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

const ColumnHeader = ({ children }: { children: React.ReactNode }) => (
  <Table.ColumnHeaderCell className="h-auto overflow-hidden text-ellipsis whitespace-nowrap border border-[#D9E2FC] py-2 text-[12px] font-medium">
    {children}
  </Table.ColumnHeaderCell>
)

const TableCell = ({ text }: { text: string | number | undefined }) => (
  <Table.Cell className="border border-solid border-[#D9E2FC]">
    <Flex
      height="100%"
      align="center"
      justify="start"
      className="overflow-hidden text-ellipsis whitespace-nowrap"
    >
      <Text className="text-[14px]">{text}</Text>
    </Flex>
  </Table.Cell>
)

export { PreferredPartnerTable }
