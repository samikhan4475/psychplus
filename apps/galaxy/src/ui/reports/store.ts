import { Code, SelectOptionType, StaffResource } from '@/types';
import { create } from 'zustand';
import { getPatientsOptionsAction, getReportParametersTypeAction, getReportsAction, getStaffAction, getTemplatesAction } from './actions';
import { Parameter, ReportFilterParameters, StaffDataOptions, Template } from './types';
import { getOrganizationRolesAction } from './actions/get-organization-roles';
import { getInsurancePayersOptionsAction } from '@/actions';
import { getProvidersOptionsAction } from '../schedule/actions';

interface Store {
  reports: Code[];
  loading: boolean;
  error: string | null;
  templates: Template[];
  templateFilters: Parameter | null;
  selectedReport: Code | null;
  selectedTemplate: Template | null;
  generatedReport: string | null;
  filtersData: ReportFilterParameters[] | null;
  staffData: StaffDataOptions[] | null;
  insuranceData: SelectOptionType[] | null;
  patientData: SelectOptionType[] | null;
  cosignerData: SelectOptionType[] | null;
  fetchReportsAndTemplates: () => void;
  setSelectedReport: (code: Code) => void;
  setSelectedTemplate: (template: Template | null) => void;
  setGeneratedReport: (report: string | null) => void;
  fetchStaffData: () => void;
  setFiltersData: (data: ReportFilterParameters[] | null) => void;
}

const useStore = create<Store>((set) => ({
  reports: [],
  error: null,
  templates: [],
  templateFilters: null,
  loading: false,
  selectedReport: null,
  selectedTemplate: null,
  generatedReport: null,
  filtersData: null,
  staffData: null,
  insuranceData: null,
  patientData: null,
  cosignerData: null,

  fetchReportsAndTemplates: async () => {
    set({ loading: true, error: null });

    const [reportsResult, templatesResult, codeParametersResult] = await Promise.all([

      getReportsAction(),
      getTemplatesAction(),
      getReportParametersTypeAction(),
    ]);
    if (reportsResult.state === 'success' && templatesResult.state === 'success' && codeParametersResult.state === 'success') {
      set({
        reports: reportsResult.data?.codes || [],
        templates: templatesResult.data || [],
        templateFilters: codeParametersResult.data || null,
        loading: false,
      });
    } else {
      set({
        error: 'Failed to fetch data',
        loading: false,
      });
    }
  },

  fetchStaffData: async () => {
    set({ error: null });

    const [staffResult, insuranceResult, patientResult, cosignerResult] = await Promise.all([
      getStaffAction(),
      getInsurancePayersOptionsAction(),
      getPatientsOptionsAction(),
      getProvidersOptionsAction(),
    ]);

    if (staffResult.state === 'success' && insuranceResult.state === 'success' && patientResult.state === 'success' && cosignerResult.state === 'success') {
      const transformedStaffData = staffResult?.data.map((staff: StaffResource) => ({
        value: String(staff.id),
        label: `${staff.legalName.firstName} ${staff.legalName.lastName}`,
      }));

      set({
        staffData: transformedStaffData || null,
        insuranceData: insuranceResult.data || null,
        patientData: patientResult.data || null,
        cosignerData: cosignerResult.data || null,
      });
    } else {
      set({
        error: 'Failed to fetch parameters options data',
      });
    }
  },

  setSelectedReport: (code: Code) => {
    set({ selectedReport: code });
  },

  setSelectedTemplate: (template: Template | null) => {
    set({ selectedTemplate: template });
  },

  setGeneratedReport: (report: any) => {
    set({ generatedReport: report });
  },

  setFiltersData: (data: any) => {
    set({ filtersData: data });
  },
}));

export { useStore };
