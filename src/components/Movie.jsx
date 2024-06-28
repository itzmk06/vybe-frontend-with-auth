import { useNavigate } from "react-router-dom"
import TopNav from "./helper/TopNav";
import DropDown from "./helper/DropDown";
import axios from "../utils/axios";
import { useEffect } from "react";
import { useState } from "react";
import Cards from "./helper/Cards";
import Loader from "./helper/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import SideNav from "./helper/SideNav";


function Movie() {
    document.title="Vybe | Movies"
    const navigate=useNavigate();
    const [category, setCategory] = useState("now_playing")
    const [duration, setDuration] = useState("day")
    const [movie, setmovie] = useState([])
    const [page,setPage]=useState(1);
    const [hasMore,setHasMore]=useState(true);
    
    const getMovie = async () => {
        try {
          const { data } = await axios.get(`/movie/${category}?page=${page}`);
        //   setmovie(data.results);
        if(data.results.length>0){
            setmovie((prev)=>[...prev,...data.results])
            setPage(page+1);
        }else{
            setHasMore(false);
        }
        } catch (error) {
          console.error("Error: ", error);
        }
      };

      const refreshHandler =()=>{
        if(movie.length===0){
            getMovie();
        }else{
            setPage(1);
            setmovie([]);
            getMovie();
        }
      };


      useEffect(()=>{
        refreshHandler();
      },[duration,category]);

  return movie.length>0?(
    <div className='w-full h-full'>
      <SideNav/>
        <div className='w-full text-zinc-400 font-semibold text-xl flex gap-2 justify-center items-start'>
        <i
          onClick={() => navigate(-1)}
          className="mt-[1.3%] ml-[1%] cursor-pointer text-zinc-200 font-bold text-2xl ri-arrow-left-line hover:text-[#009FFD] transition-transform transform hover:-translate-x-1"
        ></i>
            <h1 className="pt-[1.5%] font-jose text-xl flex gap-1">Movie <i className="ri-arrow-right-s-fill text-[#009FFD]"></i> <small>{category.toUpperCase()}</small></h1>
            <div className="w-[150%] text-black mt-[0.2%] relative mx-auto">
            <TopNav/>
            </div>
            <div className="flex pt-[1.5%] mr-[4%]">
            <DropDown title={"Category"} options={["popular","top_rated","upcoming","now_playing"]} func={(e)=>setCategory(e.target.value)} />
            <DropDown  title={"Time Frame"} options={["Day","Week"]} func={(e)=>setDuration(e.target.value)} />
            </div>
        </div>
        <InfiniteScroll dataLength={movie.length} Loader={<Loader/>} next={getMovie} hasMore={hasMore}>
            <Cards data={movie} title="movie"/>
        </InfiniteScroll>
    </div>
  ):<Loader/>
}

export default Movie
