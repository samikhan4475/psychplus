import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { addLabDiagnoses, addLabOrder, addLabTests, addLabTestSpecimen, updateLabOrder, deleteSpecimenAgainstLabOrder, updateSpcimenAgainstLabOrder } from '@psychplus/lab-orders/api.client';
import { Diagnostic, LabTest, UseLabOrderFormParams } from '../types';
import { useStore } from '../store';
import { createSearchParams } from '@psychplus/utils/url';
import { useFetchLabLocationData, useProviderUsingAppointmentId, useSpecimenData } from './use-fetch-data';
import { LabOrder, NewAppointment, SpecimenData } from '@psychplus/lab-orders/types';
import { formatDateToYYYYMMDD, formatTime } from '../utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns'
import z from 'zod';
import { validate } from '@psychplus/form';

const useLabOrderForm = ({
  appointmentId,
  patientId,
  orderId,
  labOrderData,
  testsData = [],
  toast,
  isEdit
}: UseLabOrderFormParams) => {


  type ZodStringSchema = z.ZodString | z.ZodOptional<z.ZodString>;

  const generateSchema = (tests: LabTest[]) => {
    const schemaFields: Record<string, ZodStringSchema> = {}

    tests.forEach((test) => {
      test?.askAtOrderEntries?.forEach((question) => {
        const key = `question_${test.testName}_${question.questionCode}`;
        switch (question.controlType) {
          case 'FreeText':
          case 'OptionSelect':
            schemaFields[key] = question.isMandatory
              ? z.string().min(1, 'Required')
              : z.string().optional();
            break;
          default:
            break;
        }
      })
    });
    return z.object(schemaFields);
  };
  type SchemaType = z.infer<ReturnType<typeof generateSchema>>


  const router = useRouter();
  // Date and Time state handling

  // 2024-07 - 25T21: 43:00Z orderSentDateTimeorderSentDateTime
  const defaultDate = isEdit && labOrderData[0]?.labOrderDate ? formatDateToYYYYMMDD(new Date(labOrderData[0]?.labOrderDate)) : formatDateToYYYYMMDD(new Date());
  const [date, setDate] = useState<string>(defaultDate);
  const defaultTime = isEdit && labOrderData[0]?.labOrderDate
    ? formatTime(labOrderData[0]?.labOrderDate)
    : formatTime();
  const [time, setTime] = useState<string>(defaultTime);

  // Lab billing and status state handling
  const defaultLabBilling = labOrderData[0]?.billType || "Patient";
  const [labBilling, setLabBilling] = useState<string>(defaultLabBilling);
  const defaultStatus = labOrderData[0]?.orderStatus || 'Pending';
  const [status, setStatus] = useState<string>(defaultStatus);

  // Tests data handling
  const testsDefaultData = useStore((state) => state.tests);
  testsData = isEdit ? testsData : testsDefaultData;
  const updatedTestsData = testsData ? testsData.map((item: LabTest) => ({ ...item, checked: false, disabled: false })) : [];
  const labTestCompleted = labOrderData?.filter((item) => item.checked === true && item.disabled === true);
  const LabTests = isEdit ? labOrderData : testsDefaultData || []
  const combinedData = [...LabTests, ...updatedTestsData];
  const uniqueTestDataMap = new Map()


  combinedData?.forEach((item) => {
    if (item && 'testName' in item) {
      const labTestItem = item as LabTest;

      if (!uniqueTestDataMap.has(labTestItem.testName) || labTestItem?.checked) {
        uniqueTestDataMap.set(labTestItem.testName, labTestItem);
      }
    }
  });


  const uniqueTestData = Array.from(uniqueTestDataMap.values())
  // Fasting state handling
  const defaultFasting = isEdit && labOrderData[0]?.isFasting ? "yes" : "no";
  const defaultPscHold = isEdit && labOrderData[0]?.isPscHold ? "yes" : "no";
  const [fasting, setFasting] = useState<string>(defaultFasting);
  const [psdHold, setPsdHold] = useState<string>(defaultPscHold);

  // Selected tests and diagnostics state handling
  const [selectedTests, setSelectedTests] = useState<LabTest[]>(isEdit ? labOrderData : []);
  const [selectedDiagnostics, setSelectedDiagnostics] = useState<Diagnostic[]>([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const locationId = isEdit ? labOrderData[0]?.orderingLab?.locationId : "";
  const [labLocationid, setLabLocationid] = useState<string | undefined>(locationId);

  const { labLocation: labLocationData, selectedLabLocation, setSelectedLabLocation } = useFetchLabLocationData(locationId)
  const handlerLocationChange = (id: string) => {
    const selectedLocation = labLocationData.find((location) => location.locationId === id);
    setLabLocationid(id);
    if (selectedLocation) {
      setSelectedLabLocation(selectedLocation);
    }
  };
  //form data 
  const { forms, setForms } = useSpecimenData(appointmentId, orderId)
  //provider 
  const { provider: providerInitialValue, setProvider } = useProviderUsingAppointmentId(appointmentId)

  const form = useForm<SchemaType>({
    resolver: zodResolver(generateSchema(selectedTests)),
    mode: 'onChange',
  })
  const { formState } = form;

  const validateForm = () => {
    return forms?.every(form =>
      form.StartDate && form.EndDate && form.StartTime && form.EndTime && form.volume
    );
  };

  const isSubmitBtnDisabled = !formState.isValid || selectedTests.length === 0 || selectedDiagnostics.length === 0 || selectedLabLocation === null || labBilling === "" || status === "" || (isEdit && !validateForm());
  const isQuestionOrAnswerIsExist = selectedTests.some((item) => item?.askAtOrderEntries?.length || item?.labTestAnswers?.length);

  const addForm = () => {
    setForms([...forms, { collectionReceivedDateTime: "", collectedOn: "", newSpecimen: true, TestId: '', specimenType: '', specimenAdditives: '', collectionMethod: '', sourceSite: '', sourceSiteModifier: '', role: '', StartDate: formatDateToYYYYMMDD(new Date()), StartTime: '', EndDate: formatDateToYYYYMMDD(new Date()), EndTime: '', volume: 0, measureUnit: '', rejectReason: '', containerCondition: '' }]);
  };

  const deleteForm = async (index: number, specimenId: string | undefined) => {
    try {
      const updatedForms = forms.filter((_, i) => i !== index);
      setForms(updatedForms);
      if (specimenId && orderId) {
        await deleteSpecimenAgainstLabOrder(appointmentId, orderId, specimenId)
        toast({ type: 'success', title: "Delete Specimen Against Laborder Successfully" })
      }
    } catch (err) {
      if (err instanceof Error) {
        toast({ type: 'error', title: err.message, })
      } else {
        toast({ type: 'error', title: (err as { message: string }).message, })
      }
    }
  };

  const handleChange = (index: number, field: string, value: string | Date | number) => {
    const updatedForms = forms?.map((form, i) => (i === index ? { ...form, [field]: value } : form));
    setForms(updatedForms);
  };

  const onSelectedItemsChange = (item: NewAppointment) => {
    setProvider(item)
  }

  const onSubmit = async () => {
    if (!isSubmit) return;
    setIsSubmit(false);
    try {
      const orderSentDateTime = `${date}T${time}:00Z`;
      const payload = createPayload(orderSentDateTime);
      if (orderId) {
        await updateExistingOrder(payload);
      } else {
        await createNewOrder(payload);
      }
    } catch (err) {
      if (err instanceof Error) {
        toast({ type: 'error', title: err.message, })
      } else {
        toast({ type: 'error', title: (err as { message: string }).message, })
      }
    }
  };

  const createPayload = (orderSentDateTime: string) => ({
    patientId,
    appointmentId,
    orderStatus: status,
    billType: labBilling || labOrderData[0]?.billType,
    labOrderNumber: labOrderData[0]?.labOrderNumber,
    orderingStaffName: labOrderData[0]?.orderingStaffName,
    labOrderDate: orderSentDateTime,
    OrderingStaffId: providerInitialValue?.physicianStaffId,
    labId: selectedLabLocation?.id,
    isFasting: fasting === 'yes',
    isPscHold: psdHold === 'yes',
    IsTest: true,
    locationId: 0,
    orderingLab: {
      name: selectedLabLocation?.name,
      locationName: selectedLabLocation?.locationName,
      locationId: selectedLabLocation?.id,
    },
  }
  );

  const updateExistingOrder = async (payload: LabOrder) => {
    if (orderId) {
      try {
        payload.id = orderId;
        await updateLabOrder(orderId, appointmentId, payload);
        toast({ type: 'success', title: "Lab Order Update Successfully" })
        const formData = form.getValues() as SchemaType
        const updatedLabTests = selectedTests
          .map((item) => {
            const editCase = item?.labTestAnswers?.map((question) => {
              return {
                ...question,
                entryAnswer: formData[`question_${item?.testName}_${question.questionCode}`],
              }
            });
            const createCase = item.askAtOrderEntries?.map((question) => {
              const entryAnswer = formData[`question_${item?.testName}_${question.questionCode}`]
              delete question.id;
              return {
                ...question,
                entryAnswer
              };
            });
            return {
              ...item,
              id: item?.labTestId,
              orderId,
              labTestAnswers: editCase || createCase
            }
          });
        const activeDiagnostics = selectedDiagnostics
          .filter((item) => item.recordStatus === "Active" && item?.newDignoses === true)
          .map((item) => {
            delete item.id;
            delete item.metadata;
            return {
              ...item,
              diagnosisCode: item.symptomCode,
              orderId,
            }
          });
        if (updatedLabTests.length > 0) {
          await addLabTests(updatedLabTests);
          toast({ type: 'success', title: "Lab Test Created Successfully" })
        }
        if (activeDiagnostics.length > 0) {
          await addLabDiagnoses(activeDiagnostics);
          toast({ type: 'success', title: "Lab Diagnoses Created Successfully" })
        }
        await handleSpecimens();
      } catch (err) {
        if (err instanceof Error) {
          toast({ type: 'error', title: err.message, })
        } else {
          toast({ type: 'error', title: (err as { message: string }).message, })
        }
      }
    }
  };

  const createNewOrder = async (payload: LabOrder) => {
    try {
      const addLabOrderData = await addLabOrder(appointmentId, payload);
      toast({ type: 'success', title: "Lab Order Created Successfully" })
      const formData = form.getValues() as SchemaType
      const updatedLabTests = selectedTests.map((item) => {
        const { id, metadata, ...rest } = item;
        return {
          ...rest,
          orderId: addLabOrderData.id, // Ensure addLabOrderData.id is defined
          labTestAnswers: item.askAtOrderEntries?.map((question) => {
            const entryAnswer = formData[`question_${item?.testName}_${question.questionCode}`]
            delete question.id;
            return {
              ...question,
              entryAnswer
            };
          }),
        };
      });

      const activeDiagnostics = selectedDiagnostics
        .filter((item) => item.activeStatus === "Active" || item?.isActive === true)
        .map((item) => {
          delete item.id;
          delete item.metadata;
          return {
            ...item,
            diagnosisCode: item.symptomCode,
            orderId: addLabOrderData.id,
          }
        });

      await addLabTests(updatedLabTests);
      toast({ type: 'success', title: "Lab Test Created Successfully" })
      await addLabDiagnoses(activeDiagnostics);
      toast({ type: 'success', title: "Lab Dignosis Created Successfully" })
      const searchParams = createSearchParams({ appointmentId, orderId: addLabOrderData.id, patientId });
      router.push(`/widgets/add-lab-orders-notes?${searchParams.toString()}`);
    } catch (err) {
      if (err instanceof Error) {
        toast({ type: 'error', title: err.message, })
      } else {
        toast({ type: 'error', title: (err as { message: string }).message, })
      }
    }
  };

  const handleSpecimens = async () => {
    try {
      const createdSpecimens = forms.filter((item) => item.newSpecimen);
      const editSpecimens = forms.filter((item) => !item.newSpecimen && item.id);

      if (createdSpecimens.length > 0) {
        await Promise.all(createdSpecimens.map(addSpecimen));
        toast({ type: 'success', title: "Specimen Created Successfully" })
      }

      if (editSpecimens.length > 0) {
        await Promise.all(editSpecimens.map(updateSpecimen));
        toast({ type: 'success', title: "Specimen Update Successfully" })
      }
    } catch (err) {
      if (err instanceof Error) {
        toast({ type: 'error', title: err.message, })
      } else {
        toast({ type: 'error', title: (err as { message: string }).message, })
      }
    }
  };

  const addSpecimen = async (item: SpecimenData) => {
    if (item.StartDate && item.EndDate && item.StartTime && item.EndTime && item.TestId && item.volume) {
      const startDate = `${item.StartDate}T${item.StartTime}:00Z`;
      const endDate = `${item.EndDate}T${item.EndTime}:00Z`;
      const volume = typeof item.volume === 'string' ? parseFloat(item.volume) : item.volume;
      await addLabTestSpecimen(item.TestId, {
        ...item,
        collectedOn: startDate,
        collectionReceivedDateTime: endDate,
        volume,
        labSpecimen: "sdsf",
        orderId,
      });
    }
  };

  const updateSpecimen = async (item: SpecimenData) => {
    if (item.StartDate && item.EndDate && item.StartTime && item.EndTime && item.volume && item.orderId && item.id) {
      const startDate = `${item.StartDate}T${item.StartTime}:00Z`;
      const endDate = `${item.EndDate}T${item.EndTime}:00Z`;
      await updateSpcimenAgainstLabOrder(appointmentId, item.orderId, item.id, {
        ...item,
        collectedOn: startDate,
        collectionReceivedDateTime: endDate,
      });
    }
  };


  return {
    isQuestionOrAnswerIsExist,
    form,
    onSubmit,
    labBilling,
    setLabBilling,
    status,
    setStatus,
    fasting,
    setFasting,
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
    labLocationid, handlerLocationChange,
    labLocationData,
    psdHold,
    setPsdHold,
  };
};

export default useLabOrderForm;
