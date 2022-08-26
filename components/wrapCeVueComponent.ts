import { defineComponent, h } from "vue";
import { ShadowRoot } from "vue-shadow-dom";

const stopPropagation = (e: Event) => {
  e.stopPropagation();
};

export const wrapCeVueComponent = (Component: any) =>
  defineComponent({
    name: "CeVueComponentWrapper",
    render() {
      return h(
        ShadowRoot,
        { onKeydown: stopPropagation, onPointerdown: stopPropagation },
        () => [h("style", Component.styles), h(Component)]
      );
    },
  });
