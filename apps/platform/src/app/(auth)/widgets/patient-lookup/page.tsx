import { PatientLookupWidget } from '@psychplus/widgets/clinical'
import { PageHeader } from '../../shared/page-header'

const TITLE = 'Patient Lookup Widget'
const DESCRIPTION = 'Displays patient Lookup.'

const PatientLookupWidgetPage = () => (
  <>
    <PageHeader title={TITLE} description={DESCRIPTION} />

    <div className="h-[500px] w-[1200px]">
      <PatientLookupWidget />
    </div>
  </>
)

export default PatientLookupWidgetPage
