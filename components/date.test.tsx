import { render, screen } from '@testing-library/react';
import Date from './date';

describe('Date component', () => {
  it('日付をフォーマットして表示する', () => {
    render(<Date dateString="2025-11-11" />);
    expect(screen.getByText('2025-11-11 00:00')).toBeInTheDocument();
  });

  it('time要素にdateTime属性が設定される', () => {
    render(<Date dateString="2025-11-11" />);
    const timeEl = screen.getByText('2025-11-11 00:00');
    expect(timeEl.tagName).toBe('TIME');
    expect(timeEl).toHaveAttribute('dateTime', '2025-11-11');
  });
});
