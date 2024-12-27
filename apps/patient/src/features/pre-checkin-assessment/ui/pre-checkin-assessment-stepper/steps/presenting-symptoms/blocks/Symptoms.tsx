import React from 'react'
import AnxietyBlock from './anxiety-block'
import BpdBlock from './bpd-block'
import DepressionBlock from './depression-block'
import ManiaBlock from './mania-block'
import ObsessionBlock from './obsession-block'
import PtsdBlock from './ptsd-block'
import SchizophreniaBlock from './schizophrenia-block'
import SubstanceBlock from './substance-block'
import InattentiveBlock from './inattentive-block'
import HyperactiveBlock from './hyperactive-block'
import DementiaBlock from './dementia-block'
import MedicationsBlock from './medications-block'

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
      <InattentiveBlock />
      <HyperactiveBlock />
      <DementiaBlock />
      <SchizophreniaBlock />
      <MedicationsBlock />
    </>
  )
}

export default Symptoms
