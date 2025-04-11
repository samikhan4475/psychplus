enum WebSocketEventType {
  Ping = 'Ping',
  Pong = 'Pong',
  InboxCount = 'InboxCount',
  ScrollMessage = 'ScrollMessage',
  ScrollAlert = 'ScrollAlert',
  Auth = 'Auth',
}
type WebSocketEvents = {
  [WebSocketEventType.Ping]: { dv?: string }
  [WebSocketEventType.Pong]: undefined
  [WebSocketEventType.InboxCount]: { lv?: number }
  [WebSocketEventType.ScrollMessage]: { sv?: string }
  [WebSocketEventType.ScrollAlert]: { sv?: string }
}
type GenericPayload<T = Record<string, unknown>> = T | undefined

type GenerictEvents = {
  [eventType: string]: GenericPayload
}

export {
  WebSocketEventType,
  type WebSocketEvents,
  type GenerictEvents,
  type GenericPayload,
}
