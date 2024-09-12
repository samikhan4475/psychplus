'use client'

import { PlusIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Text, TextField } from '@radix-ui/themes'
import { FormContainer } from 'node_modules/@psychplus/ui/src/form'
import { cn } from '@psychplus/ui/cn'
import { Select } from '@psychplus/ui/select'
import { useToast } from '@/providers'
import SelectComponent from '@/widgets/add-lab-orders-notes/components/select-component'
import { useSpecimenDropdownData } from '../hooks/use-fetch-data'
import useLabOrderForm from '../hooks/use-lab-order-form'
import { displayStatuses, LabOrderFormProps, LabOrderStatus } from '../types'
import { fetchResults } from '../utils'
import { CustomsAccordion, Diagnostics, LabTestComp } from './index'
import { Questions } from './question-component'
import { CustomCheckbox } from './render-checkbox'
import { RequiredField } from './required-field'
import SearchableDropdown from './searchable-dropdown'

const LabOrderForm = ({
  isProfileScreen = false,
  isEdit = false,
  labOrderData,
  testsData,
  labTestId,
  patientId,
  appointmentId,
  orderId,
  labBillingType,
  labOrderStatus,
}: LabOrderFormProps) => {
  const { toast } = useToast()
  const {
    form,
    onSubmit,
    labBilling,
    setLabBilling,
    status,
    setStatus,
    fasting,
    setFasting,
    psdHold,
    setPsdHold,
    uniqueTestData,
    selectedTests,
    setSelectedTests,
    onSelectedItemsChange,
    setSelectedDiagnostics,
    selectedDiagnostics,
    setTime,
    time,
    setDate,
    date,
    labTestCompleted,
    addForm,
    handleChange,
    deleteForm,
    forms,
    setIsSubmit,
    isSubmitBtnDisabled,
    providerInitialValue,
    handlerLocationChange,
    labLocationid,
    labLocationData,
    isQuestionOrAnswerIsExist,
  } = useLabOrderForm({
    appointmentId,
    patientId,
    orderId,
    labOrderData,
    testsData,
    toast,
    isEdit,
  })

  const {
    specimenTypeData,
    specimenAdditiveData,
    specimenCollectionMethodData,
  } = useSpecimenDropdownData()
  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Box>
        <LabTestComp
          toast={toast}
          appointmentId={appointmentId}
          orderId={orderId}
          isEdit={isEdit}
          uniqueTestData={uniqueTestData}
          selectedTests={selectedTests}
          setSelectedTests={setSelectedTests}
        />
        {isQuestionOrAnswerIsExist && (
          <Questions
            isEdit={isEdit}
            selectedTests={selectedTests}
            form={form}
          />
        )}
        <Diagnostics
          toast={toast}
          patientId={patientId}
          appointmentId={appointmentId}
          orderId={orderId}
          isEdit={isEdit}
          setSelectedDiagnostics={setSelectedDiagnostics}
          selectedDiagnostics={selectedDiagnostics}
        />
        <Box py="2">
          <Box className="grid grid-cols-3 gap-2" my="2">
            <Box className="grid grid-cols-2 gap-2">
              <Flex gap="1" direction="column">
                <Text size="1" weight="medium">
                  Order Date
                </Text>
                <Box className="relative h-[28px] overflow-hidden rounded-2 border border-t-0 !border-[#cdced6]">
                  <TextField.Root
                    type="date"
                    onChange={({ target }) => setDate(target.value)}
                    value={date}
                    placeholder="Order Date"
                    className="absolute left-[-8px] top-0 h-[28px] w-[104px] justify-between rounded-2 border-[#ffff] text-left text-1 font-regular outline-none"
                  />
                </Box>
              </Flex>
              <Flex gap="1" direction="column">
                <Text size="1" weight="medium">
                  Order Time
                </Text>
                <Box className="relative h-[28px] overflow-hidden  border border-t-0 !border-[#cdced6]">
                  <TextField.Root
                    type="time"
                    className="absolute left-[-8px] top-0 h-[28px] w-[104px] justify-between rounded-2 border-[#ffff] text-left  text-1 font-light"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </Box>
              </Flex>
            </Box>
            <Flex
              direction="column"
              className="h-[48px] w-[196.67px]"
              gap="1"
              justify="end"
            >
              <Text size="1" weight="medium">
                Lab Location <RequiredField />
              </Text>
              <SelectComponent
                keyName="name"
                valueName="locationId"
                options={labLocationData}
                placeholder="Lab Location"
                className="h-[28px] w-full text-1 font-light"
                value={labLocationid}
                onChange={handlerLocationChange}
              />
            </Flex>
            <Flex
              direction="column"
              gap="2"
              className="h-[48px] w-[196.67px]"
              justify="end"
            >
              <Text size="1" weight="medium" className="flex items-start">
                Status <RequiredField />
              </Text>

              <Select.Root
                size="1"
                value={status}
                onValueChange={(value) => {
                  setStatus(value)
                }}
              >
                <Select.Trigger className="h-[28px] w-full text-1 font-light" />
                <Select.Content>
                  {labOrderStatus?.map(
                    (option: { value: string; label: string }) => {
                      const displayCode =
                        displayStatuses[option.value as LabOrderStatus] ||
                        option.value
                      return (
                        <Select.Item key={option.value} value={option.value}>
                          {displayCode}
                        </Select.Item>
                      )
                    },
                  )}
                </Select.Content>
              </Select.Root>
            </Flex>
          </Box>

          <Box className="grid grid-cols-3 gap-2">
            <Flex
              direction="column"
              className="h-[48px] w-[196.67px]"
              justify="end"
              gap="1"
            >
              <Text size="1" weight="medium">
                Provider
              </Text>
              <SearchableDropdown
                initialValue={providerInitialValue?.physicianName}
                className="h-[28px] w-full text-1 "
                disabled={true}
                onChange={onSelectedItemsChange}
              />
            </Flex>
            <Flex
              className="h-[48px] w-[196.67px]"
              direction="column"
              justify="end"
              gap="1"
            >
              <Text size="1" weight="medium" className="flex items-start">
                Bill Type
                <RequiredField />
              </Text>
              <SelectComponent
                keyName="label"
                valueName="value"
                options={labBillingType}
                className="h-[28px] w-full text-1 font-light !text-[#151b4a]"
                value={labBilling}
                onChange={(value) => {
                  setLabBilling(value)
                }}
              />
            </Flex>
            <Flex className="h-[48px] w-full" gap="3">
              <CustomCheckbox
                checked={fasting}
                onChange={setFasting}
                label="Fasting"
              />
              <CustomCheckbox
                checked={psdHold}
                onChange={setPsdHold}
                label="PSC Hold"
              />
            </Flex>
          </Box>
          {orderId && (
            <Box className="my-2 flex h-[32px] items-center justify-between rounded-3 border border-[#DDDDE3] bg-[#EEF2F6] p-[4px_8px_4px_8px]">
              <Text size="1" weight="medium">
                Specimen
              </Text>
              <Button
                onClick={addForm}
                className="flex h-[24px] cursor-pointer items-center gap-[8px] rounded-[2px] border border-[#9E9898CC] bg-[white] p-[2px_8px_2px_8px] text-1 font-medium text-[#151B4A]"
              >
                <PlusIcon
                  scale="2"
                  className="h-[8.25px] w-[8.25px] text-[#151B4A]"
                />
                Add
              </Button>
            </Box>
          )}
          <Box mt="2">
            {forms.map((form, index) => (
              <CustomsAccordion
                type="Specimen"
                key={form.id}
                isNew={form?.newSpecimen}
                sno={index}
                title="Specimen"
                handlerDelete={() => deleteForm(index, form.id)}
              >
                <Box className="">
                  <Flex justify="between" mb="2">
                    <Flex
                      direction="column"
                      className="h-[48px] w-[293px]"
                      gap="1"
                    >
                      <Text size="1" weight="medium">
                        Test <RequiredField />
                      </Text>
                      <Select.Root
                        size="1"
                        disabled={!form?.newSpecimen}
                        value={form.TestId}
                        onValueChange={(value) => {
                          handleChange(index, 'TestId', value)
                        }}
                      >
                        <Select.Trigger
                          placeholder="Select Test"
                          className="h-[28px] w-full font-light"
                        />
                        <Select.Content>
                          {labTestCompleted?.map(
                            (option: {
                              testName?: string
                              labTestId?: string
                            }) => {
                              if (option.labTestId && option.testName) {
                                return (
                                  <Select.Item
                                    key={option.testName}
                                    value={option.labTestId}
                                  >
                                    {option.testName}
                                  </Select.Item>
                                )
                              }
                            },
                          )}
                        </Select.Content>
                      </Select.Root>
                    </Flex>
                    <Flex
                      direction="column"
                      gap="1"
                      className="h-[48px] w-[293px]"
                    >
                      <Text size="1" weight="medium">
                        Type <RequiredField />
                      </Text>
                      <SearchableDropdown
                        keyName="displayName"
                        defaultData={specimenTypeData}
                        className="h-[28px] w-full text-1 "
                        placeholder="Search Type"
                        initialValue={form.specimenType}
                        fetchResults={async (value) =>
                          await fetchResults(specimenTypeData, value)
                        }
                        onChange={(value) =>
                          handleChange(index, 'specimenType', value.code)
                        }
                      />
                    </Flex>
                  </Flex>
                  <Flex justify="between" mb="2">
                    <Flex
                      direction="column"
                      gap="1"
                      className="h-[48px] w-[293px]"
                    >
                      <Text size="1" weight="medium">
                        Additives <RequiredField />
                      </Text>
                      <SearchableDropdown
                        defaultData={specimenAdditiveData}
                        keyName="displayName"
                        initialValue={form.specimenAdditives}
                        className="h-[28px] w-full text-1 "
                        placeholder="Search Additives"
                        fetchResults={async (value) =>
                          await fetchResults(specimenAdditiveData, value)
                        }
                        onChange={(value) =>
                          handleChange(index, 'specimenAdditives', value.code)
                        }
                      />
                    </Flex>
                    <Flex
                      direction="column"
                      gap="1"
                      className="h-[48px] w-[293px]"
                    >
                      <Text size="1" weight="medium">
                        Collection Method <RequiredField />
                      </Text>
                      <SearchableDropdown
                        keyName="displayName"
                        defaultData={specimenCollectionMethodData}
                        className="h-[28px] w-full text-1"
                        placeholder="Search Collection Method"
                        initialValue={form.collectionMethod}
                        fetchResults={async (value) =>
                          await fetchResults(
                            specimenCollectionMethodData,
                            value,
                          )
                        }
                        onChange={(value) =>
                          handleChange(index, 'collectionMethod', value.code)
                        }
                      />
                    </Flex>
                  </Flex>
                  <Box mb="2" className="grid grid-cols-3 gap-2">
                    <Flex
                      direction="column"
                      gap="1"
                      className="h-[48px] w-[191.33px]"
                    >
                      <Text size="1" weight="medium">
                        Source Site
                      </Text>
                      <TextField.Root
                        className="h-[28px] w-full text-1 font-light text-[#151b4a]"
                        placeholder="Search"
                        value={form?.sourceSite}
                        onChange={(e) =>
                          handleChange(index, 'sourceSite', e.target.value)
                        }
                      />
                    </Flex>
                    <Flex
                      direction="column"
                      gap="1"
                      className="h-[48px] w-[191.33px]"
                    >
                      <Text size="1" weight="medium">
                        Site Mode
                      </Text>
                      <TextField.Root
                        className="h-[28px] w-full text-1 font-light"
                        placeholder="Site Mode"
                        value={form?.sourceSiteModifier}
                        onChange={(e) =>
                          handleChange(
                            index,
                            'sourceSiteModifier',
                            e.target.value,
                          )
                        }
                      />
                    </Flex>
                    <Flex
                      direction="column"
                      gap="1"
                      className="h-[48px] w-[191.33px]"
                    >
                      <Text size="1" weight="medium">
                        Role
                      </Text>
                      <Select.Root
                        size="1"
                        value={form?.role}
                        onValueChange={(value) =>
                          handleChange(index, 'role', value)
                        }
                      >
                        <Select.Trigger
                          placeholder="Select Role"
                          className="h-[28px] w-full font-light"
                        />
                        <Select.Content>
                          {specimenAdditiveData.map((option) => (
                            <Select.Item key={option.code} value={option.code}>
                              {option.displayName}
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Root>
                    </Flex>
                  </Box>
                  <Box className="grid grid-cols-3 gap-2" mb="2">
                    <Box className="grid grid-cols-2 gap-2">
                      <Flex gap="1" direction="column">
                        <Text
                          size="1"
                          weight="medium"
                          className="flex items-start "
                        >
                          Start Date <RequiredField />
                        </Text>
                        <Box className="relative h-[28px] overflow-hidden  border border-t-0 !border-[#cdced6]">
                          <TextField.Root
                            type="date"
                            onChange={({ target }) =>
                              handleChange(index, 'StartDate', target.value)
                            }
                            value={form?.StartDate}
                            placeholder="Start"
                            className="absolute left-[-12px] top-0 h-[28px] w-[104px] justify-between rounded-2 border border-[#ffff] text-left text-1 font-regular"
                          />
                        </Box>
                      </Flex>
                      <Flex gap="1" direction="column">
                        <Text size="1" weight="medium">
                          Start Time <RequiredField />
                        </Text>
                        <Box className="relative h-[28px] overflow-hidden  border border-t-0 !border-[#cdced6]">
                          <TextField.Root
                            type="time"
                            className="absolute left-[-12px] top-0 h-[28px] w-[104px] justify-between rounded-2 border !border-[#cdced6] text-left  text-1 font-light"
                            value={form.StartTime}
                            onChange={(e) =>
                              handleChange(index, 'StartTime', e.target.value)
                            }
                          />
                        </Box>
                      </Flex>
                    </Box>
                    <Box className="grid grid-cols-2 gap-2">
                      <Flex direction="column" gap="1">
                        <Text
                          size="1"
                          weight="medium"
                          className="flex items-start"
                        >
                          End Date <RequiredField />
                        </Text>
                        <Box className="relative h-[28px] overflow-hidden  border border-t-0 !border-[#cdced6]">
                          <TextField.Root
                            type="date"
                            onChange={({ target }) =>
                              handleChange(index, 'EndDate', target.value)
                            }
                            value={form?.EndDate}
                            placeholder="End"
                            className="absolute left-[-12px] top-0 h-[28px] w-[104px] justify-between rounded-2 border !border-[#cdced6]  text-left text-1 font-regular"
                          />
                        </Box>
                      </Flex>
                      <Flex direction="column" gap="1">
                        <Text
                          size="1"
                          weight="medium"
                          className="flex items-start"
                        >
                          End Time <RequiredField />
                        </Text>
                        <Box className="relative h-[28px] overflow-hidden  border border-t-0 !border-[#cdced6]">
                          <TextField.Root
                            type="time"
                            className="absolute left-[-12px] top-0 h-[28px]  w-[104px] justify-between rounded-2 border !border-[#cdced6]  text-left  text-1 font-light"
                            value={form.EndTime}
                            onChange={(e) =>
                              handleChange(index, 'EndTime', e.target.value)
                            }
                          />
                        </Box>
                      </Flex>
                    </Box>
                    <Flex direction="column" gap="1">
                      <Text size="1" weight="medium">
                        Volume <RequiredField />
                      </Text>
                      <TextField.Root
                        type="number"
                        className="h-[28px] w-full text-1 font-light"
                        placeholder="Add Volume"
                        value={form?.volume}
                        onChange={(e) =>
                          handleChange(index, 'volume', e.target.value)
                        }
                      />
                    </Flex>
                  </Box>
                  <Flex justify="between" mb="2" gap="2">
                    <Flex direction="column" gap="2">
                      <Text size="1" weight="medium">
                        Measurement Unit
                      </Text>
                      <TextField.Root
                        className="h-[28px] w-[112px] text-1 font-light"
                        placeholder="Measurement Unit"
                        value={form?.measureUnit}
                        onChange={(e) =>
                          handleChange(index, 'measureUnit', e.target.value)
                        }
                      />
                    </Flex>
                    <Flex direction="column" gap="2">
                      <Text size="1" weight="medium">
                        Rejected Reason
                      </Text>
                      <TextField.Root
                        className="h-[28px] w-[231px] text-1 font-light"
                        placeholder="Search"
                        value={form.rejectReason}
                        onChange={(e) =>
                          handleChange(index, 'rejectReason', e.target.value)
                        }
                      />
                    </Flex>
                    <Flex direction="column" gap="2">
                      <Text size="1" weight="medium">
                        Condition & Disposition Info
                      </Text>
                      <TextField.Root
                        className="h-[28px] w-[231px] text-1 font-light"
                        placeholder="Search"
                        value={form.containerCondition}
                        onChange={(e) =>
                          handleChange(
                            index,
                            'containerCondition',
                            e.target.value,
                          )
                        }
                      />
                    </Flex>
                  </Flex>
                </Box>
              </CustomsAccordion>
            ))}
          </Box>
          {!isProfileScreen && (
            <Flex gap="3" justify="end" mt="4">
              <Button
                type="submit"
                disabled={isSubmitBtnDisabled}
                onClick={() => setIsSubmit(true)}
                className={cn(
                  'rounded-2 px-4 py-2 text-2 font-regular text-[white]',
                  isSubmitBtnDisabled ? 'bg-[#B9BBC6]' : 'bg-[#151B4A]',
                )}
              >
                Save
              </Button>
              <Button className="rounded-2 bg-[#151B4A] px-4 py-2 text-2 font-regular text-[white]">
                Place Order
              </Button>
            </Flex>
          )}
        </Box>
      </Box>
    </FormContainer>
  )
}

export { LabOrderForm }
