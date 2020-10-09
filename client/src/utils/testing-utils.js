import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore, createEntityAdapter } from '@reduxjs/toolkit';
import myStore from '../store/store';
import {reducer as myReducer} from '../slices/index';

const render = (ui, {store=myStore, ...renderOptions} = {}) => {
  const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

const testStore = (preloadedState=createEntityAdapter().getInitialState(), reducer=myReducer) => configureStore({ reducer, preloadedState })

// re-export everything
export * from '@testing-library/react'

// override render method
export { render, testStore }