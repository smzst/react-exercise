import {createModule} from "typeless";
import {CatSymbol} from "./symbol";

export const [useModule, CatActions, getCatState] = createModule(CatSymbol)
  .withActions({
    loadCat: null,
    cancel: null,
    catLoaded: (cat: Cat) => ({payload: {cat}}),
    errorOccurred: (error: string) => ({payload: {error}}),
  })
  .withState<CatState>();

interface Cat {
  imageUrl: string;
}

type ViewType = 'loading' | 'details' | 'error';

export interface CatState {
  viewType: ViewType;
  cat: Cat | null;
  error: string;
}