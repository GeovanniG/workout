import React from 'react';
import { render, screen, testStore, fireEvent } from '../../testing-utils/testing-utils';
import Sets from './Sets';

describe('initial render', () => {
    it('should not throw console error since required props included', () => {
        const consoleSpy = jest.spyOn(console, 'error');

        render(<Sets exerciseId={0} />);

        expect(consoleSpy).not.toHaveBeenCalled();
    })
    
    it('should console error if required prop is missing', () => {
        const consoleSpy = jest
        .spyOn(console, 'error')
        // Implementation mocked so output is not produced
        .mockImplementation(() => {});

        render(<Sets />);

        expect(consoleSpy).toHaveBeenCalled();
    })

    it('should render sets in store', () => {
        const store = testStore();
        
        render(<Sets exerciseId={0} />, { store });

        const button = screen.getByRole('button', { name: /add a set/i })
        fireEvent.click(button);

        const allWeightInputs = screen.getAllByLabelText(/weight/i);

        expect(allWeightInputs.length).toBe(2)
    })
})