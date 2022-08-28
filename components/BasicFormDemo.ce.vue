<script lang="ts" setup>
import { defineForm, field, isValidForm, toObject } from "vue-yup-form";
import * as yup from "./yup.locale";

import FieldSet from "./FieldSet.vue";
import ErrorMessage from "./ErrorMessage.vue";

const generateForm = () => {
  const name = field("", yup.string().required().label("名前"));
  const age = field<number | null>(
    null,
    yup.number().required().integer().min(0).label("年齢")
  );
  const password = field(
    "",
    yup.string().required().min(5).label("パスワード")
  );
  const passwordConfirmation = field("", () =>
    yup
      .string()
      .required()
      .oneOf([password.$value], ({ label }) => `${label}が一致しません`)
      .label("パスワード(確認入力)")
  );

  return defineForm({ name, age, password, passwordConfirmation });
};

const form = generateForm();

const onSubmit = () => {
  if (!isValidForm(form)) {
    return;
  }
  alert(JSON.stringify(toObject(form), null, 2));
};
</script>

<template>
  <form @submit.prevent="onSubmit" autocomplete="off">
    <FieldSet class="InputGroup" v-slot="{ touched }">
      <legend>{{ form.name.$label }}</legend>
      <input v-model="form.name.$value" />
      <ErrorMessage v-if="touched" :error="form.name.$error" />
    </FieldSet>

    <FieldSet class="InputGroup" v-slot="{ touched }">
      <legend>{{ form.age.$label }}</legend>
      <input type="number" v-model="form.age.$value" />
      <ErrorMessage v-if="touched" :error="form.age.$error" />
    </FieldSet>

    <FieldSet class="InputGroup" v-slot="{ touched }">
      <legend>{{ form.password.$label }}</legend>
      <input v-model="form.password.$value" />
      <ErrorMessage v-if="touched" :error="form.password.$error" />
    </FieldSet>

    <FieldSet class="InputGroup" v-slot="{ touched }">
      <legend>{{ form.passwordConfirmation.$label }}</legend>
      <input v-model="form.passwordConfirmation.$value" />
      <ErrorMessage v-if="touched" :error="form.passwordConfirmation.$error" />
    </FieldSet>

    <button type="submit">登録</button>
  </form>
</template>

<style lang="scss">
input {
  display: block;
}

span {
  display: block;
}

button {
  display: inline-block;
}

form {
  padding: 10px;
  border: 1px solid white;

  @media (prefers-color-scheme: light) {
    border: 1px solid black;
  }
}

.InputGroup {
  padding: 5px 0;
  border: 0px;

  margin-bottom: 10px;
  position: relative;
}
</style>
