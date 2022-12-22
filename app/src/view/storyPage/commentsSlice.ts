import { createSlice } from '@reduxjs/toolkit';
import { IComment } from '../../api/contracts';
import thunkedComments from './thunkedGetComments';
import { RootState } from '../../store/store';
import { unKnownError } from '../news/newsSlice';

export type ICommentsState = {
  comments: null | IComment[];
  isLoadingComments: boolean;
  errors: null | string[];
};

const getCommentsInitialState = (): ICommentsState => ({
  comments: null,
  isLoadingComments: false,
  errors: null,
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState: getCommentsInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(thunkedComments.pending, (state) => {
      state.isLoadingComments = true;
    });
    builder.addCase(thunkedComments.fulfilled, (state, { payload }) => {
      state.isLoadingComments = false;
      state.comments = payload;
      if (state.errors) {
        state.errors = null;
      }
    });
    builder.addCase(thunkedComments.rejected, (state, { error }) => {
      state.isLoadingComments = false;
      state.comments = null;
      state.errors = !state.errors
        ? [error.message ?? unKnownError]
        : [...state.errors, error.message ?? unKnownError];
    });
  },
});

const selectComments = (state: RootState) => state.comments.comments;
const selectErrors = (state: RootState) => state.comments.errors;
const selectIsLoadingComments = (state: RootState) => state.comments.isLoadingComments;

export { selectErrors, selectComments, selectIsLoadingComments };

export default commentsSlice.reducer;
