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
import useList from "@/hooks/useList";
import useSubscription from "@/hooks/useSubscription";
import ModalList from "@/components/ModalList";
import useMovie from "@/hooks/useMovie";
import MyMovieModal from "@/components/MyMovieModal";

interface Props {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
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
}: Props) => {
  const { user, loading } = useAuth()
  const subscription = useSubscription(user)
  const showModal = useRecoilValue(modalState);
  const movie = useRecoilValue(movieState)
  const list = useList(user?.uid)
  const myMovie = useMovie(user?.uid)

  // if (loading) return null;
  

  return (
    <div
      className={`relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh] ${
        showModal && "!h-screen overflow-hidden"
      }`}
    >
      <Head>
        <title>Movies - Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16 ">
       
        <section className="md:space-y-24">
         

          {/* My List Components */}
          <br />
          {list.length > 0 && <Row title="" movies={myMovie} />}

         
        </section>
      </main>
      {/* Model */}
      {showModal && <MyMovieModal />}
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
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
    },
  };
};
