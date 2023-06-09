import { createSelector } from '@reduxjs/toolkit';
import { State } from '..';
import { filterByName } from '../../helpers/filterByName';

export const getFullPokemonList = (state: State) => state.pokemons.fullPokemonList;

export const getPokemonListFilteredByType = (state: State) => state.pokemons.pokemonListFilteredByType;

export const getPokemonData = (state: State) => state.pokemons.pokemonData;

export const getPokemonDataStatus = (state: State) => state.pokemons.pokemonDataStatus;

export const getAllPokemonTypesStatus = (state: State) => state.pokemons.allPokemonTypesStatus;

export const getPokemonListFilteredByTypeStatus = (state: State) => state.pokemons.pokemonListFilteredByTypeStatus;

export const getAllPokemonTypes = (state: State) => state.pokemons.allPokemonTypes;

export const getSelectedTypes = (state: State) => state.pokemons.selectedTypes;

export const getPokemonSearchValue = (state: State) => state.pokemons.pokemonSearchValue;

export const getOffset = (state: State) => state.pokemons.offset;

export const getLimit = (state: State) => state.pokemons.limit;

export const getPokemonListFiltered = createSelector(
	getFullPokemonList,
	getSelectedTypes,
	getPokemonListFilteredByType,
	getPokemonSearchValue,
	(pokemons, selectedTypes, pokemonsFilteredByType, pokemonSearchValue) => {
		if (!selectedTypes.length) {
			return !pokemonSearchValue ? pokemons : filterByName(pokemons, pokemonSearchValue);
		}

		return !pokemonSearchValue ? pokemonsFilteredByType : filterByName(pokemonsFilteredByType, pokemonSearchValue);
	}
);

export const getPokemonListPerPage = createSelector(
	getPokemonListFiltered,
	getOffset,
	getLimit,
	getPokemonSearchValue,
	(pokemons, offset, limit, searchValue) => {
		const offsetValue = offset === 1 ? 0 : offset;

		if (searchValue && pokemons.length) {
			return pokemons;
		}

		if (searchValue && !pokemons.length) {
			return null;
		}

		return pokemons.slice(Math.min(offsetValue * limit, pokemons.length), limit + offsetValue * limit);
	}
);
