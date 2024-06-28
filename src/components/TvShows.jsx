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

function TvShows() {
    document.title="Vybe | Tv"
    const navigate=useNavigate();
    const [category, setCategory] = useState("airing_today")
    const [duration, setDuration] = useState("day")
    const [tv, setTv] = useState([])
    const [page,setPage]=useState(1);
    const [hasMore,setHasMore]=useState(true);
    
    const getTv = async () => {
        try {
          const { data } = await axios.get(`/tv/${category}?page=${page}`);
        //   settv(data.results);
        if(data.results.length>0){
            setTv((prev)=>[...prev,...data.results])
            setPage(page+1);
        }else{
            setHasMore(false);
        }
        } catch (error) {
          console.error("Error: ", error);
        }
      };

      const refreshHandler =()=>{
        if(tv.length===0){
            getTv();
        }else{
            setPage(1);
            setTv([]);
            getTv();
        }
      };
      useEffect(()=>{
        refreshHandler();
      },[duration,category]);

  return tv.length>0?(
    <div className='w-full h-full'>
      <SideNav/>
        <div className='w-full text-zinc-400 font-semibold text-xl flex gap-2 justify-center items-start'>
        <i
          onClick={() => navigate(-1)}
          className="mt-[1.3%] ml-[1%] cursor-pointer text-zinc-200 font-bold text-2xl ri-arrow-left-line hover:text-[#009FFD] transition-transform transform hover:-translate-x-1"
        ></i>
            <h1 className="font-bold pt-[1.5%] font-jose flex gap-1 text-xl">Tv <i className="ri-arrow-right-s-fill text-[#009FFD]"></i> <small>{category.toUpperCase()}</small></h1>
            <div className="w-[150%] text-black mt-[0.2%] relative mx-auto">
            <TopNav/>
            </div>
            <div className="flex pt-[1.5%] mr-[4%]">
            <DropDown title={"Category"} options={["on_the_air","popular","top_rated","airing_today"]} func={(e)=>setCategory(e.target.value)} />
            <DropDown title={"Time Frame"} options={["Day","Week"]} func={(e)=>setDuration(e.target.value)} />
            </div>
        </div>
        <InfiniteScroll dataLength={tv.length} Loader={<Loader/>} next={getTv} hasMore={hasMore}>
            <Cards data={tv} title="tv"/>
        </InfiniteScroll>
    </div>
  ):<Loader/>
}

export default TvShows
