'use client'

import { Flex, Grid, ScrollArea } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FavoriteView, SearchDrugs } from '../shared'
import { StepComponentProps } from '../types'
import { PrescriptionAccordian } from './prescription-accordian'
import { PatientMedicationSchemaType } from './schema'
import { TogglePrescribed } from './toggle-prescribed'

const FormFields = ({ onJump }: StepComponentProps) => {
  const form = useFormContext<PatientMedicationSchemaType>()
  const drugErrors = form.formState.errors.drugs || []
  const firstErrorIndex = Array.isArray(drugErrors)
    ? drugErrors.findIndex((err) => err !== undefined)
    : -1
  return (
    <Flex gap="2" justify="between" direction="column" className="relative">
      <Grid columns="2" gap="2">
        <Flex direction="column" gap="1" flexGrow="1">
          <TogglePrescribed />
          <SearchDrugs />
          <ScrollArea
            scrollbars="vertical"
            className="max-h-[52dvh] overflow-visible pr-2"
          >
            <PrescriptionAccordian
              errorIndex={firstErrorIndex !== -1 ? firstErrorIndex : null}
            />
          </ScrollArea>
        </Flex>
        <FavoriteView onJump={onJump} />
      </Grid>
    </Flex>
  )
}

export { FormFields }
