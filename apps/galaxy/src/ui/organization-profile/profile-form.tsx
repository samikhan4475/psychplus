'use client';

import { FormContainer } from '@/components';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import { AddressGroup } from './address-group';
import { OrganizationInfoFields } from './organization-info-fields';
import { ProfileContentHeading } from './profile-content-heading';
import { ProfileHeader } from './profile-header';

const ProfileSchema = z.object({
  id: z.string().optional(),
  email: z.string().optional(),
  contactName: z.string().optional(),
  primaryAddress: z.string().optional(),
});

type ProfileSchemaType = z.infer<typeof ProfileSchema>;

const ProfileForm = () => {
  const form = useForm<ProfileSchemaType>({
    resolver: zodResolver(ProfileSchema),
    reValidateMode: 'onSubmit',
    defaultValues: {},
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<ProfileSchemaType> = async (data) => {}
  return (
    <FormContainer form={form} className="w-full rounded-1 bg-white shadow-2 overflow-hidden mb-4" onSubmit={onSubmit}>
      <ProfileHeader />
      <ProfileContentHeading title='Organization Info' />
      <OrganizationInfoFields />
      <ProfileContentHeading title='Address' />
      <AddressGroup  />
    </FormContainer>
  );
};

export { ProfileForm, type ProfileSchemaType };
