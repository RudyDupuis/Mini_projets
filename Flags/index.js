const display = document.querySelector(".countries-container");
const btns = document.querySelectorAll(".btnSort");

let countries = [];
let sort = "";

async function getCountries() {
  await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => (countries = data));

  displayCountries();
}

function displayCountries() {
  function Sort(a, b) {
    let toReturn = "";

    switch (sort) {
      case "alpha":
        toReturn = a.translations.fra.common.localeCompare(
          b.translations.fra.common
        );
        break;

      case "minToMax":
        toReturn = a.population - b.population;
        break;

      case "maxToMin":
        toReturn = b.population - a.population;
        break;

      default:
        toReturn = "";
        break;
    }
    return toReturn;
  }

  display.innerHTML = "";
  countries
    .filter((country) =>
      country.translations.fra.common
        .toLowerCase()
        .includes(inputSearch.value.toLowerCase())
    )
    .sort((a, b) => Sort(a, b))
    .slice(0, inputRange.value)
    .map((country) => {
      display.innerHTML += `<div class="card">
    <img src="${country.flags.svg}">
    <h2>${country.translations.fra.common}</h2>
    <h3>${country.capital ? country.capital[0] : ""}</h3>
    <p>Population : ${country.population.toLocaleString()}</p>
    </div>
    `;
    });
}

window.onload = () => getCountries();

inputRange.addEventListener("input", () => {
  document.getElementById("rangeValue").textContent = inputRange.value;
  getCountries();
});

inputSearch.addEventListener("input", () => {
  getCountries();
});

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    sort = btn.id;
    getCountries();
  });
});
