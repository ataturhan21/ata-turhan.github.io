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
