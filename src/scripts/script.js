const pokemonName = document.querySelector('.pokemon-name');
const pokemonNumber = document.querySelector('.pokemon-number');
const pokemonImage = document.querySelector('.pokemon-image');

const form = document.querySelector('.search');
const input = document.querySelector('.input-search');

const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

let pokemonID = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Carregando...';
    pokemonNumber.innerHTML = '';
    const data = await fetchPokemon(pokemon);
    if (data) {
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']
        ['animated']['front_default']
    } else {
        pokemonName.innerHTML = 'Não encontrado';
        pokemonNumber.innerHTML = '';
        pokemonImage.src = 'none'
    }

}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon((input.value).toLowerCase())
})

btnPrev.addEventListener('click', () => {
    if (parseInt(pokemonNumber.innerHTML) > 1) {
        let pokemonID = parseInt(pokemonNumber.innerHTML);
        pokemonID -= 1
        renderPokemon(pokemonID);
    }
    if (pokemonName.innerHTML == 'Não encontrado') {
        pokemonID = 1
        renderPokemon(pokemonID);
    } else { }
})
btnNext.addEventListener('click', () => {
    if (parseInt(pokemonNumber.innerHTML) <= 648) {
        let pokemonID = parseInt(pokemonNumber.innerHTML);
        pokemonID += 1
        renderPokemon(pokemonID);
    } if (pokemonName.innerHTML == 'Não encontrado') {
        pokemonID = 1
        renderPokemon(pokemonID);
    } else { }
})

