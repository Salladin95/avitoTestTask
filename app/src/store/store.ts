import { combineReducers, PreloadedState } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import newsReducer from '../view/news/newsSlice';
import commentsReducer from '../view/storyPage/commentsSlice';

const rootReducer = combineReducers({ news: newsReducer, comments: commentsReducer });

const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({ reducer: rootReducer, preloadedState });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export default setupStore;
