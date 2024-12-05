import { getQuicknoteSections } from '@/api'
import { QuestionnairesView } from '@/ui/questionnaires'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'

interface QuestionnairesPageProps {
  params: {
    id: string
  }
}

const sections = [
  QuickNoteSectionName.QuickNoteSectionDashboard,
  QuickNoteSectionName.QuickNoteSectionPhq9,
  QuickNoteSectionName.QuickNoteSectionGad7,
  QuickNoteSectionName.QuickNoteSectionSnapIV,
  QuickNoteSectionName.QuickNoteSectionDast10,
  QuickNoteSectionName.QuickNoteSectionAudit,
  QuickNoteSectionName.QuickNoteSectionHamD,
  QuickNoteSectionName.QuickNoteSectionYbcos,
  QuickNoteSectionName.QuickNoteSectionMoca,
  QuickNoteSectionName.QuickNoteSectionAims,
  QuickNoteSectionName.QuickNoteSectionPcl5,
]

const QuestionnairesInfoPage = async ({ params }: QuestionnairesPageProps) => {
  const response = await getQuicknoteSections({
    patientId: Number(params.id),
    sectionName: sections,
  })

  if (response.state === 'error') {
    return <div>fail</div>
  }

  return <QuestionnairesView patientId={params.id} data={response.data} />
}

export default QuestionnairesInfoPage
