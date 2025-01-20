'use client'
const sendEvent = ({
  eventType,
  widgetId,
}: {
  eventType: string
  widgetId: string
}) => {
  const message = { type: eventType, widgetId }
  window.postMessage(message, '*')
}
const postEvent = (message: any) => {
  window.postMessage(message, '*')
}

export { sendEvent, postEvent }
