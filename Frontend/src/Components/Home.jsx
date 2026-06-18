import PageHeading from './PageHeading'
import ProductListing from './ProductListing'
import apiClient from '../api/apiClient'
import { useLoaderData } from 'react-router-dom'


const Home = () => {

  const products = useLoaderData();

  return (
    <div className='max-w-[1152px] mx-auto px-6 py-8'>

      <PageHeading title="Explore Stickora!">
        Discover unique stickers for every vibe — anime, coding, sports, aesthetic, memes, and more. Personalize your world with designs that stand out!
      </PageHeading>

      <ProductListing products={products} />

    </div>
  )
}


// Loader function
export async function productsLoader() {

  try {
    const response = await apiClient.get("/products");

    return response.data;

  } catch(error) {

    throw new Response(
      error.message || "Failed to fetch products.Please try again.",
      {
        status: error.status || 500
      }
    );

  }
}


export default Home;