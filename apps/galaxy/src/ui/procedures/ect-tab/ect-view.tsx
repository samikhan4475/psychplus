import React from 'react'
import { FormFieldContainer, StaticLabel } from '@/components'
import {
  AnesthesiologistSelect,
  BiteBlock,
  ComplicationsBlock,
  ContinueEctBlock,
  ECTAssesment,
  EctTypeBlock,
  PostOpMedicationsBlock,
  SeizureDuration,
  SeriesMaintenanceBlock,
  SettingsBlock,
  TimeInputFieldECT,
} from './blocks'

const ECTView = () => {
  return (
    <>
      <SeriesMaintenanceBlock />
      <AnesthesiologistSelect />
      <FormFieldContainer className="flex w-auto flex-row items-center gap-4">
        <TimeInputFieldECT name="timeOut" label="Time Out" />
        <TimeInputFieldECT name="timeOfProcedure" label="Time of Procedure" />
        <BiteBlock />
        <StaticLabel label="Machine Name" value="Mecta" />
      </FormFieldContainer>
      <EctTypeBlock />
      <SettingsBlock />
      <SeizureDuration />
      <PostOpMedicationsBlock />
      <ComplicationsBlock />
      <ECTAssesment />
      <ContinueEctBlock />
    </>
  )
}

export { ECTView }
