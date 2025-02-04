import { create } from 'zustand';
import { getPatientMedicationsAction } from '../client-actions';
import type { GetPatientMedicationsResponse } from '../types';

interface StoreState {
  patientId?: string;
  data?: GetPatientMedicationsResponse;
  loading?: boolean;
  error?: string;
  fetchPatientMedications: (patientId: string) => void;
}

const useStore = create<StoreState>((set, get) => ({
  patientId: undefined,
  data: undefined,
  loading: false,
  error: undefined,

  fetchPatientMedications: async (patientId: string) => {
    set({
      patientId,
      error: undefined,
      loading: true,
    });

    const result = await getPatientMedicationsAction({
      patientIds: [patientId],
    });

    if (result.state === 'error') {
      return set({
        error: result.error,
        loading: false,
      });
    }

    set({
      data: result.data,
      loading: false,
    });
  },
}));

export { useStore };
