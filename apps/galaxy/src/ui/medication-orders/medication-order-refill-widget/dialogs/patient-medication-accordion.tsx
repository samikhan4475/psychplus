'use client'

import { useState } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { TriangleDownIcon } from '@radix-ui/react-icons'
import { Box, Flex, Grid, ScrollArea, Text } from '@radix-ui/themes'
import { Pencil, TriangleAlert } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { DrugInfo } from '@/types'
import { PatientMedicationForm } from './patient-medicaiton-form'
import { PatientSelect } from './patient-select'
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
    const deaCode = newDrug?.representativeErxPackagedDrug?.federalDeaClassCode
    const isControlledSubstance = ['2', '3', '4', '5'].includes(deaCode)
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
      deaSchedule: deaCode,
      isControlledSubstance,
    }

    form.setValue('drugList', updated)
    setEditIndex(null)
  }
  return (
    <Grid columns="1" gap="2">
      <Flex direction="column" gap="1" flexGrow="1">
        <PatientSelect />
        <ScrollArea
          scrollbars="vertical"
          className="max-h-[70dvh] overflow-visible pr-2"
        >
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
                          setEditIndex((prev) =>
                            prev === index ? null : index,
                          )
                          setOpenItem(item.drugDescription ?? '')
                        }}
                        className="cursor-pointer"
                      >
                        <Pencil size={14} />
                      </Box>
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
                  {item.isControlledSubstance && (
                    <Flex
                      className="bg-pp-warning-bg-1 border-pp-warning-border mb-1 rounded-2 border p-1 px-2"
                      align="start"
                      gap="3"
                    >
                      <TriangleAlert
                        className="min-w-6 text-pp-warning-border"
                        size={24}
                      />
                      <Text size="1" weight="regular">
                        This medication is classified as a controlled substance
                        and may pose a risk of dependency or misuse. Advanced
                        provider verification is required before prescribing or
                        dispensing.
                      </Text>
                    </Flex>
                  )}

                  <PatientMedicationForm index={index} />
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </ScrollArea>
      </Flex>
    </Grid>
  )
}

export { PatientPrescriptionAccordian }
