import React from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { ReactTags } from 'react-tag-autocomplete'
import 'react-tag-autocomplete/example/src/styles.css'
import { useDebouncedCallback } from 'use-debounce'
import { SendToUserTitle } from '.'

const UserRecipientsEmails = () => {
  const handleOnDelete = () => {}
  const handleChange = () => {}
  const handleOnAdd = () => {}
  const handleChangeDebounce = useDebouncedCallback(handleChange, 1000)

  return (
    <Flex
      direction="row"
      className="border-pp-gray-4 h-[40px] w-[100%] border-b"
      align={'center'}
      position="relative"
    >
      <SendToUserTitle />
      <ReactTags
        selected={[]}
        suggestions={[]}
        onInput={handleChangeDebounce}
        onAdd={handleOnAdd}
        onDelete={handleOnDelete}
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

export { UserRecipientsEmails }
