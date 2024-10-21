import { Box, Flex } from '@radix-ui/themes'
import React from 'react'
import { FilterForm } from './submission-filter-form'
import { SubmissionTable } from './submission-table'
import { SubmissionTablePagination } from './submission-table-pagination'
const ElectronicPaperSubmissionView = () => {
    return (
        <Flex direction="column">
            <FilterForm />
            <Flex direction="column" mt="2" className="flex-1 bg-white ">
                <Box className="flex-1 overflow-auto">
                    <SubmissionTable />
                </Box>
                <SubmissionTablePagination />
            </Flex>
        </Flex>
    )
}
export { ElectronicPaperSubmissionView }