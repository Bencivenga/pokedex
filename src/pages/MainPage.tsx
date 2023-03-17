import { Container, Grid, Typography } from '@mui/material';
import { store } from '../store';
import PokemonList from '../components/PokemonList';
import { useAppSelector } from '../hooks';
import CustomPagination from '../components/CustomPagination';
import { getPokemonListPerPage, getPokemonSearchValue } from '../store/pokemons/selectors';
import FilterByType from '../components/FilterByType';
import SearchBox from '../components/SearchBox';
import { fetchAllPokemonTypes, fetchFullPokemonList } from '../store/pokemons/async-actions';

export const mainPageDataLoader = async () => {
	if (!store.getState().pokemons.fullPokemonList.length) {
		store.dispatch(fetchFullPokemonList());
	}

	if (!store.getState().pokemons.allPokemonTypes.length) {
		store.dispatch(fetchAllPokemonTypes());
	}

	return null;
};

function MainPage() {
	const pokemonsPerPage = useAppSelector(getPokemonListPerPage);
	const pokemonSearchValue = useAppSelector(getPokemonSearchValue);

	return (
		<Container>
			<Typography variant="h2" component="h1" sx={{ mt: 2 }}>
				Pokedex
			</Typography>
			<Grid container mt={1} sx={{ marginBottom: '30px' }}>
				<Grid item container spacing={2} lg={12} sx={{ mb: 2 }}>
					<SearchBox />
					<FilterByType />
				</Grid>
				<Grid container item xs={12} sx={{ display: 'flex' }}>
					{pokemonsPerPage || !pokemonSearchValue ? (
						<PokemonList pokemonList={pokemonsPerPage} />
					) : (
						<Typography sx={{ width: 'auto' }}>
							No results found for '<b>{pokemonSearchValue}</b>'
						</Typography>
					)}
				</Grid>
			</Grid>
			{pokemonsPerPage && <CustomPagination />}
		</Container>
	);
}

export default MainPage;
