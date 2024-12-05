import { getMovies } from './modules/network.js';
import { renderMovie } from './modules/ui.js';

const popularMovies = await getMovies();
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

popularMovies.forEach((movie) => {
  renderMovie(movie);
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const query = searchInput.value.trim().toLowerCase(); 

  const filteredMovies = popularMovies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(query) ||
      movie.overview.toLowerCase().includes(query)
  );

  filteredMovies.forEach((movie) => {
    renderMovie(movie);
  });
});