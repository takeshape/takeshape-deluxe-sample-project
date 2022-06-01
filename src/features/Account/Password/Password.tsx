import { useMutation } from '@apollo/client';
import Input from 'components/Form/Input/Input';
import { signOut, useSession } from 'next-auth/react';
import type { UpdateCustomerResponse } from 'queries';
import { UpdateCustomerMutation } from 'queries';
import { useCallback, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import type { MutationUpdateMyCustomerArgs } from 'types/takeshape';
import { formatError } from 'utils/errors';
import AccountForm from '../Form/Form';

export interface AccountPasswordForm {
  password: string;
  passwordConfirm: string;
}

export const AccountPassword = () => {
  const { data: session } = useSession({ required: true });
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, isSubmitSuccessful, errors },
    watch
  } = useForm<AccountPasswordForm>();

  const [updateCustomer, { data: customerResponse }] = useMutation<
    UpdateCustomerResponse,
    MutationUpdateMyCustomerArgs
  >(UpdateCustomerMutation);

  const onSubmit = useCallback(
    async ({ password }: AccountPasswordForm) => {
      await updateCustomer({
        variables: {
          customer: { password }
        }
      });
    },
    [updateCustomer]
  );

  useEffect(() => {
    if (isSubmitSuccessful) {
      signOut({ callbackUrl: '/auth/signin' });
    }
  }, [isSubmitSuccessful, reset]);

  const watched = useRef({ password: '' });
  watched.current.password = watch('password', '');

  if (!session) {
    return null;
  }

  const isReady = true;

  const error =
    customerResponse?.customerUpdate?.customerUserErrors &&
    formatError(customerResponse.customerUpdate.customerUserErrors);

  return (
    <AccountForm
      primaryText="New Password"
      secondaryText="Setting a new password will sign you out."
      onSubmit={handleSubmit(onSubmit)}
      isReady={isReady}
      isSubmitting={isSubmitting}
      isSubmitSuccessful={isSubmitSuccessful}
      isValid={Object.entries(errors).length === 0}
      error={error}
    >
      <div className="grid grid-cols-6 gap-6">
        <Input
          className="col-span-4"
          control={control}
          name="password"
          id="password"
          label="Password"
          autoComplete="new-password"
          defaultValue=""
          type="password"
          rules={{
            required: 'This field is required',
            pattern: {
              value: /[^\r\n]{8,}/,
              message: 'Password is too short'
            }
          }}
        />

        <Input
          className="col-span-4"
          control={control}
          name="passwordConfirm"
          id="passwordConfirm"
          label="Confirm Password"
          autoComplete="new-password"
          defaultValue=""
          type="password"
          rules={{
            required: 'This field is required',
            validate: (value) => value === watched.current.password || 'The passwords do not match'
          }}
        />
      </div>
    </AccountForm>
  );
};

export default AccountPassword;