import { Staff } from '@psychplus/staff'

export const DUMMY_LOCATIONS = [
  {
    name: 'Austin, Texas - Domain',
    geoCoordinates: { latitude: 40.7332154, longitude: -73.9904106 },
  },
  {
    name: 'Austin, Texas - Mueller Lake Park',
    geoCoordinates: { latitude: 40.7328154, longitude: -73.9902106 },
  },
  {
    name: 'Austin, Texas - Barton Springs Pool',
    geoCoordinates: { latitude: 40.7334154, longitude: -73.9899106 },
  },
]

export const DUMMY_STAFF: Staff[] = [
  {
    id: 1,
    legalName: {
      firstName: 'Phillip',
      lastName: 'Esslinger',
    },
    staffRoleCode: '2',
    contactInfo: {
      addresses: [
        {
          street1: 'Willowbrook Clinic 13325 Hargrave Rd Houston, TX',
          postalCode: '77070',
        },
      ],
    },
    spokenLanguages: ['English'],
  },
  {
    id: 2,
    legalName: {
      firstName: 'Michael',
      lastName: 'Jacobs',
    },
    staffRoleCode: '2',
    contactInfo: {
      addresses: [
        {
          street1: 'Willowbrook Clinic 13325 Hargrave Rd Houston, TX',
          postalCode: '77070',
        },
      ],
    },
    spokenLanguages: ['Arabic'],
  },
  {
    id: 3,
    legalName: {
      firstName: 'Jignesh',
      lastName: 'Ahir',
    },
    staffRoleCode: '2',
    contactInfo: {
      addresses: [
        {
          street1: 'Willowbrook Clinic 13325 Hargrave Rd Houston, TX',
          postalCode: '77070',
        },
      ],
    },
    spokenLanguages: ['German'],
  },
  {
    id: 4,
    legalName: {
      firstName: 'Kristin',
      lastName: 'Watson',
      title: 'Dr',
    },
    staffRoleCode: '1',
    contactInfo: {
      addresses: [
        {
          street1: 'Willowbrook Clinic 13325 Hargrave Rd Houston, TX',
          postalCode: '77070',
        },
      ],
    },
    spokenLanguages: ['English'],
  },
  {
    id: 5,
    legalName: {
      firstName: 'Wade',
      lastName: 'Warren',
    },
    staffRoleCode: '1',
    contactInfo: {
      addresses: [
        {
          street1: 'Willowbrook Clinic 13325 Hargrave Rd Houston, TX',
          postalCode: '77070',
        },
      ],
    },
    spokenLanguages: ['Spanish'],
  },
  {
    id: 6,
    legalName: {
      firstName: 'Robert',
      lastName: 'Fox',
    },
    staffRoleCode: '1',
    contactInfo: {
      addresses: [
        {
          street1: 'Willowbrook Clinic 13325 Hargrave Rd Houston, TX',
          postalCode: '77070',
        },
      ],
    },
    spokenLanguages: ['French'],
  },
]

export const DUMMY_APPOINTMENT_DETAIL = {
  id: 6,
  drname: 'Dr. Kristin Watson, MSN, RN',
  staffRoleCode: 'Psychiatrist',
  appointmentType: 'In-Person',
  appointmentDate: 'Fri, Nov 24 - 9:30 am CST',
  address: {
    street1: 'Willowbrook Clinic 13325 Hargrave Rd Houston, TX',
    postalCode: '77070',
  },
}
