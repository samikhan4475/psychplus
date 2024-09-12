import { useEffect, useLayoutEffect, useState } from 'react';
import { findProvider, fetchSpecimenAgainstLabOrder, getProblems, getSpecimen, getLabLocation, getProviderAgainstLabOrder } from '@psychplus/lab-orders/api.client';
import { Diagnostic, LabTest, Person, SearchDropdownTypes, UseDiagnosticDataParams } from '../types';
import { fetchCreatedDiagnosticData, parseDateTime, removeDuplicates, searchDiagnoses, searchTest } from '../utils';
import { NewAppointment, RecordTypes, SpecimenData } from '@psychplus/lab-orders/types';

// Fetch Data
export const useDiagnosticData = ({
  appointmentId,
  orderId = null,
  patientId = null,
  setSelectedDiagnostics,
  isEdit
}: UseDiagnosticDataParams) => {
  const [diagnosticData, setDiagnosticData] = useState<Diagnostic[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDiagnosis = async (value: string) => {
    if (value !== "") {
      setLoading(true)
      const data = await searchDiagnoses(value);
      setDiagnosticData(data);
      setLoading(false)
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const [data, diagnosisCreatedData] = await Promise.all([
        usefetchDiagnosticData(patientId),
        isEdit ? fetchCreatedDiagnosticData(appointmentId, orderId) : Promise.resolve(null)
      ]);

      if (isEdit && diagnosisCreatedData && data) {
        const uniqueDignosis = removeDuplicates([...diagnosisCreatedData, ...data], 'symptomCodeDescription')
        setDiagnosticData(uniqueDignosis);
        setSelectedDiagnostics(diagnosisCreatedData);
      } else {
        const updatedDiagnosis = data && data.filter((item) => item.activeStatus === "Active").map((item) => ({ ...item, checked: true })) || [];
        setDiagnosticData(updatedDiagnosis);
        setSelectedDiagnostics(updatedDiagnosis);
      }
    };
    fetchData();
  }, [patientId, appointmentId, orderId, isEdit]);


  return { diagnosticData, setDiagnosticData, fetchDiagnosis, loading };
};


export const useTestData = (uniqueTestData: LabTest[]) => {
  const [testData, setTestData] = useState<LabTest[]>(uniqueTestData || []);

  const fetchTest = async (value: string) => {
    if (value !== "") {
      const data = await searchTest(value);
      setTestData(data);
    }
  };
  return { testData, setTestData, fetchTest };
};

export const useProvider = (orderingStaffId?: string) => {
  const [provider, setProvider] = useState<Person | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useLayoutEffect(() => {
    const fetchProvider = async () => {
      setLoading(true);
      try {
        if (orderingStaffId) {
          const providerData = await findProvider(orderingStaffId);
          setProvider(providerData);
          setError(null);
        }
      } catch (error) {
        setError("Failed to fetch provider data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProvider();
  }, [orderingStaffId]);

  return { provider, loading, error, setProvider };
};

export const useSpecimenDropdownData = () => {
  const [specimenTypeData, setSpecimenTypeData] = useState<SearchDropdownTypes[]>([]);
  const [specimenRoleData, setSpecimenRoleData] = useState<SearchDropdownTypes[]>([]);
  const [specimenAdditiveData, setSpecimenAdditiveData] = useState<SearchDropdownTypes[]>([]);
  const [specimenCollectionMethodData, setSpecimenCollectionMethodData] = useState<SearchDropdownTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await Promise.all([
          getSpecimen("HL7v2", "SpecimenType"),
          getSpecimen("HL7v2", "SpecimenRole"),
          getSpecimen("HL7v2", "SpecimentAdditive"),
          getSpecimen("HL7v2", "SpecimenCollectionMethod")
        ]);
        setSpecimenTypeData(data[0]?.codes || []);
        setSpecimenRoleData(data[1]?.codes || []);
        setSpecimenAdditiveData(data[2]?.codes || []);
        setSpecimenCollectionMethodData(data[3]?.codes || []);
        setError(null);
      } catch (error) {
        console.error('Error fetching specimen data:', error);
        setError("Failed to fetch specimen data. Please try again."); // Set error message on fetch failure
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    specimenTypeData,
    specimenRoleData,
    specimenAdditiveData,
    specimenCollectionMethodData,
    loading,
    error
  };
};

export const usefetchDiagnosticData = async (patientId?: string | null) => {
  if (patientId) {
    let diagnosticData = await getProblems(patientId);
    diagnosticData = diagnosticData.map((item) => ({ ...item, DiagnosisDescription: item.symptomCodeDescription })).filter((item) => item.symptomCodeDescription);
    return removeDuplicates(diagnosticData, 'symptomCodeDescription');
  }
};
export const useFetchLabLocationData = (locationId?: string) => {
  const [labLocation, setLabLocation] = useState<RecordTypes[]>([]);
  const [selectedLabLocation, setSelectedLabLocation] = useState<RecordTypes | null | undefined>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const labLocationData = await getLabLocation();
        setLabLocation(labLocationData);
        if (locationId) {
          const selectedLocation = labLocationData.find((location) => location.locationId === locationId);
          setSelectedLabLocation(selectedLocation);
        }
      } catch (error) {
        console.error('Error fetching lab location data:', error);
      }
    };

    fetchData();
  }, []);

  return { labLocation, selectedLabLocation, setSelectedLabLocation };
};


export const useSpecimenData = (appointmentId: string, orderId?: string | null) => {
  const [forms, setForms] = useState<SpecimenData[]>([]);

  useEffect(() => {
    const fetchSpecimen = async () => {
      if (orderId) {
        const payload = {
          "orderId": orderId,
          "resourceStatusList": [
            "Active"
          ],
        };
        try {
          let data = await fetchSpecimenAgainstLabOrder(appointmentId, orderId, payload);
          data = data.map((item) => {
            if (item?.collectedOn && item?.collectionReceivedDateTime) {
              const { date: StartDate, time: StartTime } = parseDateTime(item?.collectedOn);
              const { date: EndDate, time: EndTime } = parseDateTime(item?.collectionReceivedDateTime);
              return { ...item, StartDate: StartDate, StartTime, EndDate: EndDate, EndTime };
            }
            return item;
          }).filter((item) => item.recordStatus === "Active");
          setForms(data);
        } catch (error) {
          console.error('Error fetching specimens:', error);
        }
      }
    };
    fetchSpecimen();
  }, [orderId]);

  return { forms, setForms };
};

export const useProviderUsingAppointmentId = (appointmentId?: string) => {
  const [provider, setProvider] = useState<NewAppointment | null>(null);

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        if (appointmentId) {
          const data = await getProviderAgainstLabOrder(appointmentId);
          setProvider(data)
        }
      } catch (error) {
        console.error('Error fetching Provider:', error);
      }
    };

    fetchProvider();
  }, [appointmentId]);

  return { provider, setProvider };
};