import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';  // Assurez-vous d'importer depuis le store

// Utilisation typée de useDispatch
export const useAppDispatch: () => AppDispatch = useDispatch;

// Utilisation typée de useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
