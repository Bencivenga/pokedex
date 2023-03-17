import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { State, AppDispatch } from '../store';

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
