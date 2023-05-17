
const pokeApi = {}                   //Objeto para poder usar as funções em arquivos js diferentes

//-------------------------------------------------------------------------------------------------------------------------------------------------------
//Função responsável por pegar os dados de um pokemon especifico e transforma em um objeto do tipo pokemon
function convertPokeApiDetailToPokemon(pokeDetail) {

    const pokemon = new Pokemon()                                           //Istância a classe Pokemon
    pokemon.number = pokeDetail.id                                          //Atribui o id do json a propriedade number
    pokemon.name = pokeDetail.name                                          //Atribui o name do json a propriedade name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)    //transformar o array types em um array com apenas os names 
    const [type] = types    //array destroction                             //Atribui o types ao array type

    pokemon.types = types                                                   //Atribui o array type a propriedade types
    pokemon.type = type     //type principal                                //Atribui o type do json a propriedade type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default                  //Atribui a font_default do json a propriedade photo

    pokemon.height = pokeDetail.height                                                  //Atribui o height do json a propriedade height
    pokemon.weight = pokeDetail.weight                                                  //Atribui o weight do json a propriedade weight
    pokemon.abilities = pokeDetail.abilities.map((abilitie) => abilitie.ability.name)   //Transforma o array abilities em um array com a propriedade name do abilities e atribui a propriedade abilities
   
    //coletar as os dados da url dentro de species dentro de pokeDetail e atribui as propriedades do pokemon
    
    fetch(pokeDetail.species.url)
        .then((response) => response.json())
        .then((item) => {
            pokemon.shape = item.shape.name
            pokemon.habitat = item.habitat.name
            pokemon.eggGroup = item.egg_groups.map((value) => value.name)
        })
        
    return pokemon
}
//--------------------------------------------------------------------------------------------------------------------------------------------------------
//função responsavel por coletar dados especificos de um pokemon especifico
//Essa função vai receber os dados da pokeApi e vai pegar a propriedade url para acessar os dados de um pokemon especifico
//o dados viram na forma de promise e ao converte ela para json será usado como parametro para função convertPokeApiDetailPokemon()

pokeApi.getPokemonDetail = (pokemon) => {                //Essa função retorna uma promise não resolvida e não o valor da ultima linha
    return fetch(pokemon.url)                            //fecth da url dentro da promise da pokeapi, nela tem o nome e url do pokemon em questão
        .then((response) => response.json())             //converte a promise em json
        .then((convertPokeApiDetailToPokemon))           //Criar um objeto do tipo pokemon e adicionar os dados do json nele por meio da função convertPokeApiDetailPokemon()
        
        //forma diferente de escrever a linha de cima
        //.then((item) => convertPokeApiDetailToPokemon(item))
}


//---------------------------------------------------------------------------------------------------------------------------------------------------------
//função responsavel por transformar os dados da pokeapi em um array de objetos no modelo pokemons contendo apenas os dados nescessários

pokeApi.getPokemons = (offset = 0, limit = 5) => {                                         //Essa função retorna uma promise não resolvida 
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`        //url da poke Api com offset e limit como parâmetros

    return fetch(url)                                                                      //fetch da url
        .then((response) => response.json())                                               //Converte a promise em json
        .then((jsonBody) => jsonBody.results)                                             //Limita o json apenas para o campo do reults (campo que pertece ao json bruto)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))                        //Transforma o json limitado à results em uma lista de novas promises
        .then((detailRequests) => Promise.all(detailRequests))                             //promise.all recebe um array de promises e excuta todas elas quando todas elas terminarem de responde ele executa a próxima etapa
        .then((pokemonsDetails) => pokemonsDetails)                                        //retornar o array resolvido
}

//outPut (pokemonDetails): pokemon {number: number, name:string, type: string, types: array[string], photo: string }







    
