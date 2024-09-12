import { deleteDignosisAgainstLabOrder, deleteTestAgainstLabOrder, getDiagnosis, getSearchTests, getSearchProvidersByName, searchLabDiagnoses } from "@psychplus/lab-orders/api.client";
import { Diagnoses, Diagnostic, DropdownTypes, LabOrder, SearchDropdownTypes } from "./types";
import { format } from 'date-fns'

export const removeDuplicates = (array: any[], key: string) => {
  return Array.from(new Set(array.map((item) => item[key]))).map((id) => {
    return array.find((item) => item[key] === id);
  });
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};
export const useDropdowns = (getDropdowns: any) => {

  const mapDropdowns = (dropdownName: string) => {
    const dropdownValues = getDropdowns(dropdownName);
    return dropdownValues.map((value: DropdownTypes) => ({ value: value.label, label: value.label }));
  };
  return {
    mapDropdowns
  };
};
export const fetchCreatedDiagnosticData = async (appointmentId: string, orderId?: string | null) => {
  if (orderId) {
    const diagnosticData = await getDiagnosis(appointmentId, orderId);
    const updatedDianosticData = diagnosticData.map((item: Diagnostic) => ({ ...item, checked: true, disabled: true, DiagnosisDescription: item.symptomCodeDescription, symptomCodeDescription: item.diagnosisDescription })).filter((item) => item.recordStatus === "Active");
    return updatedDianosticData;
  }
};
export const fetchResultsHandler = (value: string) => {
  getSearchProvidersByName({ name: value })
}
export const fetchResults = (specimenTypeData: SearchDropdownTypes[], value: string) => {
  return new Promise((resolve) => {
    const results = specimenTypeData.filter((item: SearchDropdownTypes) =>
      item.displayName.toLowerCase().includes(value.toLowerCase())
    );
    resolve(results);
  });
};
export const deleteLabDignosis = async (appointmentId: string,
  orderId: string,
  dignosisId: string | number
) => {
  await deleteDignosisAgainstLabOrder(appointmentId, dignosisId, orderId)
};
export const deleteLabTest = async (appointmentId: string,
  orderId: string,
  testId: string) => {
  await deleteTestAgainstLabOrder(appointmentId,
    testId,
    orderId)
};

// Calculation Code
export const searchTest = async (value: string) => {
  const payload = isNaN(Number(value)) ? { testNames: [value] } : { testCodes: [value] };
  const testsData: LabOrder[] = await getSearchTests(payload);
  return testsData.map((item) => {
    const labTestCode = item?.testCode;
    const labTestCodeType = item?.testCode;
    delete item?.testCode;
    return { ...item, labTestCode, labTestCodeType };
  });
};

export const searchDiagnoses = async (value: string) => {
  const diagnosisData = await searchLabDiagnoses({ codeOrDescription: value, recordStatuses: ["Active"] });
  return diagnosisData.slice(0, 6).map((item: Diagnoses) => {
    const symptomCodeDescription = item?.description;
    const DiagnosisDescription = item?.description;
    const symptomCode = item?.code;
    return {
      ...item,
      symptomCodeDescription,
      DiagnosisDescription,
      symptomCode,
      recordStatus: "Active"
    };
  });
};


export function isInDateRange(startDateString: Date, startTimeString: string, endDateString: Date, endTimeString: string) {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);
  startDate.setHours(parseInt(startTimeString.split(":")[0]), parseInt(startTimeString.split(":")[1]), 0);
  endDate.setHours(parseInt(endTimeString.split(":")[0]), parseInt(endTimeString.split(":")[1]), 0);
  return { startDate, endDate };
}

export const parseDateTime = (isoString: string) => {
  const date = new Date(isoString);
  const formattedDate = date.toISOString().split('T')[0]; // "YYYY-MM-DD"
  const formattedTime = date.toTimeString().split(' ')[0].substring(0, 5); // "HH:MM"
  return { date: formattedDate, time: formattedTime };
};
export const formatTime = (date?: string) => {
  return date ? format(new Date(date), 'HH:MM') : format(new Date(), 'HH:MM');
};



export function formatDateToYYYYMMDD(date: string | Date) {
  return format(new Date(date), 'yyyy-MM-dd');
}