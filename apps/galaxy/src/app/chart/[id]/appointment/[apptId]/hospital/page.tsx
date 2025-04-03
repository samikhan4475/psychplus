import { Text } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { HospitalView } from '@/ui/hospital'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'

interface QuestionnairesPageProps {
  params: {
    id: string
  }
}

const HospitalInfoPage = async ({ params }: QuestionnairesPageProps) => {
  const [hospitalInitialResponse, hospitalDischargeResponse] =
    await Promise.all([
      getQuickNoteDetailAction(params.id, [
        QuickNoteSectionName.QuickNoteSectionHospitalInitial,
      ]),

      getQuickNoteDetailAction(params.id, [
        QuickNoteSectionName.QuicknoteSectionHospitalDischarge,
      ]),
    ])

  if (hospitalInitialResponse.state === 'error')
    return <Text>{hospitalInitialResponse.error}</Text>

  if (hospitalDischargeResponse.state === 'error')
    return <Text>{hospitalDischargeResponse.error}</Text>

  return (
    <HospitalView
      patientId={params.id}
      hospitalInitialData={hospitalInitialResponse.data}
      hospitalDischargeData={hospitalDischargeResponse.data}
    />
  )
}

export default HospitalInfoPage
