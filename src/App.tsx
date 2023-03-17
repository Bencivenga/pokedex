import { CssBaseline } from '@mui/material';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, useRouteError } from 'react-router-dom';
import MainPage, { mainPageDataLoader } from './pages/MainPage';
import NotFound from './pages/NotFound';
import PokemonPage, { pokemonPageDataLoader } from './pages/PokemonPage';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

window.addEventListener('unhandledrejection', function (event) {
	console.error(`unhandledRejection: ${event.reason.message}`);
	toast.error('Something went wrong');
});

function ErrorBoundary() {
	const error = useRouteError();
	console.error(error);
	return <div>{toast.error('Something went wrong')}</div>;
}

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<MainPage />} loader={mainPageDataLoader} errorElement={<ErrorBoundary />} />
			<Route
				path="pokemon/:pokemonName"
				element={<PokemonPage />}
				loader={pokemonPageDataLoader}
				errorElement={<ErrorBoundary />}
			/>
			<Route path="*" element={<NotFound />} />
		</>
	)
);

function App() {
	return (
		<>
			<ToastContainer />
			<CssBaseline />
			<RouterProvider router={router}></RouterProvider>
		</>
	);
}

export default App;
