import { getMovies } from "./modules/network.js";
import { renderMovie } from "./modules/ui.js";

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

  const section = document.getElementById("cards");
  section.innerHTML = "";

  const message = document.getElementById("cardsHeader");
  message.textContent = "No matches found";

  filteredMovies.forEach((movie) => {
    renderMovie(movie);
  });
  searchInput.value = "";
});

const themeToggleButton = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const body = document.body;

function applyTheme(theme) {
  if (theme === "dark") {
    body.classList.add("dark");
    themeIcon.textContent = "🌙";
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.remove("dark");
    themeIcon.textContent = "☀️";
    localStorage.setItem("theme", "light");
  }
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  applyTheme(savedTheme);
} else {
  applyTheme("light");
}

themeToggleButton.addEventListener("click", () => {
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "dark") {
    applyTheme("light");
  } else {
    applyTheme("dark");
  }
});

window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;
  console.log("Saved Scroll:", scrollPosition);
  localStorage.setItem("scrollPosition", scrollPosition);
});

window.addEventListener("load", () => {
  const savedScrollPosition = localStorage.getItem("scrollPosition");
  console.log("Saved Scroll:", savedScrollPosition);

  if (savedScrollPosition !== null) {
    setTimeout(() => {
      window.scrollTo(0, parseInt(savedScrollPosition, 10));
    }, 100);
  }
});
