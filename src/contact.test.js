import { render, screen } from '@testing-library/react';
import Footer from './components/Footer';

test('offers working contact paths in the footer', () => {
  render(<Footer />);
  expect(screen.getByRole('heading', { level: 2, name: 'Connect With Me' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Email: ataturhan21@gmail.com' }))
    .toHaveAttribute('href', 'mailto:ataturhan21@gmail.com');
  expect(screen.getByRole('link', { name: 'Ata Turhan on Medium' }))
    .toHaveAttribute('href', 'https://medium.com/@ataturhan21');
  expect(screen.getByRole('link', { name: 'Ata Turhan on GitHub' }))
    .toHaveAttribute('href', 'https://github.com/ataturhan21');
  expect(screen.getByRole('link', { name: 'Ata Turhan on LinkedIn' }))
    .toHaveAttribute('href', 'https://www.linkedin.com/in/ataturhan21/');
  for (const link of screen.getAllByRole('link').filter((a) => a.target === '_blank')) {
    expect(link).toHaveAttribute('rel', 'noreferrer');
  }
});
