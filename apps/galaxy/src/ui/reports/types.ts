import { Code, MetadataCodeset } from "@/types"

interface Template {
  id?: string
  shortName: string
  displayName: string
  reportCategoryCode: string
  isAdhocAllowed: boolean
  resourceStatus: string
  parameters: []
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
export type { Template, Parameter, CodeSetIndex, ReportFilterParameters,ParameterCodeSet }