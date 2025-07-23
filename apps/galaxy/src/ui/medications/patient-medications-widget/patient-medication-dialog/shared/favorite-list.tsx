'use client'

import React, { useEffect } from 'react'
import { Flex, ScrollArea, Table, Text } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { useStore } from '../../store'
import { FavoriteIcon } from './favorite-icon'
import { PatientMedicationSchemaType } from '../patient-medication-form'
import { useFormContext } from 'react-hook-form'
import { FavoriteMedicationPayload } from '../../types'

const FavoriteList = () => {
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

  useEffect(() => {
    if (!favoritesLoaded) {
      fetchFavoriteMedications()
    }
  }, [favoritesLoaded, fetchFavoriteMedications])

  const form = useFormContext<PatientMedicationSchemaType>()
  const drugs = form.watch('drugs')
  const todayDate = new Date().toISOString().split('T')[0]
  const currentTime = new Date().toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  })

  const handleRowClick = (medication: FavoriteMedicationPayload) => {
    const defaultValues: PatientMedicationSchemaType['drugs'][number] = {
      doseStrength: medication?.drugStrength || medication?.doseStrength || '',
      prescribableDrugDesc: medication.prescribableDrugDesc || medication.medicationName || '',
      startDateTime: todayDate,
      startTime: currentTime,
      effectiveDate:'',
      doseRouteCode: '',
      refills: '0',
      doseUnitCode: medication.doseUnitCode || '',
      doseFormCode: medication.doseFormCode || '',
      duration: '',
      durationUnitCode: '',
      rxNormCode: Number(medication.rxNormCode),
      doseFrequencyCode: '',
      prescribingStaffId: '',
      quantityValue: '',
      endDateTime: '',
      endTime: '',
      sigDescription: '',
      drugCode: medication.drugCode || '',
      medicationStatus: 'Active',
    }

    const existingMedication = drugs.some(
      (item) => item.prescribableDrugDesc === medication.medicationName
    )

    if (!existingMedication) {
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

  if (!favoritesData || favoritesData.length === 0) {
    return (
      <Flex justify="center" align="center" className="h-full">
        <Text size="2" color="gray">
          No favorites found
        </Text>
      </Flex>
    )
  }

  return (
    <ScrollArea className="max-h-[300px]">
      <Table.Root>
        <Table.Body className="align-middle">
          {favoritesData.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell onClick={() => handleRowClick(item)} className="border-pp-table-border h-5 w-full cursor-pointer truncate border-b px-2 py-1">
                <Text className="truncate text-[12px] font-medium">
                  {item.medicationName ?? 'No Name Provided'}
                </Text>
              </Table.Cell>
              <Table.Cell className="border-pp-table-border h-5 border-b px-2 py-1 text-right">
                <FavoriteIcon
                  itemData={{
                    ...item,
                    medicationName: item.medicationName ?? '',
                  }}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </ScrollArea>
  )
}

export { FavoriteList }
