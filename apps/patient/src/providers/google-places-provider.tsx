'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
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
  const [loaded, setLoaded] = useState(
    typeof window !== 'undefined' && !!window.google,
  )
  

  useEffect(() => {
    if (window.google) {
      setLoaded(true)
    }
  }, [])

  const contextValue = useMemo(() => ({ loaded }), [loaded])

  return (
    <GooglePlacesContext.Provider value={contextValue}>
      {!loaded && (
        <Script
          async
          defer
          strategy="afterInteractive"
          src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`}
          onLoad={() => setLoaded(true)}
        />
      )}
      {children}
    </GooglePlacesContext.Provider>
  )
}

const useGooglePlacesContext = () => useContext(GooglePlacesContext)

export { GooglePlacesContextProvider, useGooglePlacesContext }
