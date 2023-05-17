const pokemonList = document.getElementById('pokemonList')              //Nó na DOM
const loadMoreButton = document.getElementById('loadMoreButton')        //Nó na DOM

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
const maxRecords = 151          //Limita até qual pokemon será mostrado
const limit = 10                //limita quantos pokemons seram mostrados por vez
let offset = 0;                 //indica qual o início da vizualização
let allPokemonsStatus = []      //Array de objetos de todos os pokemons carregados no momento
//---------------------------------------------------------------------------------------------------------------------------------------------------------------

//função que recebe um obejeto pokemon e criar um pedaço de código html (Componente) e retorna
function convertPokemonToLi(pokemon) {
    
    return `
        <li  class="pokemon ${pokemon.type}" id="${pokemon.number}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                
                <div class="pokemon_img-pokemon-icon" >
                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">

                    <div class="pokemon_pokeball-icon" >
                    <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24">
                    <path  d="M12 2a10 10 0 0 1 10 10a10 10 0 0 1-10 10A10 10 0 0 1 2 12A10 10 0 0 1 12 2m0 2c-4.08 0-7.45 3.05-7.94 7h4.07c.44-1.73 2.01-3 3.87-3c1.86 0 3.43 1.27 3.87 3h4.07c-.49-3.95-3.86-7-7.94-7m0 16c4.08 0 7.45-3.05 7.94-7h-4.07c-.44 1.73-2.01 3-3.87 3c-1.86 0-3.43-1.27-3.87-3H4.06c.49 3.95 3.86 7 7.94 7m0-10a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2Z"/></svg>
                </div>    
                </div>
                
            </div>
        </li>
    `
}
//---------------------------------------------------------------------------------------------------------------------------------------------------------------

function CreateDetailsPokemon(pokemon) {
    return `
        <div class="content_pokemon-status ${pokemon.type} ">
            <div id="align-content" >
                <div>
                    <header class="pokemon-status_header">
                        <div class="pokemon-status_header_backBtn">
                            <button onclick="backDetails()" title="Back">
                                <svg 
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                hight="40"
                                viewBox="0 0 24 24">
                                    
                                    <path
                                        d="m10.875 19.3l-6.6-6.6q-.15-.15-.213-.325T4 12q0-.2.063-.375t.212-.325l6.6-6.6q.275-.275.688-.287t.712.287q.3.275.313.688T12.3 6.1L7.4 11h11.175q.425 0 .713.288t.287.712q0 .425-.287.713t-.713.287H7.4l4.9 4.9q.275.275.288.7t-.288.7q-.275.3-.7.3t-.725-.3Z" />
                                </svg>
                            </button>
                        </div>
                        <div class="pokemon-status_header_heart">
                            <input type="checkbox" id="heartCheckbox" title="favorite">
                            <label for="heartCheckbox" id="heart">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path
                                        d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35Z" />
                                </svg>
                            </label>
                        </div>
                    </header>
                    <div class="pokemon-status_informationMain">
                        <div class="pokemon-status_informationMain_container">
                            <div class="pokemon-status_informationMain_container_title">
                                <h1>${pokemon.name}</h1>
                            </div>
                            
                           <div class="pokemon-status_informationMain_container_types">
                                <ol>
                                    ${pokemon.types.map(type => `<li class="${type}">${type}</li>`).join('')}
                                </ol>
                           </div>
                            
                            
                        </div>
                        <div class="pokemon-status_informationMain_number">
                            #${pokemon.number}
                        </div>
                    </div>
                </div>
                <div class="pokemon-status_Details">
                    <div class="pokemon-status_Details_header">
                        <ol class="pokemon-status_Details_header_list" >
                            <li>About</li>
                            <li>Base Stas</li>
                            <li>Evolution</li>
                            <li>Moves</li>
                        </ol>
                    </div>
                    <div class="pokemon-status_Details_bar" >
                        <hr>
                        <div></div>
                    </div>
                    <div class="Div_padding">
                        <div class="pokemon-status_Details_General">
                            <div class="pokemon-status_Details_General_container">
                                <div class="pokemon-status_Details_General_container_Title">Shape</div>
                                <div class="pokemon-status_Details_General_container_content">${pokemon.shape}</div>
                            </div>
                            <div class="pokemon-status_Details_General_container">
                                <div class="pokemon-status_Details_General_container_Title">Height</div>
                                <div class="pokemon-status_Details_General_container_content">${pokemon.height}0 cm</div>
                            </div>
                            <div class="pokemon-status_Details_General_container">
                                <div class="pokemon-status_Details_General_container_Title">Weight</div>
                                <div class="pokemon-status_Details_General_container_content">${pokemon.weight} Kg</div>
                            </div>
                            <div class="pokemon-status_Details_General_container">
                                <div class="pokemon-status_Details_General_container_Title">Abilities</div>
                                <div class="pokemon-status_Details_General_container_content">
                                ${pokemon.abilities.map((item) => ` ${item} `)}
                                </div>
                            </div>
                        </div>
                        
                        <div class="Pokemon-status_Details_breeding">
                            <div class="Pokemon-status_Details_breeding_title">
                                <h3>Breeding</h3>
                            </div>
                            <div class="pokemon-status_Details_bredding_container">
                                <div class="pokemon-status_Details_bredding_container_box">
                                    <div class="pokemon-status_Details_bredding_container_box_Title">Habitat</div>
                                    <div class="pokemon-status_Details_bredding_container_box_content">${pokemon.habitat}</div>
                                </div>
                                <div class="pokemon-status_Details_bredding_container_box">
                                    <div class="pokemon-status_Details_bredding_container_box_Title">Egg Groups</div>
                                    <div class="pokemon-status_Details_bredding_container_box_content">
                                    ${pokemon.eggGroup.map((item) => ` ${item} `)}
                                    </div>
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>   

            <div class="pokemon-status_images" >
                <div class="pokemon-status_images_pokemon">
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </div>
    `
}


