'use client'

import { cn } from '@psychplus/ui/cn'
import { Flex, Text, TextField } from '@radix-ui/themes'
import { useState } from 'react'
import { useStore } from '../store'
import UpdateButtons from './update-buttons'

const MAX_TITLE_LENGTH = 120

interface JournalHeaderProps {
  disabled?: boolean
  showEditButton?: boolean
  onEdit?: () => void
}

const JournalHeader = ({
  disabled = false,
  showEditButton = false,
  onEdit,
}: JournalHeaderProps) => {

  const { formData, setFormData } = useStore((state) => ({
    formData: state.formData,
    setFormData: state.setFormData,
  }))

  const [titleError, setTitleError] = useState(false)

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    if (newValue.length > MAX_TITLE_LENGTH) {
      setTitleError(true)
    } else {
      setTitleError(false)
      setFormData({
        ...formData,
        title: newValue,
      })
    }
  }

  return (
    <Flex direction="column" className="w-full">
      <Flex justify={'between'} align={'center'}>
        <Flex direction="column" className={cn("sm:ml-3 w-full p-2 sm:p-4", disabled && "opacity-50 pointer-events-none")}>
          <Flex gap="1" align="center" className='w-full'>
            <Flex>
              <Text size={{ initial: '2', sm: '3' }} weight="medium">
                Title
              </Text>
              <Text className="text-red-9">*</Text> :
            </Flex>
            <TextField.Root
              className="[&>.rt-TextFieldChrome]:opacity-0 w-full"
            >
              <TextField.Input
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="Enter journal title here"
                disabled={disabled}
                required
              />
            </TextField.Root>
          </Flex>
          {titleError && (
            <Text size="1" color="red">
              Title can't exceed {MAX_TITLE_LENGTH} characters
            </Text>
          )}
        </Flex>
        <UpdateButtons disabled={disabled} showEditButton={showEditButton} onEdit={onEdit} className='hidden sm:flex' />
      </Flex>

    </Flex>
  )
}

export default JournalHeader 