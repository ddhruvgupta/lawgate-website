import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from './button';

describe('Button', () => {
  it('renders child element when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/contact">Contact</a>
      </Button>
    );

    const link = screen.getByRole('link', { name: 'Contact' });
    expect(link).toBeTruthy();
    expect(link.getAttribute('aschild')).toBeNull();
  });
});
