'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { saveWidgetAction } from '@/actions/save-widget'
import type { Appointment, QuickNoteSectionItem } from '@/types'
import { getWidgetContainerCheckboxStateByWidgetId } from '@/utils'
import { WidgetContainer, type WidgetContainerProps } from './widget-container'
import { WidgetLoadingOverlay } from './widget-loading-overlay'

interface WidgetFormContainerProps extends WidgetContainerProps {
  patientId: string
  widgetId: string
  getData: (
    schema: any,
  ) => QuickNoteSectionItem[] | Promise<QuickNoteSectionItem[]>
  appointment?: Appointment
  tags?: string[]
}

const WidgetFormContainer = ({
  patientId,
  widgetId,
  getData,
  appointment,
  tags = [],
  ...props
}: WidgetFormContainerProps) => {
  const form = useFormContext()
  const params = useSearchParams()
  const visitSequence = params.get('visitSequence')
  const visitType = params.get('visitType')

  const { isDirty } = form.formState

  const onSubmit = (shouldToast = true) =>
    form.handleSubmit(async (data) => {
      const values = await getData(data)
      const payload = { patientId, data: values, tags }

      const result = await saveWidgetAction(payload)

      if (result.state === 'error') {
        window.postMessage(
          {
            type: 'widget:save',
            widgetId: widgetId,
            success: false,
          },
          '*',
        )

        if (shouldToast) {
          toast.error('Failed to save!')
        }
        return
      }

      form.reset(data)

      window.postMessage(
        {
          type: 'widget:save',
          widgetId: widgetId,
          success: true,
        },
        '*',
      )

      if (shouldToast) {
        toast.success('Saved!')
      }
    })

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (event.data.type !== 'quicknotes:save') return
      const isFormValid = await form.trigger()
      if (isDirty && isFormValid) {
        onSubmit(false)()
      } else {
        window.postMessage(
          {
            type: 'widget:save',
            widgetId: widgetId,
            success: isFormValid,
          },
          '*',
        )
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [isDirty, widgetId])

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

  const widgetContainerCheckboxState =
    getWidgetContainerCheckboxStateByWidgetId({
      widgetId,
      visitType,
      visitSequence,
      initialValue: form.watch('widgetContainerCheckboxField'),
      providerType: appointment?.providerType,
    })

  return (
    <form onSubmit={onSubmit()}>
      <fieldset disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting && <WidgetLoadingOverlay />}
        <WidgetContainer
          {...props}
          toggleableChecked={widgetContainerCheckboxState?.checked}
          toggleableDiabled={widgetContainerCheckboxState?.disabled}
        />
      </fieldset>
    </form>
  )
}

export { WidgetFormContainer }
