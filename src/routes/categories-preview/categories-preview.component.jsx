import {
  gql,
  useQuery,
} from "@apollo/client";
import CategoryPreview from '../../components/category-preview/category-preview.component';
import Spinner from '../../components/spinner/spinner.component';

const CategoriesPreview = () => {
  const { loading, error, data } = useQuery(GET_COLLECTIONS);
  if (error) console.log(`There is an error: ${error}`);
  data.collections.map(item => {
    console.log(item);
  });
  return (
    <>
      {
        loading ? (
          <Spinner />
        ) : (
          data.collections.map(({title, items}) => {
            return <CategoryPreview key={title} title={title} products={items} />
          })
        )
      }
    </>
  );
};

export default CategoriesPreview;

const GET_COLLECTIONS = gql`
  {
    collections {
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
`;
