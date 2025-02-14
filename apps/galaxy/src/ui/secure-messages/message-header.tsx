import React, { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { formatDateToISOString } from '@/utils'
import { Filter } from './filter'
import { FiltersButton } from './filter-button'
import { MessageSearch } from './message-search'
import { NewMessageButton } from './new-message-button'
import { schema, SchemaType } from './schema'
import { useStore } from './store'
import { ActiveComponent, messageStatus, SecureMessagesTab } from './types'
import { sanitizeFormData } from './utils'

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
    const cleanedPayload = {
      ...data,
      messageStatus: activeTab,
      to: data.to ? formatDateToISOString(data.to as DateValue) : undefined,
      from: data.from
        ? formatDateToISOString(data.from as DateValue, true)
        : undefined,
    }
    if (
      activeTab === SecureMessagesTab.INBOX ||
      activeTab === SecureMessagesTab.ARCHIVED
    ) {
      if (data.status === messageStatus.READ) {
        cleanedPayload.isRead = true
      } else if (data.status === messageStatus.UNREAD) {
        cleanedPayload.isRead = false
      } else if (data.status === messageStatus.REPLIED) {
        cleanedPayload.isReplied = true
      }
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
          <NewMessageButton
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
