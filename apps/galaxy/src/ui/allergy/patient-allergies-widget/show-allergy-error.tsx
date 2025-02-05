'use client'

import { Text } from '@radix-ui/themes'

const ShowAllergiesError = ({ errorMessage }: { errorMessage: string }) => {
  return <Text className="text-[12px] text-tomato-11">{errorMessage}</Text>
}

export { ShowAllergiesError }
