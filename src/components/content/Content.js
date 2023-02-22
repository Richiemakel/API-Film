import React,{ useState} from 'react'
import axios from "axios";
import { apiKey} from "../../API"




export default function Content() {

    const [searchTerm, setSearchTerm]= useState("") ;
    //tableau d'objet permettant dde récupérer les informatoins des films
    const [data, setData] = useState({});
    
    const onSearchHandler = () => {
        if(!searchTerm){
            return;
        }
        //On récupère toute les donées de L'API 
        //L'API a ete recupéré ici
        axios({
            method: "GET",
            url: `https://www.omdbapi.com/?t=${searchTerm}&&apiKey=${apiKey}`,
        }).then((res) => {
            console.log(res.data);
            setData(res.data);
        });

        setSearchTerm("");
    };
    //console.log(test)

  return (
    <div className=" h-screen bg-slate-800 w-full pt-7">
        <div className="w-full flex items-center justify-center">

            <input type="text" 
                   placeholder="Type a movie name..." 
                   className="text-[19px] mr-4 outline-none rounded-md p-2 w-[40%]"
                   onChange={(e)=> setSearchTerm(e.target.value)}
            />


            <button className="border border-white rounded-md p-2 text-white font-bold flex-wrap"
                    onClick={onSearchHandler}
            >
                Search
            </button>


        </div>
        { 
        // Si le tableau d'objet est vide, ' c'est a dire si il y a zero requet de faites cette élement n(est pas affiché)
        Object.keys(data).length > 0 &&
        <div className='mt-10 w-full flex items-center justify-center text-white font-bold'>


            <div>
                    <img src={data.Poster} alt='#' className="border border-white rounded-lg"/>
            </div>


            <div className='ml-5 bg-slate-500 p-2 rounded-md'>   
                    <h1>Titles: {data.Title}</h1>
                    <p>Directeur : {data.Director} </p>
                    <p> Genre : {data.Genre} </p>
                    <p>Pays : {data.Country} </p>
                    <p>Acteurs : {data.Actors} </p>
                    <p>Langue : {data.Language} </p>
                    <p>Notes : {data.Rated} </p>
                    <p>Intrigue : {data.Plot} </p>     
            </div>

            
        </div>
       }
    </div>
  )
}
