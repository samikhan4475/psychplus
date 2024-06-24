import { useEffect, useState } from 'react'
import { Cross2Icon, PlusIcon } from '@radix-ui/react-icons'
import { Box, Button, Dialog, Flex, Table } from '@radix-ui/themes'
import { HealthProblem } from '@psychplus/health-concerns'
import { getProblems } from '@psychplus/health-concerns/api.client'
import { Checkbox } from '@psychplus/ui/checkbox'

const AddProblemDialog = ({
  setHealthProblems,
}: {
  setHealthProblems: (healthproblems: HealthProblem[]) => void
}) => {
  const [selectedRows, setSelectedRows] = useState<HealthProblem[]>([])
  const [problems, setProblems] = useState<HealthProblem[]>([])

  const handleCheckboxChange = (
    checked: string | boolean,
    problem: HealthProblem,
  ) => {
    if (checked) {
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, problem])
    } else {
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.filter(
          (selectedProblem) => selectedProblem !== problem,
        ),
      )
    }
  }

  const handleAddButtonClick = () => {
    setHealthProblems(selectedRows)
  }
  useEffect(() => {
    getProblems(1).then(setProblems)
  }, [])

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="outline" color="gray">
          <PlusIcon />
          Add
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="relative max-w-[500px] p-12">
        <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
          <Cross2Icon />
        </Dialog.Close>
        <Box className="overflow-hidden">
          <Box className="bg-white sticky top-0 z-10">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell>Code</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
            </Table.Root>
          </Box>
          <Box className="max-h-[400px] overflow-y-auto">
            <Table.Root>
              <Table.Body>
                {problems.map((problem) => (
                  <Table.Row key={problem.id}>
                    <Table.RowHeaderCell>
                      <Flex align="center" gap="2">
                        <Checkbox
                          color="blue"
                          data-testid="problem-checkbox"
                          checked={selectedRows.some(
                            (selectedProblem) =>
                              selectedProblem.id === problem.id,
                          )}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(checked, problem)
                          }
                        />

                        {problem.symptomCode}
                      </Flex>
                    </Table.RowHeaderCell>
                    <Table.Cell>{problem.symptomCodeDescription}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Box>
        <Flex className="sticky bottom-0 z-10" justify="end" gap="2" mt="5">
          <Dialog.Close>
            <Button
              className="rounded-2 bg-[#151B4A] px-4 py-2 text-[white]"
              onClick={handleAddButtonClick}
            >
              Add
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button variant="outline" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddProblemDialog }
