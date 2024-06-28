import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function Trailer() {
  const { pathname } = useLocation();
  const category = pathname.includes('movie') ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category]?.info?.videos);
  const navigate = useNavigate();

  return (
    <div className="left-[-0.65%] z-[999] absolute top-0 flex justify-center items-center bg-[rgba(0,0,0,0.8)] w-screen h-screen">
      <i
        onClick={() => navigate(-1)}
        className="top-[4%] right-[0%] absolute mt-[1.3%] ml-[1%] cursor-pointer text-red-500 font-bold text-3xl ri-close-fill hover:text-[#009FFD] transition-transform transform hover:-translate-x-1"
      ></i>
      {ytvideo ? (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
          height={800}
          width={1300}
        />
      ) : (
        <img className="w-[10rem] h-[10rem] object-cover object-center" src="https://cdn-icons-png.flaticon.com/128/4826/4826313.png" alt="No video available" />
      )}
    </div>
  );
}

export default Trailer;
