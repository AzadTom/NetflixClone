const  apikey = "c6d30650c6eb237a2804c658bf67ff6f";

const baseurl = "https://api.themoviedb.org/3";

const imgPath = "https://image.tmdb.org/t/p/original";

// AIzaSyDsrPu3jwscT19U8hKNHtZMtY6TzTeIM0w


const apiPaths = {
    fetchAllCategories: `${baseurl}/genre/movie/list?api_key=${apikey}`,
    fetchMoviesList: (id) => `${baseurl}/discover/movie?api_key=${apikey}&with_genres=${id}`,
    fetchTrending:`${baseurl}/trending/all/day?api_key=${apikey}&language=en-US`,
    searchOnYoutube: (query) => `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=AIzaSyDsrPu3jwscT19U8hKNHtZMtY6TzTeIM0w`
}









// Boots up the app

function init(){

     



     fetchTrendingMovies();
     fetchmoviescategories();
   
    
}


function fetchTrendingMovies(){

    fetchandMoviesection(apiPaths.fetchTrending,'Trending Now')
    .then(list =>{

        const random = parseInt(Math.random()*list.length);


        buildbanner(list[random]);

    }).catch(err=>{

        console.error(err);
    });

}


function buildbanner(banner){


        const bannercont = document.getElementById('banner-cont');
        let itemTitle = banner.title== null ? banner.name : banner.title; 

        bannercont.style.backgroundImage =  ` url(' ${imgPath}${banner.backdrop_path}')`;

        const div = document.createElement('div');

        div.innerHTML = ` <div class="banner-content">
        <h2 class="banner_title">${itemTitle}</h2>
        <p class="banner_info">Trending in movies | Released - ${banner.release_date}</p>
        <p class="banner_overview">
          ${banner.overview && banner.overview.length >200 ? banner.overview.slice(0,200).trim()+'...' : banner.overview}
        </p>
        <div class="action-btn-cont">
          <button>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="Hawkins-Icon Hawkins-Icon-Standard"
            >
              <path
                d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z"
                fill="currentColor"
              ></path>
            </svg>
            Play
          </button>
          <button>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="Hawkins-Icon Hawkins-Icon-Standard"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z"
                fill="currentColor"
              ></path>
            </svg>
            More Info
          </button>
        </div>
      </div>`

        bannercont.append(div);



    

}




function fetchmoviescategories( ){
    fetch(apiPaths.fetchAllCategories)
    .then(res => res.json())
    .then(res =>{

        const categories = res.genres;
        if(Array.isArray(categories) && categories.length)
        {
            categories.forEach(categorie =>{

                fetchandMoviesection(apiPaths.fetchMoviesList(categorie.id ), categorie.name);


            });


        }

        

    })
    .catch(err => console.error(err));


}


function fetchandMoviesection(fetchurl , categorie)
{


    return  fetch(fetchurl)
    .then(res=> res.json())
    .then(res=> {

        console.table(res.results)
        const movies = res.results;

        if(Array.isArray(movies) && movies.length)
        {

            buildmoviesection(movies,categorie);

            
        }

        return movies;
    })
    .catch(err=> console.error(err));




}


function buildmoviesection(movielist , categorieName) 
{

    console.log(movielist,categorieName);


    const movielistHTML = document.getElementById('movies-cont');

    const imgHTML=  movielist.map( item =>{
         
          let itemTitle = item.title== null ? item.name : item.title; 

        return `   <div class="movie"> <img src="${imgPath}${item.backdrop_path}"  class= " item"onclick ="searchMovieTrailer('${itemTitle}')" alt="${itemTitle}"  >
                          <p>${itemTitle } </p>
                          </div>
                     `;


    }).join(' ');


    const moviesectionHTML = `
            
  
               
    <h2 class="movie-section-heading">${categorieName}<span>Explore All</span></h2>

    <div class="movies-row">
        
              ${imgHTML}

           

    </div>
  

    `;


    console.log(moviesectionHTML);


    const div = document.createElement('div');

    div.className="movies-section";
    div.innerHTML = moviesectionHTML;

    //append html to container

    movielistHTML.append(div);





}


    

  


function searchMovieTrailer(moviename){



  if(!moviename) return ;

  fetch(apiPaths.searchOnYoutube(moviename))
  .then(res => res.json())
  .then (res => {
    console.log(res.items[0]);
    const bestres = res.items[0];
    const youtubeurl = `https://www.youtube.com/watch?v=${bestres.id.videoId}`;
  })
  .catch(err => console.error(err))


    const item  = document.querySelector('.item');


  

      





}
    






// as your app launch call callback function

window.addEventListener('load',()=>{

    init();

    window.addEventListener('scroll',()=>{

       

        const head = document.getElementById('headers');

        if(window.scrollY>5){

            head.classList.add('black-bg');

        }
        else{

            head.classList.remove('black-bg');
        }

    })



});