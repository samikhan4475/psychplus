type TrackRequest = {
  sessionId?: string
  productArea: string
  productPageKey: string
  clickAction: string
  clickActionData?: string
  refererUrl?: string
}

export type { TrackRequest }
