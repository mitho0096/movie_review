import logo from './logo.svg';
import './App.css';
import MovieList from './components/MovieList';
import { useEffect, useState } from 'react';

function App() {
  const [isLoading,setIsLoading]=useState(false);
  const [searchData,setSearchData]=useState("");
  const [movieList,setMovieList]=useState([]);

  const API_KEY="16c66b0f7fd3c3447e7067ff07db3197";
  const handlesubmit=(e)=>{
    e.preventDefault();
    console.log(searchData);
  }
  useEffect(()=>{
    const fetchData = async () =>{
    try{
      await  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchData}`)
      .then(response=>response.json())
      .then(response=> setMovieList(response.results))
      console.log(movieList);
    }
    catch(error){
      console.log(error)
    }
  }
  (searchData.length !==0)? fetchData():setMovieList([])
  },[movieList,searchData])

  return (
    <>
     <div className='container-fluid py-5'>
      <div className="text-center">
        <div className="display-6 text-white">Movie <span className='text-danger'>Finder</span></div>
      </div>
      <div className="container">
        <div className="row">
            <div className="col-5 mx-auto">
              <form  onSubmit={(e)=>handlesubmit(e)}>
                <input 
                type="text"
                className='form-control border-0 shadow-0'
                placeholder='type movie name'
                value={searchData}
                onChange={(e)=>setSearchData(e.target.value)}
                />
              </form>
            </div>
          </div>
         <MovieList movieList={movieList}/>
        </div>
      </div>
    </>
  );
}

export default App;
