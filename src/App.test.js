import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('react-slick', () => ({ children }) => <div>{children}</div>);

test('renders the portfolio identity and working contact destinations', () => {
  render(<App />);
  expect(screen.getByText('Ata Turhan')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Ata Turhan on GitHub' }))
    .toHaveAttribute('href', 'https://github.com/ataturhan21');
  expect(screen.getByRole('link', { name: 'Ata Turhan on LinkedIn' }))
    .toHaveAttribute('href', 'https://www.linkedin.com/in/ataturhan21/');
  expect(screen.getByRole('link', { name: 'Image Captioner on GitHub' }))
    .toHaveAttribute('href', 'https://github.com/ataturhan21/ImageCaptioner-ConvNeXt_Transformer');
});
