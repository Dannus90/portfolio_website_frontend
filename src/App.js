import React from "react";
import HomePage from "./components/pages/homePage/homepage.component";
import GamesOverview from "../src/components/pages/gamesOverview/games-overview.component";
import Blog from "./components/pages/blog/blog.component";
import SinglePostPage from "./components/pages/singlePostPage/singlePost.component";
import AddNewPostPage from "./components/pages/addNewPostPage/addNewPostPage.component";
import RegisterPage from "./components/pages/registerPage/RegisterPage.component";
import LoginPage from "./components/pages/loginPage/LoginPage.component";
import { Route, Switch, Redirect } from "react-router-dom";
import ReducerState from "./components/pages/reducerState/reducerState";
import { connect } from "react-redux";

function App(props) {
    const AuthenticatedBlogRoute = ({ children, ...rest }) => {
        return (
            <Route
                {...rest}
                render={() =>
                    props.isAuthenticated ? (
                        <>{children}</>
                    ) : (
                        <Redirect to="/" />
                    )
                }
            />
        );
    };

    return (
        <div className="App">
            <Switch>
                <Route exact path="/gamesoverview" component={GamesOverview} />
                <Route exact path="/reducerstate" component={ReducerState} />
                <Route exact path="/blog" component={Blog} />
                <Route exact path="/" component={HomePage} />
                <Route path="/blog/singlepost" component={SinglePostPage} />
                <Route exact path="/register" component={RegisterPage} />
                <Route exact path="/login" component={LoginPage} />
                <AuthenticatedBlogRoute exact path="/blog/addpost">
                    <AddNewPostPage />
                </AuthenticatedBlogRoute>
            </Switch>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.authReducer.isAuthenticated,
    };
};

export default connect(mapStateToProps)(App);
