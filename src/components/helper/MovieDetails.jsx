import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { asyncLoadMovie, removeMovie } from "../../Store/actions/movieActions";
import Loader from "./Loader";
import HorizontalCards from "./HorizontalCards";

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { info, error } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(asyncLoadMovie(id));
    window.scrollTo({ top: 0, behavior: "smooth" });
    return () => {
      dispatch(removeMovie());
    };
  }, [dispatch, id]);

  const backdropUrl = info?.detail?.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${info.detail.backdrop_path}`
    : '';
  const posterUrl = info?.detail?.poster_path
    ? `https://image.tmdb.org/t/p/original/${info.detail.poster_path}`
    : backdropUrl;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p>Error loading movie details. Please try again later.</p>
      </div>
    );
  }

  return info ? (
    <div
      className="min-h-[190%] relative w-full px-4 py-8 bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(
          to bottom right,
          rgba(0, 0, 0, 0.5),
          rgba(0, 0, 0, 0.7)
        ), 
        url(${backdropUrl})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black via-transparent to-black opacity-70"></div>

      <div className="ml-[6.5%] relative z-10 flex items-center gap-4 mb-2">
        <i
          onClick={() => navigate(-1)}
          className="cursor-pointer text-zinc-200 font-bold text-2xl ri-arrow-left-line hover:text-[#009FFD] transition-transform transform hover:-translate-x-1"
        ></i>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.wikidata.org/wiki/${info.externalID.wikidata_id}`}
          className="hover:text-[#009FFD] transition-transform transform hover:scale-110"
        >
          <i className="text-2xl ri-earth-line text-zinc-200 font-bold"></i>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={info.detail.homepage}
          className="hover:text-[#009FFD] transition-transform transform hover:scale-110"
        >
          <i className="text-2xl ri-external-link-fill text-zinc-200 font-bold"></i>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.imdb.com/title/${info.externalID.imdb_id}`}
        >
          <img
            className="w-12 object-cover transition-transform transform hover:scale-110 hover:shadow-2xl"
            src="https://cdn-icons-png.flaticon.com/128/889/889199.png"
            alt="IMDb"
          />
        </a>
      </div>

      <div className="ml-[5%] relative z-10 flex flex-col md:flex-row items-center gap-[5%]">
        <img
          className="rounded-lg object-cover h-90 md:h-[40vh] xl:h-80 shadow-2xl transition-transform transform hover:scale-105 hover:shadow-2xl"
          src={posterUrl}
          alt={
            info.detail.title ||
            info.detail.name ||
            info.detail.original_title ||
            info.detail.original_name
          }
        />
        <div className="text-white w-full md:w-2/3 bg-black bg-opacity-60 p-6 rounded-lg shadow-xl transition-transform transform hover:scale-105 hover:bg-opacity-80">
          <h1 className="text-4xl font-bold mb-2">
            {info.detail.title ||
              info.detail.name ||
              info.detail.original_name ||
              info.detail.original_title}
            <span className="text-xl font-semibold ml-2 text-zinc-300">
              ({info.detail.release_date.split("-")[0]})
            </span>
          </h1>

          <p className="text-xl font-semibold mb-2">
            User Score:
            <span className="ml-2 text-lg font-normal text-zinc-300">
              {(info.detail.vote_average * 10).toFixed()}%
            </span>
          </p>
          <p className="text-xl font-semibold mb-2">
            Genres:
            <span className="ml-2 text-lg font-normal text-zinc-300">
              {info.detail.genres.map((g) => g.name).join(", ")}
            </span>
          </p>
          <p className="text-xl font-semibold mb-2">
            Tagline:
            <span className="ml-2 text-lg font-normal text-zinc-300">
              {info.detail.tagline || "No tagline"}
            </span>
          </p>
          <p className="text-xl font-semibold mb-2">
            Overview:
            <span className="ml-2 text-lg font-normal text-zinc-300">
              {info.detail.overview}
            </span>
          </p>
          <p className="text-xl font-semibold mb-2">
            Translations:
            <span className="ml-2 text-lg font-normal text-zinc-300">
              {info.translations.join(", ")}
            </span>
          </p>
          <Link
            to={`/movie/details/${info.detail.id}/trailer`}
            className="font-bold inline-flex items-center gap-1 px-4 py-2 mt-4 text-blue-500 bg-gray-800 rounded-lg hover:bg-gray-700 transition-transform transform hover:scale-105"
          >
            <i className="ri-play-circle-fill text-2xl"></i>Watch Trailer
          </Link>
        </div>
      </div>

      <div className="w-[90%] m-auto relative z-10 mt-8 text-xl text-zinc-200">
        {info.watchProviders?.flatrate && (
          <div className="mt-8">
            <h2 className="font-bold mb-2">Available on:</h2>
            <div className="flex flex-wrap gap-4">
              {info.watchProviders.flatrate.map((provider, index) => (
                <img
                  key={index}
                  className="h-12 rounded-lg shadow-lg bg-black bg-opacity-80 p-1 transition-transform transform hover:scale-105"
                  src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
                  alt={provider.provider_name}
                />
              ))}
            </div>
          </div>
        )}

        {info.watchProviders?.buy && (
          <div className="mt-8">
            <h2 className="font-bold mb-2">Rent / Buy on:</h2>
            <div className="flex flex-wrap gap-4">
              {info.watchProviders.buy.map((provider, index) => (
                <img
                  key={index}
                  className="h-12 rounded-lg shadow-lg bg-black bg-opacity-80 p-1 transition-transform transform hover:scale-105"
                  src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
                  alt={provider.provider_name}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="w-[90%] m-auto mt-5">
        <h1 className="mt-5 mb-5 font-bold text-white text-2xl">
          Recommendations and Similar Items
        </h1>
        <HorizontalCards
          data={
            info.recommendations.length > 0
              ? info.recommendations
              : info.similar
          }
        />
      </div>
      <Outlet />
    </div>
  ) : (
    <Loader />
  );
};

export default MovieDetails;
