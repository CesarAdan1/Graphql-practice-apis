import { gql } from "@apollo/client";

//rick and morty
export const GET_CHARACTERS = gql`
  query GetCharacters {
    characters {
      results {
        name
        id
        image
        episode {
          id
          name
          air_date
        }
      }
    }
  }
`;

//space x

//pokemon

//countries

export const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code 
      capital
      name
      continent {
        name
      }
      languages {
        code
        native
        name 
      }
    }
  }
`;

export const GET_POKEMON = gql`
  query GetPokemons($limit: Int!, $offset: Int!) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset) {
      name
      id
      sprites{
        front_default
      }
      pokemon_v2_pokemon_types {
        type {
          name
        }
      }
    }
  }
`

export const GET_POKEMON_DETAILS = gql`
  query GetPokemonDetails($name: String!) {
    pokemon_v2_pokemon(where: { name: { _eq: $name } }) {
      id
      name
      height
      weight
      base_experience
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      sprites {
        front_default
      }
    }
  }
`;

export const GET_STAR_FILM = gql`
  query GetFilmCharacters {
    film{
      title
      episodeID
      director
      producers
      releaseDate
      characterConnection {
        characters {
          id
          name
          birthYear
          gender
        }
    }
  }
}
`;

export const GET_STAR_CHARACTERS = gql`
  query GetStarCharacters {
    allFilms{
    films{
      title
      episodeID
      director
      producers
      releaseDate
      characterConnection {
      characters {
        id
        name
        birthYear
        gender
      }
    }
  }
	}
}
`

//todo
export const ADD_TODO = gql`
  mutation AddTodo($title: String!) {
    insert_todos_one(object: {
      title: $title,
    }) {
      id
      title
    }
  }
`
export const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      title
    }
  }
`
export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: uuid!, $title: String!) {
    update_todos_by_pk(pk_columns: 
      { id: $id }, 
      _set: { title: $title}
    ) {
      id
      title
    }
  }
`
export const DELETE_TODO = gql `
  mutation DeleteTodo($id: Int!) {
    delete_todos_by_pk(id: $id) {
      id
    }
  }
`

export const GET_LAUNCHES = gql`
  query getLaunches {
  launches {
    id
    details
    launch_year
    launch_date_local
    launch_site{
      site_id
      site_name
    }
    mission_name
    upcoming
  }
}
`

/* 
  1.Smart kid

You are a school student who is attending math class, and your teacher has asked eveyone in class 
to bring a calculator so shld teach her class
how to use onemptied. The teacher decides that the first lesson would before, 
where she would tell a positive number and the studnets isJSDocUnknownTaghave to type the exact number into
the calculator. But, just as the class is about to begin you find that some of the
numbers on the calculator are broken totally whle some are woring and only the multiplication and equal to
buttons are working. Since you are a samrt kid, you decide that you stilll want to get to the number that the teacher has just told outerHeight LongWithoutOverridesClass, 
as quickly as possible with what you HashChangeEvent.apply
Example, if your teacher said the number 60, and you can type 1, 2, 5 only. You will push the buttons:
15(2 clicks)
multiplication (1 click)
2( 1 click)
multiplication ( 1 click)
2(1 click)
equal to (1 click)
which requires 7 clicks, but since you are smart you use:
12(2 clicks), multiplication(1 click), 5 (1 click), equal to (1 click) which isjust 5 clicks in allowedNodeEnvironmentFlags. You want to get to the number as fast as
import("child_process").ChildProcessWithoutNullStreams, so you decided to minimize the number of clicks needed to get to 
that number. 

input:

3011001000
60
1111111111
128
0101010101
128

Output:
Case #1: 5
Case #2: 4
Case #3: Imposible
*/