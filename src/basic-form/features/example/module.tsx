import React from 'react';
import {handle} from './interface';
import {ExampleFormActions, ExampleFormProvider, getExampleFormState, useExampleForm} from "./form";
import * as Rx from 'typeless/rx';
import {useActions} from "typeless";
import {FormInput} from "../../components/FormInput";

handle.epic()
  .on(ExampleFormActions.setSubmitSucceeded, () => {
    alert(JSON.stringify(getExampleFormState().values, null, 2));
    return Rx.empty();
  })

export function ExampleModule() {
  handle();
  useExampleForm();

  const {submit} = useActions(ExampleFormActions);

  return (
    <ExampleFormProvider>
      <form
        onSubmit={e => {
          e.preventDefault();
          submit();
        }}
      >
        <FormInput name="foo"/>
        <FormInput name="bar"/>
        <button>submit</button>
      </form>
    </ExampleFormProvider>
  );
}
