declare global {
  interface Window {
    google: typeof google
    webkitSpeechRecognition: any
    SpeechRecognition: any
  }
}

declare namespace google {
  namespace maps {
    class Map {
      constructor(mapDiv: Element, opts?: MapOptions)
    }

    class Marker {
      constructor(opts?: MarkerOptions)
      setMap(map: Map | null): void
      addListener(eventName: string, handler: Function): void
    }

    class InfoWindow {
      constructor(opts?: InfoWindowOptions)
      open(map?: Map, anchor?: Marker): void
      close(): void
    }

    class LatLng {
      constructor(lat: number, lng: number)
      lat(): number
      lng(): number
    }

    class DirectionsService {
      route(request: DirectionsRequest, callback: (result: DirectionsResult, status: DirectionsStatus) => void): void
    }

    class DirectionsRenderer {
      constructor(opts?: DirectionsRendererOptions)
      setMap(map: Map): void
      setDirections(directions: DirectionsResult): void
    }

    class DistanceMatrixService {
      getDistanceMatrix(
        request: DistanceMatrixRequest,
        callback: (response: DistanceMatrixResponse, status: DistanceMatrixStatus) => void,
      ): void
    }

    class PlacesService {
      constructor(map: Map)
      getDetails(
        request: PlaceDetailsRequest,
        callback: (result: PlaceResult, status: PlacesServiceStatus) => void,
      ): void
    }

    class PlaceResult {
      name?: string
      formatted_address?: string
      geometry?: {
        location?: LatLng
      }
    }

    namespace geometry {
      namespace spherical {
        function computeDistanceBetween(from: LatLng, to: LatLng): number
      }
    }

    interface MapOptions {
      center: LatLng | LatLngLiteral
      zoom: number
      styles?: MapTypeStyle[]
    }

    interface MarkerOptions {
      position: LatLng | LatLngLiteral
      map?: Map
      title?: string
      icon?: string | Icon
    }

    interface InfoWindowOptions {
      content?: string | Node
      position?: LatLng | LatLngLiteral
    }

    interface LatLngLiteral {
      lat: number
      lng: number
    }

    interface Icon {
      url: string
      scaledSize: Size
    }

    class Size {
      constructor(width: number, height: number)
    }

    interface DirectionsRequest {
      origin: LatLng | LatLngLiteral | string
      destination: LatLng | LatLngLiteral | string
      travelMode: TravelMode
    }

    interface DirectionsResult {
      routes: DirectionsRoute[]
    }

    interface DirectionsRoute {
      legs: DirectionsLeg[]
    }

    interface DirectionsLeg {
      distance: Distance
      duration: Duration
    }

    interface Distance {
      text: string
      value: number
    }

    interface Duration {
      text: string
      value: number
    }

    interface DistanceMatrixRequest {
      origins: (LatLng | LatLngLiteral | string)[]
      destinations: (LatLng | LatLngLiteral | string)[]
      travelMode: TravelMode
      unitSystem: UnitSystem
      avoidHighways?: boolean
      avoidTolls?: boolean
    }

    interface DistanceMatrixResponse {
      rows: DistanceMatrixResponseRow[]
    }

    interface DistanceMatrixResponseRow {
      elements: DistanceMatrixResponseElement[]
    }

    interface DistanceMatrixResponseElement {
      distance?: Distance
      duration?: Duration
      status: DistanceMatrixElementStatus
    }

    interface PlaceDetailsRequest {
      placeId: string
    }

    enum TravelMode {
      DRIVING = "DRIVING",
      WALKING = "WALKING",
      BICYCLING = "BICYCLING",
      TRANSIT = "TRANSIT",
    }

    enum UnitSystem {
      METRIC = 0,
      IMPERIAL = 1,
    }

    enum DirectionsStatus {
      OK = "OK",
      NOT_FOUND = "NOT_FOUND",
      ZERO_RESULTS = "ZERO_RESULTS",
      MAX_WAYPOINTS_EXCEEDED = "MAX_WAYPOINTS_EXCEEDED",
      INVALID_REQUEST = "INVALID_REQUEST",
      OVER_QUERY_LIMIT = "OVER_QUERY_LIMIT",
      REQUEST_DENIED = "REQUEST_DENIED",
      UNKNOWN_ERROR = "UNKNOWN_ERROR",
    }

    enum DistanceMatrixStatus {
      OK = "OK",
      INVALID_REQUEST = "INVALID_REQUEST",
      OVER_QUERY_LIMIT = "OVER_QUERY_LIMIT",
      REQUEST_DENIED = "REQUEST_DENIED",
      UNKNOWN_ERROR = "UNKNOWN_ERROR",
    }

    enum DistanceMatrixElementStatus {
      OK = "OK",
      NOT_FOUND = "NOT_FOUND",
      ZERO_RESULTS = "ZERO_RESULTS",
    }

    enum PlacesServiceStatus {
      OK = "OK",
      NOT_FOUND = "NOT_FOUND",
      ZERO_RESULTS = "ZERO_RESULTS",
      OVER_QUERY_LIMIT = "OVER_QUERY_LIMIT",
      REQUEST_DENIED = "REQUEST_DENIED",
      UNKNOWN_ERROR = "UNKNOWN_ERROR",
    }

    interface DirectionsRendererOptions {
      suppressMarkers?: boolean
      polylineOptions?: PolylineOptions
    }

    interface PolylineOptions {
      strokeColor?: string
      strokeWeight?: number
    }

    interface MapTypeStyle {
      featureType?: string
      elementType?: string
      stylers?: MapTypeStyler[]
    }

    interface MapTypeStyler {
      color?: string
    }
  }
}

interface SpeechRecognitionEvent {
  results: {
    [key: number]: {
      [key: number]: {
        transcript: string
      }
    }
  }
}

interface SpeechRecognition {
  continuous: boolean
  interimResults: boolean
  lang: string
  start(): void
  stop(): void
  onresult: (event: SpeechRecognitionEvent) => void
  onerror: () => void
  onend: () => void
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition
    webkitSpeechRecognition: new () => SpeechRecognition
    google: {
      maps: {
        Map: any
        Marker: any
        InfoWindow: any
        LatLng: any
        DirectionsService: any
        DirectionsRenderer: any
        places: {
          PlacesService: any
          PlaceResult: any
        }
        geometry: {
          spherical: {
            computeDistanceBetween(from: any, to: any): number
          }
        }
      }
    }
  }
}

export {}
