import { gql } from "@apollo/client";

export const GET_LIST = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        url
        name
        image
      }
    }
  }
`;

export const GET_POKEMON = gql`
query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      height
      weight
      status
      message
      sprites {
        front_default
      }
      moves {
        move {
          name
        }
      }
      types {
        type {
          name
        }
      }
      stats {
        effort
        base_stat
        stat {
          name 
          url
        }
      }
      abilities {
        slot
        is_hidden
        ability {
          name
          url
        }
      }
      species{
        name
      }
      message
    }
  }
`;