'use client'

import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { addUserSettings, updateUserSettings } from '@/actions'
import { FormContainer } from '@/components'
import { LevelCode } from '@/constants'
import { UserSetting } from '@/types'
import { sanitizeFormData } from '@/utils'
import { useStore } from '../../store'
import { DescriptionInput } from './description-input'
import { NameInput } from './name-input'
import { autoTextSchema, AutoTextSchemaType } from './schema'
import { SubmitButton } from './submit-button'

interface AutoTextFormProps {
  data?: UserSetting
  onClose?: (updateAutoText?: UserSetting) => void
}
const AutoTextForm = ({ data, onClose }: AutoTextFormProps) => {
  const refetch = useStore((state) => state.refetch)
  const isEditAble = Boolean(data?.levelCode !== LevelCode.System && data?.id)
  const form = useForm<AutoTextSchemaType>({
    resolver: zodResolver(autoTextSchema),
    defaultValues: {
      name: data?.name ?? '',
      content: data?.content ?? '',
    },
  })

  const onSubmit: SubmitHandler<AutoTextSchemaType> = async (payload) => {
    const payloadData: Partial<UserSetting> = sanitizeFormData({
      levelCode: 'User',
      categoryCode: 'Application',
      categoryValue: 'AutoText',
      id: isEditAble ? data?.id : undefined,
      ...payload,
    })

    const response = await (isEditAble
      ? updateUserSettings(String(data?.id), payloadData)
      : addUserSettings(payloadData))

    if (response.state === 'error') {
      return toast.error(response.error)
    }
    refetch()
    toast.success(`Auto text ${isEditAble ? 'updated' : 'added'} successfully`)
    onClose?.(response?.data)
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit} className="gap-4">
      <NameInput />
      <DescriptionInput />
      <SubmitButton isEditAble={isEditAble} />
    </FormContainer>
  )
}

export { AutoTextForm }
