import { SubmitterList } from "../types";

export const submitterListTableSchema: SubmitterList = {
  tablePageSize: 25,
  manualPagination: true,
  columns: [{
    id: 'name',
    title: 'Name',
    rowName: 'name',
    editable: false,
    type: 'text',
    enableHiding: false,
    text: (text: string) => `${(text || 'N/A')}`
  }, {
    id: 'userName',
    title: 'User Name',
    rowName: 'username',
    editable: false,
    type: 'text',
    enableHiding: false,
    text: (text: string) => `${(text || 'N/A')}`
  }, {
    id: 'userPassword',
    title: 'User Password',
    rowName: 'password',
    editable: false,
    type: 'text',
    enableHiding: false,
    text: (text: string) => `${(text || 'N/A')}`
  }, {
    id: 'userEmail',
    title: 'User Email',
    rowName: 'email',
    editable: false,
    type: 'text',
    enableHiding: false,
    text: (text: string) => `${(text || 'N/A')}`
  }, {
    id: 'submitterId',
    title: 'Submitter Id',
    rowName: 'submitterId',
    editable: false,
    type: 'text',
    enableHiding: false,
    text: (text: string) => `${(text || 'N/A')}`
  }, {
    id: 'address1',
    title: 'Address 1',
    rowName: 'addressLine1',
    editable: false,
    type: 'text',
    enableHiding: false,
    text: (text: string) => `${(text || 'N/A')}`
  }, {
    id: 'address2',
    title: 'Address 2',
    rowName: 'addressLine2',
    editable: false,
    type: 'text',
    enableHiding: false,
    text: (text: string) => `${(text || 'N/A')}`
  }, {
    id: 'city',
    title: 'City',
    rowName: 'city',
    editable: false,
    type: 'text',
    enableHiding: false,
    text: (text: string) => `${(text || 'N/A')}`
  }, {
    id: 'state',
    title: 'State',
    rowName: 'state',
    editable: false,
    type: 'text',
    enableHiding: false,
    text: (text: string) => `${(text || 'N/A')}`
  }, {
    id: 'zip',
    title: 'Zip',
    rowName: 'zip',
    editable: false,
    type: 'text',
    enableHiding: false,
    text: (text: string) => `${(text || 'N/A')}`
  }, {
    id: 'contactPerson',
    title: 'Contact Person',
    rowName: 'contactPerson',
    editable: false,
    type: 'text',
    enableHiding: false,
    text: (text: string) => `${(text || 'N/A')}`
  }, {
    id: 'phone',
    title: 'Phone',
    rowName: 'phone',
    editable: false,
    type: 'text',
    enableHiding: false,
    text: (text: string) => `${(text || 'N/A')}`
  }, {
    id: 'fax',
    title: 'Fax',
    rowName: 'fax',
    editable: false,
    type: 'text',
    enableHiding: false,
    text: (text: string) => `${(text || 'N/A')}`
  }, {
    id: 'actions',
    title: 'Actions',
    rowName: 'actions',
    editable: false,
    enableHiding: false,
    type: 'dropdown',
    dropdownValues: [{ label: 'Edit', value: 'Edit' }, { label: 'Delete', value: 'Delete' }],
    text: (text: string) => `${(text || 'N/A')}`
  }]
}

