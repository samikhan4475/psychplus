import { AddTemplateWidget, EditTemplateWidget, ReportsWidget } from "@psychplus/widgets/clinical"
import { PageHeader } from "../../shared/page-header"
import { Client } from "./client"

const TITLE = 'Reports'
const DESCRIPTION = 'Displays reports'
const ReportsWidgetPage = () => (
    <>
      <Client />
      <PageHeader title={TITLE} description={DESCRIPTION} />
      <AddTemplateWidget />
      <EditTemplateWidget />
      <ReportsWidget />
    </>
)

export default ReportsWidgetPage