import axios from 'axios';
import { IComment, IStory } from './contracts';

const getBaseUrl = (selector: string | number) =>
  `https://hacker-news.firebaseio.com/v0/${selector}.json?print=pretty`;

let controller = new AbortController();

const restartAxiosController = () => (controller = new AbortController());

const getTopNewsIDs = async (): Promise<number[]> => {
  const news = await axios.get(getBaseUrl('topstories'), {
    signal: controller.signal,
  });
  return news.data;
};

const getItem = async <DataT>(id: number): Promise<DataT> => {
  const item = await axios.get(getBaseUrl(`item/${id}`), {
    signal: controller.signal,
  });
  return item.data;
};

const getTopNews = async (): Promise<{ news: IStory[]; ids: number[] }> => {
  const ids = await getTopNewsIDs();
  const firstHundredIDs = ids.slice(0, 100);
  const requestForItems = firstHundredIDs.map(getItem<IStory>);
  const news = await Promise.all(requestForItems);
  return { ids: firstHundredIDs, news };
};

const getComments = async (commentsIDs: number[]): Promise<IComment[]> => {
  const requestForComments = commentsIDs.map(getItem<IComment>);
  const comments = await Promise.all(requestForComments);
  return comments;
};

export { getTopNewsIDs, getTopNews, getComments, getItem, controller, restartAxiosController };
