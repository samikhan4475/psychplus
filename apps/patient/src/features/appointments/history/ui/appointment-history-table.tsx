'use client'

import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  cn,
  formatCurrency,
  getAppointmentTypeLabel,
  getNewProviderTypeLabel,
} from '@psychplus-v2/utils'
import { Flex, Table, Text } from '@radix-ui/themes'
import { ChevronRightIcon } from 'lucide-react'
import {
  Badge,
  CardContainer,
  EmptyFileIcon,
  FeatureEmpty,
  LoadingPlaceholder,
  ProviderAvatar,
} from '@/components-v2'
import { APPOINTMENT_HISTORY_LIMIT } from '../constants'
import { useStore } from '../store'
import AppointmentHistoryTablePagination from './appointment-history-table-pagination'
import AppointmentTime from './appointment-time'

const ColumnHeader = ({ children }: PropsWithChildren) => (
  <Table.ColumnHeaderCell className="h-auto py-2 font-medium last:border-r-0">
    {children}
  </Table.ColumnHeaderCell>
)

const AppointmentHistoryTable = () => {
  const { data, page: currentPage, fetchAppointments, loading } = useStore()

  function getCoPayStatus({
    coPayPaid,
    coPayDue,
  }: {
    coPayPaid: number
    coPayDue: number
  }) {
    const isZero = coPayPaid === 0 && coPayDue === 0
    const isPaid = coPayPaid === coPayDue && !isZero
    return isPaid
  }

  useEffect(() => {
    fetchAppointments(APPOINTMENT_HISTORY_LIMIT, currentPage)
  }, [currentPage])

  if (loading) {
    return (
      <CardContainer>
        <LoadingPlaceholder />
      </CardContainer>
    )
  }
  return (
    <>
      <Table.Root variant="surface" size="1" className="w-full">
        <Table.Header className={cn('bg-pp-blue-5')}>
          <Table.Row className="whitespace-nowrap">
            <ColumnHeader>Doctor Name</ColumnHeader>
            <ColumnHeader>Visit Medium</ColumnHeader>
            <ColumnHeader>Visit Status</ColumnHeader>
            <ColumnHeader>Copay</ColumnHeader>
            <ColumnHeader>Payment Mode</ColumnHeader>
            <ColumnHeader>Actions</ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={6}>
                <FeatureEmpty
                  description="No History yet"
                  Icon={EmptyFileIcon}
                />
              </Table.Cell>
            </Table.Row>
          ) : (
            data.map((row) => (
              <Table.Row key={row.id} className="whitespace-nowrap">
                <Table.Cell>
                  <Flex align="center" gap={'2'}>
                    <ProviderAvatar provider={row.specialist} size="3" />
                    <Flex direction={'column'} gap={'1'}>
                      <Text className="text-[14px] font-medium">
                        {row.specialist.legalName.firstName}{' '}
                        {row.specialist.legalName.lastName},{' '}
                        {row.specialist.legalName.honors}
                      </Text>
                      <Text className="text-pp-gray-1 text-[11px] font-medium">
                        {getNewProviderTypeLabel(
                          row.providerType,
                        ).toLocaleUpperCase()}
                      </Text>
                    </Flex>
                  </Flex>
                </Table.Cell>
                <Table.Cell>
                  <Flex gap={'1'} direction={'column'}>
                    <Text className="text-[14px] font-regular">
                      {row?.visitType}
                    </Text>
                    <AppointmentTime startDate={row.startDate} />
                  </Flex>
                </Table.Cell>
                <Table.Cell>
                  <Flex
                    className="w-min"
                    align="center"
                    justify={'center'}
                    direction={'column'}
                  >
                    <Badge
                      label={
                        row.status === 'CheckedOut' ? 'COMPLETED' : 'CANCELLED'
                      }
                      type={row.status === 'CheckedOut' ? 'success' : 'danger'}
                      className="text-[11px]"
                    />
                  </Flex>
                </Table.Cell>
                <Table.Cell>
                  <Flex gap={'1'} direction={'column'}>
                    <Text className="text-[14px] font-regular">
                      <Text className="text-[14px] font-regular">
                        <Text className="text-[14px] font-regular">
                          {getCoPayStatus({
                            coPayPaid: row?.coPayPaid ?? 0,
                            coPayDue: row?.coPayDue ?? 0,
                          })
                            ? 'Paid'
                            : 'Pending'}
                        </Text>
                      </Text>
                    </Text>
                    <Text className="text-pp-gray-1 text-[11px] font-medium">
                      {getCoPayStatus({
                        coPayPaid: row?.coPayPaid ?? 0,
                        coPayDue: row?.coPayDue ?? 0,
                      })
                        ? formatCurrency(row?.coPayPaid ?? 0)
                        : formatCurrency(row?.coPayDue ?? 0)}
                    </Text>
                  </Flex>
                </Table.Cell>
                <Table.Cell>
                  <Flex gap={'1'} direction={'column'}>
                    <Text className="text-[14px] font-regular">
                      {row.isSelfPay ? 'Self Pay' : 'Insurance'}
                    </Text>
                  </Flex>
                </Table.Cell>
                <Table.Cell>
                  <Link
                    className="flex items-center gap-1"
                    href={
                      row.status === 'CheckedOut'
                        ? `/appointments/avs/${row.id}`
                        : '#'
                    }
                  >
                    <Text
                      className={cn(
                        'whitespace-nowrap text-[14px] font-medium',
                        row.status !== 'CheckedOut' &&
                          'cursor-not-allowed opacity-50',
                      )}
                    >
                      After Visit Summary{' '}
                    </Text>
                    <ChevronRightIcon
                      height="16"
                      width="16"
                      className="text-pp-gray-1"
                    />
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table.Root>
      <AppointmentHistoryTablePagination />
    </>
  )
}

export default AppointmentHistoryTable
