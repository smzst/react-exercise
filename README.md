# typeless 入門

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

上の `handle` が `useModule` に当たる。**useModule によって自動的にディスパッチされる特別なライフサイクルアクションがある**。アクションは createActions で定義したときだけディスパッチされる。

### useModule.epic とは

### useModule.reducer とは

### {count} とは

```ts
useModule
  ...
  .on(CounterActions.countDone, (state, {count}) => { //?: {count} とは
    state.isLoading = false;
    state.count += count;
  });
```