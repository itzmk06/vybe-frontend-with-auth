export {removetv} from "../reducers/TvSlice"
import axios from "/src/utils/axios.jsx";
import { loadtv } from "../reducers/TvSlice";

export const asyncLoadtv=(id)=>async(dispatch,getState)=>{
    try{
        const detail=await axios.get(`/tv/${id}`);
        const externalID=await axios.get(`/tv/${id}/external_ids`);
        const recommendations=await axios.get(`/tv/${id}/recommendations`);
        const similar=await axios.get(`/tv/${id}/similar`);
        const videos=await axios.get(`/tv/${id}/videos`);
        const watchProviders=await axios.get(`/tv/${id}/watch/providers`);
        const translations=await axios.get(`tv/${id}/translations`);

        let superData={
            detail:detail.data,
            externalID:externalID.data,
            translations:translations.data.translations.map((t)=>t.english_name),
            recommendations:recommendations.data.results,
            similar:similar.data.results,
            videos:videos.data.results.find(m=>m.type==="Trailer"),
            watchProviders:watchProviders.data.results.IN,
        };
        dispatch(loadtv(superData))

    }catch(error){
        console.log("Error :",error);
    }
}