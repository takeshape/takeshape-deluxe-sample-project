import PageLoader from 'components/PageLoader';
import Wrapper from 'components/Wrapper/Content';
import Layout from 'layouts/Default';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import type { GetProductArgs, GetProductIdsResponse, GetProductResponse } from 'queries';
import { GetProductIdsQuery, GetProductQuery } from 'queries';
import type { Product } from 'types/product';
import type { ReviewsIo_ListProductReviewsResponseStatsProperty, ReviewsIo_ProductReview } from 'types/takeshape';
import addApolloQueryCache from 'utils/apollo/addApolloQueryCache';
import { createAnonymousTakeshapeApolloClient } from 'utils/takeshape';
import { reviewsIoProductReviewsToReviewList, reviewsIoProductReviewsToReviewStats } from 'utils/transforms/reviewsIo';
import { shopifyGidToId, shopifyIdToGid, shopifyProductToProduct } from 'utils/transforms/shopify';
import { getSingle } from 'utils/types';

interface ProductPageProps {
  product: Product;
  reviews: ReviewsIo_ProductReview[] | null;
  stats: ReviewsIo_ListProductReviewsResponseStatsProperty | null;
}

const ProductPage: NextPage<ProductPageProps> = (props) => {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return (
      <Layout title="Product loading...">
        <PageLoader />
      </Layout>
    );
  }

  const { product, reviews, stats } = props;

  return (
    <Layout title={product.name}>
      <Wrapper>{/* <ProductPageComponent /> */}</Wrapper>
    </Layout>
  );
};

const apolloClient = createAnonymousTakeshapeApolloClient();

export const getStaticProps: GetStaticProps<ProductPageProps> = async ({ params }) => {
  const id = shopifyIdToGid(getSingle(params.id));

  const { data } = await apolloClient.query<GetProductResponse, GetProductArgs>({
    query: GetProductQuery,
    variables: { id }
  });

  const product = shopifyProductToProduct(data.product);
  const reviews = reviewsIoProductReviewsToReviewList(data.product.reviews);
  const reviewStats = reviewsIoProductReviewsToReviewStats(data.product.reviews);

  return addApolloQueryCache(apolloClient, {
    props: {
      product,
      reviews: reviews ?? {},
      reviewStats
    }
  });
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await apolloClient.query<GetProductIdsResponse>({
    query: GetProductIdsQuery
  });

  const paths = data.products.edges.map(({ node }) => ({
    params: { id: shopifyGidToId(node.id) }
  }));

  return {
    paths,
    fallback: true
  };
};

export default ProductPage;
