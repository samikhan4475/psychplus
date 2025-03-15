'use client'

import { useEffect, useMemo, useState } from 'react'
import { type ActionResult } from '@psychplus-v2/api'
import { FormContainer } from '@psychplus-v2/components'
import { cn } from '@psychplus-v2/utils'
import { Flex } from '@radix-ui/themes'
import {
  type FieldValues,
  type SubmitHandler,
  type UseFormReturn,
} from 'react-hook-form'
import { ToastData, useToast } from '@/providers'
import { Content } from './content'
import { ToggleableFormContext } from './context'
import { DeleteButton, DeleteButtonProps } from './delete-button'
import { Trigger } from './trigger'

const FORM_SAVE_GENERIC_ERROR_MESSAGE =
  'There was a problem saving your changes. Please try again.'

interface ToggleableFormProps<T extends FieldValues, Response> {
  form: UseFormReturn<T>
  submitAction: (data: T) => Promise<ActionResult<Response> | undefined>
  toastData?: ToastData
  trigger?: React.ReactNode
  onSuccess?: (res: Response) => void
  onError?: (error: string) => void
  disabled?: boolean
  contentClassName?: string
  deleteButtonProps?: DeleteButtonProps<Response>
  noResetValues?: boolean
  triggerClassName?: string
  onFormClose?: () => void
  isEdit?: boolean
  isExternalSavePressed?: boolean
  resetExternalSaveState?: () => Promise<void>
  allowExternalSave?: boolean
}

const ToggleableForm = <T extends FieldValues, R>({
  form,
  submitAction,
  trigger,
  toastData,
  children,
  onSuccess,
  onError,
  disabled,
  contentClassName,
  deleteButtonProps,
  noResetValues,
  triggerClassName,
  onFormClose,
  isEdit = true,
  isExternalSavePressed = false,
  resetExternalSaveState,
  allowExternalSave = false,
}: React.PropsWithChildren<ToggleableFormProps<T, R>>) => {
  const { toast } = useToast()
  const [open, setOpen] = useState(!trigger)
  const [error, setError] = useState<string>()

  useEffect(() => {
    if (!trigger) {
      setOpen(true)
    }
  }, [trigger])

  useEffect(() => {
    if (!isExternalSavePressed) return;
    if (isExternalSavePressed && allowExternalSave) {
      const handleExternalSave = async () => {
        const isValid = await form.trigger()
        if (!isValid) {
          await resetExternalSaveState?.()
          return
        }
 
        onSubmit(form.getValues())
      }
 
      handleExternalSave()
    }
  }, [isExternalSavePressed, allowExternalSave])

  const onSubmit: SubmitHandler<T> = async (data, e) => {
    e?.preventDefault()
    setError(undefined)

    const result = await submitAction(data)

    if (result === undefined) {
      return
    }

    if (result.state === 'success') {
      if (isEdit && !allowExternalSave) setOpen(false)
      form.reset(noResetValues ? undefined : form.getValues())

      if (toastData) {
        toast({ type: 'success', ...toastData })
      }

      onSuccess?.(result.data)
    } else {
      setError(result.error ?? FORM_SAVE_GENERIC_ERROR_MESSAGE)
      onError?.(result.error)
    }
  }

  const contextValue = useMemo(
    () => ({
      open,
      setOpen,
      error,
      setError,
      disabled,
      hasTrigger: !!trigger,
      onFormClose: onFormClose,
      isEdit: isEdit,
      allowExternalSave: allowExternalSave,
    }),
    [
      open,
      setOpen,
      error,
      setError,
      disabled,
      trigger,
      onFormClose,
      isEdit,
      allowExternalSave,
    ],
  )

  return (
    <ToggleableFormContext.Provider value={contextValue}>
      <Flex className={cn('relative', triggerClassName)}>
        {trigger ? (
          <Flex className={cn(!triggerClassName && 'w-full')}>
            <Trigger>{trigger}</Trigger>
            {!open && deleteButtonProps?.deleteAction ? (
              <DeleteButton {...deleteButtonProps} />
            ) : null}
          </Flex>
        ) : null}
      </Flex>
      <FormContainer form={form} onSubmit={onSubmit}>
        <Content className={contentClassName}>{children}</Content>
      </FormContainer>
    </ToggleableFormContext.Provider>
  )
}

export { ToggleableForm }
