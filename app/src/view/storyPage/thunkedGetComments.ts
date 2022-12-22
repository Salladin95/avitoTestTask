import { createAsyncThunk } from '@reduxjs/toolkit';
import { getComments } from '../../api/api';

const thunkedGetComments = createAsyncThunk(
  'comments/thunkedGetNews',
  async (commentsIDs: number[]) => {
    const comments = await getComments(commentsIDs);
    return comments;
  }
);

export default thunkedGetComments;
