'use client'
import { SubmitterList } from './components';
import { GooglePlacesContextProvider } from '@/providers';

const ClearingHouseSubmitterClient = ({
  googleApiKey,
}: {
  googleApiKey: string
}) => {
  return (
    <GooglePlacesContextProvider apiKey={googleApiKey}>
      <SubmitterList />
    </GooglePlacesContextProvider>

  ) 
}
export { ClearingHouseSubmitterClient };

