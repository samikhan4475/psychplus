import { Flex, Text } from '@radix-ui/themes'
import { getQuicknoteSections } from '@/api'
import { AddOnWidget } from '@/ui/add-on/add-on-widget/add-on-widget'
import { transformIn } from '@/ui/add-on/add-on-widget/data'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'

interface PatientAllergiesPageProps {
  params: {
    id: string
  }
}

const PatientAllergiesPage = async ({ params }: PatientAllergiesPageProps) => {
  const response = await getQuicknoteSections({
    patientId: Number(params.id),
    sectionName: [QuickNoteSectionName.Addon],
  })

  if (response.state === 'error') {
    return <Text>Add On Fail: {response.error}</Text>
  }

  const initialValue = transformIn(response.data ?? [])

  return (
    <Flex direction="column" width="100%">
      <AddOnWidget patientId={params.id} initialValue={initialValue} />
    </Flex>
  )
}

export default PatientAllergiesPage
