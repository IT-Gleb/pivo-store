import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { PivoStoreState, pivoDispatch } from "../store/pivoStore";

export const usePivoDispatch: () => pivoDispatch = useDispatch;
export const usePivoSelector: TypedUseSelectorHook<PivoStoreState> =
  useSelector;
