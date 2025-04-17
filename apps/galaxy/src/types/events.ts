enum WebSocketEventType {
  Ping = 'Ping',
  Pong = 'Pong',
  InboxCount = 'InboxCount',
  ScrollMessage = 'ScrollMessage',
  ScrollAlert = 'ScrollAlert',
  Auth = 'Auth',
  CallWaiting = 'CallWaiting',
  Users = 'Users',
}
type WebSocketEvents = {
  [WebSocketEventType.Ping]: { dv?: string }
  [WebSocketEventType.Pong]: undefined
  [WebSocketEventType.InboxCount]: { lv?: number }
  [WebSocketEventType.ScrollMessage]: { sv?: string }
  [WebSocketEventType.ScrollAlert]: { sv?: string }
  [WebSocketEventType.CallWaiting]: {
    sv?: string
    gv: string
    joinedAt?: Date
  }
  [WebSocketEventType.Users]: { lv?: number }

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
