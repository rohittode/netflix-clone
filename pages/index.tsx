import Head from "next/head";
import { useRecoilValue } from "recoil";
import { modalState, movieState } from "@/atoms/modalAtom";
import Banner from "@/components/Banner";
import Header from "@/components/Header";
import Row from "@/components/Row";
import useAuth from "@/hooks/useAuth";
import { Movie } from "@/typings";
import requests from "@/utils/requests";
import Modal from "@/components/Modal";
import Plans from "@/components/Plans";
import payments from "@/lib/stripe";
import { Product, getProducts } from "@stripe/firestore-stripe-payments";
import useSubscription from "@/hooks/useSubscription";
import useList from "@/hooks/useList";

interface Props {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
  products: Product[]
}

const Home = ({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow,
  products,
}: Props) => {
  const { user, loading } = useAuth()
  const subscription = useSubscription(user)
  const showModal = useRecoilValue(modalState);
  const movie = useRecoilValue(movieState)
  const list = useList(user?.uid)


  // un comment 


  if (loading || subscription === null) return null
  if (!subscription) return <Plans products={products} />

  

  return (
    <div
      className={`relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh] ${
        showModal && "!h-screen overflow-hidden"
      }`}
    >
      <Head>
        <title>Home - Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16 ">
        {/* Banner */}
        <Banner netflixOriginals={netflixOriginals} />
        <section className="md:space-y-24">
          {/* Row */}
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={actionMovies} />

          {/* My List Components */}
          {list.length > 0 && <Row title="My List" movies={list} />}
          
          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Scary Movies" movies={horrorMovies} />
          {/* <Row title="Romance Movies" movies={romanceMovies} /> */}
          {/* <Row title="Documentaries" movies={documentaries} /> */}
        </section>
      </main>
      {/* Model */}
      {showModal && <Modal />}
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((error) => console.log(error.message))
    
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
      products,
    },
  };
};

