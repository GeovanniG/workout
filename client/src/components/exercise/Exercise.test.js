import React from 'react';
import { render, screen, testStore, fireEvent } from '../../testing-utils/testing-utils';
import { addSet, removeSet } from '../../slices/setsSlice';
import Exercise from './Exercise';
import Exercises from '../exercises/Exercises';

describe('initial display', () => {
    it('should not throw console error since required props included', () => {
        const consoleSpy = jest.spyOn(console, 'error');

        render(<Exercise id={0} />);

        expect(consoleSpy).not.toHaveBeenCalled();
    })
    
    it('should console error if required prop is missing', () => {
        const consoleSpy = jest
        .spyOn(console, 'error')
        // Implementation mocked so output is not produced
        .mockImplementation(() => {});

        render(<Exercise />);

        expect(consoleSpy).toHaveBeenCalled();
    })
})

describe('Correctly get total sets', () => {
    it('Add sets on screen and count them correctly', () => {
        const id = 1;
        const store = testStore();

        render(<Exercise id={id} />, { store });

        // Add 2 sets to the one already on screen
        store.dispatch(addSet({ exerciseId: id }));
        store.dispatch(addSet({ exerciseId: id }));

        const sets = screen.getAllByLabelText(/weight/i);

        expect(sets.length).toBe(3)
    })

    it('Add and delete sets and count them correctly on screen', () => {
        const exerciseId = 3
        const idSetstoDelete = [2 , 4];
        const store = testStore();
        let totalSets = 1;

        render(<Exercise id={exerciseId} />, { store });

        store.dispatch(addSet({ exerciseId }));
        totalSets += 1;
        store.dispatch(addSet({ exerciseId }));
        totalSets += 1;
        store.dispatch(addSet({ exerciseId, id: idSetstoDelete[0] }));
        totalSets += 1;
        store.dispatch(addSet({ exerciseId, id: idSetstoDelete[1] }));
        totalSets += 1;
        
        store.dispatch(removeSet(idSetstoDelete[0]));
        totalSets -= 1;
        store.dispatch(removeSet(idSetstoDelete[1]));
        totalSets -= 1;

        const sets = screen.getByText(/total sets/i);

        expect(sets).toHaveTextContent(new RegExp(`${totalSets}`, 'i'));
    })
})

describe('Correctly get total volume', () => {
    it('Get volume of single set', () => {
        const store = testStore();
        const weightValue = 100;
        const repsValue = 3;

        render(<Exercises id={1} />, { store });

        const weight = screen.getByLabelText(/weight/i);
        const reps = screen.getByLabelText(/reps/i);

        fireEvent.change(weight, { target: { value: weightValue }})
        fireEvent.change(reps, { target: { value: repsValue }})
        
        const volume = screen.getByText(/total volume/i);
        
        expect(volume).toHaveTextContent(new RegExp(`${weightValue * repsValue}`, 'i')) 
    })
})