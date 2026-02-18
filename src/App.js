import Header from "./components/Header";
import Search from "./components/Search";
import Title from "./components/Title";
import Main from "./components/Main";
import AnimeCardContainer from "./components/AnimeCardContainer";
import { useEffect, useState } from "react";
import AnimeDetails from "./components/AnimeDetails";
import useKey from "./hooks/useKey";
import AnimeList from "./components/AnimeList";
import Loader from "./components/Loader";

export const url = "https://api.jikan.moe/v4";

// MODAL NUMBERS
// Random - 0
// Search - 1
// Anime Detail - 2
// My Anime List - 3

export default function App() {
  // ---------------- STATE HOOKS
  const [randomAnime, setRandomAnime] = useState([]);
  const [myAnimeList, setMyAnimeList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [backModal, setBackModal] = useState(0);

  useKey("Enter", searchAnime);

  function openHomePage() {
    setQuery("");
    setModal(0);
    setBackModal(0);
    setSelectedId(null);
    setSearchList([]);
  }

  function handleBackButton() {
    setModal(backModal);
    setSelectedId(null);
  }

  function addAnime(anime) {
    const isRated = myAnimeList
      .map((anime) => anime.mal_id)
      .includes(anime.mal_id);

    if (isRated) {
      setMyAnimeList((list) => list.filter((a) => a.mal_id !== anime.mal_id));
    }
    setMyAnimeList((list) => [...list, anime]);
  }

  function removeAnime(animeId) {
    setMyAnimeList((list) => list.filter((anime) => anime.mal_id !== animeId));
  }

  // ---------------- SEARCH ANIME
  async function searchAnime() {
    try {
      if (!query) {
        setSearchList([]);
        throw new Error("Please enter anime name");
      }
      let res = await fetch(`${url}/anime?q=${query}`);
      res = await res.json();

      setModal(1);
      setBackModal(1);
      setSearchList([...res.data]);
      console.log(res.data);

      if (!res) throw new Error("Anime not found");
    } catch (e) {
      console.log(e.message);
    }
  }

  // ---------------- RANDOM ANIME
  useEffect(() => {
    async function getRandomAnime() {
      let res = await fetch(url + "/recommendations/anime");

      res = await res.json();
      const animeList = [];

      res.data.forEach((el) => {
        animeList.push(el.entry[0], el.entry[1]);
      });

      setRandomAnime([...animeList]);
    }
    setIsLoading(true);
    getRandomAnime();
    setIsLoading(false);
  }, []);

  return (
    <main className="app">
      <Header>
        <Title openHomePage={openHomePage} />
        <Search query={query} setQuery={setQuery} />
        <div
          className="mylist-btn"
          onClick={() => {
            setModal(3);
            setBackModal(3);
          }}
        >
          My List
        </div>
      </Header>

      <Main className="container">
        {/* ------------------- RANDOM ANIME  */}
        {modal === 0 &&
          (!isLoading ? (
            <AnimeCardContainer
              randomAnime={randomAnime}
              handleSelectedAnime={setSelectedId}
              setModal={setModal}
            />
          ) : (
            <Loader />
          ))}

        {/* ------------------- SEARCH ANIME  */}
        {modal === 1 && (
          <AnimeList
            animeList={searchList}
            handleSelectedAnime={setSelectedId}
            setModal={setModal}
          />
        )}

        {/* ------------------- ANIME DETAILS */}
        {modal === 2 && (
          <AnimeDetails
            animeId={selectedId}
            handleBackButton={handleBackButton}
            addAnime={addAnime}
            myAnimeList={myAnimeList}
          />
        )}

        {/* ------------------- MY ANIME LIST */}
        {modal === 3 && (
          <AnimeList
            animeList={myAnimeList}
            handleSelectedAnime={setSelectedId}
            setModal={setModal}
            removeAnime={removeAnime}
          />
        )}
      </Main>
    </main>
  );
}
