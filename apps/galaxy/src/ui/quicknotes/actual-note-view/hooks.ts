import { useEffect } from 'react'
import { QuickNoteSectionName } from '../constants'

const useWidgetSaveListener = (
  onWidgetSave: () => void,
  sectionName: QuickNoteSectionName,
) => {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const { type, widgetId, success } = event.data

      if (type === 'widget:save' && widgetId === sectionName) {
        console.log(`Widget ${widgetId} saved successfully: ${success}`)
        onWidgetSave()
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [onWidgetSave, sectionName])
}

export { useWidgetSaveListener }
