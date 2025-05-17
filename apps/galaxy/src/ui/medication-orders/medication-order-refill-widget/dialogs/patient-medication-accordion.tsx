'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { TriangleDownIcon } from '@radix-ui/react-icons'
import { Box, Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { DeleteIcon } from '@/components/icons'
import { FavoriteIcon } from '@/ui/medications/patient-medications-widget/patient-medication-dialog/shared/favorite-icon'
import { PatientMedicationForm } from './patient-medicaiton-form'
import { UpdateMedicationSchema } from './schema'

const PatientPrescriptionAccordian = () => {
  const form = useFormContext<UpdateMedicationSchema>()
  const drugs = form.watch('drugList') ?? []

  return (
    <Accordion.Root type="single" collapsible className="mt-1">
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
                <Box>
                  <DeleteIcon />
                </Box>
                <FavoriteIcon name={`drugs-${item?.drugDescription}`} />
              </Flex>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="p-1">
            <PatientMedicationForm index={index} />
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}

export { PatientPrescriptionAccordian }
