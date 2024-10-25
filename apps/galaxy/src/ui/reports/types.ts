import { Code, MetadataCodeset } from "@/types"


export interface TemplateParameter {
  id?: string;
    reportParameterCode: string;
    displayName: string;
    resourceStatus: string;
    reportTemplateId?: string;
    displayOrder: number;
    runValue?: string;
}

interface Template {
  id?: string
  shortName: string
  displayName: string
  reportCategoryCode: string
  isAdhocAllowed?: boolean
  parameters?:TemplateParameter[];
  permittedRoles?: string[]
}

interface CodeAttributes {
  metadata?: MetadataCodeset
  name: string
  content: string
}

type CodeSetIndex = { [key: string]: Code[] | undefined }

interface ParameterCodeSet {
  code: string
  metadata: MetadataCodeset
  displayName: string
  codeAttributes: CodeAttributes[]
}
interface Parameter {
  codeSystemName: string
  displayName: string
  codes: ParameterCodeSet[]
}

interface ReportFilterParameters {
  id: string;
  runValue: string;
}
interface StaffDataOptions {
  value: string;
  label: string;
}

export enum CODE_PARAM_ATTRIBUTES {
  DATA_TYPE = 'DataType',
  STRING = 'String',
  DATEONLY = 'DateOnly',
  SELECTION = 'Selection'
}

export enum REPORT_TYPE {
  HTML = 'HTML',
  CSV = 'CSV',
  PDF = 'PDF',
  EXCEL = 'EXCEL'
}
export enum STATUS {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}

export enum INTERVAL {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year'
}
export enum REPEAT_INTERVAL {
  NOREPEAT = 'notrepeat',
  ONE = '1',
  TWO = '2',
  THREE = '3'
}
export enum STAFF_SELECTION {
  STAFF_SELECTION_SPECIALIST_TYPE = 'StaffSelectionSpecialistType',
  SPECIALIST_TYPE = 'SpecialistType',
}
export type { Template, Parameter, CodeSetIndex, ReportFilterParameters,ParameterCodeSet, StaffDataOptions }