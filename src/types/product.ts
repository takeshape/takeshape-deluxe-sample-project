import { currencyList } from 'config';
import { SetRequired } from 'type-fest';

export type ProductImage = {
  height: number;
  url: string;
  width: number;
  altText: string;
};

export type ProductPriceRecurringAnchor = {
  day: number;
  month?: number;
  type: 'WEEKDAY' | 'MONTHDAY' | 'YEARDAY';
};

/**
 * All amounts in cents
 */
export type ProductPriceOption = {
  id: string;
  name: string;
  merchandiseId: string;
  subscriptionId?: string;
  interval: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';
  intervalCount: number;
  intervalMaxCycles?: number | null;
  intervalMinCycles?: number | null;
  intervalAnchor?: ProductPriceRecurringAnchor | null;
  hasDiscount: boolean;
  discountType: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'PRICE';
  discountAmount: number;
  amountBeforeDiscount: number;
  amount: number;
  currencyCode: ProductPriceCurrencyCode;
};

export type ProductPriceCurrencyCode = typeof currencyList[number];

export type ProductPrice = {
  // in cents
  amount: number;
  currencyCode: ProductPriceCurrencyCode;
};

export type ProductVariantOption = {
  name: string;
  value: string;
};

export type ProductVariant = {
  id: string;
  name: string;
  description: string;
  image: ProductImage;
  prices: ProductPriceOption[];
  available: boolean;
  inventory: number;
  inventoryPolicy: 'CONTINUE' | 'DENY';
  sku: string;
  options: ProductVariantOption[];
};

export type ProductSeo = {
  title: string;
  description: string;
};

export type ProductOptionValue = {
  value: string;
  name: string;
  hasStock: boolean | null;
} & Record<string, unknown>;

export type ProductOption = {
  id: string;
  name: string;
  position: number;
  values: ProductOptionValue[];
};

export type ProductCore = {
  id: string;
  name: string;
  url: string;
  description: string;
  featuredImage: ProductImage;
};

export type ProductBase = ProductCore & {
  descriptionHtml: string;
  images?: ProductImage[];
  priceMin: ProductPrice;
  priceMax: ProductPrice;
  options: ProductOption[];
  variantsCount: number;
  variants?: ProductVariant[];
  hasOneTimePurchaseOption: boolean;
  hasSubscriptionPurchaseOption: boolean;
  hasStock: boolean;
  seo?: ProductSeo;
};

export type ProductListItem = ProductBase;

export type Product = SetRequired<ProductBase, 'images' | 'variants' | 'seo'>;
