import { AddTemplateWidget } from "@psychplus/widgets/clinical"
import { PageHeader } from "../../shared/page-header"
import { OpenButton } from "./open-button"

const TITLE = 'Add Template Widget'
const DESCRIPTION = 'A dialog form to add a template'

const AddTemplateWidgetPage = () => {
    return (
        <>
          <PageHeader title={TITLE} description={DESCRIPTION} />
          <OpenButton />
          <AddTemplateWidget />
        </>
    )
}

export default AddTemplateWidgetPage