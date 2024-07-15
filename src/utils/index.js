import { ApolloClient, InMemoryCache, createHttpLink
} from "@apollo/client";

const rickandmortyApi = "https://rickandmortyapi.com/graphql"
const travelApi = 'https://countries.trevorblades.com/'
const pokemonApi = 'https://beta.pokeapi.co/graphql'
const spaceXApi = 'https://spacex-api.fly.dev/graphql'
const hasuraApi = 'https://hasura.io/learn/graphql/graphiql'
const starApi = 'https://swapi-graphql.netlify.app/'

const starLink = createHttpLink({ uri: starApi });
const rickAndMortyLink = createHttpLink({ uri: rickandmortyApi });
const travelLink = createHttpLink({ uri: travelApi });
const pokemonLink = createHttpLink({ uri: pokemonApi });
const spaceXLink = createHttpLink({ uri: spaceXApi });
const hasuraLink = createHttpLink({ uri: hasuraApi });

export const clientHasura = new ApolloClient({
  uri: hasuraLink,
  cache: new InMemoryCache()
})

export const rickAndMortyClient = new ApolloClient({
  link: rickAndMortyLink,
  cache: new InMemoryCache(),
})

export const Travelclient = new ApolloClient({
  link: travelLink,
  cache: new InMemoryCache(),
})

export const pokemonClient = new ApolloClient({
  link: pokemonLink,
  cache: new InMemoryCache(),
})

export const spaceXClient = new ApolloClient({
  link: spaceXLink,
  cache: new InMemoryCache(),
})

export const starClient = new ApolloClient({
  link: starLink,
  cache: new InMemoryCache()
})

//rickAndMortyClient.clearStore().then(() => console.log('Cache cleared!'));
//pokemonClient.clearStore().then(() => console.log('Cache cleared!'));
//Travelclient.clearStore().then(() => console.log('Cache cleared!'));
