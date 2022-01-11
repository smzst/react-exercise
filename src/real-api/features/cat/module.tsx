import {CatActions, CatState, useModule} from "./interface";
import * as Rx from 'typeless/rx';
import {CatView} from "./components/CatView";

function fetchCatData() {
  return Rx.of({
    imageUrl: `https://cataas.com/cat?_t=${Date.now()}`
  }).pipe(
    Rx.delay(2000),
    Rx.map(cat => {
      if (Date.now() % 2 === 0) {
        throw new Error('Failed to load cat');
      }
      return cat;
    })
  );
}

useModule
  .epic()
  .on(CatActions.loadCat, (_, {action$}) =>
    fetchCatData().pipe(
      Rx.map(cat => CatActions.catLoaded(cat)),
      Rx.catchError(err => {
        console.error(err);
        return Rx.of(CatActions.errorOccurred(err.message));
      }),
      //?: 曖昧。キャンセルされるまでやり続けるみたいな挙動だとは思う。action$ とは？
      // takeUntil<T>(notifier: ObservableInput<any>)
      //  : notifier Observable が値を発するまで、source Observable が発する値を発する
      Rx.takeUntil(action$.pipe(
        Rx.waitForType(CatActions.cancel)
      ))
    )
  );

const initialState: CatState = {
  viewType: 'details',
  cat: null,
  error: '',
};

/*
  on<T extends AC>(actionCreator: T, fn: OnHandler<S, T>)

  type OnHandler<S, T extends AC> = (
    state: S,
    payload: ExtractPayload<ReturnType<T>>,
    action: Flatten<ReturnType<T> & { type: string }>
  ) => void;
 */
useModule
  .reducer(initialState)
  .on(CatActions.loadCat, state => {
    state.viewType = 'loading';
  })
  .on(CatActions.errorOccurred, (state, {error} /* payload */) => {
    state.cat = null;
    state.viewType = 'error';
    // state.error = payload.error; // {error} ってしなかったらこうなる
    state.error = error;
  })
  .on(CatActions.catLoaded, (state, {cat}) => {
    state.viewType = 'details';
    state.cat = cat;
  })
  .on(CatActions.cancel, state => {
    state.viewType = 'details';
  });

export default function CatModule() {
  useModule();
  return <CatView/>
}

