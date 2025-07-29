'use client'

import { useEffect, useState } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { TriangleDownIcon } from '@radix-ui/react-icons'
import { Box, Flex, Text } from '@radix-ui/themes'
import { InfoIcon, PencilIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { DeleteIcon } from '@/components/icons'
import { DrugInfo } from '@/types'
import { SearchDrugs } from '../shared'
import { FavoriteIcon } from '../shared/favorite-icon'
import { PrescriptionAccordianContent } from './prescription-accordian-content'
import { PatientMedicationSchemaType } from './schema'

const PrescriptionAccordian = ({
  errorIndex,
}: {
  errorIndex: number | null
}) => {
  const form = useFormContext<PatientMedicationSchemaType>()
  const drugs = form.watch('drugs')
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [openItem, setOpenItem] = useState(
    drugs[0]?.prescribableDrugDesc ?? null,
  )

  useEffect(() => {
    if (errorIndex !== null && drugs[errorIndex]?.prescribableDrugDesc) {
      setOpenItem(drugs[errorIndex]?.prescribableDrugDesc)
    }
  }, [errorIndex, drugs])

  const [prevLength, setPrevLength] = useState(drugs.length)

  useEffect(() => {
    if (drugs.length > prevLength) {
      const lastDrug = drugs[drugs.length - 1]
      if (lastDrug?.prescribableDrugDesc) {
        setOpenItem(lastDrug.prescribableDrugDesc)
      }
    }

    setPrevLength(drugs.length)
  }, [drugs])

  const handleDelete = (drugName?: string) => (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!drugName) return
    const updatedDrugs = drugs.filter(
      (drug) => drug.prescribableDrugDesc !== drugName,
    )
    form.setValue('drugs', updatedDrugs)
  }
  const handleReplace = (newDrug: DrugInfo) => {
    if (editIndex === null) return

    const todayDate = new Date().toISOString().split('T')[0]
    const currentTime = new Date().toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    })

    const updated = [...drugs]

    updated[editIndex] = {
      ...updated[editIndex],
      doseStrength: newDrug.medStrength,
      prescribableDrugDesc: newDrug.prescribableDrugDesc,
      startDateTime: todayDate,
      startTime: currentTime,
      effectiveDate: '',
      doseRouteCode: '',
      refills: '0',
      doseUnitCode: newDrug.medStrengthUnit,
      doseFormCode: '',
      duration: '',
      durationUnitCode: '',
      rxNormCode: Number(newDrug.rxCui),
      doseFrequencyCode: '',
      prescribingStaffId: '',
      quantityValue: '',
      endDateTime: '',
      endTime: '',
      sigDescription: '',
      drugCode: newDrug?.representativeErxPackagedDrug?.packagedDrugId ?? '',
      DeaSchedule:
        newDrug?.representativeErxPackagedDrug?.federalDeaClassCode ?? '',
      medicationStatus: 'Active',
    }

    form.setValue('drugs', updated)
    setEditIndex(null)
  }
  return (
    <Accordion.Root
      type="single"
      collapsible
      className="mt-1"
      value={openItem ?? undefined}
      onValueChange={(value) => setOpenItem(value)}
    >
      {drugs.map((item, index) => (
        <Accordion.Item
          key={`drugs-${item.prescribableDrugDesc}`}
          value={item.prescribableDrugDesc ?? ''}
          className="border-pp-table-border mt-1 w-full rounded-2 border p-1"
        >
          <Accordion.Header>
            <Flex className="border-b-pp-table-border relative w-full items-center justify-between  py-1 text-left">
              <Accordion.Trigger className="flex w-full cursor-pointer items-center justify-between px-2 py-1 text-left">
                <Flex gap="1">
                  <TriangleDownIcon />
                  {item.isControlledSubstance && (
                    <Box className="flex items-center gap-2">
                      <InfoIcon
                        className={`h-4 w-4 ${
                          item.isControlledSubstance ? 'text-orange-6' : ''
                        }`}
                      />
                    </Box>
                  )}
                  <Text
                    className={`${
                      item.isControlledSubstance ? 'text-orange-6' : ''
                    }`}
                    size="1"
                    weight="bold"
                  >
                    {item.prescribableDrugDesc ?? 'No Description Found'}
                  </Text>
                </Flex>

                <Flex gap="1">
                  <Box
                    onClick={(e) => {
                      e.stopPropagation()
                      setEditIndex((prev) => (prev === index ? null : index))
                      setOpenItem(item.prescribableDrugDesc ?? '')
                    }}
                    className="cursor-pointer"
                  >
                    <PencilIcon width={20} height={18} />
                  </Box>

                  <Box onClick={handleDelete(item.prescribableDrugDesc)}>
                    <DeleteIcon />
                  </Box>
                  <Box onClick={(e) => e.stopPropagation()} className="ml-2">
                    <FavoriteIcon
                      itemData={{
                        ...item,
                        medicationName: item.prescribableDrugDesc ?? '',
                      }}
                    />
                  </Box>
                </Flex>
              </Accordion.Trigger>
            </Flex>
          </Accordion.Header>
          <Accordion.Content className="p-1">
            {editIndex === index && (
              <SearchDrugs onSelect={handleReplace} replaceIndex={index} />
            )}
            <PrescriptionAccordianContent index={index} />
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}

export { PrescriptionAccordian }
