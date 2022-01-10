import React from 'react';
import * as Rx from 'typeless/rx';
import {CounterActions, CounterState, useModule} from "./interface";
import {Counter} from './components/Counter';

useModule
  .epic() //?: useModule.epic とは
  .on(CounterActions.startCount, () =>
    Rx.of(CounterActions.countDone(1)).pipe(Rx.delay(500))
  );

const initialState: CounterState = {
  isLoading: false,
  count: 0
};

// 内部では immer を使用し、状態の変更が許可されている
useModule
  .reducer(initialState) //?: useModule.reducer とは
  .on(CounterActions.startCount, state => {
    state.isLoading = true;
  })
  .on(CounterActions.countDone, (state, {count}) => { //?: {count} とは
    state.isLoading = false;
    state.count += count;
  });

export default function CounterModule() {
  // load epic and reducer
  useModule();
  return <Counter/>;
}