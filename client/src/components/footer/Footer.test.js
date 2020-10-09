import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('inital load of Footer', () => {
    it('render Footer', () => {
        render(<Footer />);

        expect(screen.getByText(/footer/i)).toBeInTheDocument();

        
    })
})