'use client'

import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { saveWidgetAction } from '@/actions/save-widget'
import type { QuickNoteSectionItem } from '@/types'
import { WidgetContainer, type WidgetContainerProps } from './widget-container'
import { WidgetLoadingOverlay } from './widget-loading-overlay'

interface WidgetFormContainerProps extends WidgetContainerProps {
  patientId: string
  widgetId: string
  getData: (schema: any) => QuickNoteSectionItem[]
  enableEvents?: boolean // TODO: Remove this prop if event are necessary, panding aryan's feedback
}

const WidgetFormContainer = ({
  patientId,
  widgetId,
  getData,
  enableEvents = true,
  ...props
}: WidgetFormContainerProps) => {
  const form = useFormContext()

  const { isDirty } = form.formState

  const onSubmit = (shouldToast = true) =>
    form.handleSubmit(async (data) => {
      const payload = { patientId, data: getData(data) }
      const result = await saveWidgetAction(payload)

      if (result.state === 'error') {
        if (enableEvents) {
          window.postMessage(
            {
              type: 'widget:save',
              widgetId: widgetId,
              success: false,
            },
            '*',
          )
        }

        if (shouldToast) {
          toast.error('Failed to save!')
        }
        return
      }

      form.reset(data)

      if (enableEvents) {
        window.postMessage(
          {
            type: 'widget:save',
            widgetId: widgetId,
            success: true,
          },
          '*',
        )
      }

      if (shouldToast) {
        toast.success('Saved!')
      }
    })

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type !== 'quicknotes:save') {
        return
      }

      if (isDirty) {
        onSubmit(false)()
      } else {
        window.postMessage(
          {
            type: 'widget:save',
            widgetId: widgetId,
            success: true,
          },
          '*',
        )
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [isDirty])

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type !== 'quicknotes:clear') {
        return
      }
      form.reset()
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  useEffect(() => {
    window.postMessage(
      {
        type: 'widget:dirty',
        widgetId: widgetId,
        isDirty,
      },
      '*',
    )
  }, [isDirty])

  return (
    <form onSubmit={onSubmit()}>
      <fieldset disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting && <WidgetLoadingOverlay />}
        <WidgetContainer {...props} />
      </fieldset>
    </form>
  )
}

export { WidgetFormContainer }
