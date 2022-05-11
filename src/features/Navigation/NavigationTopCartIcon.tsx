import { ShoppingCartIcon } from '@heroicons/react/outline';
import ClientOnly from 'components/ClientOnly';
import { useAtom, useAtomValue } from 'jotai';
import { cartItemsAtom, isCartOpenAtom } from 'store';

export const NavigationTopCartIcon = () => {
  const [isCartOpen, setIsCartOpen] = useAtom(isCartOpenAtom);
  const cartItems = useAtomValue(cartItemsAtom);
  const cartQuantity = cartItems.reduce((q, i) => q + i.quantity, 0);

  return (
    <div className="flow-root">
      <a
        onClick={() => (isCartOpen ? setIsCartOpen(false) : setIsCartOpen(true))}
        className="group -m-2 p-2 flex items-center"
      >
        <ShoppingCartIcon
          className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        />
        <ClientOnly>
          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cartQuantity}</span>
        </ClientOnly>
        <span className="sr-only">items in cart, view bag</span>
      </a>
    </div>
  );
};

export default NavigationTopCartIcon;
