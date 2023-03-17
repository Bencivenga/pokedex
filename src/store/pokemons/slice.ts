import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { extractPokemonDataFromUrl } from '../../helpers/extractPokemonIdFromUrl';
import { PokemonTypes, Pokemon, PokemonListItem } from '../../interfaces/pokemon.interface';
import { fetchAllPokemonTypes, fetchPokemonData } from './async-actions';

export interface PokemonsSliceState {
	fullPokemonList: PokemonListItem[];
	pokemonListFilteredByType: PokemonListItem[];
	pokemonData: Record<string, Pokemon>;
	pokemonToPokemonTypes: Record<string, Record<string, boolean>>;
	allPokemonTypes: PokemonTypes[];
	selectedTypes: string[];
	pokemonSearchValue: string;
	pokemonDataStatus: 'loading' | 'succeeded' | 'failed';
	allPokemonTypesStatus: 'loading' | 'succeeded' | 'failed';
	offset: number;
	limit: number;
}

const initialState: PokemonsSliceState = {
	fullPokemonList: [],
	pokemonListFilteredByType: [],
	pokemonData: {},
	pokemonToPokemonTypes: {},
	selectedTypes: [],
	allPokemonTypes: [],
	pokemonSearchValue: '',
	pokemonDataStatus: 'loading',
	allPokemonTypesStatus: 'loading',
	offset: 1,
	limit: 10,
};

const pokemonsSlice = createSlice({
	name: 'pokemons',
	initialState,
	reducers: {
		setFullPokemonList: (state, action: PayloadAction<PokemonListItem[]>) => {
			state.fullPokemonList = action.payload;
		},

		setPokemonListFilteredByType: (state, action: PayloadAction<PokemonListItem[]>) => {
			state.pokemonListFilteredByType = action.payload;
		},

		setPokemonData: (state, action: PayloadAction<{ url: string; data: Pokemon }>) => {
			const { url, data } = action.payload;
			const name = extractPokemonDataFromUrl(url);

			state.pokemonData[name] = data;
		},

		setAllPokemonTypes: (state, action: PayloadAction<PokemonTypes[]>) => {
			state.allPokemonTypes = action.payload;
		},

		setSelectedTypes: (state, action: PayloadAction<string[]>) => {
			state.selectedTypes = action.payload;
		},

		setPokemonSearchValue: (state, action: PayloadAction<string>) => {
			state.pokemonSearchValue = action.payload;
		},

		setOffset: (state, action: PayloadAction<number>) => {
			state.offset = action.payload;
		},

		setLimit: (state, action: PayloadAction<number>) => {
			state.limit = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPokemonData.pending, (state) => {
			state.pokemonDataStatus = 'loading';
		});

		builder.addCase(fetchPokemonData.fulfilled, (state) => {
			state.pokemonDataStatus = 'succeeded';
		});

		builder.addCase(fetchAllPokemonTypes.pending, (state) => {
			state.allPokemonTypesStatus = 'loading';
		});

		builder.addCase(fetchAllPokemonTypes.fulfilled, (state) => {
			state.allPokemonTypesStatus = 'succeeded';
		});
	},
});

export const {
	setFullPokemonList,
	setPokemonListFilteredByType,
	setPokemonData,
	setAllPokemonTypes,
	setSelectedTypes,
	setPokemonSearchValue,
	setOffset,
	setLimit,
} = pokemonsSlice.actions;

export default pokemonsSlice.reducer;
