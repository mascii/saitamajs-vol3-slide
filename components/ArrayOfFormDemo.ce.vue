<script lang="ts" setup>
import {
  defineForm,
  field,
  formsField,
  isValidForm,
  toObject,
} from "vue-yup-form";
import * as yup from "./yup.locale";
import * as Draggable from "vuedraggable";

import FieldSet from "./FieldSet.vue";
import ErrorMessage from "./ErrorMessage.vue";

const generateItemForm = ({ initialName = "" } = {}) =>
  defineForm({
    name: field(initialName, yup.string().required().label("商品名")),
  });

const generateForm = () =>
  defineForm({
    users: formsField(generateItemForm, [
      { initialName: "Apple" },
      { initialName: "Pen" },
    ]),
  });

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
    <Draggable
      v-model="form.users.$writableForms"
      :animation="200"
      item-key="$key"
    >
      <template #item="{ element, index }">
        <FieldSet class="InputGroup" v-slot="{ touched }">
          <legend>商品 #{{ index + 1 }}</legend>
          <label :for="`name_${element.$key}`">{{ element.name.$label }}</label>
          <input
            :id="`name_${element.$key}`"
            :name="`name_${element.$key}`"
            v-model="element.name.$value"
          />

          <ErrorMessage v-if="touched" :error="element.name.$error" />

          <button type="button" @click="form.users.$remove(index)">X</button>
        </FieldSet>
      </template>
    </Draggable>

    <button type="button" @click="form.users.$append()">商品を追加</button>
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

label {
  display: block;
}

button {
  display: inline-block;
}

button[type="submit"] {
  display: inline-block;
  margin-left: 5px;
}

form {
  padding: 10px;
  border: 1px solid white;
  @media (prefers-color-scheme: light) {
    border: 1px solid black;
  }
}

.InputGroup {
  padding: 10px;
  border: 2px dotted white;
  @media (prefers-color-scheme: light) {
    border: 2px dotted black;
  }

  margin-bottom: 10px;
  position: relative;
}

.InputGroup button {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
