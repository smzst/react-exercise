import {createModule} from 'typeless';
import {CounterSymbol} from "./symbol";

//?: useModule とは
export const [useModule, CounterActions, getCounterState] = createModule(
  CounterSymbol
)
  .withActions({
    startCount: null, // null は引数がないことを意味する
    countDone: (count: number) => ({payload: {count}}),
  })
  .withState<CounterState>();

export interface CounterState {
  isLoading: boolean;
  count: number;
}