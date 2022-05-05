import { useQuery } from '@apollo/client';
import type { NavigationDataResults } from 'queries';
import { GetNavigationDataQuery } from 'queries';

export const NavigationTopCartIcon = () => {
  const { data } = useQuery<NavigationDataResults>(GetNavigationDataQuery);
  const { message } = data?.navigation ?? {};

  return <p className="flex-1 text-center text-sm font-medium text-white lg:flex-none">{message}</p>;
};

export default NavigationTopCartIcon;
