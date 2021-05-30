import { render, screen } from '@testing-library/react';
import ProposeChannels from './ProposeChannels';

test('renders learn react link', () => {
  render(<ProposeChannels />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
