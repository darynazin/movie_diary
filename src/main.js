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
