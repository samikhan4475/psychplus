import { useParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel, TextAreaInput } from '@/components'
import { PatientReferralsWidget } from '@/ui/referrals'
import { SpravatoWidgetSchemaType } from '../../spravato-widget-schema'

const ReferralBlock = () => {
  const { id } = useParams<{ id: string }>()
  const form = useFormContext<SpravatoWidgetSchemaType>()

  const plan = form.watch('plan')

  return (
    plan.includes('Referral') && (
      <Flex
        className="mt-2 gap-2 rounded-3 border border-gray-7 p-2"
        direction="column"
      >
        <BlockLabel className="text-2 font-[600px]">Referral Description</BlockLabel>
        <TextAreaInput field="referral" className="w-[80%]" />
        <PatientReferralsWidget patientId={id} />
      </Flex>
    )
  )
}

export { ReferralBlock }
