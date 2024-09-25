import React, { useCallback, useEffect, useState } from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { ReactTags, Tag } from 'react-tag-autocomplete'
import 'react-tag-autocomplete/example/src/styles.css'
import { useDebouncedCallback } from 'use-debounce'
import { SendInternalTitle } from '.'
import { getAllRecipientSuggestionsAction } from '../actions'
import { EmailRecipients } from '../types'

const InternalRecipientsEmails = () => {
  const [internalRecipientsTag, setInternalRecipientsTag] = useState<Tag[]>([])
  const [recipientSuggention, setRecipientSuggention] = useState<
    EmailRecipients[]
  >([])
  useEffect(() => {
    const fetchSuggestions = async () => {
      // TODO: I will limit the data when integrate the api.
      const fetchRecipientSuggestion = await getAllRecipientSuggestionsAction()
      if (fetchRecipientSuggestion.state === 'error') {
        return fetchRecipientSuggestion.error
      }
      setRecipientSuggention(fetchRecipientSuggestion.data)
    }
    fetchSuggestions()
  }, [])

  const [internalEmailSuggestionsTags, setInternalEmailSuggestionsTags] =
    useState<Tag[]>([])

  const handleChange = (keyword: string) => {
    const lowerKeyword = keyword.trim().toLowerCase()

    const internalRecipientsResponse = recipientSuggention.filter((item) => {
      const name = item?.legalName.firstName?.trim().toLowerCase()

      return name && name.includes(lowerKeyword)
    })

    if (internalRecipientsResponse?.length) {
      const tags = internalRecipientsResponse.map((recipient) => ({
        value: recipient.contactInfo.email,
        label: recipient.legalName.firstName.concat(
          ` ${recipient.legalName.lastName}`,
        ),
      }))
      setInternalEmailSuggestionsTags(tags)
    }
  }

  const handleChangeDebounce = useDebouncedCallback(handleChange, 1000)

  const handleAddTag = (tag: Tag) => {
    setInternalRecipientsTag((prev) => [...prev, tag])
  }

  const handleOnDelete = useCallback(
    (index: number) => {
      setInternalRecipientsTag((prevTags) =>
        prevTags.filter((_, i) => i !== index),
      )
    },
    [internalRecipientsTag],
  )
  return (
    <Flex
      direction="row"
      className="border-pp-gray-4 h-[40px] w-[100%] border-b"
      align="center"
      position="relative"
    >
      <SendInternalTitle />

      <ReactTags
        selected={internalRecipientsTag}
        suggestions={internalEmailSuggestionsTags}
        onInput={handleChangeDebounce}
        onAdd={handleAddTag}
        onDelete={handleOnDelete}
        collapseOnSelect
        noOptionsText="No Matches"
        placeholderText=""
        labelText=""
        renderInput={(inputProps) => (
          <input {...inputProps} className="flex-grow outline-none" />
        )}
        renderRoot={({ children, ...rootProps }) => (
          <Box className="border-none text-[14px]" {...rootProps}>
            {children}
          </Box>
        )}
      />
    </Flex>
  )
}

export { InternalRecipientsEmails }
