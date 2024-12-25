'use client';

import { FormContainer } from '@/components';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import { AddressGroup } from './address-group';
import { PracticeInfoFields } from './practice-info-fields';
import { ProfileContentHeading } from './profile-content-heading';
import { ProfileHeader } from './profile-header';

const ProfileSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  npi: z.string().optional(),
  tin: z.string().optional(),
  taxonomyCode: z.string().optional(),
  clia: z.string().optional(),
  organization: z.string().optional(),
  status: z.string().optional(),
  phone: z.string().optional(),
  fax: z.string().optional(),
  provider: z.string().optional(),
  primaryAddress: z.string().optional(),
  payerAddress: z.string().optional(),
  isMailingAddressSameAsPrimary: z.string().optional().default('no'),
  isMailingAddressSameAsOrganization: z.string().optional().default('no'),
});

type ProfileSchemaType = z.infer<typeof ProfileSchema>;

const ProfileForm = () => {
  const form = useForm<ProfileSchemaType>({
    resolver: zodResolver(ProfileSchema),
    reValidateMode: 'onSubmit',
    defaultValues: {
      isMailingAddressSameAsPrimary: 'no',
      isMailingAddressSameAsOrganization: 'no'
    },
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<ProfileSchemaType> = async (data) => {}
  return (
    <FormContainer form={form} className="w-full rounded-1 shadow-2 overflow-hidden mb-4" onSubmit={onSubmit}>
      <ProfileHeader />
      <ProfileContentHeading title='Practice Info' />
      <PracticeInfoFields  />
      <ProfileContentHeading title='Address' />
      <AddressGroup  />
    </FormContainer>
  );
};

export { ProfileForm, type ProfileSchemaType };
