'use client'

import { useMemo, useState } from 'react'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { DatePickerInput, SelectInput } from '@/components'
import { FormFieldError, FormFieldLabel } from '@/components/form'
import { useHasPermission } from '@/hooks'
import { PermissionAlert } from '@/ui/schedule/shared'
import { generateTimeIntervals } from '@/ui/visit/add-visit/util'
import { EDIT_DATE_TIME_OF_ADMISSION } from '@/ui/visit/constants'
import { SchemaType } from '../../schema'

const DateTimeOfAdmission = ({
  isPsychiatristVisitTypeSequence,
}: {
  isPsychiatristVisitTypeSequence?: boolean
}) => {
  const form = useFormContext<SchemaType>()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const timeSlots = useMemo(() => generateTimeIntervals(), [])
  const canEditAdmissionDateTime = useHasPermission('editAdmitDateTime')

  const options = timeSlots.map((v) => ({
    value: v.value,
    label: v.label,
  }))

  return (
    <Box className="flex-1">
      <PermissionAlert
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        message={EDIT_DATE_TIME_OF_ADMISSION}
      />
      <Flex className="flex-1 gap-[2px]" direction={'column'}>
        <FormFieldLabel required>Date/Time of Admission</FormFieldLabel>
        <Box className="appointment-date-time">
          <Grid columns="12" className="gap-3">
            <Box className="col-span-6">
              <DatePickerInput
                field="dateOfAdmission"
                isDisabled={isPsychiatristVisitTypeSequence}
                dateInputClass="h-6 w-full"
                onChange={(value) => {
                  if (canEditAdmissionDateTime) {
                    form.setValue('dateOfAdmission', value)
                    return
                  }
                  setIsOpen(true)
                }}
              />
              <FormFieldError name="dateOfAdmission" />
            </Box>
            <Box className="col-span-6">
              <SelectInput
                field="timeOfAdmission"
                options={options}
                disabled={isPsychiatristVisitTypeSequence}
                buttonClassName="h-6 w-full"
                onValueChange={(value) => {
                  if (canEditAdmissionDateTime) {
                    form.setValue('timeOfAdmission', value, {
                      shouldDirty: true,
                    })
                    return
                  }
                  setIsOpen(true)
                }}
              />
              <FormFieldError name="timeOfAdmission" />
            </Box>
          </Grid>
        </Box>
      </Flex>
    </Box>
  )
}

export { DateTimeOfAdmission }
