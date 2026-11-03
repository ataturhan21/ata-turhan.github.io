import { act, render, waitFor } from '@testing-library/react';
import Skills from './components/Skills';

// The logos are their own file, fetched only when the section comes within a screen of the
// viewport, so they never compete with the first screen's files.
test('loads the skill logos only when the section nears the viewport', async () => {
  let notify;
  const observe = vi.fn();
  window.IntersectionObserver = vi.fn(function IntersectionObserver(callback, options) {
    notify = callback;
    this.options = options;
    this.observe = observe;
    this.disconnect = vi.fn();
  });
  try {
    const { container } = render(<Skills />);
    const logos = () => [...container.querySelectorAll('.chip svg')];
    expect(observe).toHaveBeenCalledWith(container.querySelector('#skills'));
    expect(window.IntersectionObserver.mock.instances[0].options).toEqual({ rootMargin: '100% 0px' });

    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(logos()).toHaveLength(40);
    expect(logos().some((logo) => logo.hasChildNodes())).toBe(false);

    act(() => notify([{ isIntersecting: true }]));
    await waitFor(() => expect(logos().every((logo) => logo.hasChildNodes())).toBe(true));
  } finally {
    delete window.IntersectionObserver;
  }
});
