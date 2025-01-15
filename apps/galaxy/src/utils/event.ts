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

export { sendEvent }
