import { v4 as uuidv4 } from 'uuid'
import { handleRequest } from '../api'
import { createHeaders } from '../client'
import { TrackRequest } from './types'

const clickTrack = async (request: TrackRequest) => {
  if (!request.sessionId) {
    let sessionId = localStorage.getItem('sessionId')
    const mid = localStorage.getItem('mid')
    if (!sessionId) {
      sessionId = uuidv4()
      localStorage.setItem('sessionId', sessionId)
    }

    request.sessionId = sessionId
    request.refererUrl = mid ? `MID:${mid}` : request.refererUrl ?? ""
  }
  return handleRequest<TrackRequest>(
    fetch('/api/clicktrack', {
      method: 'POST',
      body: JSON.stringify(request),
      headers: createHeaders(),
    }),
  )
}

export { clickTrack }
