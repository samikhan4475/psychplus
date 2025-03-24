'use client'

import React from 'react'
import AdhdHyperactiveBlock from './adhd-hyperactive-block'
import AdhdInattentiveBlock from './adhd-inattentive-block'
import AnxietyBlock from './anxiety-block'
import AutismBlock from './autism-block.tsx'
import BpdBlock from './bpd-block'
import ConductDisorderBlock from './conduct-disorder-block'
import DementiaBlock from './dementia-block'
import DepressionBlock from './depression-block'
import ManiaBlock from './mania-block'
import MedicationsBlock from './medications-block'
import ObsessionBlock from './obsession-block'
import { OtherBlock } from './other-block.tsx'
import PtsdBlock from './ptsd-block'
import SchizophreniaBlock from './schizophrenia-block'
import SubstanceBlock from './substance-block'

const Symptoms = () => {
  return (
    <>
      <DepressionBlock />
      <AnxietyBlock />
      <ManiaBlock />
      <PtsdBlock />
      <ObsessionBlock />
      <BpdBlock />
      <SubstanceBlock />
      <AdhdInattentiveBlock />
      <AdhdHyperactiveBlock />
      <AutismBlock />
      <ConductDisorderBlock />
      <DementiaBlock />
      <SchizophreniaBlock />
      <MedicationsBlock />
      <OtherBlock />
    </>
  )
}

export default Symptoms
