import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Column from '../Column';
import TodayArticle from '../Article/todayArticles';
import HistoryArticle from '../Article/historyArticles';
import LikeArticles from '../Article/likeArticles';
import ColumnArticle from '../Article/columnArticles';
import Detail from '../Detail';
import HotAuthor from '../HotAuthor';
import AuthorProfile from '../AuthorProfile';
import Login from '../Login';
import PrivateRoute from '../PrivateRoute';
import './style.css'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/column" component={Column} />
          <Route path="/login" component={Login} />
          <Route path="/historyArticles" component={HistoryArticle} />
          <Route path="/columnArticle/:columnId" component={ColumnArticle} />
          <Route path="/artileDetail/:postId" component={Detail} />
          <Route path="/hotAuthors" component={HotAuthor} />
          <Route path="/authorProfile/:authorId" component={AuthorProfile} />
          <PrivateRoute path="/like" component={LikeArticles} />
          <Route path="/" component={TodayArticle} />
        </Switch>
      </Router>
    );
  }
}

export default App;