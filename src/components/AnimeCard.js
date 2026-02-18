const AnimeCard = ({ anime, handleSelectedAnime, setModal }) => {
  return (
    <div
      className="card"
      onClick={() => {
        handleSelectedAnime(anime.mal_id);
        setModal(2);
      }}
    >
      <img
        className="card-img"
        src={anime.images.jpg.large_image_url}
        alt="anime"
      />
      <h3 className="card-title">
        {anime.title.length <= 30
          ? anime.title
          : anime.title.slice(0, 30) + "..."}
      </h3>
    </div>
  );
};

export default AnimeCard;
