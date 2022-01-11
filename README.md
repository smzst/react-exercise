# typeless-exercise

* features/counter/symbol.ts
    * HMR を使う場合は Symbol を別ファイルで定義する必要がある。不要な場合は interface.ts で定義するでよい
* features/counter/interface.ts
    * 他のモジュールは I/F ファイルの object/types を参照することでのみやりとりしなければならない。
    * このファイルはできるだけ小さくするべきであり、外部ライブラリとの依存は避ける

## 疑問点
`//?:` でマークしたのでそれで検索する

### HMR とは？
Hot Module Replacement

### useModule とは
ref. https://typeless.js.org/api/createmodule

まず、createModule についてまとめる。 指定された symbol に新しい module を作成する。symbol と module は正確に 1:1 対応。 

```ts
// アクションあり
const [handle, Actions] = createModule(symbol)
  .withActions(actionMap);
// 状態あり
const [handle, getState] = createModule(symbol)
  .withState<MyState>();
// アクションと状態あり
const [handle, Actions, getState] = createModule(symbol)
  .withActions(actionMap)
  .withState<MyState>();
```

withActions は module にアクションを追加する。関数は入力引数を `payload` プロパティを持つオブジェクトにラップする必要があり、引数がいらない場合は null を指定する。

上の `handle` の任意な変数名として `useModule` を使っているが、**useModule によって自動的にディスパッチされる特別なライフサイクルアクションがある**。アクションは createActions で定義したときだけディスパッチされる。

### useModule.epic とは
というより、Handle について扱う（useModule を一般化すると handle）。Handle は createModule によって作られるオブジェクトで、epic handler と reducer を取り付けることを可能にする。 Epic は副作用を処理するために使われる。また、epic() を複数回呼び出すと以前作成された epic が初期化される。

ちなみに、`Epic` については「Epic について」にまとめる

### useModule.reducer とは
連鎖する reducer を初期化する。reducer は状態を変更するために使用する。複数回 reducer() を呼び出すと以前作成された reducer が初期化される。

### {count} とは

```ts
useModule
  ...
  .on(CounterActions.countDone, (state, {count}) => { //?: {count} とは
    state.isLoading = false;
    state.count += count;
  });
```

### Epic について

* attach(epic)
  * 子の epic を追加する
* on(actionCreator, handler)
  * createModule で作られた action creator を紐づける。下の例の `UserActions.loadUser` がそれ
  * **handler がよくわからん**
    * handler: (payload, { action$ }, action) => EpicResult
* onMany(actionCreators[], handler)

```ts
const [handle, UserActions] = createModule(UserSymbol)
  .withActions({
    loadUser: (id: number) => ({ payload: { id } }),
    userLoaded: (user: User) => ({ payload: { user } }),
  });

handle
  .epic()
  .on(UserActions.loadUser, ({ id }, { getState }) => {
    ...
  });
```