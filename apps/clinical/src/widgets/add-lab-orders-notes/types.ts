import { Row, Table } from '@tanstack/react-table'
import { LabOrder } from '../lab-order/types'
import { ToastData } from '@/providers'

interface Metadata {
  createdOn?: string
  createdBy?: number
  createdByFullName?: string
  updatedOn?: string
  updatedBy?: number
  updatedByFullName?: string
  deletedOn?: string
  deletedBy?: number
  deletedByFullName?: string
}

interface LabTest {
  id?: string | null
  metadata?: Metadata
  recordStatus?: string
  testName?: string
  orderId?: string | null
  labTestCode?: string
  labTestCodeType?: string
  labAssignedCode?: string
}
interface LabSearchPayload {
  idList?: string[]
  consolidatorIds?: string[]
  resourceStatusList?: string[]
  testCode?: string
  testName?: string
}

interface OrderingLab {
  id: string
  metadata: Metadata
  recordStatus: string
  name: string
  locationId: string
  consolidatorId: string
  labGroupId: string
  contactDetails: object
  isTest: boolean
}

interface Result {
  id: string
  metadata: Metadata
  labTestId: string
  orderId: string
  observationTime: string
  resultCode: string
  resultValue: string
  resultValueUnit: string
  recomendedValue: string
  statusCode: string
  abnormalRangeCode: string
  physicianComments: string
  externalResultId: string
  labComments: string
  resultValueType: 'FreeText' | 'Numeric' | 'Boolean' | 'DateTime' // Assuming possible types
  valueDescription: string
  recordStatus: 'Active' | 'Inactive' // Assuming possible statuses
}

// Exam
interface WpcResultData {
  id: string
  metadata: Metadata
  recordStatus: string
  orderId: string
  labTestCode: string
  testName?: string
  labTestCodeType: string
  labTestId?: string
  labOrderNumber: number
  labId: string
  patientId: number
  appointmentId: number
  orderStatus: string
  orderingStaffId: number
  orderingStaffName: string
  isFasting: boolean
  isLabDraw: boolean
  isTest: boolean
  labOrderDate: string
  orderingLab: OrderingLab
  labTests: LabTest[]
  labResults: Result[]
  checked: boolean
  disabled: boolean
}

interface DataTableRowActionsProps {
  toast: (data: ToastData) => void
  data: Row<LabOrder>
  handlerPlaceOrder: (labTestId: string) => void
  handlerAddWpcResult: (WpcData: LabOrder) => void
  handleToggle: (clickedItem: LabOrder, type: string) => void,
}
interface ResultActionCellProps {
  toast: (data: ToastData) => void
  row: Row<ResultData>
  table: Table<ResultData>
  appointmentId?: string | null
}
export enum MenuItem {
  Delete = 'Delete',
  PlaceOrder = 'Place Order',
  AddResult = 'Add Result',
}
export enum FlagEnum {
  Low = 'L',
  Normal = 'N',
}
interface ResultsTableProps {
  handlerWpcClose?: () => void
  viewWpcResult?: boolean
  labTest: LabOrder

  wpcEditData: ResultData[]
}
interface GetWBCColumnsParams {
  toast: (data: ToastData) => void
  labTest?: LabOrder
  handleInputChange: (type: string, label: string, value: any) => void
  viewWpcResult?: boolean
  appointmentId?: string | null
  resultFlags?: DropType[]
  resultStatus?: DropType[]
  resultUnits?: DropType[]
  removeRow: (index: number) => void
}
interface UnitCellDropdownType {
  id: string
  value?: string
  label: string
  table: Table<ResultData>
  viewWpcResult?: boolean
  keyName: string
  valueName: string
  options: any
  placeholder: string
  handleInputChange: (id: string, label: string, value: string) => void
}
interface FlagDropdownCellTypes {
  row: Row<ResultData>
  table: Table<ResultData>
  viewWpcResult?: boolean
  resultFlags?: DropType[]
  handleInputChange: (uuid: string, label: string, value: any) => void;

}
interface ResultDropdownCellType {
  row: Row<ResultData>
  table: Table<ResultData>
  viewWpcResult?: boolean
  resultStatus?: DropType[]
  handleInputChange: (uuid: string, label: string, value: any) => void;

}
interface TableMeta {
  removeSpecificRow: (index: number) => void
  removeRow: () => void
  updateData: (rowIndex: number, columnId: string, value: string) => void
  revertData: (rowIndex: number, revert: boolean) => void
  editedRows: ResultData | null
  setEditedRows: React.Dispatch<React.SetStateAction<ResultData | null>>
  rowData: ResultData[]
}
interface ResultData {
  id: string
  Result?: string
  testName?: string
  orderingLab?: {
    name: string
  }
  User?: string
  ResultName?: string
  ResultValue?: string
  Unit?: string
  Code?: string
  Range?: string
  Flag?: string
  Status?: string
  Note?: string
  orderId?: string
  labOrderDate?: Date
  observationTime?: Date | string
  resultValue?: string
  valueDescription?: string
  resultValueUnit?: string
  resultCode?: string
  labTestId?: string
  recomendedValue?: string
  abnormalRangeCode?: string
  statusCode?: string
  physicianComments?: string
}
interface DropType {
  code: string
  displayName: string
}
interface ResultWBC {
  handlerWpcClose?: () => void
  viewWpcResult?: boolean
  isWpcModalOpened?: boolean
  labTest: LabOrder
  wpcEditData?: ResultData[]
}
interface SelectComponentProps {
  value?: string
  placeholder?: string
  keyName?: string
  disabled?: boolean
  valueName?: string
  className?: string
  options: any
  onChange: (value: string) => void
}
interface ObservationTypes {
  row: Row<ResultData>
  table: Table<ResultData>
  viewWpcResult?: boolean
  handleInputChange: (id: string, field: string, value: any) => void
}
export const newResult = {
  id: '1',
  observationTime: new Date(),
  resultValue: '',
  valueDescription: '',
  resultValueUnit: '',
  resultCode: '',
  labTestId: '',
  orderId: '',
  recomendedValue: '',
  abnormalRangeCode: '',
  statusCode: '',
  physicianComments: '',
}

export type {
  UnitCellDropdownType,
  ObservationTypes,
  TableMeta,
  GetWBCColumnsParams,
  SelectComponentProps,
  ResultWBC,
  DropType,
  ResultData,
  ResultsTableProps,
  DataTableRowActionsProps,
  WpcResultData,
  Result,
  LabTest,
  ResultDropdownCellType,
  FlagDropdownCellTypes,
  LabSearchPayload,
  ResultActionCellProps
}
