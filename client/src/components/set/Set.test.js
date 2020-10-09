import React from 'react';
import { screen, render, fireEvent, testStore } from '../../testing-utils/testing-utils';
import Set from './Set';
import { addSet, updateSet } from '../../slices/setsSlice'

describe('initial render', () => {
    it('should not throw console error since required props included', () => {
        const consoleSpy = jest.spyOn(console, 'error');

        render(<Set id={0} />);

        expect(consoleSpy).not.toHaveBeenCalled();
    })

    it('should throw console error render since require prop not included', () => {
        const consoleSpy = jest
            .spyOn(console, 'error')
            // Implementation mocked so output is not produced
            .mockImplementation(() => {});

        render(<Set />);

        expect(consoleSpy).toHaveBeenCalled();
    })
})

describe(`Change Weight input value`, () => {
    it('Should not accept not numeric string values', () => {
        render(<Set id={0} />);

        const weightInput = screen.getByLabelText(/weight/i);
        fireEvent.change(weightInput, { target: { value: 'a' } })
        
        expect(weightInput).toHaveValue('');
    })

    it('Should change weight value to numeric string', () => {
        const value = '100';

        render(<Set id={0} />);

        const weight = screen.getByLabelText(/weight/i);        
        fireEvent.change(weight, { target: { value } });

        expect(weight).toHaveValue(value);
    })
})

describe('If weight value is input then so must reps', () => {
    it('Should make weight value required if reps are input and vice versa', () => {
        render(<Set id={0} />);

        const weight = screen.getByLabelText(/weight/i);
        const reps = screen.getByLabelText(/reps/i);

        fireEvent.change(weight, { target: { value: 100 }})

        expect(reps).toBeRequired();
    })
})

describe('Remove Set in store', () => {
    it('Should remove set when button is clicked', () => {
        const id = 1;
        const store = testStore();
        const numOfSets = () => Object.keys(store.getState().sets.entities).length

        render(<Set id={id} />, { store });

        store.dispatch(addSet({id}));

        expect(numOfSets()).toBe(1);

        const button = screen.getByRole('button', { name: /delete set/i });
        fireEvent.click(button);

        expect(numOfSets()).toBe(0);
    })
})

describe('Alter Set in store', () => {
    it('Change weight value in store when new weight entered', () => {
        const id = 1;
        const oldWeight = '100';
        const newWeight = '150';
        const store = testStore();

        render(<Set id={id} />, { store })

        store.dispatch(addSet({ id, weight: oldWeight }));

        const weight = screen.getByLabelText(/weight/i)
        const getWeight = () => store.getState().sets.entities[id].weight;

        expect(getWeight()).toBe(oldWeight);

        fireEvent.change(weight, { target: { value: newWeight } });

        expect(getWeight()).toBe(newWeight);
    })
})

// No negative numbers