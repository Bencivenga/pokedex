import { Grid } from '@mui/material';
import { PokemonListItem } from '../interfaces/pokemon.interface';
import PokemonCard from './PokemonCard';

interface PokemonLitsProps {
	pokemonList: PokemonListItem[] | null;
}

function PokemonList({ pokemonList }: PokemonLitsProps) {
	return (
		<Grid container spacing={2}>
			{pokemonList?.map((pokemon) => (
				<Grid item xs={6} lg={12 / 5} key={pokemon.name}>
					<PokemonCard pokemon={pokemon} />
				</Grid>
			))}
		</Grid>
	);
}

export default PokemonList;
