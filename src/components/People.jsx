import { useNavigate } from "react-router-dom"
import TopNav from "./helper/TopNav";
import axios from "../utils/axios";
import { useEffect } from "react";
import { useState } from "react";
import Cards from "./helper/Cards";
import Loader from "./helper/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import SideNav from "./helper/SideNav";

function People() {
    document.title="Vybe | People"
    const navigate=useNavigate();
    const [category, setCategory] = useState("popular");
    const [person, setPerson] = useState([])
    const [page,setPage]=useState(1);
    const [hasMore,setHasMore]=useState(true);
    
    const getPerson = async () => {
        try {
          const { data } = await axios.get(`/person/${category}`);
        //   setPerson(data.results);
        if(data.results.length>0){
            setPerson((prev)=>[...prev,...data.results])
            setPage(page+1);
        }else{
            setHasMore(false);
        }
        } catch (error) {
          console.error("Error: ", error);
        }
      };

      const refreshHandler =()=>{
        if(person.length===0){
            getPerson();
        }else{
            setPage(1);
            setPerson([]);
            getPerson();
        }
      };

      useEffect(()=>{
        refreshHandler();
      },[category]);

  return person.length>0?(
    <div className='w-full h-full'>
      <SideNav/>
        <div className='w-full text-zinc-400 font-semibold text-xl flex gap-2 justify-center items-start'>
        <i
          onClick={() => navigate(-1)}
          className="mt-[1.3%] ml-[1%] cursor-pointer text-zinc-200 font-bold text-2xl ri-arrow-left-line hover:text-[#009FFD] transition-transform transform hover:-translate-x-1"
        ></i>
            <h1 className="font-bold  pt-[1.5%] font-jose text-xl">People</h1>
            <div className="w-[150%] text-black mt-[0.2%] relative mx-auto">
            <TopNav/>
            </div>
            <div className="flex pt-[1.5%]">
            </div>
        </div>
        <InfiniteScroll dataLength={person.length} Loader={<Loader/>} next={getPerson} hasMore={hasMore}>
            <Cards data={person} title="person"/>
        </InfiniteScroll>
    </div>
  ):<Loader/>
}

export default People
