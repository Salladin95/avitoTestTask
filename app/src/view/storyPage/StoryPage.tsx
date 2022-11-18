import React, { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectStory } from '../news/newsSlice';
import thunkedGetComments from './thunkedGetComments';
import { selectComments, selectIsLoadingComments } from './commentsSlice';

import Backdrop from '../../components/backdrop';
import StoryPagePresentation from './StoryPagePresentation';
import { controller, restartAxiosController } from '../../api/api';

const StoryPage = () => {
  const story = useAppSelector(selectStory);
  const dispatch = useAppDispatch();
  const comments = useAppSelector(selectComments);
  const isLoadingComments = useAppSelector(selectIsLoadingComments);

  const onRefreshBtnClick = useCallback(() => {
    if (isLoadingComments) {
      controller.abort();
      restartAxiosController();
    }
    story?.kids && dispatch(thunkedGetComments(story.kids));
  }, [dispatch, isLoadingComments, story?.kids]);

  useEffect(() => {
    story?.kids && dispatch(thunkedGetComments(story.kids));
  }, [dispatch, story?.kids]);

  return (
    <>
      <Backdrop open={isLoadingComments} />
      {!isLoadingComments && (
        <StoryPagePresentation
          onRefreshBtnClick={onRefreshBtnClick}
          story={story ?? null}
          comments={comments ?? null}
        />
      )}
    </>
  );
};

export default StoryPage;
