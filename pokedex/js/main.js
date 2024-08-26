const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const input = document.querySelector('.input__search');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  //const APIResponse = await fetch('https://pokeapi.co/api/v2/pokemon/charizard');
  
  if (APIResponse.status === 200){
    const data = await APIResponse.json();
    return data;
  }

}

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Loading...'
  pokemonNumber.innerHTML = ''

  const data = await fetchPokemon(pokemon);

  if(data){
    pokemonImage.style.display ='block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
  } else {
    pokemonName.innerHTML = 'Not found :C'
    pokemonNumber.innerHTML = '';
    pokemonImage.style.display ='none';
  }

}

form.addEventListener('submit', (event) =>{
  event.preventDefault();

  renderPokemon(input.value.toLowerCase())
  searchPokemon = input.value;
  input.value = '';
})

btnPrev.addEventListener('click', () =>{
  if(searchPokemon > 1){
    searchPokemon--;
    renderPokemon(searchPokemon);
  }
})

btnNext.addEventListener('click', () =>{
  searchPokemon++;
  renderPokemon(searchPokemon);
})

renderPokemon('1')

