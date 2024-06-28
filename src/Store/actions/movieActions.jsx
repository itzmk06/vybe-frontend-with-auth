export {removeMovie} from "../reducers/MovieSlice"
import axios from "/src/utils/axios.jsx";
import { loadMovie } from "../reducers/MovieSlice";

export const asyncLoadMovie=(id)=>async(dispatch,getState)=>{
    try{
        const detail=await axios.get(`/movie/${id}`);
        const externalID=await axios.get(`/movie/${id}/external_ids`);
        const recommendations=await axios.get(`/movie/${id}/recommendations`);
        const similar=await axios.get(`/movie/${id}/similar`);
        const videos=await axios.get(`/movie/${id}/videos`);
        const watchProviders=await axios.get(`/movie/${id}/watch/providers`);
        const translations=await axios.get(`movie/${id}/translations`);

        let superData={
            detail:detail.data,
            externalID:externalID.data,
            translations:translations.data.translations.map((t)=>t.english_name),
            recommendations:recommendations.data.results,
            similar:similar.data.results,
            videos:videos.data.results.find(m=>m.type==="Trailer"),
            watchProviders:watchProviders.data.results.IN,
        };
        dispatch(loadMovie(superData))

    }catch(error){
        console.log("Error :",error);
    }
}