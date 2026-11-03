import { render, screen } from '@testing-library/react';
import App from './App';

test('says which links open a new tab', () => {
  render(<App />);
  const newTabLinks = screen.getAllByRole('link').filter((link) => link.target === '_blank');
  expect(newTabLinks).toHaveLength(12);
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
