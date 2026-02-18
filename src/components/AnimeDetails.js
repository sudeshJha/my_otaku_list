import { useEffect, useState } from "react";
import { url } from "../App";
import { Error } from "./Error";
import Loader from "./Loader";
import StarRating from "./StarRating";

const AnimeDetails = ({ animeId, handleBackButton, addAnime, myAnimeList }) => {
  const [anime, setAnime] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(0);

  const isRated = myAnimeList.map((anime) => anime.mal_id).includes(animeId);
  const myRating = isRated
    ? myAnimeList.filter((anime) => anime.mal_id === animeId)?.at(0).myRating
    : 0;

  const handleAddAnime = () => {
    const newAnime = {
      mal_id: anime.mal_id,
      title: anime.title,
      images: anime.images,
      episodes: anime.episodes,
      duration: anime.duration,
      rating: anime.rating,
      myRating: rating,
      status: anime.status,
      studios: anime.studios,
      genres: anime.genres,
    };
    addAnime(newAnime);
  };

  useEffect(() => {
    if (!animeId) return;
    setIsLoading(true);
    async function getAnimeDetails() {
      try {
        let res = await fetch(`${url}/anime/${animeId}/full`);
        res = await res.json();

        setAnime(res.data);
        console.log(res);
        if (!res.status) throw new Error("Anime Detail Not Found");
      } catch (err) {
        console.log(err.msg);
        setError(err.msg);
      } finally {
        setIsLoading(false);
      }
    }
    getAnimeDetails();
  }, [animeId]);

  return (
    <>
      {error && <Error errorMessage={error} />}
      {isLoading && <Loader />}
      {anime && (
        <div className="anime-detail">
          <button className="back-btn" onClick={handleBackButton}>
            &larr;
          </button>
          <div className="anime-detail-poster">
            <img src={anime.images.jpg.large_image_url} alt="Anime Poster" />

            <div className="anime-detail-card">
              {anime.streaming.length !== 0 ? (
                <>
                  <h3>Streaming</h3>
                  {anime.streaming.map((st, i) => (
                    <a key={i} href={st.url} target="blank" rel="noopener">
                      {st.name}
                    </a>
                  ))}
                </>
              ) : (
                <h3 style={{ textAlign: "center" }}>No Streaming</h3>
              )}
            </div>
          </div>

          <div className="anime-detail-content">
            <h1>
              {anime.title_english || anime.title_japanese}
              <div className="jp-title">{anime.title_japanese}</div>
            </h1>

            <a
              className="trailer-btn"
              target="_blank"
              href={anime.trailer.embed_url}
              rel="noreferrer"
            >
              ▶ Watch Trailer
            </a>

            <div className="anime-detail-card">
              <h3>Anime Info</h3>
              <ul>
                <li>
                  Type : <span>{anime.type || "N/A"}</span>
                </li>
                <li>
                  Source : <span>{anime.source || "N/A"}</span>
                </li>
                <li>
                  Episodes : <span>{anime.episodes || "N/A"}</span>
                </li>
                <li>
                  Status : <span>{anime.status || "N/A"}</span>
                </li>
                <li>
                  Duration : <span>{anime.duration || "N/A"}</span>
                </li>

                <li>
                  Genre :{" "}
                  <span>
                    {anime.genres.map((gen, i) => gen.name).join(", ") || "N/A"}
                  </span>
                </li>
              </ul>
            </div>

            <div className="anime-detail-card">
              <h3>Ratings</h3>
              <ul>
                <li>
                  Score : <span>{anime.score || "N/A"}</span>
                </li>
                <li>
                  Scored By : <span>{anime.scored_by || "N/A"}</span>
                </li>
                <li>
                  Rank : <span>{anime.rank || "N/A"}</span>
                </li>
              </ul>
            </div>

            <div className="anime-detail-card anime-detail-synopsis">
              <h3>Synopsis</h3>
              <p>{anime.synopsis}</p>
            </div>
            <div className="anime-detail-card anime-detail-rating">
              <h3>{isRated ? "You rated this anime" : "Rate this Anime"}</h3>
              <StarRating
                size={36}
                maxRating={10}
                onSetRating={setRating}
                defaultRating={myRating}
              />

              {rating > 0 && (
                <button className="add-list-btn" onClick={handleAddAnime}>
                  {!isRated ? "+ Add to your List" : "Change Rating"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AnimeDetails;
