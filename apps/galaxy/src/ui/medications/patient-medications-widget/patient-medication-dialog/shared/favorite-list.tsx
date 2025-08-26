'use client'

import React, { useEffect } from 'react'
import { Flex, ScrollArea, Table, Text } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { useStore } from '../../store'
import { FavoriteIcon } from './favorite-icon'
import { PatientMedicationSchemaType } from '../patient-medication-form'
import { useFormContext } from 'react-hook-form'
import { FavoriteMedicationPayload } from '../../types'

interface FavoriteListProps {
  isSearching: boolean
  setIsSearching: (isSearching: boolean) => void
}

const FavoriteList = ({ isSearching, setIsSearching }: FavoriteListProps) => {
  const {
    loadingFavorites,
    favoritesData,
    fetchFavoriteMedications,
    favoritesLoaded,
  } = useStore((state) => ({
    loadingFavorites: state.loadingFavorites,
    favoritesData: state.favoritesData,
    favoritesLoaded: state.favoritesLoaded,
    fetchFavoriteMedications: state.fetchFavoriteMedications,
  }))

  const form = useFormContext<PatientMedicationSchemaType>()
  const drugs = form.watch('drugs')

  const todayDate = new Date().toISOString().split('T')[0]
  const currentTime = new Date().toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  })

  useEffect(() => {
    if (!favoritesLoaded && !isSearching) {
      fetchFavoriteMedications()
    }
  }, [favoritesLoaded, isSearching, fetchFavoriteMedications])

  const handleRowClick = (medication: FavoriteMedicationPayload) => {
    const defaultValues: PatientMedicationSchemaType['drugs'][number] = {
      doseStrength: medication.drugStrength || medication.doseStrength || '',
      prescribableDrugDesc: medication.prescribableDrugDesc || medication.medicationName || '',
      startDateTime: todayDate,
      startTime: currentTime,
      effectiveDate: todayDate,
      doseRouteCode: '',
      refills: '0',
      doseUnitCode: '',
      doseFormCode: medication.doseFormCode || '',
      duration: '',
      durationUnitCode: '',
      rxNormCode: Number(medication.rxNormCode),
      doseFrequencyCode: '',
      prescribingStaffId: '',
      supervisorStaffId: '',
      quantityValue: '',
      endDateTime: '',
      endTime: '',
      sigDescription: '',
      drugCode: medication.drugCode || '',
      medicationStatus: 'Active',
    }

    const exists = drugs.some(
      (item) => item.prescribableDrugDesc === (medication.prescribableDrugDesc || medication.medicationName)
    )

    if (!exists) {
      form.setValue('drugs', [...drugs, defaultValues])
    }
  }

  if (loadingFavorites) {
    return (
      <Flex className="absolute inset-0 w-full items-center justify-center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <>
      {(!favoritesData || favoritesData.length === 0) ? (
        <Flex justify="center" align="center" className="h-full">
          <Text size="2" color="gray">
            No favorites found
          </Text>
        </Flex>
      ) : (
        <ScrollArea className="max-h-[300px]">
          <Table.Root>
            <Table.Body>
              {favoritesData.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell
                    onClick={() => handleRowClick(item)}
                    className="border-pp-table-border h-5 w-full cursor-pointer truncate border-b px-2 py-1"
                  >
                    <Text className="truncate text-[12px] font-medium">
                      {item.medicationName || 'No Name Provided'}
                    </Text>
                  </Table.Cell>
                  <Table.Cell className="border-pp-table-border h-5 border-b px-2 py-1 text-right">
                    <FavoriteIcon
                      itemData={{
                        ...item,
                        medicationName: item.medicationName || '',
                      }}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </ScrollArea>
      )}
    </>
  )
}

export { FavoriteList }