import React from 'react'
import { IconButton } from '@radix-ui/themes'
import { SearchIcon } from 'lucide-react'
import Input from '../../../../shared-blocks/input'

const FIELD_ID = 'search'

const SearchBlock = () => {
  return (
    <Input
      placeholder="Search"
      label="Search"
      field={FIELD_ID}
      className={'w-1/2'}
      prefix={
        <IconButton type="button" variant="ghost" className="z-10 ml-[-30px]">
          <SearchIcon height="14" width="14" />
        </IconButton>
      }
    />
  )
}

export default SearchBlock
