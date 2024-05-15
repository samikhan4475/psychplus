'use client'

import { forwardRef, useState } from 'react'
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import { Box, Flex, IconButton, TextFieldInput } from '@radix-ui/themes'

interface PasswordInputProps
  extends React.ComponentProps<typeof TextFieldInput> {
  value?: string
  defaultValue?: string
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
    return (
      <Flex align="center">
        <Box className="w-full">
          <TextFieldInput
            width="100%"
            type={isPasswordVisible ? 'text' : 'password'}
            {...props}
            ref={ref}
          />
        </Box>
        <IconButton
          type="button"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          variant="ghost"
          className="z-10 ml-[-30px]"
        >
          {isPasswordVisible ? (
            <EyeOpenIcon height="14" width="14" />
          ) : (
            <EyeClosedIcon height="14" width="14" />
          )}
        </IconButton>
      </Flex>
    )
  },
)

PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
