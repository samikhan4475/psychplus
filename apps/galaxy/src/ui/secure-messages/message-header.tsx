import React, { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { formatDateToISOString, sanitizeFormData } from '@/utils'
import { Filter } from './filter'
import { FiltersButton } from './filter-button'
import { MessageSearch } from './message-search'
import { NewEmailButton } from './new-email-button'
import { schema, SchemaType } from './schema'
import { useStore } from './store'
import { ActiveComponent, messageStatus, SecureMessagesTab } from './types'
import { splitName } from './utils'

const MessageHeader = () => {
  const [showFilter, setShowFilter] = useState(false)

  const {
    search,
    setActiveComponent,
    activeTab,
    page,
    setPreviewSecureMessage,
  } = useStore((state) => state)

  useEffect(() => {
    search({ messageStatus: activeTab }, page, true)
  }, [activeTab, search])

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    criteriaMode: 'all',
    defaultValues: {
      from: undefined,
      to: undefined,
      status: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    const { firstName, lastName } = splitName(data?.name || '')
    const cleanedPayload = {
      ...data,
      messageStatus: activeTab,
      firstName,
      lastName,
      to: data.to ? formatDateToISOString(data.to as DateValue) : undefined,
      from: data.from
        ? formatDateToISOString(data.from as DateValue, true)
        : undefined,
    }
    if (
      activeTab === SecureMessagesTab.SENT ||
      activeTab === SecureMessagesTab.DRAFT
    ) {
      cleanedPayload.isReplied = data.status === messageStatus.REPLIED
      cleanedPayload.isRead = data.status === messageStatus.READ
    } else {
      delete data.sendMode
    }

    const finalPayload = sanitizeFormData(cleanedPayload)
    search(finalPayload, page, true)
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit} formClassName="flex-none">
      <Flex
        justify="between"
        align="center"
        gap="2"
        className=" bg-white h-9 w-full p-2"
      >
        <MessageSearch />
        <Flex gap="2">
          <FiltersButton
            showFilter={showFilter}
            onClick={() => setShowFilter(!showFilter)}
          />
          <NewEmailButton
            onClick={() => {
              setPreviewSecureMessage({ activeTab, secureMessage: null })
              setActiveComponent(ActiveComponent.COMPOSE_MAIL)
            }}
          />
        </Flex>
      </Flex>
      {showFilter && <Filter />}
    </FormContainer>
  )
}

export { MessageHeader }
