import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Flex, Text } from '@radix-ui/themes'
import { getPatientReferralsAction } from '@/actions'
import { PatientReferral } from '@/types'
import { SpravatoWidgetSchemaType } from '@/ui/procedures/spravato-tab/spravato-widget-schema'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { Details } from '../../referrals/details'
import { getDefaultPayload } from '../../referrals/utils'

const Referral = ({ data }: { data: SpravatoWidgetSchemaType }) => {
  const plan = data['plan' as keyof SpravatoWidgetSchemaType] as string[]
  const referral = data['referral' as keyof SpravatoWidgetSchemaType] as string
  const patientId = useParams().id as string
  const [referalsList, setReferalsList] = useState<PatientReferral[]>([])
  useEffect(() => {
    const getReferals = async () => {
      const result = await getPatientReferralsAction({
        patientIds: [patientId],
        tags: [QuickNoteSectionName.QuicknoteSectionReferrals],
        payload: getDefaultPayload(),
      })
      if (result.state !== 'error') {
        setReferalsList(result?.data?.referrals)
      }
    }
    getReferals()
  }, [])

  return (
    plan.includes('Referral') && (
      <Flex direction="column" gap="1">
        <Text className="text-2 font-medium">Referral Description</Text>
        <Text className="text-pp-gray-1 text-1 font-regular">{referral}</Text>
        <Details data={referalsList} />
      </Flex>
    )
  )
}

export { Referral }
