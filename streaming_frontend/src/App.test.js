import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app container', () => {
  render(<App />);
  const notFoundCheck = screen.getByText(/Not Found/i);
  expect(notFoundCheck).toBeInTheDocument();
});
