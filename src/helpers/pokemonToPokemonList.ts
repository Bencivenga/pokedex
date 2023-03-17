import { PokemonListItem } from '../interfaces/pokemon.interface';

export const pokemonToPokemonList = (pokemon: PokemonListItem) => {
	const pokemonList = {
		name: pokemon.name,
		url: pokemon.url,
	};

	return pokemonList;
};
