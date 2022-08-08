import { CreditCardIcon } from '@heroicons/react/solid';
import { AddForm } from 'features/AccountPayments/components/Actions/AddPaymentMethodForm';
import { useState } from 'react';

export interface AddPaymentMethodProps {
  customerId: string;
}

export const AddPaymentMethod = ({ customerId }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="relative block w-full border border-gray-300 border-dashed rounded-lg p-8 h-full text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <CreditCardIcon className="mx-auto h-12 w-12 text-gray-400" />
        <span className="mt-2 block text-sm font-medium text-gray-900">Add payment method</span>
      </button>

      <AddForm isOpen={isOpen} onClose={() => setIsOpen(false)} customerId={customerId} />
    </>
  );
};