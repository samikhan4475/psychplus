import { unstable_noStore as noStore } from 'next/cache';
import { ClearingHouseSubmitterClient } from './clearing-house-submitter.client';
import { Preloader } from './preloader';
import { useStore } from './store';

const ClearingHouseSubmitterServer = ({
  googleApiKey,
}: {
  googleApiKey: string
}) => {
  noStore()
  return (
    <>
      <Preloader store={useStore} />
      <ClearingHouseSubmitterClient googleApiKey={googleApiKey ?? ''}/>
    </>
  )
}

export { ClearingHouseSubmitterServer };

