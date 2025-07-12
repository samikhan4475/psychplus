import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { useStore as useMessagesStore } from '../messages/store'
import { Filter } from './list-filter/filter'
import { FiltersButton } from './list-filter/filter-button'
import { MessageSearch } from './message-search'
import { NewMessageButton } from './new-message-button'
import { schema, SchemaType } from './schema'
import { useStore } from './store'
import { ActiveComponent, messageStatus, SecureMessagesTab } from './types'

const MessageHeader = ({
  tab,
  isActiveTab,
}: {
  tab: string
  isActiveTab: boolean
}) => {
  const [showFilter, setShowFilter] = useState(false)
  const { activeTab } = useMessagesStore((state) => ({
    activeTab: state.activeTab,
  }))

  const {
    search,
    setActiveComponent,
    page,
    setPreviewSecureMessage,
    setActiveTab,
  } = useStore((state) => ({
    search: state.search,
    setActiveComponent: state.setActiveComponent,
    page: state.page,
    setPreviewSecureMessage: state.setPreviewSecureMessage,
    setActiveTab: state.setActiveTab,
  }))

  useEffect(() => {
    if (!isActiveTab) return
    if (tab === activeTab)
      search({ messageStatus: activeTab as SecureMessagesTab }, page, true)

    setPreviewSecureMessage({
      activeTab: tab as SecureMessagesTab,
      secureMessage: null,
    })
    setActiveComponent(ActiveComponent.NEW_EMAIL_PLACEHOLDER)
    setActiveTab(tab as SecureMessagesTab)
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
      messageStatus: activeTab as SecureMessagesTab,
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

    search(cleanedPayload, page, true)
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
        <FiltersButton
          showFilter={showFilter}
          onClick={() => setShowFilter(!showFilter)}
        />
        <NewMessageButton
          onClick={() => {
            setPreviewSecureMessage({
              activeTab: activeTab as SecureMessagesTab,
              secureMessage: null,
            })
            setActiveComponent(ActiveComponent.COMPOSE_MAIL)
          }}
        />
      </Flex>
      {showFilter && <Filter />}
    </FormContainer>
  )
}

export { MessageHeader }
