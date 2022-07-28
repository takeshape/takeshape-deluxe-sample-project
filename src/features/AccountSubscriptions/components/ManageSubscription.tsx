import { getCreditCardIcon } from 'components/Payments/utils';
import { format } from 'date-fns';
import { CancelSubscriptionForm } from 'features/AccountSubscriptions/components/CancelSubscription/CancelSubscriptionForm';
import { OrderNowForm } from 'features/AccountSubscriptions/components/OrderNow/OrderNowForm';
import { ShippingAddressForm } from 'features/AccountSubscriptions/components/ShippingAddress/ShippingAddress';
import { SkipNextForm } from 'features/AccountSubscriptions/components/SkipNext/SkipNextForm';
import { formatDeliverySchedule } from 'features/AccountSubscriptions/utils';
import { useState } from 'react';
import { Subscription } from '../types';
import { DeliveryFrequencyForm } from './DeliveryFrequency/DeliveryFrequencyForm';
import { NextChargeDateForm } from './NextChargeDate/NextChargeDate';
import { ProductOptionsForm } from './ProductOptions/ProductOptionsForm';
export interface ManageSubscriptionProps {
  subscription: Subscription;
}

export const ManageSubscription = ({ subscription }: ManageSubscriptionProps) => {
  const { product } = subscription;
  const CreditCardIcon = getCreditCardIcon(subscription.paymentMethod.instrument.brand);

  const [isNextChargeDateOpen, setIsNextChargeDateOpen] = useState(false);
  const [isShippingAddressOpen, setIsShippingAddressOpen] = useState(false);
  const [isProductOptionsOpen, setIsProductOptionsOpen] = useState(false);
  const [isDeliveryScheduleOpen, setIsDeliveryScheduleOpen] = useState(false);
  const [isSkipNextOpen, setIsSkipNextOpen] = useState(false);
  const [isOrderNowOpen, setIsOrderNowOpen] = useState(false);
  const [isCancelSubscriptionOpen, setIsCancelSubscriptionOpen] = useState(false);

  return (
    <>
      <div className="p-4 sm:p-6">
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-6">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Manage subscription</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Make changes to your deliveries, payments and more.</p>
          </div>

          <div className="flex flex-shrink-0 mt-6 space-x-4 lg:mt-0">
            <button
              type="button"
              onClick={() => setIsSkipNextOpen(true)}
              className="self-start py-2 px-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium bg-gray-200 text-gray-900 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-full"
            >
              Skip Next Delivery
            </button>

            <button
              type="button"
              onClick={() => setIsOrderNowOpen(true)}
              className="self-start py-2 px-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium bg-gray-200 text-gray-900 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-full"
            >
              Order Now
            </button>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 border-t border-gray-200">
          <dl className="divide-y divide-gray-200">
            {/* Date started */}
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Date started</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div className="flex-grow">
                  <time dateTime={subscription.createdAt}>{format(new Date(subscription.createdAt), 'PPP')}</time>
                </div>
              </dd>
            </div>

            {/* Next charge */}
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Next charge date</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div className="flex-grow">{format(new Date(subscription.nextOrder.fulfillmentDate), 'PPP')}</div>
                <div className="ml-4 flex-shrink-0 flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsNextChargeDateOpen(true)}
                    className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Update
                  </button>
                </div>
              </dd>
            </div>

            {/* Delivery frequency */}
            <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Delivery frequency</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div className="flex-grow">{formatDeliverySchedule(subscription.deliverySchedule)}</div>
                <div className="ml-4 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsDeliveryScheduleOpen(true)}
                    className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Update
                  </button>
                </div>
              </dd>
            </div>

            {/* Product */}
            <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Product</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div className="flex-grow">
                  <div>{product.name}</div>
                  <div className="mt-2">{product.variantName}</div>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsProductOptionsOpen(true)}
                    className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Update
                  </button>
                </div>
              </dd>
            </div>

            {/* Quantity */}
            <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Quantity</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div className="flex-grow">
                  <div className="mt-2">{product.quantity}</div>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsProductOptionsOpen(true)}
                    className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Update
                  </button>
                </div>
              </dd>
            </div>

            {/* Amount */}
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Amount per item</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div className="flex-grow">{product.price}</div>
              </dd>
            </div>

            {/* Amount */}
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Total Amount</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div className="flex-grow">{subscription.total}</div>
              </dd>
            </div>

            {/* Shipping address */}
            <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Shipping address</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">
                  <span className="block">{subscription.shippingAddress.name}</span>
                  <span className="block mt-1">{subscription.shippingAddress.line1}</span>
                  <span className="block mt-1">{subscription.shippingAddress.line2}</span>
                  <span className="block mt-1">
                    {subscription.shippingAddress.city}, {subscription.shippingAddress.state}
                  </span>
                  <span className="block mt-1">{subscription.shippingAddress.zip}</span>
                </span>
                <span className="ml-4 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsShippingAddressOpen(true)}
                    className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Update
                  </button>
                </span>
              </dd>
            </div>

            {/* Payment method */}
            <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Payment method</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div className="flex-grow">
                  <span className="block">
                    <CreditCardIcon className="h-6 w-6 inline-block" />
                    <span className="inline-block ml-2">{subscription.paymentMethod.instrument.brand}</span>{' '}
                    <span className="inline-block ml-1">{subscription.paymentMethod.instrument.maskedNumber}</span>
                  </span>
                  <span className="block mt-1">
                    <span className="font-medium text-xs">Expires:</span>{' '}
                    {subscription.paymentMethod.instrument.expiryMonth}/
                    {subscription.paymentMethod.instrument.expiryYear}
                  </span>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <button
                    type="button"
                    className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Update
                  </button>
                </div>
              </dd>
            </div>

            {/* Cancel */}
            <div className="flex pt-4 pb-2 sm:pt-6 sm:pb-3">
              <button
                type="button"
                onClick={() => setIsCancelSubscriptionOpen(true)}
                className="ml-auto bg-gray-100 py-2 px-2.5 rounded-md shadow-sm text-sm font-medium text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel Subscription
              </button>
            </div>
          </dl>
        </div>
      </div>

      <NextChargeDateForm
        isOpen={isNextChargeDateOpen}
        onClose={() => setIsNextChargeDateOpen(false)}
        currentNextChargeDate={subscription.nextOrder.fulfillmentDate}
      />

      <ProductOptionsForm
        variants={product.variants}
        variantOptions={product.variantOptions}
        currentQuantity={product.quantity}
        currentSelections={product.variantSelections}
        currentDeliverySchedule={subscription.deliverySchedule}
        isOpen={isProductOptionsOpen}
        onClose={() => setIsProductOptionsOpen(false)}
      />

      <DeliveryFrequencyForm
        currentDeliverySchedule={subscription.deliverySchedule}
        deliveryScheduleOptions={subscription.deliveryScheduleOptions}
        isOpen={isDeliveryScheduleOpen}
        onClose={() => setIsDeliveryScheduleOpen(false)}
      />

      <ShippingAddressForm isOpen={isShippingAddressOpen} onClose={() => setIsShippingAddressOpen(false)} />

      <SkipNextForm isOpen={isSkipNextOpen} onClose={() => setIsSkipNextOpen(false)} />

      <OrderNowForm isOpen={isOrderNowOpen} onClose={() => setIsOrderNowOpen(false)} />

      <CancelSubscriptionForm isOpen={isCancelSubscriptionOpen} onClose={() => setIsCancelSubscriptionOpen(false)} />
    </>
  );
};