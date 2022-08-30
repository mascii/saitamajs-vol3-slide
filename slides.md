---
theme: seriph
background: /abs78.png
class: 'text-center'
highlighter: shiki
lineNumbers: false
drawings:
  persist: false
---

# Vue.js のライブラリ vue-yup-form をリリースした

[Saitama.js vol.3 (2022/08/30)](https://saitamajs.connpass.com/event/238897/)

<div class="abs-br m-6 flex gap-2">
  <a href="https://github.com/mascii/saitamajs-vol3-slide" target="_blank" alt="GitHub"
    class="text-xl icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
</div>

---
layout: intro
introImage: "/icon_mascii.png"
---

# 自己紹介
- ますきー (Twitter: @mascii_k)
- (株)ビザスク フロントエンドエンジニア

---

# vue-yup-form とは？

<div grid="~ cols-2 gap-10" m="-t-2">
<div>

- Vue 2/3 両対応
- Yup でバリデーションスキーマを定義
- UI コンポーネントレス

```vue {all|3-4|8-14}
<script lang="ts" setup>
const form = defineForm({
  name: field("", yup.string().required()),
  age: field(20, yup.number().required().integer()),
});
</script>

<template>
  <input name="name" v-model="form.name.$value" />
  {{ form.name.$error?.message }}

  <input name="age" type="number" v-model="form.age.$value" />
  {{ form.age.$error?.message }}
</template>
```
</div>
<div class="flex items-center justify-center flex-col">
  <img border="rounded" src="/vue-yup-form.pages.dev.png">

  [https://vue-yup-form.pages.dev/](https://vue-yup-form.pages.dev/)
</div>
</div>

---
preload: false
---

# Demo 1: ユーザー登録

<div grid="~ cols-3 gap-8">

<div class="col-span-1">
  <BasicFormDemo />
</div>
<div class="col-span-2">

```ts {all|7|all}
const generateForm = () => {
  const name = field("", yup.string().required().label("名前"));
  const age = field<number | null>(
    null,
    yup.number().required().integer().min(0).label("年齢")
  );
  const password = field("", yup.string().required().min(5).label("パスワード"));
  const passwordConfirmation = field("", () =>
    yup
      .string()
      .required()
      .oneOf([password.$value], ({ label }) => `${label}が一致しません`)
      .label("パスワード(確認入力)")
  );

  return defineForm({ name, age, password, passwordConfirmation });
};
```

- 各フィールドの初期値、バリデーションスキーマ、ラベルを定義する

<v-click>

- ラベルはエラーメッセージや入力欄の見出しに利用できる

</v-click>
</div>
</div>

---
preload: false
clicks: 3
---

# Demo 2: フォームの配列

<div grid="~ cols-3 gap-8">

<div class="col-span-1">
  <ArrayOfFormDemo />
</div>
<div class="col-span-2">

```ts {all|9-10|all}
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
```

- フォームの中に「フォームの配列」を含めることができる

<div v-click="1">

- `generateItemForm` のパラメータでフォームの配列を初期化できる

</div>
<div v-click="3">

- Vue.Draggable を導入してドラッグ＆ドロップでの入れ替えも可能

</div>
</div>
</div>

---

# なぜ作ったのか？

1. VeeValidate を利用していて、メジャーバージョン毎に互換がなく困っていた
    - Vue 2/3 両対応のバージョンもなかった
2. template ブロックからバリデーションロジックを分離したかった
    - ユニットテストの書きづらさを感じていた
3. シンプルでコードリーディング可能なライブラリを求めていた
    - 約 300 行で実装できた

---
layout: center
---

# Learn More

<div>

GitHub: [https://github.com/mascii/vue-yup-form](https://github.com/mascii/vue-yup-form)

Documentations: [https://vue-yup-form.pages.dev/](https://vue-yup-form.pages.dev/)

<img border="rounded" src="/vue-yup-form.pages.dev.png" style="width: 50%">

</div>
