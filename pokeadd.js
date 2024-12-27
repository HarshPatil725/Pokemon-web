// Maximum Pokémon species
const max_cnt = 500;

// Giving name to all classes
const listWrapper = document.querySelector(".list-wrapper");
const searchInput = document.querySelector("#search-box");

let pokemons = [];

// Debounce Function defined here to use afterwards
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

// Fetch Pokémon Data
// Fetch pehle kiya hai kyonki agar search me hi data fetch kare to partial search ka feature available nhi rehta 
async function fetchPokemonData() {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${max_cnt}`);
    const data = await response.json();
    pokemons = data.results;
  } catch (error) {
    console.error("Failed to fetch Pokémon data:", error);
    listWrapper.innerHTML = `<p class="no-results">Some Error Occured . Please wait !!!</p>`; // Error Meassage
  }
}

// Display Pokémon
function displayPokemons(pokemon) {
  listWrapper.innerHTML = ""; // Empty the list wrapper

  if (pokemon.length === 0) {
    listWrapper.innerHTML = `<p class="no-results">No Pokemon found from your search</p>`; 
    return;
  }

  // Create HTML structure for each Pokémon
  pokemon.forEach((pokemon) => {
    const pokemonID = pokemon.url.split("/")[6]; // Extract Pokémon ID
    const listItem = document.createElement("div");
    listItem.className = "list-item";
    listItem.innerHTML = `
      <div class="number-wrap">
        <p class="caption-fonts">#${pokemonID}</p>
      </div>
      <div class="img-wrap">
        <img src="https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg" alt="${pokemon.name}" />
      </div>
      <div class="name-wrap">
        <p>${pokemon.name}</p>
      </div>
    `;

    listWrapper.appendChild(listItem);
  });
}

// Handle Search with Debounce
function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase();

  // Search box empty ho to no pokemon 
  // Dikkat tab aati hai jab apan likh ke clear krte hai search bar ko
  if (!searchTerm) {
    listWrapper.innerHTML = ""; // Clear the list wrapper
    return;
  }

  // Filter Pokémon based on the search term
  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().startsWith(searchTerm)
  );

  displayPokemons(filteredPokemons);
}

// Attach Debounced Event Listener to search bar !!!!
const debouncedSearch = debounce(handleSearch, 300); // Delay of 300ms
searchInput.addEventListener("keyup", debouncedSearch);

// Initial Data Fetch
fetchPokemonData();