//---------------------------------------------------------------------------------------------------------------------------------------------------------------
//função respnsavel por adicionar os pedaços de códigos no arquivo index.html

function loadPokemonItens(offset, limit) {                              //recebe como parâmetros offset e limit
    pokeApi.getPokemons(offset, limit)                                  //chama a função getPokemons
        .then((pokemons = []) => {  
            const newHtml = pokemons.map(convertPokemonToLi).join('')       //Transformar um array em um pedaço de código html e atribui a variável newHtml
            pokemonList.innerHTML += newHtml                                //Adiciona a variável no arquivo indexHtml

            for (let i = 0; i < pokemons.length; i++){                      //Laço de reperticão para criar um array com dados de todos os pokemons carregados
                allPokemonsStatus.push(pokemons[i])                               //adiciona um objeto no array allPokemons
            }

            eventClickPokemon()
        })
}

loadPokemonItens(offset, limit)                                         //Primeira leva de pokemons, é executado na primeira vez que a página carrega

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

//Função para carregar mais pokemons
loadMoreButton.addEventListener('click', () => {                     //Evento de click 
    offset += limit                                                  //Aumenta o ponto em que começará a carrega mais pokemons
    const qtdRecordsWithNexPage = offset + limit                     //controlador para saber quando o limite for atingindo

    if (qtdRecordsWithNexPage >= maxRecords) {                       
        const newLimit = maxRecords - offset                         //caso o limite seja atingindo a função não carregará mais pokemons
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)     //remove o botão para carregar mais pokemons
    } else {
        loadPokemonItens(offset, limit)                              //chama mais pokemons
    }
})

//---------------------------------------------------------------------------------------------------------------------------------------------------------------
let content_pokedex = document.getElementById('content_pokedex')
let content = document.querySelector('section.content')

//função responsável por esconder o conteúdo principal e mostrar um card de detalhes do pokemon em questão
function showPokemonStatus (id)  {
   
    content_pokedex.classList.add('hidden')
    
    let PokemonStatus = allPokemonsStatus.filter(object => object.number == id)
    
    
    let pokemonDetails = document.createElement('div')
    pokemonDetails.id = 'IdpokemonDetails';

    pokemonDetails.innerHTML = CreateDetailsPokemon(PokemonStatus[0])

    content.appendChild(pokemonDetails)

}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------
//função para adicionar evento de click nos cards

function eventClickPokemon() {
    let pokemon = document.getElementsByClassName('pokemon')        //nó na DOM , vai resetar sempre que for chamda novamente
    
    for ( let i = 0; i < pokemon.length; i++){
        pokemon[i].addEventListener('click', () => {                //Evento de click na classe pokemon
            let idPokemon = pokemon[i].id                           //Atribui o id do card clicado a uma váriavel
            showPokemonStatus(idPokemon)                            //Chama a função ShowPokemonsStatus com o id de parâmetro
        })
    }
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------
//Função para voltar para o inicio da pokedex
function backDetails() {
    let IdpokemonDetails = document.getElementById('IdpokemonDetails');
    IdpokemonDetails.remove()

    content_pokedex.classList.remove('hidden')
}








