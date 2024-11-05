import React from 'react'
import { Button } from '@radix-ui/themes'
import { ExcelIcon } from '@/components/icons/excel-icon'

const UploadExcelButton = () => {
  return (
    <Button size="1" className="bg-white text-black shadow-2">
      <ExcelIcon /> Upload Excel File
    </Button>
  )
}

export { UploadExcelButton }
