/**
 * Incident Status Badge Component Tests
 */

import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import IncidentStatusBadge from './IncidentStatusBadge';
import { IncidentStatus } from '@/lib/types/incident.types';

describe('IncidentStatusBadge', () => {
  it('should render Pendiente badge with yellow styling', () => {
    render(<IncidentStatusBadge status={IncidentStatus.Pendiente} />);

    const badge = screen.getByText('Pendiente');
    expect(badge).toBeDefined();
    expect(badge.className).toContain('bg-yellow-100');
    expect(badge.className).toContain('text-yellow-800');
  });

  it('should render Aprobado badge with green styling', () => {
    render(<IncidentStatusBadge status={IncidentStatus.Aprobado} />);

    const badge = screen.getByText('Aprobado');
    expect(badge).toBeDefined();
    expect(badge.className).toContain('bg-green-100');
    expect(badge.className).toContain('text-green-800');
  });

  it('should render Rechazado badge with red styling', () => {
    render(<IncidentStatusBadge status={IncidentStatus.Rechazado} />);

    const badge = screen.getByText('Rechazado');
    expect(badge).toBeDefined();
    expect(badge.className).toContain('bg-red-100');
    expect(badge.className).toContain('text-red-800');
  });

  it('should accept and apply custom className', () => {
    render(
      <IncidentStatusBadge
        status={IncidentStatus.Pendiente}
        className="custom-class"
      />
    );

    const badge = screen.getByText('Pendiente');
    expect(badge.className).toContain('custom-class');
  });
});
