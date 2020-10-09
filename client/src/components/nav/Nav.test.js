import React from 'react';
import { render, screen } from '@testing-library/react';
import Nav from './Nav';

describe('initial load', () => {
    it('renders Nav component', () => {
        render(<Nav />);

        expect(screen.getByText(/home/i)).toBeInTheDocument();
    })
});

// Home links takes user home (same for other links)
// Sidebar hidden when not in view
