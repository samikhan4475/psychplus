import { QuestionnairesLoader as QuestionnairesView } from '@/ui/questionnaires/questionnaires-loader'

interface QuestionnairesVisitViewPageProps {
  params: {
    id: string
    apptId: string
  }
}

const QuestionnairesInfoVisitViewPage = ({
  params,
}: QuestionnairesVisitViewPageProps) => {
  return <QuestionnairesView params={params} />
}

export default QuestionnairesInfoVisitViewPage
