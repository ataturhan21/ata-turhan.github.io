import { render, screen } from '@testing-library/react';
import Contact from './components/Contact';
import Footer from './components/Footer';

test('offers working contact paths in the contact section', () => {
  render(<Contact />);
  expect(screen.getByRole('heading', { level: 2, name: 'Get in touch' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'ataturhan21@gmail.com' }))
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

test('links the main site and Solarity AI from the footer', () => {
  render(<Footer />);
  expect(screen.getByRole('link', { name: 'ataturhan.com' })).toHaveAttribute('href', 'https://ataturhan.com/');
  expect(screen.getByRole('link', { name: 'Solarity AI' })).toHaveAttribute('href', 'https://solarityai.com/');
  expect(screen.getByRole('contentinfo')).toHaveTextContent(`© ${new Date().getFullYear()} Ata Turhan`);
});
