import AnimeCard from "./AnimeCard";
import useLocalStorage from "../hooks/useLocalStorage";

const AnimeCardContainer = ({ randomAnime, handleSelectedAnime, setModal }) => {
  const [page, setPage] = useLocalStorage(1, "page");

  const pageSize = 20;
  const start = (page - 1) * pageSize;
  let currentPageAnime = [];
  currentPageAnime = randomAnime.slice(start, start + pageSize);

  const handlePrevPage = () => {
    if (page <= 1) return;
    setPage((page) => page - 1);
  };

  const handleNextPage = () => {
    if (page >= 10) return;
    setPage((page) => page + 1);
  };

  return (
    <>
      <div className="card-container">
        {currentPageAnime.map((el, i) => {
          return (
            <AnimeCard
              anime={el}
              key={i}
              handleSelectedAnime={handleSelectedAnime}
              setModal={setModal}
            />
          );
        })}
      </div>
      <div className="page-container">
        <button onClick={handlePrevPage}>&larr; Prev</button>

        <span>{page}</span>

        <button onClick={handleNextPage}>Next &rarr;</button>
      </div>
    </>
  );
};

export default AnimeCardContainer;
