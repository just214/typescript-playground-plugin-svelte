// @ts-ignore
import App from "./svelte/App.svelte";
import { writable } from "svelte/store";

// Store Objects
const didMount = writable({});
const modelChanged = writable({});
const modelChangedDebounce = writable({});
const willUnmount = writable({});
const didUnmount = writable({});

const customPlugin: import("./vendor/playground").PlaygroundPlugin = {
  id: "svelte",
  displayName: "Svelte", // The tab label
  willMount: (sandbox, container) => {
    // Not used
  },
  didMount: (sandbox, container) => {
    didMount.set({ sandbox, container });
    // Mount the app and pass in the store objects as props
    new App({
      target: container,
      props: { didMount, modelChanged, modelChangedDebounce }
    });
  },
  modelChanged: (sandbox, model) => {
    modelChanged.set({ sandbox, model });
  },
  modelChangedDebounce(sandbox, model) {
    modelChangedDebounce.set({ sandbox, model });
  },
  willUnmount: (sandbox, container) => {
    willUnmount.set({ sandbox, container });
  },
  didUnmount: (sandbox, container) => {
    didUnmount.set({ sandbox, container });
  }
};

export default customPlugin;
