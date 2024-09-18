interface GeocodingAPIResponse {
  results: Result[]
  status: string
}

interface AddressComponent {
  long_name: string
  short_name: string
  types: string[]
}

interface Result {
  address_components: AddressComponent[]
  formatted_address: string
  geometry: Geometry
  place_id: string
  plus_code: PlusCode
  types: string[]
}

interface Geometry {
  location: Location
  location_type: string
  viewport: Viewport
}

interface Location {
  lat: number
  lng: number
}

interface Viewport {
  northeast: Location
  southwest: Location
}

interface PlusCode {
  compound_code: string
  global_code: string
}

interface Result {
  address_components: AddressComponent[]
  formatted_address: string
  geometry: Geometry
  place_id: string
  plus_code: PlusCode
  types: string[]
}

interface AddressComponent {
  long_name: string
  short_name: string
  types: string[]
}

interface Geometry {
  location: Location
  location_type: string
  viewport: Viewport
}

interface Location {
  lat: number
  lng: number
}

interface Viewport {
  northeast: Location
  southwest: Location
}

interface PlusCode {
  compound_code: string
  global_code: string
}

export type { AddressComponent, GeocodingAPIResponse }
