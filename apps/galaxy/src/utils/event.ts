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
const postMessage = (message: any) => {
  window.postMessage(message, '*')
}

export { sendEvent, postMessage }
