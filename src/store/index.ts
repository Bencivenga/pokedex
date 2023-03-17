import { configureStore } from '@reduxjs/toolkit';
import pokemonsReducer from './pokemons/slice';

export const store = configureStore({
	reducer: {
		pokemons: pokemonsReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		})
});


export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
