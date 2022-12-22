import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import News from '../../view/news';
import StoryPage from '../../view/storyPage';
import E404 from '../../view/e404';

const RouterView = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={News} />
        <Route exact path="/item/:id" component={StoryPage} />
        <Route exact path="*" component={E404} />
      </Switch>
    </Router>
  );
};

export default RouterView;
