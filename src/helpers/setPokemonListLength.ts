import { PokemonListItem } from '../interfaces/pokemon.interface';

export const setPokemonListLength = (list: PokemonListItem[], limit: number) => (list.length % limit > limit ? 0 : -1);
