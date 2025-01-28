import toast from 'react-hot-toast'
import { saveWidgetClientAction } from '@/actions'
import { Appointment, QuickNoteSectionItem } from '@/types'
import { postEvent, saveAbleWdgets, visitTypeToWidgets } from '@/utils'
import { QuickNoteSectionName } from '../constants'
import { getWidgetErrorMessage, getWidgetsByVisitType } from '../utils'

const getWidgetData = (providerType: string) => {
  const urlParams = new URLSearchParams(window.location.search)
  const visitType = urlParams.get('visitType') as string
  const visitSequence = urlParams.get('visitSequence') as string

  const widgets =
    getWidgetsByVisitType(visitType, visitSequence, providerType).map(
      (widget) => widget.id,
    ) || []

  const savingWidgets = saveAbleWdgets.filter((widget) => {
    return widgets.includes(widget)
  })
  return {
    widgets: savingWidgets,
    providerType,
    visitType,
    visitSequence,
  }
}

const saveWidgets = async (
  appointment: Appointment,
): Promise<QuickNoteSectionItem[]> => {
  const { widgets } = getWidgetData(appointment.providerType)

  const isValidateAll = await validateAll(widgets, appointment.visitTypeCode)
  if (!isValidateAll) {
    return []
  }
  //   const widgets = []
  const promises = widgets.map((widgetId) => {
    return new Promise<{
      success: boolean
      widgetId: string
      sections: QuickNoteSectionItem[]
    }>((resolve) => {
      const handleMessage = (event: MessageEvent) => {
        if (
          event.data.type === 'widget:saveAll' &&
          event.data.widgetId === widgetId
        ) {
          window.removeEventListener('message', handleMessage)
          resolve(event.data)
        }
      }

      window.addEventListener('message', handleMessage)
    })
  })

  postEvent({ type: 'quicknotes:saveAll' })
  const responses = await Promise.all(promises)
  const sections = responses.flatMap((response) => response.sections)

  const uniqueSections = sections.filter(
    (section, index, self) =>
      index ===
      self.findIndex(
        (t) =>
          t.sectionName === section.sectionName &&
          t.sectionItemValue === section.sectionItemValue &&
          t.sectionItem === section.sectionItem,
      ),
  )
  const payload = {
    patientId: String(uniqueSections?.[0]?.pid),
    data: uniqueSections,
  }

  try {
    const result = await saveWidgetClientAction(payload)
    if (result.state === 'error') {
      toast.error('Failed to save!')
      return []
    }
    return uniqueSections
  } catch (error) {
    toast.error('Failed to save!')
    return []
  }
}

const validateAll = async (widgets: QuickNoteSectionName[], visitTypeCode?: string) => {
  const promises = widgets.map((widgetId) => {
    return new Promise<{ success: boolean; widgetId: string }>((resolve) => {
      const handleMessage = (event: MessageEvent) => {
        if (
          event.data.type === 'widget:validate' &&
          event.data.widgetId === widgetId
        ) {
          window.removeEventListener('message', handleMessage)
          resolve(event.data)
        }
      }

      window.addEventListener('message', handleMessage)
    })
  })
  postEvent({ type: 'quicknotes:validateAll' })
  const responses = await Promise.all(promises)

  let widgetErrors = '';
  responses.forEach((element) => {
    if (!element.success) {
      widgetErrors += `${element.widgetId.replace('QuicknoteSection', '')}, `;
    }
  })
  widgetErrors = widgetErrors.slice(0, widgetErrors.length - 2)

  if (widgetErrors !== '') {
    let errorKey;
    switch (true) {       
      case visitTypeCode === "Tms":
          errorKey = 'TMS';
          break;

      case visitTypeCode === "Spravato":
          errorKey = 'Spravato';
          break;

      case visitTypeCode === "Ect":
          errorKey = 'ECT';
          break;

      case widgetErrors.includes('AddOn'):
        errorKey = 'AddOn';
        break;
  
      default:
        break;
    }

    const objKeys = errorKey as keyof typeof getWidgetErrorMessage;
    toast.error(`Please fill out all required fields in ${getWidgetErrorMessage[objKeys] || widgetErrors}`)
  }
  return responses.every((element) => element.success)
}

export { getWidgetData, saveWidgets }
