'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDebouncedCallback } from 'use-debounce'
import { saveWidgetClientAction } from '@/actions'
import { revalidateAction } from '@/actions/revalidate'
import { saveWidgetAction } from '@/actions/save-widget'
import { useDeepCompareMemo } from '@/hooks/use-deep-compare-memo'
import type { Appointment, QuickNoteSectionItem, UpdateCptCodes } from '@/types'
import { useQuickNoteUpdate } from '@/ui/quicknotes/hooks'
import { getWidgetContainerCheckboxStateByWidgetId, postEvent } from '@/utils'
import { WidgetContainer, type WidgetContainerProps } from './widget-container'
import { WidgetLoadingOverlay } from './widget-loading-overlay'

interface WidgetFormContainerProps extends WidgetContainerProps {
  patientId: string
  widgetId: string
  getData: (
    schema: any,
    isSubmitting?: boolean,
    updateCptCodes?: UpdateCptCodes,
  ) => QuickNoteSectionItem[] | Promise<QuickNoteSectionItem[]>
  appointment?: Appointment
  tags?: string[]
  formResetValues?: any
  widgetContainerCheckboxFieldInitialValue?: string
  handleOnClear?: () => void
  isResetDisabled?: boolean
}

const WidgetFormContainer = ({
  patientId,
  widgetId,
  getData,
  appointment,
  tags = [],
  formResetValues,
  widgetContainerCheckboxFieldInitialValue,
  handleOnClear,
  isResetDisabled,
  ...props
}: WidgetFormContainerProps) => {
  const form = useFormContext()
  const formValues = form.watch()
  const [loading, setLoading] = useState(false)
  const [shouldValidate, setShouldValidate] = useState(false)
  const memoizedValues = useDeepCompareMemo(() => formValues, [formValues])

  const {
    updateWidgetsData,
    updateActualNoteWidgetsData,
    isQuickNoteView,
    updateCptCodes,
  } = useQuickNoteUpdate()
  const params = useSearchParams()
  const visitSequence = params.get('visitSequence')
  const visitType = params.get('visitType')

  const { isDirty } = form.formState

  const handleActualNoteUpdate = useDebouncedCallback(async (values) => {
    const data = await getData(values, false, updateCptCodes)
    updateActualNoteWidgetsData(data)
  }, 500)

  useEffect(() => {
    if (Object.keys(memoizedValues ?? {})?.length && isQuickNoteView) {
      handleActualNoteUpdate(memoizedValues)
    }
    if (!shouldValidate) {
      form.clearErrors()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memoizedValues])

  const onSubmit =
    (shouldToast = true) =>
    async (event: React.FormEvent) => {
      event.preventDefault()
      setLoading(true)
      form.clearErrors()
      const values = await getData(form.getValues(), true, updateCptCodes)
      const payload = { patientId, data: values, tags }
      const result = await (isQuickNoteView
        ? saveWidgetClientAction
        : saveWidgetAction)(payload)

      if (result.state === 'error') {
        postEvent({
          type: 'widget:save',
          widgetId: widgetId,
          success: false,
        })

        if (shouldToast) {
          toast.error('Failed to save!')
        }
        setLoading(false)
        return
      }

      postEvent({
        type: 'widget:save',
        widgetId: widgetId,
        success: true,
      })
      updateWidgetsData?.(values)
      revalidateAction()
      setLoading(false)
      setShouldValidate(false)
      if (shouldToast) {
        toast.success('Saved!')
      }
    }

  const saveWidget = async (
    event: MessageEvent,
    form: ReturnType<typeof useFormContext>,
  ) => {
    if (event.data.widgetId && event.data.widgetId !== widgetId) return
    const isFormValid = await form.trigger()
    if (isFormValid) {
      onSubmit()
    } else {
      postEvent({
        type: 'widget:save',
        widgetId: widgetId,
        success: isFormValid,
      })
    }
  }
  // send all data widgets to the parent
  const handleQuickNotesValidateAll = async (
    form: ReturnType<typeof useFormContext>,
  ) => {
    const isFormValid = await form.trigger()
    postEvent({
      type: 'widget:validate',
      widgetId,
      success: isFormValid,
    })
  }

  const handleQuickNotesSaveAll = async (
    form: ReturnType<typeof useFormContext>,
  ) => {
    ;[]

    const data = form.getValues()
    const sections: QuickNoteSectionItem[] = await getData(data)

    postEvent({
      type: 'widget:saveAll',
      widgetId,
      sections,
    })
  }

  // call the function to handle the message event
  useEffect(() => {
    const handleEvents = (event: MessageEvent) => {
      switch (event.data.type) {
        case 'quicknotes:save':
          saveWidget(event, form)
          break
        case 'quicknotes:validateAll':
          handleQuickNotesValidateAll(form)
          setShouldValidate(true)
          break
        case 'quicknotes:saveAll':
          handleQuickNotesSaveAll(form)
          break
        case 'quicknotes:clear':
          if (!isResetDisabled) {
            formResetValues ? form.reset(formResetValues) : form.reset()
          }
          handleOnClear?.()
          setShouldValidate(false)
          break
        case 'quicknotes:clearErrors':
          form.clearErrors()
          setShouldValidate(false)
          break
        default:
          break
      }
    }

    window.addEventListener('message', handleEvents)
    return () => {
      window.removeEventListener('message', handleEvents)
    }
  }, [])

  useEffect(() => {
    postEvent({
      type: 'widget:dirty',
      widgetId: widgetId,
      isDirty,
    })
  }, [isDirty])

  const widgetContainerCheckboxState =
    getWidgetContainerCheckboxStateByWidgetId({
      widgetId,
      visitType,
      visitSequence,
      initialValue: widgetContainerCheckboxFieldInitialValue,
      providerType: appointment?.providerType,
    })
  return (
    <form onSubmit={onSubmit()}>
      <fieldset disabled={form.formState.isSubmitting || loading}>
        {(form.formState.isSubmitting || loading) && <WidgetLoadingOverlay />}
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
