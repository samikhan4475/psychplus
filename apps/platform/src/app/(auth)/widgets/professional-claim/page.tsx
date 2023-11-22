import { ProfessionalClaimWidget } from '@psychplus/widgets/revcycle'
import { PageHeader } from '../../shared/page-header'

const TITLE = 'Professional Claims'
const DESCRIPTION = 'Manage Professional Claims'

const ProfessionalClaimWidgetPage = () => (
  <>
    <PageHeader title={TITLE} description={DESCRIPTION} />

    <div className="h-[400px] w-[800px]">
      <ProfessionalClaimWidget />
    </div>
  </>
)

export default ProfessionalClaimWidgetPage
