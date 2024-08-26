import { useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { TextField } from '@radix-ui/themes'
import { useStore } from '../store'

const FilterForm = () => {
  const [filter, setFilter] = useState<string>('')

  const {
    assigningAuthorities,
    setAssigningAuthorities,
    newAssigningAuthority,
  } = useStore((state) => ({
    assigningAuthorities: state.assigningAuthorities,
    setAssigningAuthorities: state.setAssigningAuthorities,
    newAssigningAuthority: state.newAssigningAuthority,
  }))

  const [allAuthorities, setAllAuthorities] = useState(assigningAuthorities)

  useEffect(() => {
    setAllAuthorities(assigningAuthorities)
  }, [newAssigningAuthority])

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.toLowerCase()
    setFilter(inputValue)
    filterAuthorities(inputValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const inputValue = (e.target as HTMLInputElement).value.toLowerCase()
      filterAuthorities(inputValue)
    }
  }

  const filterAuthorities = (inputValue: string) => {
    const filteredAuthorities = allAuthorities.filter(
      (authority) =>
        authority.displayName.toLowerCase().includes(inputValue) ||
        authority.namespace.toLowerCase().includes(inputValue) ||
        authority?.oid?.toLowerCase().includes(inputValue),
    )
    setAssigningAuthorities(filteredAuthorities)
  }
  return (
    <TextField.Root className="w-1/3" defaultValue={filter}>
      <TextField.Root
        placeholder="Filter"
        name="Filter"
        onChange={handleFilterChange}
        onKeyDown={handleKeyDown}
      />
      <TextField.Slot>
        <MagnifyingGlassIcon />
      </TextField.Slot>
    </TextField.Root>
  )
}

export { FilterForm }
