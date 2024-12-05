const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
const container = document.getElementById("favorites");
console.log("overview:", favorites);

// Check if there are any favorites to display
if (favorites.length === 0) {
  const noFavorites = document.createElement("p");
  noFavorites.textContent = "No favorite movies added yet!";
  noFavorites.className = "text-center text-gray-500 mt-4";
  container.appendChild(noFavorites);
} else {
  favorites.forEach((movie) => {
    const wrapper = document.createElement("div");
    wrapper.className =
      "p-4 border rounded-lg shadow-md mb-4 flex flex-col items-left bg-gray-50";

    // Movie poster
    const movieImg = document.createElement("img");
    movieImg.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    movieImg.alt = movie.title;
    movieImg.className = "w-48 rounded-lg mb-4";
    wrapper.appendChild(movieImg);

    // Movie title
    const movieTitle = document.createElement("h3");
    movieTitle.textContent = movie.title;
    movieTitle.className = "text-lg font-semibold mb-2 text-left";
    wrapper.appendChild(movieTitle);

    // Review input
    const reviewInput = document.createElement("textarea");
    reviewInput.placeholder = "Write your review...";
    reviewInput.className =
      "w-full p-3 border rounded mb-2 focus:outline-none text-sm";
    reviewInput.value = movie.review || ""; // Pre-fill if review already exists
    wrapper.appendChild(reviewInput);

    const actionContainer = document.createElement("div");
    actionContainer.className = "flex items-center space-x-2"; // Flexbox for alignment

    // Submit button
    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit Review";
    submitButton.className =
      "bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600";
    wrapper.appendChild(submitButton);

    // Event listener for submit button
    submitButton.addEventListener("click", () => {
      const review = reviewInput.value.trim();

      if (review) {
        // Update the review in the favorites array
        const index = favorites.findIndex((fav) => fav.id === movie.id);
        if (index !== -1) {
          favorites[index].review = review;
          localStorage.setItem("favorites", JSON.stringify(favorites));
          alert("Review saved!");
        }
      } else {
        alert("Please write a review before submitting.");
      }
    });

    container.appendChild(wrapper);
  });
}
