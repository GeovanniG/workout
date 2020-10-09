import { configureStore } from '@reduxjs/toolkit';
import { reducer } from '../slices/index';

export default configureStore({ reducer })
