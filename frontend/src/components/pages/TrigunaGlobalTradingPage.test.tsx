import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import { TrigunaGlobalTradingPage } from './TrigunaGlobalTradingPage';

afterEach(() => {
  cleanup();
});

describe('TrigunaGlobalTradingPage', () => {
  it('renders the hero content and collaboration CTA', () => {
    render(
      <MemoryRouter>
        <TrigunaGlobalTradingPage />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: 'Connecting capability with opportunity.' })
    ).toBeTruthy();
    expect(screen.getByText('Explore collaboration opportunities')).toBeTruthy();
    expect(screen.getByText('Ready to build the right partnership?')).toBeTruthy();
  });

  it('renders all listed sector cards', () => {
    render(
      <MemoryRouter>
        <TrigunaGlobalTradingPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Power & Utilities')).toBeTruthy();
    expect(screen.getByText('Water, Wastewater & Desalination')).toBeTruthy();
    expect(screen.getByText('Electronics & Manufacturing')).toBeTruthy();
    expect(screen.getByText('Construction, Roads & Infrastructure')).toBeTruthy();
    expect(screen.getByText('Renewable Energy & Sustainability')).toBeTruthy();
    expect(screen.getByText('Healthcare, Pharma & Life Sciences')).toBeTruthy();
    expect(screen.getByText('Industrial Engineering & Project Consulting')).toBeTruthy();
    expect(screen.getByText('Government-linked projects & public-sector opportunities')).toBeTruthy();
  });
});
