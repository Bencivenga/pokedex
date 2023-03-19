import { useParams } from 'react-router-dom';
import { Container, Button, Typography, Box, Grid } from '@mui/material';
import { useAppSelector } from '../hooks';
import { getPokemonData } from '../store/pokemons/selectors';
import { fetchPokemonData } from '../store/pokemons/async-actions';
import { POKEMON_BASE_URL, POKEMON_IMAGES_BASE_URL } from '../const';
import { store } from '../store';
import { Link, LoaderFunctionArgs } from 'react-router-dom';

export const pokemonPageDataLoader = async ({ params }: LoaderFunctionArgs) => {
	if (!Object.keys(store.getState().pokemons.pokemonData).length) {
		return await store.dispatch(fetchPokemonData(`${POKEMON_BASE_URL}/${params.pokemonName}`));
	}

	return null;
};

function PokemonPage() {
	const { pokemonName } = useParams();
	const pokemonData = useAppSelector(getPokemonData);

	return (
		<Container sx={{ pt: 3, mb: 10 }}>
			<Button component={Link} to="/" variant="text">
				Go back
			</Button>

			<Typography variant="h4" component="h1" sx={{ textTransform: 'capitalize', mt: 2 }}>
				{pokemonName}
			</Typography>

			<Grid container>
				<Grid item lg={8}>
					<img
						src={`${POKEMON_IMAGES_BASE_URL}/${pokemonName && pokemonData[pokemonName]?.id}.png`}
						width="300"
						height="300"
						alt="pokemonName"
						style={{
							display: 'block',
							width: '100%',
							maxWidth: '550px',
							height: 'auto',
							objectFit: 'cover',
						}}
					/>
				</Grid>

				<Grid item lg={4}>
					<Box sx={{ maxWidth: '500px', marginBottom: '30px' }}>
						<Typography component="b" variant="h6">
							Abilities:
						</Typography>
						<ul style={{ paddingLeft: '15px', marginBottom: '20px', listStyle: 'none' }}>
							{pokemonName &&
								pokemonData[pokemonName]?.abilities.map((item, index) => (
									<li key={index}>
										<Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
											{item.ability.name}
										</Typography>
									</li>
								))}
						</ul>
					</Box>

					<dl style={{ width: '100%', maxWidth: '500px' }}>
						{pokemonName &&
							pokemonData[pokemonName]?.stats.map((item, index) => (
								<Box key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
									<dt>
										<Typography component="span" variant="h6" sx={{ textTransform: 'capitalize' }}>
											{item.stat.name}:
										</Typography>{' '}
									</dt>
									<dd>{item.base_stat}</dd>
								</Box>
							))}
					</dl>
				</Grid>
			</Grid>
		</Container>
	);
}

export default PokemonPage;
