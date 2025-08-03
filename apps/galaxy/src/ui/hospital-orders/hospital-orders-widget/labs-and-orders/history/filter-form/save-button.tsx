'use client'

import { Button } from '@radix-ui/themes'
import { Search } from 'lucide-react'
import { useStore } from '../store'

const SaveButton = () => {
  const { loading } = useStore((state) => ({
    loading: state.loading,
  }))

  return (
    <Button size="1" highContrast type="submit" disabled={loading}>
      <Search width={14} height={14} />
    </Button>
  )
}

export { SaveButton }
