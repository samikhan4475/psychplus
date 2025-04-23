'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { YesNoSelect } from '@/components'
import { MedicationType } from '../../types'
import { SelectedIndicator } from '../shared'
import { PreferredPrescriberSelect } from './preferred-prescriber-select'
import { PrescribedVia } from './prescribed-via'
import { PatientMedicationSchemaType } from './schema'

const TogglePrescribed = () => {
  const form = useFormContext<PatientMedicationSchemaType>()
  const medicationType = form.watch('medicationType')

  return (
    <Flex align="center" direction="row">
      <YesNoSelect
        field='medicationType'
        options={[{ label: 'Prescribe', value: MedicationType.Prescribed }]}
        onChange={(value) => form.setValue('medicationType', value as MedicationType)}
        defaultValue={MedicationType.Prescribed}
        resetOnSameValue
      />

      {medicationType === MedicationType.Prescribed && (
        <>
          <SelectedIndicator />
          <Flex
            align="start"
            className="border-pp-focus-outline  rounded-md h-auto flex-1 gap-2 border-2 p-2"
          >
            <PrescribedVia />
            <PreferredPrescriberSelect />
          </Flex>
        </>
      )}

      <Flex className="pl-1">
        <YesNoSelect
          field='medicationType'
          options={[{ label: 'Home', value: MedicationType.Home }]}
          onChange={(value) => {
            form.setValue('medicationType', value as MedicationType)
            form.setValue('prescribedStatus', '')
            form.setValue('pharmacyNcpdpId', '')
          }}
          defaultValue={MedicationType.Home}
          resetOnSameValue
        />
      </Flex>
    </Flex>
  )
}

export { TogglePrescribed }
