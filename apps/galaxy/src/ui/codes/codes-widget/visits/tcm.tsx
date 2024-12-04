import { useEffect, useState } from 'react'
import { CptCodeKeys } from '@/types'
import { AddonsTable, ModifierTable, PrimaryCodeTable } from '../blocks'
import { useFormValues } from '../hooks'
import { VisitProps } from '../types'

const Tcm = ({
  cptAddOnsCodes,
  cptPrimaryCodes,
  appointment,
  patientId,
}: VisitProps) => {
  const { isCptCodeExist } = useFormValues()

  const [isDisabled, setIsDisabled] = useState(true)
  const disabledCodes = ['99204', '99205', '99214' , '99215']
  useEffect(() => {
    for (const code of disabledCodes) {
      if (isCptCodeExist(CptCodeKeys.PRIMARY_CODE_KEY, code)) {
        setIsDisabled(false);
        return; 
      }
    }
  }, [appointment, patientId]);
  
  return (
    <>
      <PrimaryCodeTable codes={cptPrimaryCodes} isDisabled={isDisabled}/>
      <ModifierTable codes={cptmodifierCodes} isDisabled />
      <AddonsTable codes={cptAddOnsCodes} isDisabled />
    </>
  )
}
const cptmodifierCodes = [
  { label: '', value: '25' },
  { label: '', value: '59' },
  { label: '', value: '95' },
]
export { Tcm }
