const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

export const addToStorage = (movie) => {
  favorites.push(movie);
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

export const deleteFromStorage = (movie) => {
  const index = favorites.findIndex(fav => fav.id === movie.id);
  favorites.splice(index, 1);
  localStorage.setItem('favorites', JSON.stringify(favorites));
}
