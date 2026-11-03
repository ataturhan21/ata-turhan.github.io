import { act, fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('says which links open a new tab', () => {
  render(<App />);
  const newTabLinks = screen.getAllByRole('link').filter((link) => link.target === '_blank');
  // 12 in the page body plus the footer's ataturhan.com and Solarity AI links.
  expect(newTabLinks).toHaveLength(14);
  const announced = screen.getAllByRole('link', { name: / \(opens in a new tab\)$/ });
  expect(announced).toEqual(newTabLinks);
  for (const link of newTabLinks) expect(link).toHaveAttribute('rel', 'noreferrer');
});

test('names the home link and offers a way back to the top', () => {
  render(<App />);
  // The monogram is decoration: the home link is named by the full name on every screen size.
  expect(screen.getByRole('link', { name: 'Ata Turhan' })).toHaveAttribute('href', '#app');
  expect(screen.getByRole('link', { name: 'Back to top' })).toHaveAttribute('href', '#app');
  expect(document.querySelector('#app')).toBeInTheDocument();
});

describe('current section in the header', () => {
  const nav = () => screen.getByRole('navigation', { name: 'Primary' });
  const currentLinks = () => [...nav().querySelectorAll('a[aria-current="true"]')].map((link) => link.textContent);
  // Lays the sections out from `firstTop` down, 1000 px each, on a 768 px tall window (jsdom's).
  const layOut = (firstTop) => {
    ['about', 'projects', 'skills', 'contact'].forEach((id, index) => {
      const top = firstTop + index * 1000;
      document.getElementById(id).getBoundingClientRect = () => ({ top, bottom: top + 1000 });
    });
    fireEvent.scroll(window);
    act(() => vi.advanceTimersByTime(16));
  };

  beforeEach(() => {
    // Animation frames as 16 ms timers, so the test controls when they run.
    vi.useFakeTimers();
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => setTimeout(callback, 16));
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation((id) => clearTimeout(id));
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 6000, configurable: true });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    delete document.documentElement.scrollHeight;
  });

  test('marks no link on the hero, then the section that reached the reading line', () => {
    render(<App />);
    layOut(900);
    expect(currentLinks()).toEqual([]);
    layOut(-1500);
    expect(currentLinks()).toEqual(['Projects']);
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('aria-current', 'true');
  });

  test('marks the last section at the bottom of the page', () => {
    render(<App />);
    Object.defineProperty(window, 'scrollY', { value: 6000 - 768, configurable: true });
    layOut(-2600);
    expect(currentLinks()).toEqual(['Contact']);
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
  });
});
