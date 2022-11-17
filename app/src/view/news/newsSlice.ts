import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStory } from '../../api/contracts';
import thunkedGetNews from './thunkedGetNews';
import { RootState } from '../../store/store';

export const unKnownError = 'Something went wrong';

export type INewsState = {
  newsIDs: null | number[];
  news: null | IStory[];
  isLoadingNews: boolean;
  errors: null | string[];
  currentStoryID: number | null;
};

const getNewsInitialState = (): INewsState => ({
  newsIDs: null,
  news: null,
  isLoadingNews: false,
  errors: null,
  currentStoryID: null,
});

const newsSlice = createSlice({
  name: 'news',
  initialState: getNewsInitialState(),
  reducers: {
    setCurrentStory: (state, { payload }: PayloadAction<number | null>) => {
      state.currentStoryID = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(thunkedGetNews.pending, (state) => {
      state.isLoadingNews = true;
    });
    builder.addCase(thunkedGetNews.fulfilled, (state, { payload }) => {
      state.isLoadingNews = false;
      state.newsIDs = payload.ids;
      state.news = payload.news.sort((a, b) => a.time - b.time);
      if (state.errors) {
        state.errors = null;
      }
    });
    builder.addCase(thunkedGetNews.rejected, (state, { error }) => {
      state.isLoadingNews = false;
      state.newsIDs = null;
      state.news = null;
      state.errors = !state.errors
        ? [error.message ?? unKnownError]
        : [...state.errors, error.message ?? unKnownError];
    });
  },
});

const selectNewsId = (state: RootState) => state.news.newsIDs;
const selectNews = (state: RootState) => state.news.news;
const selectErrors = (state: RootState) => state.news.errors;
const selectIsLoadingNews = (state: RootState) => state.news.isLoadingNews;
const selectStory = (state: RootState) => {
  const story = state.news?.news?.find((item) => item.id === state.news.currentStoryID);
  return story;
};

export const { setCurrentStory } = newsSlice.actions;

export { selectNewsId, selectNews, selectErrors, selectIsLoadingNews, selectStory };

export default newsSlice.reducer;
