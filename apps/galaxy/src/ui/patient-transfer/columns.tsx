import { Flex } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import { ChevronRight, EditIcon, HistoryIcon } from 'lucide-react'
import {
  ColumnHeader,
  DateTimeCell,
  LongTextCell,
  TextCell,
} from '@/components'
import { DocumentIcon } from '@/components/icons'
import { Sort } from '@/types'
import { getSortDir } from '@/utils'
import AcceptingFacilityStatusCell from './accepting-facility-status-cell'
import TransferingFacilityStatusCell from './transfering-facility-status-cell'
import { PatientTransfer } from './types'


const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<PatientTransfer>[] => {
  return [
    {
      id: 'firstName',
      header: ({ column }) => (
        <ColumnHeader
          label="First Name"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => {
        return (
          <LongTextCell className="w-[150px]">
            {row.original.firstName}
          </LongTextCell>
        )
      },
    },
    {
      id: 'middleName',
      header: ({ column }) => (
        <ColumnHeader
          label="Middle Name"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => {
        return (
          row.original.middleName && (
            <DateTimeCell>{row.original.middleName}</DateTimeCell>
          )
        )
      },
    },
    {
      id: 'lastName',
      header: ({ column }) => (
        <ColumnHeader
          label="Last Name"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => {
        return (
          row.original.lastName && (
            <DateTimeCell>{row.original.lastName}</DateTimeCell>
          )
        )
      },
    },
    {
      id: 'dateOfBirth',
      header: ({ column }) => (
        <ColumnHeader
          label="DOB"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => {
        return (
          row.original.dateOfBirth && (
            <TextCell>{row.original.dateOfBirth}</TextCell>
          )
        )
      },
    },

    {
      id: 'age',
      header: ({ column }) => (
        <ColumnHeader
          label="Age"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => {
        return (
          row.original.age && <DateTimeCell>{row.original.age}</DateTimeCell>
        )
      },
    },

    {
      id: 'gender',
      header: ({ column }) => (
        <ColumnHeader
          label="Gen."
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => {
        return (
          row.original.gender && (
            <DateTimeCell>{row.original.gender}</DateTimeCell>
          )
        )
      },
    },

    {
      id: 'guardian',
      header: ({ column }) => (
        <ColumnHeader
          label="Guardian"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => {
        return (
          row.original.guardian && (
            <DateTimeCell>{row.original.guardian}</DateTimeCell>
          )
        )
      },
    },

    {
      id: 'phone',
      header: ({ column }) => (
        <ColumnHeader
          label="Phone"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => {
        return (
          row.original.phone && (
            <DateTimeCell>{row.original.phone}</DateTimeCell>
          )
        )
      },
    },
    {
      id: 'email',
      header: ({ column }) => (
        <ColumnHeader
          label="Email"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => {
        return (
          row.original.email && (
            <DateTimeCell>{row.original.email}</DateTimeCell>
          )
        )
      },
    },

    {
      id: 'last4ss',
      header: ({ column }) => (
        <ColumnHeader
          label="Last 4 SS"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => {
        return (
          row.original.last4ss && (
            <DateTimeCell>{row.original.last4ss}</DateTimeCell>
          )
        )
      },
    },

    {
      id: 'legal',
      header: ({ column }) => (
        <ColumnHeader
          label="Legal"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => {
        return (
          row.original.legal && (
            <DateTimeCell>{row.original.legal}</DateTimeCell>
          )
        )
      },
    },

    {
      id: 'insurance',
      header: ({ column }) => (
        <ColumnHeader
          label="Insurance"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => {
        return (
          row.original.insurance && (
            <DateTimeCell>{row.original.insurance}</DateTimeCell>
          )
        )
      },
    },

    {
      id: 'linked',
      header: ({ column }) => (
        <ColumnHeader
          label="Linked"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => {
        return (
          row.original.linked && (
            <DateTimeCell>{row.original.linked}</DateTimeCell>
          )
        )
      },
    },

    {
      id: 'facesheet',
      header: ({ column }) => (
        <ColumnHeader
          label="Facesheet"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => {
        return (
          row.original.facesheet && (
            <Flex>
              <DocumentIcon className="h-4" />
              <LongTextCell>{'file.docs'}</LongTextCell>
            </Flex>
          )
        )
      },
    },

    {
      id: 'details',
      header: ({ column }) => (
        <ColumnHeader
          label="Details"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => {
        return (
          row.original.details && (
            <Flex className=" flex w-full items-center justify-between px-1  ">
              <LongTextCell>View</LongTextCell>
              <ChevronRight size={12} strokeWidth={1.3} cursor={'pointer'} />
            </Flex>
          )
        )
      },
    },

    {
      id: 'documents',
      header: ({ column }) => (
        <ColumnHeader
          label="Documents"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => {
        return (
          row.original.documents && (
            <Flex>
              <DocumentIcon className="h-4" />
              <LongTextCell>{'file.docs'}</LongTextCell>
            </Flex>
          )
        )
      },
    },

    {
      id: 'transfering',
      header: ({ column }) => (
        <ColumnHeader column={column} label="Transfering" />
      ),
      columns: [
        {
          id: 'transferingLocation',
          size: 50,
          header: ({ column }) => (
            <ColumnHeader
              label="Transfering Location"
              column={column}
              sortable
              sortDir={getSortDir(column.id, sort)}
              onClick={() => {
                onSort?.(column.id)
              }}
            />
          ),
          cell: ({ row }) => (
            <TextCell>{row.original.transferingLocation ?? 0}</TextCell>
          ),
        },
        {
          id: 'transferingNurse',
          header: ({ column }) => (
            <ColumnHeader
              label="Transfering Nurse"
              column={column}
              sortable
              sortDir={getSortDir(column.id, sort)}
              onClick={() => {
                onSort?.(column.id)
              }}
            />
          ),
          cell: ({ row }) => (
            <TextCell>{row.original.transferingNurse ?? 0}</TextCell>
          ),
        },

        {
          id: 'transferingNursePhoneNumber',
          header: ({ column }) => (
            <ColumnHeader
              label="Transfering Nurse Phone No"
              column={column}
              sortable
              sortDir={getSortDir(column.id, sort)}
              onClick={() => {
                onSort?.(column.id)
              }}
            />
          ),
          cell: ({ row }) => (
            <TextCell>{row.original.transferingNursePhoneNumber ?? 0}</TextCell>
          ),
        },
      ],
    },

    {
      id: 'accepting',
      header: ({ column }) => (
        <ColumnHeader column={column} label="Accepting" />
      ),
      columns: [
        {
          id: 'acceptingLocation',
          size: 50,
          header: ({ column }) => (
            <ColumnHeader
              label="Accepting Location"
              column={column}
              sortable
              sortDir={getSortDir(column.id, sort)}
              onClick={() => {
                onSort?.(column.id)
              }}
            />
          ),
          cell: ({ row }) => (
            <TextCell>{row.original.acceptingLocation ?? 0}</TextCell>
          ),
        },
        {
          id: 'acceptingNurse',
          header: ({ column }) => (
            <ColumnHeader
              label="Accepting Nurse"
              column={column}
              sortable
              sortDir={getSortDir(column.id, sort)}
              onClick={() => {
                onSort?.(column.id)
              }}
            />
          ),
          cell: ({ row }) => (
            <TextCell>{row.original.acceptingNurse ?? 0}</TextCell>
          ),
        },

        {
          id: 'acceptingNursePhoneNumber',
          header: ({ column }) => (
            <ColumnHeader
              label="Accepting Nurse Phone No"
              column={column}
              sortable
              sortDir={getSortDir(column.id, sort)}
              onClick={() => {
                onSort?.(column.id)
              }}
            />
          ),
          cell: ({ row }) => (
            <TextCell>{row.original.acceptingNursePhoneNumber ?? 0}</TextCell>
          ),
        },
      ],
    },

    {
      id: 'service',
      header: ({ column }) => (
        <ColumnHeader
          label="Service"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => {
        return (
          row.original.service && (
            <DateTimeCell>{row.original.service}</DateTimeCell>
          )
        )
      },
    },

    {
      id: 'serviceStatus',
      header: ({ column }) => (
        <ColumnHeader column={column} label="Service Status" />
      ),
      columns: [
        {
          id: 'transferingFacility',
          size: 50,
          header: ({ column }) => (
            <ColumnHeader
              label="Transfering Facility"
              column={column}
              sortable
              sortDir={getSortDir(column.id, sort)}
              onClick={() => {
                onSort?.(column.id)
              }}
            />
          ),
          cell: ({ row }) => {
            return (
              row.original.transferingFacility && (
                <Flex className=" w-full">
                  <TransferingFacilityStatusCell
                    status={row.original.transferingFacility}
                  />
                </Flex>
              )
            )
          },
        },
        {
          id: 'acceptingFacility',
          header: ({ column }) => (
            <ColumnHeader
              label="Accepting Facility"
              column={column}
              sortable
              sortDir={getSortDir(column.id, sort)}
              onClick={() => {
                onSort?.(column.id)
              }}
            />
          ),
          cell: ({ row }) => {
            return (
              row.original.acceptingFacility && (
                <Flex className=" w-full">
                  <AcceptingFacilityStatusCell
                    status={row.original.acceptingFacility}
                  />
                </Flex>
              )
            )
          },
        },
      ],
    },

    {
      id: 'user',
      header: ({ column }) => (
        <ColumnHeader
          label="User"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => {
        return (
          row.original.user && <DateTimeCell>{row.original.user}</DateTimeCell>
        )
      },
    },

    {
      id: 'date',
      header: ({ column }) => (
        <ColumnHeader
          label="Date/Time When Status Changed"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => {
        return (
          row.original.date && <DateTimeCell>{row.original.date}</DateTimeCell>
        )
      },
    },

    {
      id: 'timeElapsed',
      header: ({ column }) => (
        <ColumnHeader
          label="Time Elapsed"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => {
        return (
          row.original.timeElapsed && (
            <DateTimeCell>{row.original.timeElapsed}</DateTimeCell>
          )
        )
      },
    },

    {
      id: 'actions',
      header: () => <ColumnHeader label="Actions" />,
      cell: () => {
        return (
          <Flex className=" flex w-full cursor-pointer items-center justify-center gap-1">
            <EditIcon width={15} height={15} strokeWidth={1.75} />
            <HistoryIcon width={15} height={15} strokeWidth={1.75} />
          </Flex>
        )
      },
    },
  ]
}

export { columns }
