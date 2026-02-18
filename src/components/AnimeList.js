import AnimeItem from "./AnimeItem";
import { Error } from "./Error";

const AnimeList = ({
  animeList,
  handleSelectedAnime,
  setModal,
  removeAnime,
}) => {
  const errorText = removeAnime ? "No Anime in your List" : "No Anime Found";

  return (
    <>
      {animeList.length > 0 ? (
        <div className="anime-item-list">
          {animeList.map((anime, i) => (
            <AnimeItem
              anime={anime}
              key={i}
              handleSelectedAnime={handleSelectedAnime}
              setModal={setModal}
              removeAnime={removeAnime}
            />
          ))}
        </div>
      ) : (
        <Error errorMessage={errorText} />
      )}
    </>
  );
};

export default AnimeList;
