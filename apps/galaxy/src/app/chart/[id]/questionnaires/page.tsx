import { QuestionnairesView } from '@/ui/questionnaires'
import { getQuestionnairesAudit } from '@/ui/questionnaires/audit-tab/api'
import { getQuestionnairesDashboard } from '@/ui/questionnaires/dashboard-tab/dashboard-widget/api'
import { getQuestionnairesDast10 } from '@/ui/questionnaires/dast-10-tab/api'
import { getQuestionnairesGad7 } from '@/ui/questionnaires/gad-7-tab/api/get-questionnaires-gad7'
import { getQuestionnairesPcl5 } from '@/ui/questionnaires/pcl-5-tab/api'
import { getQuestionnairesPhq9 } from '@/ui/questionnaires/phq-9-tab/api'
import { getQuestionnairesSnapIv } from '@/ui/questionnaires/snap-iv-tab/api'

interface QuestionnairesPageProps {
  params: {
    id: string
  }
}

const QuestionnairesInfoPage = async ({ params }: QuestionnairesPageProps) => {
  const [
    questionnairesDashboardResponse,
    questionnairesGad7Response,
    questionnairesPcl5Response,
    questionnairesPhq9Response,
    questionnairesSnapIvResponse,
    questionnairesDast10Response,
    questionnairesAuditResponse,
  ] = await Promise.all([
    getQuestionnairesDashboard({ patientId: params.id }),
    getQuestionnairesGad7({ patientId: params.id }),
    getQuestionnairesPcl5({ patientId: params.id }),
    getQuestionnairesPhq9({ patientId: params.id }),
    getQuestionnairesSnapIv({ patientId: params.id }),
    getQuestionnairesDast10({ patientId: params.id }),
    getQuestionnairesAudit({ patientId: params.id }),
  ])

  if (questionnairesDashboardResponse.state === 'error') {
    throw new Error(questionnairesDashboardResponse.error)
  }

  if (questionnairesGad7Response.state === 'error') {
    throw new Error(questionnairesGad7Response.error)
  }

  if (questionnairesSnapIvResponse.state === 'error') {
    throw new Error(questionnairesSnapIvResponse.error)
  }
  if (questionnairesPcl5Response.state === 'error') {
    throw new Error(questionnairesPcl5Response.error)
  }

  if (questionnairesPhq9Response.state === 'error') {
    throw new Error(questionnairesPhq9Response.error)
  }

  if (questionnairesDast10Response.state === 'error') {
    throw new Error(questionnairesDast10Response.error)
  }

  if (questionnairesAuditResponse.state === 'error') {
    throw new Error(questionnairesAuditResponse.error)
  }

  return (
    <QuestionnairesView
      questionnairesDashboardData={
        questionnairesDashboardResponse.data.questionnairesDashboardData
      }
      questionnairesGad7Response={
        questionnairesGad7Response.data.questionnairesGad7Data
      }
      questionnairesSnapIvResponse={
        questionnairesSnapIvResponse.data.questionnairesSnapIvData
      }
      patientId={params.id}
      questionnairesPcl5Response={
        questionnairesPcl5Response.data.questionnairesPcl5Data
      }
      questionnairesPhq9Response={
        questionnairesPhq9Response.data.questionnairesPhq9Data
      }
      questionnairesDast10Response={
        questionnairesDast10Response.data.questionnairesDast10Data
      }
      questionnairesAuditResponse={
        questionnairesAuditResponse.data.questionnairesAuditData
      }
    />
  )
}

export default QuestionnairesInfoPage
