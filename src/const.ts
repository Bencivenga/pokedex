import {
	red,
	brown,
	green,
	grey,
	blue,
	lightBlue,
	yellow,
	blueGrey,
	orange,
	pink,
	lime,
	purple,
	deepPurple,
	deepOrange,
	lightGreen,
	indigo,
	cyan,
} from '@mui/material/colors';

export const BASE_URL = 'https://pokeapi.co/api/v2/';
export const POKEMON_BASE_URL = `${BASE_URL}pokemon`;
export const POKEMON_IMAGES_BASE_URL =
	'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';

export const TYPES_TO_COLOR: Record<string, string> = {
	normal: lime[600],
	fighting: pink[500],
	flying: indigo[800],
	poison: deepPurple[300],
	ground: brown[400],
	rock: grey[500],
	bug: orange[900],
	ghost: deepOrange[900],
	steel: blueGrey[900],
	fire: red[900],
	water: blue[900],
	grass: green[900],
	electric: yellow[700],
	psychic: purple[900],
	ice: lightBlue[900],
	dragon: yellow[900],
	dark: cyan[800],
	fairy: lightGreen[900],
};

