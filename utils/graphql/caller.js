import { useQuery } from "@apollo/client";

export default function caller(gqlParam,QUERY){
    const { loading, error, data } = useQuery(QUERY, {
        variables: gqlParam,
      });
    return {
      loading,
      error,
      data
    }
}
//example
// const gqlParam = {
//   limit: 5,
//   offset: 1,
// };

// const GET_POKEMONS = gql`
//   query pokemons($limit: Int, $offset: Int) {
//     pokemons(limit: $limit, offset: $offset) {
//       count
//       next
//       previous
//       status
//       message
//       results {
//         url
//         name
//         image
//       }
//     }
//   }
// `;