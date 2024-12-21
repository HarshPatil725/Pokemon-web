console.log("Hello there !")

// Maximum pokemon species
max_cnt = 151

// Giving name to all classes
const listWrapper = document.querySelector(".list-wrapper");
const searchInput = document.querySelector("#search-box");

let pokemons = []
fetch(`https://pokeapi.co/api/v2/pokemon?limit=${max_cnt}`)
.then((response) => response.json())
.then((data) => {
    pokemons = data.results
    console.log(pokemons,"This is Pokemons")
    displayPokemons(pokemons) //Ye function niche define hai
})

async function fetchPokemonDataBeforeRedirect(id) {
    try {
      const [pokemon, pokemonSpecies] = await Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
          res.json()
        ),
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) =>
          res.json()
        ),
      ]);
      return true;
    } catch (error) {
      console.error("Failed to fetch Pokemon data before redirect");
    }
}

function displayPokemons(pokemon) {
    listWrapper.innerHTML = ""; //Emptying the list wrapper
  
    // Creating html structure for each pokemon
        pokemon.forEach((pokemon) => {
        const pokemonID = pokemon.url.split("/")[6];  // id lene ke liye
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
                <p>#${pokemon.name}</p>
            </div>
        `;
    
        listWrapper.appendChild(listItem);
        });
}

// Working on Search input
searchInput.addEventListener("keyup", handleSearch);

function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase();
  let filteredPokemons;
  filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().startsWith(searchTerm)
    );

  displayPokemons(filteredPokemons);
}
