import { format } from 'date-fns';
import { DeliveryDetails } from 'features/AccountSubscriptions/components/Actions/DeliveryDetails';
import { ReportIssueForm } from 'features/AccountSubscriptions/components/Actions/ReportIssueForm';
import { getOrderStatusDisplay } from 'features/AccountSubscriptions/utils';
import { useState } from 'react';
import { SubscriptionOrder } from '../../types';

export interface ShipmentStatusProps {
  heading?: string;
  order: Pick<SubscriptionOrder, 'id' | 'status' | 'statusAt' | 'fulfillments' | 'shippingAddress'>;
}

function getTrackingInfo(order: Pick<SubscriptionOrder, 'status' | 'fulfillments'>) {
  switch (order.status) {
    case 'FULFILLMENT_ATTEMPTED_DELIVERY':
    case 'FULFILLMENT_DELIVERED':
    case 'FULFILLMENT_FAILURE':
    case 'FULFILLMENT_CANCELED':
    case 'FULFILLMENT_FULFILLED':
    case 'FULFILLMENT_IN_TRANSIT':
    case 'FULFILLMENT_NOT_DELIVERED':
    case 'FULFILLMENT_OUT_FOR_DELIVERY':
      return order.fulfillments?.[0]?.trackingInfo;
    default:
      return null;
  }
}

export const ShipmentStatus = ({ heading, order }: ShipmentStatusProps) => {
  const { status } = order;
  const displayStatus = getOrderStatusDisplay(status);
  const prep = status === 'CHARGE_QUEUED' ? 'for' : 'on';
  const trackingInfo = getTrackingInfo(order);
  const [isDeliveryDetailsOpen, setIsDeliveryDetailsOpen] = useState(false);
  const [isReportIssueOpen, setIsReportIssueOpen] = useState(false);

  return (
    <div>
      {heading && <h4 className="text-sm leading-6 font-medium text-body-600 mb-2">{heading}</h4>}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-grow flex items-center">
          <displayStatus.Icon className={`${displayStatus.iconClasses} w-5 h-5`} aria-hidden="true" />
          <p className="ml-2 text-sm text-gray-900">
            {displayStatus.text} {prep} <time dateTime={order.statusAt}>{format(new Date(order.statusAt), 'PP')}</time>
          </p>
        </div>
        {trackingInfo && (
          <div>
            <button
              className="text-sm font-medium text-accent-600 hover:text-accent-500"
              onClick={() => setIsDeliveryDetailsOpen(true)}
            >
              Show delivery details
            </button>
            <DeliveryDetails
              isOpen={isDeliveryDetailsOpen}
              onClose={() => setIsDeliveryDetailsOpen(false)}
              order={order}
              onReportIssue={() => {
                setIsDeliveryDetailsOpen(false);
                setIsReportIssueOpen(true);
              }}
            />
            <ReportIssueForm isOpen={isReportIssueOpen} onClose={() => setIsReportIssueOpen(false)} order={order} />
          </div>
        )}
      </div>
    </div>
  );
};