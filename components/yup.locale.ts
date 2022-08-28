/**
 * Referred to the following article:
 * https://zenn.dev/longbridge/articles/04f40422501348
 */

import { setLocale, addMethod, string } from "yup";
import type { MessageParams } from "yup/lib/types";

const labelText = (prm: MessageParams) => {
  return prm.label ? `${prm.label}は` : "";
};

const jpConfig = {
  mixed: {
    default: (prm: MessageParams) => `${labelText(prm)}無効です`,
    required: (prm: MessageParams) => `${labelText(prm)}必須項目です`,
    oneOf: (prm: MessageParams & { values: any }) =>
      `${labelText(prm)}次の値のいずれかでなければなりません:${prm.values}`,
    notOneOf: (prm: MessageParams & { values: any }) =>
      `${labelText(prm)}次の値のいずれかであってはなりません:${prm.values}`,
    notType: `形式が違います`,
    defined: ``,
  },
  string: {
    length: (prm: MessageParams & { length: number }) =>
      `${labelText(prm)}${prm.length}文字でなければなりません`,
    min: (prm: MessageParams & { min: number }) =>
      `${labelText(prm)}${prm.min}文字以上でなければなりません`,
    max: (prm: MessageParams & { max: number }) =>
      `${labelText(prm)}${prm.max}文字以内にしてください`,
    matches: (prm: MessageParams & { regex: RegExp }) =>
      `${labelText(prm)}次の形式と一致する必要があります: "${prm.regex}"`,
    email: (prm: MessageParams) =>
      `${labelText(prm)}有効なメールアドレスではありません`,
    url: (prm: MessageParams) =>
      `${labelText(prm)}有効なURLでなければなりません`,
    uuid: (prm: MessageParams) =>
      `${labelText(prm)}有効なUUIDでなければなりません`,
    trim: (prm: MessageParams) =>
      `${labelText(prm)}前後にスペースを入れてはいけません`,
    lowercase: (prm: MessageParams) =>
      `${labelText(prm)}小文字でなければなりません`,
    uppercase: (prm: MessageParams) =>
      `${labelText(prm)}大文字でなければなりません`,
  },
  number: {
    min: (prm: MessageParams & { min: number }) =>
      `${labelText(prm)}${prm.min}以上である必要があります`,
    max: (prm: MessageParams & { max: number }) =>
      `${labelText(prm)}${prm.max}以下でなければなりません`,
    lessThan: (prm: MessageParams & { less: number }) =>
      `${labelText(prm)}${prm.less}より小さくなければなりません`,
    moreThan: (prm: MessageParams & { more: number }) =>
      `${labelText(prm)}${prm.more}より大きくなければなりません`,
    positive: (prm: MessageParams & { more: number }) =>
      `${labelText(prm)}正の数でなければなりません`,
    negative: (prm: MessageParams & { less: number }) =>
      `${labelText(prm)}負の数でなければなりません`,
    integer: (prm: MessageParams) =>
      `${labelText(prm)}整数でなければなりません`,
  },
  date: {
    min: (prm: MessageParams & { min: Date | string }) =>
      `${labelText(prm)}${prm.min}より後でなければなりません`,
    max: (prm: MessageParams & { max: Date | string }) =>
      `${labelText(prm)}${prm.max}より前でなければなりません`,
  },
  boolean: {
    isValue: (prm: MessageParams) => `${labelText(prm)}値が必要です`,
  },
  object: {
    noUnknown: (prm: MessageParams) =>
      `${labelText(
        prm
      )}オブジェクトシェイプで指定されていないキーを含めることはできません`,
  },
  array: {
    length: (prm: MessageParams & { length: number }) =>
      `${labelText(prm)}${prm.length}個が必要です`,
    min: (prm: MessageParams & { min: number }) =>
      `${labelText(prm)}${prm.min}個以上の項目が必要です`,
    max: (prm: MessageParams & { max: number }) =>
      `${labelText(prm)}${prm.max}個以下の項目が必要です`,
  },
};

setLocale(jpConfig);

addMethod(string, "katakana", function () {
  return this.test(
    "katakana",
    (prm: MessageParams) => `${labelText(prm)}カタカナで入力してください`,
    function (value) {
      if (value == null) {
        return true;
      }
      return !!value.match(/^[ァ-ヶー　 ]+$/);
    }
  );
});

declare module "./yup.locale" {
  interface StringSchema {
    katakana(this: StringSchema): StringSchema;
  }
}

export * from "yup";
