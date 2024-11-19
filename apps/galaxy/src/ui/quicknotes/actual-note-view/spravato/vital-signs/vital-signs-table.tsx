import * as React from 'react'
import { Table } from '@radix-ui/themes'

const VitalSignsTable = ({ vitalSigns }: any) => {
  return (
    <Table.Root className="w-[400px]">
      <Table.Header>
        <Table.Row>
          <Table.Cell className="max-[110px] p-0 text-1 font-medium">
            Date:
          </Table.Cell>
          <Table.Cell className="max-[110px] p-0 text-1 font-medium">
            BP (sys/dia):
          </Table.Cell>
          <Table.Cell className="max-[110px] p-0 text-1 font-medium">
            HR:
          </Table.Cell>
          <Table.Cell className="max-[110px] p-0 text-1 font-medium">
            RR:
          </Table.Cell>
          <Table.Cell className="max-[110px] p-0 text-1 font-medium">
            Pulse Oximetry:
          </Table.Cell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {vitalSigns.map((row: any, index: number) => (
          <Table.Row key={`${[...Array(vitalSigns.length).keys()][index]}`}>
            <Table.Cell className="max-[110px] p-0 text-1 font-regular">
              {row.vitalSignDateTime}
            </Table.Cell>
            <Table.Cell className="max-[110px] p-0 text-1 font-regular">
              {`${row.systolic}/${row.diastolic} mmHg`}
            </Table.Cell>
            <Table.Cell className="max-[110px] p-0 text-1 font-regular">
              {`${row.heartRate} bpm`}
            </Table.Cell>
            <Table.Cell className="max-[110px] p-0 text-1 font-regular">
              {`${row.respiratoryRate} bpm`}
            </Table.Cell>
            <Table.Cell className="max-[110px] p-0 text-1 font-regular">
              {`${row.pulseOximetry}`}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

export { VitalSignsTable }
