'use client'

import { useState } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { TriangleDownIcon } from '@radix-ui/react-icons'
import { Box, Flex, Text } from '@radix-ui/themes'
import { Pencil } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { DeleteIcon } from '@/components/icons'
import { DrugInfo } from '@/types'
import { FavoriteIcon } from '@/ui/medications/patient-medications-widget/patient-medication-dialog/shared/favorite-icon'
import { PatientMedicationForm } from './patient-medicaiton-form'
import { UpdateMedicationSchema } from './schema'
import { SearchableDrug } from './searchable-drug'

const PatientPrescriptionAccordian = () => {
  const form = useFormContext<UpdateMedicationSchema>()
  const drugs = form.watch('drugList') ?? []
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [openItem, setOpenItem] = useState(drugs[0]?.drugDescription ?? null)
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
      drugDescription: newDrug.prescribableDrugDesc,
      startDateTime: todayDate,
      startTime: currentTime,
      doseUnitCode: newDrug.medStrengthUnit,
      rxNormCode: newDrug.rxCui.toString(),
      drugCode: newDrug?.representativeErxPackagedDrug?.packagedDrugId ?? '',
    }

    form.setValue('drugList', updated)
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
          key={`drugs-${item.drugDescription}`}
          value={item.drugDescription ?? ''}
          className="border-pp-table-border mt-1 w-full rounded-2 border p-1"
        >
          <Accordion.Header>
            <Accordion.Trigger className="flex w-full cursor-pointer items-center justify-between px-2 py-1 text-left">
              <Flex gap="2">
                <TriangleDownIcon />
                <Text size="1">
                  {item.drugDescription ?? 'No Description Found'}
                </Text>
              </Flex>
              <Flex gap="1">
                <Box
                  onClick={(e) => {
                    e.stopPropagation()
                    setEditIndex((prev) => (prev === index ? null : index))
                    setOpenItem(item.drugDescription ?? '')
                  }}
                  className="cursor-pointer"
                >
                  <Pencil size={14} />
                </Box>
                <Box>
                  <DeleteIcon />
                </Box>
                <FavoriteIcon name={item?.drugDescription ?? ''} />
              </Flex>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="p-1">
            {editIndex === index && (
              <SearchableDrug
                onSelectItem={handleReplace}
                selectedDrugList={[]}
              />
            )}
            <PatientMedicationForm index={index} />
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}

export { PatientPrescriptionAccordian }