import { POKEMON_BASE_URL } from '../const';

export const extractPokemonDataFromUrl = (str: string) =>
	str.replace(`${POKEMON_BASE_URL}/`, '').replace('/', '');
