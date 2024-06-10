import { EditTemplateWidget } from "@psychplus/widgets/clinical"
import { PageHeader } from "../../shared/page-header"
import { OpenButton } from "./open-button"

const TITLE = 'Edit Template Widget'
const DESCRIPTION = 'A dialog form to edit a widget'

const EditTemplateWidgetPage = () => {
    return (
        <>
        <PageHeader title={TITLE} description={DESCRIPTION} />
        <OpenButton />
        <EditTemplateWidget />
        </>
    )
}

export default EditTemplateWidgetPage