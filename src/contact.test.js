import { act, fireEvent, render, screen } from '@testing-library/react';
import Contact from './components/Contact';
import Footer from './components/Footer';

test('offers working contact paths in the contact section', () => {
  render(<Contact />);
  expect(screen.getByRole('heading', { level: 2, name: 'Get in touch' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'ataturhan21@gmail.com' }))
    .toHaveAttribute('href', 'mailto:ataturhan21@gmail.com');
  expect(screen.getByRole('link', { name: 'Ata Turhan on Medium (opens in a new tab)' }))
    .toHaveAttribute('href', 'https://medium.com/@ataturhan21');
  expect(screen.getByRole('link', { name: 'Ata Turhan on GitHub (opens in a new tab)' }))
    .toHaveAttribute('href', 'https://github.com/ataturhan21');
  expect(screen.getByRole('link', { name: 'Ata Turhan on LinkedIn (opens in a new tab)' }))
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

const email = 'ataturhan21@gmail.com';
const setClipboard = (clipboard) => Object.defineProperty(navigator, 'clipboard', { value: clipboard, configurable: true });

afterEach(() => {
  setClipboard(undefined);
  jest.useRealTimers();
});

test('copies the email address, confirms it, then offers to copy again', async () => {
  jest.useFakeTimers();
  const writeText = jest.fn().mockResolvedValue(undefined);
  setClipboard({ writeText });
  render(<Contact />);
  expect(screen.getByRole('status')).toBeEmptyDOMElement();
  fireEvent.click(screen.getByRole('button', { name: 'Copy email address' }));
  expect(await screen.findByRole('button', { name: 'Copied' })).toBeInTheDocument();
  expect(writeText).toHaveBeenCalledWith(email);
  expect(screen.getByRole('status')).toHaveTextContent('Email address copied.');
  act(() => jest.advanceTimersByTime(2000));
  expect(screen.getByRole('button', { name: 'Copy email address' })).toBeInTheDocument();
  expect(screen.getByRole('status')).toBeEmptyDOMElement();
});

test.each([
  ['the browser refuses', { writeText: () => Promise.reject(new Error('denied')) }],
  ['there is no clipboard API', undefined],
])('shows the address to select by hand when %s', async (_, clipboard) => {
  setClipboard(clipboard);
  render(<Contact />);
  fireEvent.click(screen.getByRole('button', { name: 'Copy email address' }));
  expect(await screen.findByText(email, { selector: '.contact-status__address' })).toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent(`Couldn't copy automatically. Select the address: ${email}`);
  expect(screen.getByRole('button', { name: 'Copy email address' })).toBeInTheDocument();
});
