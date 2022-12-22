import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTopNews } from '../../api/api';

const thunkedGetNews = createAsyncThunk('news/thunkedGetNews', async () => {
  const { news, ids } = await getTopNews();
  return { ids, news };
});

export default thunkedGetNews;
