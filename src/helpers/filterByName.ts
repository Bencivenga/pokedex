import { PokemonListItem } from '../interfaces/pokemon.interface';

export const filterByName = (arr: PokemonListItem[], query: string) =>
	arr.filter((pokemon) => pokemon.name.includes(query));
