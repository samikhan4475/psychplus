import { cn, getStateFullName } from '@psychplus-v2/utils'
import { Button, Flex, Table } from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'
import {
  Badge,
  ConfirmationDialog,
  EmptyFileIcon,
  FeatureEmpty,
} from '@/components-v2'
import { setDefaultPharmacyAction } from '@/features/pharmacy/actions'
import { removePharmacyAction } from '@/features/pharmacy/actions/remove-pharmacy'
import { PatientPharmacy } from '@/features/pharmacy/types'

type PharmacyTableProps = {
  headerClassName?: string
  pharmacies: PatientPharmacy[]
  isDawSystemFeatureFlagEnabled?: boolean
}

const PharmacyTableBlock = ({
  headerClassName,
  pharmacies,
  isDawSystemFeatureFlagEnabled,
}: PharmacyTableProps) => {
  let columnsHeadings = [
    '',
    'Pharmacy Name',
    'Address',
    'City',
    'State',
    'Zip Code',
    'Phone Number',
    'Actions',
  ]

  if (isDawSystemFeatureFlagEnabled) {
    columnsHeadings = columnsHeadings.filter(
      (heading) => heading !== '' && heading !== 'Actions',
    )
  }

  return (
    <Table.Root variant="surface" size="1" color="red">
      <Table.Header className={cn('bg-pp-blue-5', headerClassName)}>
        <Table.Row className="whitespace-nowrap">
          {columnsHeadings.map((header) => (
            <Table.ColumnHeaderCell
              key={header}
              className="border-pp-gray-2 h-auto border-r font-regular last:border-r-0"
            >
              {header}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {pharmacies.length === 0 ? (
          <Table.Row>
            <Table.Cell colSpan={11}>
              <FeatureEmpty
                description="No data to show yet"
                Icon={EmptyFileIcon}
              />
            </Table.Cell>
          </Table.Row>
        ) : (
          pharmacies.map((row) => (
            <Table.Row key={row.pharmacyId}>
              {!isDawSystemFeatureFlagEnabled && (
                <Table.Cell className="border-pp-gray-2 border-r">
                  {row.isPreferred ? (
                    <Badge
                      label="Primary"
                      type="highContrast"
                      className="w-20"
                    />
                  ) : (
                    <ConfirmationDialog
                      trigger={
                        <Button variant="outline" highContrast size="1">
                          Make Primary
                        </Button>
                      }
                      title="Change Primary Pharmacy"
                      description="Are you sure you want to change your primary pharmacy?"
                      saveButtonTitle="Change Primary Pharmacy"
                      toastTitle="Primary Pharmacy Changed"
                      confirmAction={() =>
                        setDefaultPharmacyAction(row.pharmacyId)
                      }
                    />
                  )}
                </Table.Cell>
              )}
              <Table.Cell className="border-pp-gray-2 border-r">
                {row.pharmacyName}
              </Table.Cell>
              <Table.Cell className="border-pp-gray-2 border-r">
                {row.pharmacyContactDetails?.addresses?.[0]?.street1 ?? '--'}
              </Table.Cell>
              <Table.Cell className="border-pp-gray-2 whitespace-nowrap border-r">
                {row.pharmacyContactDetails?.addresses?.[0]?.city ?? '--'}
              </Table.Cell>
              <Table.Cell className="border-pp-gray-2 whitespace-nowrap border-r">
                {getStateFullName(
                  row.pharmacyContactDetails?.addresses?.[0]?.state ?? '',
                ) ?? '--'}
              </Table.Cell>
              <Table.Cell className="border-pp-gray-2 whitespace-nowrap border-r">
                {row.pharmacyContactDetails?.addresses?.[0]?.postalCode ?? '--'}
              </Table.Cell>
              <Table.Cell
                className={cn(
                  'border-pp-gray-2 whitespace-nowrap border-r',
                  isDawSystemFeatureFlagEnabled && 'border-r-0',
                )}
              >
                {row.pharmacyContactDetails?.phoneNumbers?.[0]?.number ?? '--'}
              </Table.Cell>
              {!isDawSystemFeatureFlagEnabled && (
                <Table.Cell>
                  <ConfirmationDialog
                    trigger={
                      <Flex justify="center" align="center">
                        <Trash2 color="#E5484D" size={18} />
                      </Flex>
                    }
                    title="Remove Pharmacy"
                    description="Are you sure you want to remove this pharmacy?"
                    saveButtonTitle="Remove Pharmacy"
                    toastTitle="Pharmacy Removed"
                    confirmAction={() => removePharmacyAction(row.pharmacyId)}
                  />
                </Table.Cell>
              )}
            </Table.Row>
          ))
        )}
      </Table.Body>
    </Table.Root>
  )
}

export { PharmacyTableBlock }
