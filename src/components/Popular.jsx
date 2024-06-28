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

function Popular() {
  document.title="Vybe | Popular"
    const navigate=useNavigate();
    const [category, setCategory] = useState("movie")
    const [popular, setPopular] = useState([])
    const [page,setPage]=useState(1);
    const [hasMore,setHasMore]=useState(true);

    const getPopular = async () => {
        try {
          const { data } = await axios.get(`${category}/popular?page=${page}`);
        //   setpopular(data.results);
        if(data.results.length>0){
            setPopular((prev)=>[...prev,...data.results])
            setPage(page+1);
        }else{
            setHasMore(false);
        }
        } catch (error) {
          console.error("Error: ", error);
        }
      };

      const refreshHandler =()=>{
        if(popular.length===0){
            getPopular();
        }else{
            setPage(1);
            setPopular([]);
            getPopular();
        }
      };


      useEffect(()=>{
        refreshHandler();
      },[category]);

  return (
    popular.length>0?(
    <div className='w-full h-full'>
      <SideNav/>
        <div className='w-full text-zinc-400 font-semibold text-xl flex gap-2 justify-center items-start'>
        <i
          onClick={() => navigate(-1)}
          className="mt-[1.3%] ml-[1%] cursor-pointer text-zinc-200 font-bold text-2xl ri-arrow-left-line hover:text-[#009FFD] transition-transform transform hover:-translate-x-1"
        ></i>
        <h1 className="pt-[1.5%] font-jose flex gap-1 text-2xl">Popular <i className="ri-arrow-right-s-fill text-[#009FFD]"></i> <small>{category.toUpperCase()}</small></h1>
            <div className="w-[150%] text-black mt-[0.2%] relative mx-auto">
            <TopNav/>
            </div>
            <div className="flex pt-[1.5%] mr-[4%]">
            <DropDown title={"Category"} options={["Movie","Tv"]} func={(e)=>setCategory(e.target.value)} />
            </div>
        </div>
        <InfiniteScroll dataLength={popular.length} Loader={<Loader/>} next={getPopular} hasMore={hasMore}>
            <Cards data={popular} title={category}/>
        </InfiniteScroll>
    </div>
  ):<Loader/>
  )
}

export default Popular
