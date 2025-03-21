import { WebSocketEvents } from '@/types'
import createEventBus from './event-bus'

export const webSocketEventBus = createEventBus<WebSocketEvents>()
