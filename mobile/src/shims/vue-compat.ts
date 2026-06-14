export * from 'vue/dist/vue.runtime.esm-bundler.js';

export function injectHook(): void {
  // noop compatibility shim for legacy uni runtime
}

export function logError(err: unknown): void {
  // noop compatibility shim for legacy uni runtime
  console.error(err);
}

export function onBeforeActivate(): void {
  // noop compatibility shim for legacy uni runtime
}

export function onBeforeDeactivate(): void {
  // noop compatibility shim for legacy uni runtime
}

export const isInSSRComponentSetup = false;

export { createSSRApp as createVueApp } from 'vue/dist/vue.runtime.esm-bundler.js';
