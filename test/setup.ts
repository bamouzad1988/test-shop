import "@testing-library/jest-dom";
import { vi } from "vitest";
import ResizeObserver from "resize-observer-polyfill";
import { server } from "./mocks/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

global.ResizeObserver = ResizeObserver;

window.HTMLElement.prototype.scrollIntoView = vi.fn();
window.HTMLElement.prototype.hasPointerCapture = vi.fn();
window.HTMLElement.prototype.releasePointerCapture = vi.fn();

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false, // Set this to true if you want it to match your media query
      media: query,
      onchange: null,
      addListener: vi.fn(), // For old browsers
      removeListener: vi.fn(), // For old browsers
      addEventListener: vi.fn(), // For modern browsers
      removeEventListener: vi.fn(), // For modern browsers
      dispatchEvent: vi.fn(),
    }),
  });
});
