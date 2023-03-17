import { Grid, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import debounce from 'lodash.debounce';
import { setPokemonSearchValue } from '../store/pokemons/slice';
import { getPokemonListFilteredByTypeStatus } from '../store/pokemons/selectors';

function SearchBox() {
	const dispatch = useAppDispatch();
	const pokemonsListFilteredByTypeStatus = useAppSelector(getPokemonListFilteredByTypeStatus);
	const [query, setQuery] = useState('');

	const updateSearchValue = debounce((str: string) => {
		dispatch(setPokemonSearchValue(str.toLowerCase().trim()));
	}, 300);

	const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setQuery(value);
		value.length >= 3 ? updateSearchValue(value) : updateSearchValue('');
	};

	useEffect(() => {
		dispatch(setPokemonSearchValue(''));
	}, [dispatch]);

	return (
		<Grid item xs={12} lg={6} sx={{ display: 'flex', position: 'relative' }}>
			<TextField
				fullWidth
				placeholder="Search Pokemon..."
				sx={{
					marginBottom: '15px',
					'& .MuiInputBase-input': {
						pl: '40px',
						pr: '60px',
					},
				}}
				value={query}
				onChange={handleValueChange}
				disabled={pokemonsListFilteredByTypeStatus === 'loading'}
			/>
			<Search sx={{ position: 'absolute', top: '29px', left: '23px', width: 30, height: 30, opacity: 0.3 }} />
		</Grid>
	);
}

export default SearchBox;
