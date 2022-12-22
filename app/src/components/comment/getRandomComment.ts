import { IComment } from '../../api/contracts';
import getRandomInt from '../../utils/getRandomInt';

const getRandomComment = (): IComment => ({
  by: 'stranger',
  id: getRandomInt(100000),
  kids: [getRandomInt(100), getRandomInt(10), getRandomInt(50), getRandomInt(1000)],
  parent: getRandomInt(1000),
  text: 'something',
  time: getRandomInt(1000000),
  type: 'comment',
});

export { getRandomComment };
