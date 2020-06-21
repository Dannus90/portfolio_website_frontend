import React from "react";
import HomePage from "./components/pages/homePage/homepage.component";
import GamesOverview from "../src/components/pages/gamesOverview/games-overview.component";
import Blog from "./components/pages/blog/blog.component";
import SinglePostPage from "./components/pages/singlePostPage/singlePost.component";
import AddNewPostPage from "./components/pages/addNewPostPage/addNewPostPage.component";
import RegisterPage from "./components/pages/registerPage/RegisterPage.component";
import LoginPage from "./components/pages/loginPage/LoginPage.component";
import { Route, Switch } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/gamesoverview" component={GamesOverview} />
                <Route exact path="/blog" component={Blog} />
                <Route exact path="/" component={HomePage} />
                <Route path="/blog/singlepost" component={SinglePostPage} />
                <Route exact path="/register" component={RegisterPage} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/blog/addpost" component={AddNewPostPage} />
            </Switch>
        </div>
    );
}

export default App;
