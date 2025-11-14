import { render, screen } from '@testing-library/react';
import Date from '../components/date';

describe('Date component', () => {
  it('renders the date text', () => {
    render(<Date dateString="2025-11-11" />);
    expect(screen.getByText('2025-11-11 00:00')).toBeInTheDocument();
  });
});
