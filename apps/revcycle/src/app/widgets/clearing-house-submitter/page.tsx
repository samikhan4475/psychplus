import { ClearingHouseSubmitterServer } from '@/widgets/clearing-house-submitter/clearing-house-submitter.server';
import { GOOGLE_MAPS_API_KEY } from '@psychplus/utils/constants';


const ClearingHouseSubmitterWidgetPage = () => {
  return(
    <ClearingHouseSubmitterServer googleApiKey={GOOGLE_MAPS_API_KEY ?? ''} />
  ) 
}

export default ClearingHouseSubmitterWidgetPage
