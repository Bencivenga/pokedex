export interface PokemonListItem {
	name: string;
	url: string;
}

export interface PokemonListResponse {
	results: PokemonListItem[];
}

export interface PokemonType {
	type: {
		name: string;
		url: string;
	};
}

export interface PokemonTypes {
	name: string;
	url: string;
}

export interface PokemonTypesList {
	results: PokemonTypes[];
}

interface PokemonStat {
	base_stat: number;
	stat: {
		name: string;
	};
}

interface PokemonAbility {
	ability: {
		name: string;
		url: string;
	};
}

export interface Pokemon {
	id: number;
	name: string;
	url: string;
	image: string;
	height: number;
	weight: number;
	types: PokemonType[];
	stats: PokemonStat[];
	abilities: PokemonAbility[];
}

export interface PokemonByType {
	pokemon: PokemonListItem;
	slot: string;
}

export interface PokemonByTypeListResponse {
	id: number;
	pokemon: PokemonByType[];
}
