const apiKey = '21ec068df2a5c774ca7f82bbda35c458';
const section = document.getElementById('cards');
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput")

fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=1`)
  .then(response => response.json())
  .then(data => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    data.results.forEach(movie => {
      const wrapper = document.createElement('div');
      wrapper.className = 'relative inline-block w-64 h-auto m-4';
      const movieImg = document.createElement('img');
      movieImg.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      movieImg.className = 'w-full rounded-lg shadow-md';
      const heartSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" class="absolute top-2 right-2 w-6 h-6 cursor-pointer fill-white">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11.998 20.663l-.13-.121c-4.055-3.765-6.75-6.274-6.75-8.97a4.5 4.5 0 018.648-1.88 4.5 4.5 0 018.652 1.88c0 2.696-2.695 5.205-6.75 8.97l-.13.12a.75.75 0 01-1.06 0z" />
        </svg>
      `;
      const heartDiv = document.createElement('div');
      heartDiv.className = 'absolute top-2 right-2';
      heartDiv.innerHTML = heartSvg;

      if (favorites.some(fav => fav.id === movie.id)) {
        heartDiv.querySelector('svg').classList.add('fill-red-400');
      } else {
        heartDiv.querySelector('svg').classList.add('fill-white');
      }

      heartDiv.addEventListener('click', () => {
        const svg = heartDiv.querySelector('svg');

        if (favorites.some(fav => fav.id === movie.id)) {
          const index = favorites.findIndex(fav => fav.id === movie.id);
          favorites.splice(index, 1);
          svg.classList.remove('fill-red-400');
          svg.classList.add('fill-white'); 
        } else {
          favorites.push(movie);
          svg.classList.remove('fill-white');
          svg.classList.add('fill-red-400');
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
        
      });

      let query = '';

      if (query === '') {
        wrapper.appendChild(movieImg);
        wrapper.appendChild(heartDiv);
        section.appendChild(wrapper);
      } else if(movie.title.includes(query) || movie.overview.includes(query)) {
        wrapper.appendChild(movieImg);
        wrapper.appendChild(heartDiv);
        section.appendChild(wrapper);
      }
    });
  })
  .catch(error => console.error('Error fetching popular movies:', error));


  searchInput.addEventListener("input", (e) => {
    e.
    query = searchInput.value.toLowerCase().trim();
    fetchMovies();
  });