import React, { useCallback, useEffect, useState } from 'react';
import { ListItem, ListItemText } from '@mui/material';
import { IComment } from '../../api/contracts';
import { getComments } from '../../api/api';

type CommentProps = { comment: IComment; paddingLeft?: number; rec?: boolean };

const Comment = ({ comment, paddingLeft = 2, rec = false }: CommentProps) => {
  const pl = paddingLeft + 2;
  const [kids, setKids] = useState<null | IComment[]>(null);
  const [isLoadingComment, setIsLoadingComment] = useState(false);

  const updateComments = useCallback(async () => {
    try {
      setIsLoadingComment(true);
      const commentKids = await getComments(comment.kids);
      setKids(commentKids);
      setIsLoadingComment(false);
    } catch (err) {
      setIsLoadingComment(false);
      console.log(err);
    }
  }, [comment.kids]);

  const handleCommentClick = async () => {
    if (!comment.kids || isLoadingComment || kids) {
      return;
    }
    await updateComments();
  };

  useEffect(() => {
    if (rec && comment.kids && comment.kids.length > 0) {
      (async () => {
        await updateComments();
      })();
    }
  }, [comment.kids, rec, updateComments]);

  return (
    <>
      <ListItem sx={{ pl, cursor: 'pointer' }}>
        <ListItemText onClick={handleCommentClick}>Comment: {comment.text}</ListItemText>
      </ListItem>
      {kids &&
        kids.map((kid) => {
          return <Comment key={kid.id} comment={kid} paddingLeft={pl} rec={true} />;
        })}
    </>
  );
};

export default Comment;
