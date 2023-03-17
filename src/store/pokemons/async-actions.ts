import { createAsyncThunk } from '@reduxjs/toolkit';
import { store } from '..';
import { BASE_URL } from '../../const';
import { pokemonToPokemonList } from '../../helpers/pokemonToPokemonList';
import {
	Pokemon,
	PokemonByTypeListResponse,
	PokemonListResponse,
	PokemonTypesList,
} from '../../interfaces/pokemon.interface';
import { api } from '../../services/api';
import { setAllPokemonTypes, setFullPokemonList, setPokemonData, setPokemonListFilteredByType } from './slice';

export const fetchFullPokemonList = createAsyncThunk('pokemons/fetchFullPokemonList', async () => {
	await api.get<PokemonListResponse>('pokemon?limit=50&offset=0').then((res) => {
		const pokemonList = res?.data?.results;
		store.dispatch(setFullPokemonList(pokemonList));
	});

	api.get<PokemonListResponse>('pokemon?limit=1250&offset=0').then((res) => {
		const fullPokemonList = res?.data?.results;
		store.dispatch(setFullPokemonList(fullPokemonList));
	});
});

export const fetchAllPokemonTypes = createAsyncThunk('pokemons/fetchAllPokemonTypes', async () => {
	await api.get<PokemonTypesList>(`${BASE_URL}type`).then((res) => {
		const allPokemonTypes = res?.data.results.map((type) => type);
		store.dispatch(setAllPokemonTypes(allPokemonTypes));
	});
});

export const fetchPokemonData = createAsyncThunk('pokemons/fetchPokemonData', async (url: string) => {
	const { data } = await api.get<Pokemon>(url);
	store.dispatch(setPokemonData({ url, data }));
});

export const fetchPokemonsByType = createAsyncThunk('pokemons/fetchPokemonsByType', async (endpoints: string[]) => {
	const pokemonsByType = await Promise.all(
		endpoints.map((endpoint) =>
			api
				.get<PokemonByTypeListResponse>(endpoint)
				.then((res) => res?.data.pokemon.map(({ pokemon }) => pokemonToPokemonList(pokemon)))
		)
	);
	store.dispatch(setPokemonListFilteredByType(pokemonsByType.flat()));
});
