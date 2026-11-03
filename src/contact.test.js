import { render, screen } from '@testing-library/react';
import Footer from './components/Footer';

test('offers working contact paths in the footer', () => {
  render(<Footer />);
  expect(screen.getByRole('heading', { level: 2, name: 'Connect With Me' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Email: ataturhan21@gmail.com' }))
    .toHaveAttribute('href', 'mailto:ataturhan21@gmail.com');
  expect(screen.getByRole('link', { name: 'Ata Turhan on Medium' }))
    .toHaveAttribute('href', 'https://medium.com/@ataturhan21');
});
