import { Box, Pagination, Select, MenuItem, InputLabel, SelectChangeEvent } from '@mui/material';
import { ChangeEvent, useEffect, useMemo } from 'react';
import { setPokemonListLength } from '../helpers/setPokemonListLength';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getLimit, getOffset, getPokemonListFiltered } from '../store/pokemons/selectors';
import { setLimit, setOffset } from '../store/pokemons/slice';

function CustomPagination() {
	const dispatch = useAppDispatch();

	const limit = useAppSelector(getLimit);
	const offset = useAppSelector(getOffset);
	const fullPokemonList = useAppSelector(getPokemonListFiltered);

	const scrollTop = () => {
		window.scrollTo({
			top: 0,
		});
	};

	useEffect(() => {
		scrollTop();
	}, [limit, offset]);

	const handleChangePage = (_e: ChangeEvent<unknown>, newPage: number) => {
		dispatch(setOffset(newPage));
	};

	const handleItemsPerPage = (e: SelectChangeEvent<number>) => {
		scrollTop();
		const value = Number(e.target.value);
		dispatch(setLimit(value));
	};

	const count = useMemo(
		() => Math.ceil(fullPokemonList.length / limit) + setPokemonListLength(fullPokemonList, limit),
		[fullPokemonList, limit]
	);

	const disabled = useMemo(
		() => fullPokemonList.length - limit * offset <= limit * offset,
		[limit, offset, fullPokemonList.length]
	);

	return (
		<Box sx={{ mb: '50px' }}>
			<InputLabel id="quantity">Quantity</InputLabel>
			<Select labelId="quantity" onChange={handleItemsPerPage} value={limit} sx={{ marginBottom: '15px' }}>
				<MenuItem value={10}>10</MenuItem>
				<MenuItem value={20} disabled={disabled}>
					20
				</MenuItem>
				<MenuItem value={50} disabled={disabled}>
					50
				</MenuItem>
			</Select>
			<Pagination page={offset} count={count} onChange={handleChangePage} />
		</Box>
	);
}

export default CustomPagination;
