import PageLoader from 'components/PageLoader';
import { lighthouseHandle, lighthouseProductHandle } from 'config';
import { ProductPage as ProductPageComponent } from 'features/ProductPage/ProductPage';
import { ProductPageShopifyProductHandlesQuery, ProductPageShopifyProductQuery } from 'features/ProductPage/queries';
import {
  getBreadcrumbs,
  getDetails,
  getPageOptions,
  getPolicies,
  getProduct,
  getProductPageParams,
  getReviewHighlights,
  getReviewList
} from 'features/ProductPage/transforms';
import Layout from 'layouts/Default';
import { getLayoutData } from 'layouts/getLayoutData';
import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  ProductPageShopifyProductHandlesQueryResponse,
  ProductPageShopifyProductHandlesQueryVariables,
  ProductPageShopifyProductResponse,
  ProductPageShopifyProductVariables
} from 'types/takeshape';
import { createAnonymousTakeshapeApolloClient } from 'utils/takeshape';
import { getSingle } from 'utils/types';
import { retryGraphqlThrottle } from '../../utils/apollo/retryGraphqlThrottle';

const ProductPage: NextPage = ({
  options,
  navigation,
  footer,
  product,
  reviewHighlights,
  reviewList,
  details,
  policies,
  breadcrumbs
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return (
      <Layout navigation={navigation} footer={footer} seo={{ title: 'Product is loading...' }}>
        <PageLoader />
      </Layout>
    );
  }

  return (
    <Layout
      navigation={navigation}
      footer={footer}
      seo={{ title: product.seo.title, description: product.seo.description }}
    >
      <ProductPageComponent
        component={options.component}
        options={options}
        breadcrumbs={breadcrumbs}
        product={product}
        reviewHighlights={reviewHighlights}
        reviewList={reviewList}
        details={details}
        policies={policies}
      />
    </Layout>
  );
};

const apolloClient = createAnonymousTakeshapeApolloClient();

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const { navigation, footer } = await getLayoutData();

  let handle = getSingle(params.product);

  if (lighthouseProductHandle && handle === lighthouseHandle) {
    handle = lighthouseProductHandle;
  }

  const { data: productData } = await retryGraphqlThrottle<ProductPageShopifyProductResponse>(async () => {
    return apolloClient.query<ProductPageShopifyProductResponse, ProductPageShopifyProductVariables>({
      query: ProductPageShopifyProductQuery,
      variables: {
        handle
      }
    });
  });

  const product = getProduct(productData);

  return {
    notFound: !Boolean(product),
    props: {
      navigation,
      footer,
      product,
      options: getPageOptions(productData),
      reviewHighlights: getReviewHighlights(productData),
      reviewList: getReviewList(productData),
      details: getDetails(productData),
      policies: getPolicies(productData),
      breadcrumbs: getBreadcrumbs(productData)
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: ReturnType<typeof getProductPageParams> = [];

  let hasNextPage = true;
  let endCursor: string;

  while (hasNextPage) {
    const { data } = await apolloClient.query<
      ProductPageShopifyProductHandlesQueryResponse,
      ProductPageShopifyProductHandlesQueryVariables
    >({
      query: ProductPageShopifyProductHandlesQuery,
      variables: {
        first: 50,
        after: endCursor
      }
    });

    paths = [...paths, ...getProductPageParams(data)];
    hasNextPage = data.products.pageInfo.hasNextPage;
    endCursor = data.products.pageInfo.endCursor;
  }

  // Add the lighthouse testing path, if configured
  if (lighthouseProductHandle) {
    paths.push({ params: { product: [lighthouseHandle] } });
  }

  return {
    paths,
    fallback: true
  };
};

export default ProductPage;
