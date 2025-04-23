'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { TriangleDownIcon } from '@radix-ui/react-icons'
import { Box, Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { DeleteIcon } from '@/components/icons'
import { FavoriteIcon } from '../shared/favorite-icon'
import { PrescriptionAccordianContent } from './prescription-accordian-content'
import { PatientMedicationSchemaType } from './schema'

const PrescriptionAccordian = () => {
  const form = useFormContext<PatientMedicationSchemaType>()
  const drugs = form.watch('drugs')

  const handleDelete = (drugName?: string) => (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!drugName) return
    const updatedDrugs = drugs.filter(
      (drug) => drug.prescribableDrugDesc !== drugName,
    )
    form.setValue('drugs', updatedDrugs)
  }

  return (
    <Accordion.Root type="single" collapsible className="mt-1">
      {drugs.map((item, index) => (
        <Accordion.Item
          key={`drugs-${item.prescribableDrugDesc}`}
          value={item.prescribableDrugDesc ?? ''}
          className="border-pp-table-border mt-1 w-full rounded-2 border p-1"
        >
          <Accordion.Header>
            <Accordion.Trigger className="flex w-full cursor-pointer items-center justify-between px-2 py-1 text-left">
              <Flex gap="2">
                <TriangleDownIcon />
                <Text size="1">
                  {item.prescribableDrugDesc ?? 'No Description Found'}
                </Text>
              </Flex>
              <Flex gap="1">
                <Box onClick={handleDelete(item.prescribableDrugDesc)}>
                  <DeleteIcon />
                </Box>
                <FavoriteIcon name={`drugs-${item?.prescribableDrugDesc}`} />
              </Flex>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="p-1">
            <PrescriptionAccordianContent index={index} />
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}

export { PrescriptionAccordian }
