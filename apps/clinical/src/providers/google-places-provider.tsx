'use-client'

import React, { createContext, useContext, useMemo, useState } from "react"
import Script from 'next/script'

interface GooglePlacesContextType {
    loaded: boolean
}

const GooglePlacesContext = createContext<GooglePlacesContextType>({
    loaded: false,
})

interface GooglePlacesContextProviderProps {
    apiKey: string
}

const GooglePlacesContextProvider = ({
    apiKey,
    children,
  }: React.PropsWithChildren<GooglePlacesContextProviderProps>) => {
    const [loaded, setLoaded] = useState(false)
  
    const contextValue = useMemo(() => ({ loaded }), [loaded])
  
    return (
      <GooglePlacesContext.Provider value={contextValue}>
        <Script
          async
          defer
          strategy="afterInteractive"
          onReady={() => {
            setLoaded(true)
          }}
          src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`}
        />
        {children}
      </GooglePlacesContext.Provider>
    )
  }
  
  const useGooglePlacesContext = () => useContext(GooglePlacesContext)

  export { GooglePlacesContextProvider, useGooglePlacesContext }