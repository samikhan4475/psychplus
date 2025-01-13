import { useEffect } from 'react'
import { QuickNoteSectionName } from '../constants'

const useWidgetSaveListener = (
  onWidgetSave: () => void,
  sectionName: QuickNoteSectionName,
) => {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const { type, widgetId } = event.data

      if (type === 'widget:save' && widgetId === sectionName) {
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
