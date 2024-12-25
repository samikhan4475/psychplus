'use client';

import { Grid } from '@radix-ui/themes';
import { CLIAField } from './clia-field';
import { FaxField } from './fax-field';
import { NameField } from './name-field';
import { NPIField } from './npi-field';
import { OrganizationField } from './organization-field';
import { PhoneField } from './phone-field';
import { DefaultProviderSelect } from './provider-select';
import { StatusSelect } from './status-select';
import { TaxonomyCodeField } from './taxonomy-code-field';
import { TINField } from './tin-field';

const PracticeInfoFields = () => {
  return (
    <Grid columns="6" gap="2" px="2" py="1" className='bg-white'>
      <NameField />
      <NPIField />
      <TINField />
      <TaxonomyCodeField />
      <CLIAField />
      <OrganizationField />
      <StatusSelect />
      <PhoneField />
      <FaxField />
      <DefaultProviderSelect />
    </Grid>
  );
};

export { PracticeInfoFields };
