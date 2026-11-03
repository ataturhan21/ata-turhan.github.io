import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('react-slick', () => ({ children }) => <div>{children}</div>);

test('renders the portfolio identity and working contact destinations', () => {
  render(<App />);
  expect(screen.getByText('Ata Turhan')).toBeInTheDocument();
  // The hero and the footer both link the profiles; every copy must point to the right place.
  for (const [name, href] of [
    ['Ata Turhan on GitHub', 'https://github.com/ataturhan21'],
    ['Ata Turhan on LinkedIn', 'https://www.linkedin.com/in/ataturhan21/'],
  ]) {
    const links = screen.getAllByRole('link', { name });
    expect(links).toHaveLength(2);
    for (const link of links) expect(link).toHaveAttribute('href', href);
  }
  expect(screen.getByRole('link', { name: 'Image Captioner on GitHub' }))
    .toHaveAttribute('href', 'https://github.com/ataturhan21/ImageCaptioner-ConvNeXt_Transformer');
});

test('provides keyboard navigation and meaningful page landmarks', () => {
  render(<App />);
  const main = screen.getByRole('main');
  expect(main).toHaveAttribute('id', 'main-content');
  expect(main).toHaveAttribute('tabIndex', '-1');
  expect(screen.getByRole('link', { name: 'Skip to main content' }))
    .toHaveAttribute('href', '#main-content');
  expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 1, name: 'Ata Turhan' })).toBeInTheDocument();
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  for (const name of ['About', 'Projects', 'Skills']) {
    const target = screen.getByRole('link', { name }).getAttribute('href');
    expect(document.querySelector(target)).toBeInTheDocument();
  }
});

