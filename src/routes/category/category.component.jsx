import {
  gql,
  useQuery,
} from "@apollo/client";

import Spinner from '../../components/spinner/spinner.component';

import {
  useParams,
} from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';

import {
  CategoryContainer,
  CategoryTitle,
} from './category.styles';

const Category = () => {
  const {
    category,
  } = useParams();
  const { loading, error, data } = useQuery(GET_COLLECTION_BY_TITLE, {
    variables: { title: category },
  });
  if (error) console.log(`There is an error: ${error}`);
  return (
    <>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      {
        loading ? (
          <Spinner />
        ) : (
          <CategoryContainer>
              {
                data?.getCollectionsByTitle?.items && data?.getCollectionsByTitle?.items.map((product) => <ProductCard key={product.id} product={product} />)
              }
          </CategoryContainer>
        )
      }
    </>
  );
};

export default Category;

const GET_COLLECTION_BY_TITLE = gql`
  query getCollectionsByTitle($title: String!) {
    getCollectionsByTitle(title: $title) {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`
