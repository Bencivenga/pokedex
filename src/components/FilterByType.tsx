import { Grid, Button, Select, MenuItem, SelectChangeEvent, Skeleton, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setLimit, setOffset, setSelectedTypes } from '../store/pokemons/slice';
import { getAllPokemonTypes, getAllPokemonTypesStatus, getSelectedTypes } from '../store/pokemons/selectors';
import { fetchPokemonsByType } from '../store/pokemons/async-actions';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

function FilterByType() {
	const dispatch = useAppDispatch();
	const allTypes = useAppSelector(getAllPokemonTypes);
	const selectedTypes = useAppSelector(getSelectedTypes);
	const allPokemonTypesStatus = useAppSelector(getAllPokemonTypesStatus);

	const handleSelectedTypes = (e: SelectChangeEvent<string[]>) => {
		const {
			target: { value },
		} = e;

		const selectedTypesValue = value as string[];
		const urls = allTypes.filter((type) => selectedTypesValue.includes(type.name)).map((item) => item.url);

		dispatch(setSelectedTypes(selectedTypesValue));
		dispatch(setOffset(1));
		dispatch(fetchPokemonsByType(urls));
	};

	const resetSelectedTypes = () => {
		dispatch(setSelectedTypes([]));
		dispatch(setOffset(1));
		dispatch(setLimit(10));
	};

	return (
		<Grid container item xs={12} lg={6} sx={{ display: 'flex', alignItems: 'center' }}>
			<Grid item lg={9} sx={{ width: '100%', display: 'flex', flexDirection: 'column', marginBottom: '15px' }}>
				<Select
					multiple
					displayEmpty
					value={selectedTypes}
					renderValue={(selected) => {
						if (selected.length === 0) {
							return <Typography>Select Type(s)</Typography>;
						}

						return selected.join(', ');
					}}
					onChange={handleSelectedTypes}
					MenuProps={MenuProps}
				>
					{allTypes.map((type) =>
						allPokemonTypesStatus === 'loading' ? (
							<Skeleton key={type.name} variant="rectangular" height={30} />
						) : (
							<MenuItem
								key={type.name}
								value={type.name}
								disabled={type.name === 'shadow' || type.name === 'unknown'}
								sx={{ textTransform: 'capitalize' }}
							>
								{type.name}
							</MenuItem>
						)
					)}
				</Select>
			</Grid>

			<Grid item lg={3}>
				<Button variant="text" onClick={resetSelectedTypes} sx={{ cursor: 'pointer', maxWidth: 'fit-content', ml: 2 }}>
					Reset Filter
				</Button>
			</Grid>
		</Grid>
	);
}

export default FilterByType;
