const AnimeItem = ({ anime, handleSelectedAnime, setModal, removeAnime }) => {
  const notFoundMsg = "Not Found";
  const isRated = anime.myRating != null;

  return (
    <div className="anime-item">
      {isRated && (
        <button
          className="anime-delete-btn"
          onClick={() => removeAnime(anime.mal_id)}
        >
          &times;
        </button>
      )}

      <div className="anime-image">
        <img src={anime.images.jpg.large_image_url} alt="Anime" />
      </div>

      <div className="anime-info">
        <h2
          onClick={() => {
            handleSelectedAnime(anime.mal_id);
            setModal(2);
          }}
        >
          {anime.title.length <= 25
            ? anime.title
            : anime.title.slice(0, 25) + "..."}
        </h2>
        <p>
          {anime.episodes === 1 ? (
            <strong>Movie</strong>
          ) : (
            <>
              <strong>Episodes : </strong>
              {anime.episodes || notFoundMsg}
            </>
          )}
        </p>
        <p>
          <strong>Duration : </strong> {anime.duration || notFoundMsg}
        </p>
        {isRated && (
          <p>
            <strong>Your Rating : </strong> {anime.myRating}
          </p>
        )}
        <p>
          <strong>Rating : </strong> {anime.score || notFoundMsg}
        </p>
        <p>
          <strong>Status : </strong> {anime.status || notFoundMsg}
        </p>
        <p>
          <strong>Studio : </strong> {anime.studios.at(0)?.name || notFoundMsg}
        </p>

        <div className="genres">
          {anime.genres.length ? (
            anime.genres.map((genre, i) => <span key={i}>{genre.name}</span>)
          ) : (
            <span>{"Genres " + notFoundMsg}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimeItem;
