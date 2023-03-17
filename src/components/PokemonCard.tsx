import { Link } from 'react-router-dom';
import { PokemonListItem } from '../interfaces/pokemon.interface';
import { Paper, Chip, Typography, Skeleton, Box } from '@mui/material';
import { POKEMON_BASE_URL, POKEMON_IMAGES_BASE_URL, TYPES_TO_COLOR } from '../const';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getPokemonData, getPokemonDataStatus, getPokemonSearchValue } from '../store/pokemons/selectors';
import { useEffect, useState } from 'react';
import { fetchPokemonData } from '../store/pokemons/async-actions';
import { extractPokemonDataFromUrl } from '../helpers/extractPokemonIdFromUrl';
import Highlighter from 'react-highlight-words';
import { useElementSize } from '../hooks/useElementSize';
import PokeballSpinner from './PokeballSpinner/PokeballSpinner';

interface PokemonCardProps {
	pokemon: PokemonListItem;
}


function PokemonCard({ pokemon }: PokemonCardProps) {
	const dispatch = useAppDispatch();
	const pokemonData = useAppSelector(getPokemonData);
	const pokemonDataStatus = useAppSelector(getPokemonDataStatus);
	const pokemonSearchValue = useAppSelector(getPokemonSearchValue);

	const [imgLoaded, setImgLoaded] = useState(false);
	const [spinner, setSpinner] = useState(true);
	const [boxRef, { width, height }] = useElementSize<HTMLImageElement>();

	const image = `${POKEMON_IMAGES_BASE_URL}/${Number(extractPokemonDataFromUrl(pokemon.url))}.png`;

	const onImgLoad = () => {
		setImgLoaded(true);
	};

	useEffect(() => {
		if (!pokemonData[pokemon.name]) {
			dispatch(fetchPokemonData(`${POKEMON_BASE_URL}/${pokemon.name}`));
		}
	}, [pokemonData, dispatch, pokemon.name]);

	useEffect(() => {
		setSpinner(width > 0 || height > 0 ? false : true);
	}, [height, width]);

	return (
		<Paper elevation={3} sx={{ height: '100%', p: 2, minHeight: 408, position: 'relative' }}>
			<Link
				to={`pokemon/${pokemon.name}`}
				style={{ display: 'flex', flexDirection: 'column', height: '100%', textDecoration: 'none', color: 'inherit' }}
			>
				<Typography component="h2" variant="h6" sx={{ minHeight: 64, textTransform: 'capitalize' }}>
					<Highlighter searchWords={[...pokemonSearchValue]} autoEscape={true} textToHighlight={pokemon.name} />
				</Typography>

				{spinner && <PokeballSpinner />}

				<img
					ref={boxRef}
					src={image}
					width="320"
					height="320"
					alt={pokemon.name}
					onLoad={onImgLoad}
					style={{
						position: 'relative',
						display: !imgLoaded ? 'none' : 'block',
						width: '100%',
						height: 'auto',
						margin: '0 auto 30px',
						objectFit: 'contain',
						zIndex: 10,
					}}
				/>

				<div style={{ marginTop: 'auto' }}>
					{pokemonDataStatus === 'loading' ? (
						<>
							<Box sx={{ display: 'flex' }}>
								<Skeleton
									variant="rectangular"
									sx={{ width: '56px', height: '20px', mr: 1, mb: 1, borderRadius: '20px' }}
								/>
								<Skeleton variant="rectangular" sx={{ width: '56px', height: '20px', borderRadius: '20px' }} />
							</Box>
							<Skeleton variant="text" />
							<Skeleton variant="text" />
						</>
					) : (
						<>
							{pokemonData[pokemon.name]?.types.map((item, index) => (
								<Chip
									key={index}
									label={item.type.name}
									sx={{ backgroundColor: `${TYPES_TO_COLOR[item.type.name]}`, color: 'white', mr: 1, mb: 1 }}
								/>
							))}
							<Typography variant="subtitle1">Height: {pokemonData[pokemon.name]?.height}</Typography>
							<Typography variant="subtitle1">Weight: {pokemonData[pokemon.name]?.weight}</Typography>
						</>
					)}
				</div>
			</Link>
		</Paper>
	);
}

export default PokemonCard;
