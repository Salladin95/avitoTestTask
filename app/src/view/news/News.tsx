import React, { useCallback, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectIsLoadingNews, selectNews, setCurrentStory } from './newsSlice';
import NewsPresentation from './NewsPresentation';
import Backdrop from '../../components/backdrop';
import thunkedGetNews from './thunkedGetNews';

import { controller, restartAxiosController } from '../../api/api';

const News = () => {
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectNews);
  const isLoading = useAppSelector(selectIsLoadingNews);
  const intervalId: React.MutableRefObject<NodeJS.Timer | null> = useRef(null);

  const onRefreshBtnClick = useCallback(() => {
    if (isLoading) {
      controller.abort();
      restartAxiosController();
    }
    dispatch(thunkedGetNews());
    intervalId.current && clearInterval(intervalId.current);
    intervalId.current = setInterval(() => dispatch(thunkedGetNews()), 60000);
  }, [dispatch, isLoading]);

  const onStoryClick = useCallback((id: number) => dispatch(setCurrentStory(id)), [dispatch]);

  useEffect(() => {
    dispatch(thunkedGetNews());
    intervalId.current = setInterval(() => dispatch(thunkedGetNews()), 60000);
    return () => {
      intervalId.current && clearInterval(intervalId.current);
    };
  }, [dispatch]);

  const isOpenBackdrop = news === null || (news?.length === 0 && isLoading);
  return (
    <>
      <Backdrop open={isOpenBackdrop} />
      {!isOpenBackdrop && (
        <NewsPresentation
          onStoryClick={onStoryClick}
          onRefreshBtnClick={onRefreshBtnClick}
          news={news}
        />
      )}
    </>
  );
};

export default News;
