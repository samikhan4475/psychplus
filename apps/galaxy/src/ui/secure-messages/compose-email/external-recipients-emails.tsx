import React, { useCallback, useState } from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { ReactTags, Tag } from 'react-tag-autocomplete'
import 'react-tag-autocomplete/example/src/styles.css'
import { SendExternalTitle } from '.'
import { EMAIL_REGEX } from '../contants'

const ExternalRecipientsEmails = () => {
  const [externalRecipientsTag, setExternalRecipientsTag] = useState<Tag[]>([])
  const [externalEmailSuggestions, setExternalEmailSuggestions] = useState<
    Tag[]
  >([])

  const handleChange = useCallback(async (keyword: string) => {
    if (EMAIL_REGEX.test(keyword)) {
      setExternalEmailSuggestions((pre) => [
        ...pre,
        {
          value: keyword,
          label: keyword,
        },
      ])
    }
  }, [])
  const setExternalRecipients = (tag: Tag) => {
    setExternalRecipientsTag(() => [...externalRecipientsTag, tag])
  }
  const removeExternalRecipients = useCallback((index: number) => {
    setExternalRecipientsTag(
      externalRecipientsTag.filter((item, i) => i !== index),
    )
  }, [])

  return (
    <Flex
      direction="row"
      className="border-pp-gray-4 h-[40px] w-[100%] border-b"
      align={'center'}
      position="relative"
    >
      <SendExternalTitle />
      <ReactTags
        selected={externalRecipientsTag}
        suggestions={externalEmailSuggestions}
        onInput={handleChange}
        onAdd={setExternalRecipients}
        onDelete={removeExternalRecipients}
        collapseOnSelect
        noOptionsText="No Matches"
        placeholderText=""
        labelText=""
        renderInput={(inputProps) => (
          <input {...inputProps} className="flex-grow outline-none" />
        )}
        renderRoot={({ children, ...rootProps }) => (
          <Box className="border-none" {...rootProps}>
            {children}
          </Box>
        )}
      />
    </Flex>
  )
}

export { ExternalRecipientsEmails }
