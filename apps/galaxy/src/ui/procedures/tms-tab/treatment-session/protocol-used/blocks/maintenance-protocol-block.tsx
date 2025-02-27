import { Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel } from '@/components'
import { ProtocolTitles } from '../../types'
import { TreatmentRegime } from './treatment-regime-block'

const MaintenanceProtocol = () => {
  const form = useFormContext()
  const protocol = form.watch('protocol')

  return (
    <>
      <BlockLabel className="text-2 font-[600]">{protocol}</BlockLabel>
      <Text className="text-pp-black-3 text-1 font-regular">
        Involves periodic sessions following the completion of an initial
        treatment course, spaced out over an extended period of time depending
        on the patient&lsquo;s individual needs and response to treatment.
      </Text>
      <TreatmentRegime name={ProtocolTitles.MaintenanceProtocol} />
    </>
  )
}

export { MaintenanceProtocol }
