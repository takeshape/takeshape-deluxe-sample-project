import { createContext } from 'react';
import type { NavigationState } from './types';

const defaults: NavigationState = {
  isMobileMenuOpen: false,
  openMobileMenu: () => {},
  closeMobileMenu: () => {}
};

const NavigationContext = createContext(defaults);

export default NavigationContext;
