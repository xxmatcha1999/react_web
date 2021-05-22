import { render, screen } from '@testing-library/react';
import App from './App';

test('Numerical method', () => {
  render(<App />);
  const linkElement = screen.getByText("Numerical method");
  expect(linkElement).toBeInTheDocument();
});


