import React, { lazy, Suspense } from "react";
import HomePage from "./components/pages/homePage/homepage.component";
import GamesOverview from "../src/components/pages/gamesOverview/games-overview.component";

import SinglePostPage from "./components/pages/singlePostPage/singlePost.component";
import SpinnerBig from "./UI/SpinnerBig/spinnerBig.component";
import RegisterPage from "./components/pages/registerPage/RegisterPage.component";
import LoginPage from "./components/pages/loginPage/LoginPage.component";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { AnimatePresence } from "framer-motion";

//Lazy loading for security.
const AddNewPostPage = lazy(() =>
    import("./components/pages/addNewPostPage/addNewPostPage.component")
);

//Lazy loading for performance.
const Blog = lazy(() => import("./components/pages/blog/blog.component"));

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
            <AnimatePresence>
                <Suspense
                    fallback={
                        <div>
                            <SpinnerBig />
                        </div>
                    }
                >
                    <Switch>
                        <Route
                            exact
                            path="/gamesoverview"
                            component={GamesOverview}
                        />
                        <Route exact path="/blog" component={Blog} />
                        <Route exact path="/" component={HomePage} />
                        <Route
                            path="/blog/singlepost"
                            component={SinglePostPage}
                        />
                        <Route
                            exact
                            path="/register"
                            component={RegisterPage}
                        />
                        <Route exact path="/login" component={LoginPage} />
                        <AuthenticatedBlogRoute exact path="/blog/addpost">
                            <AddNewPostPage />
                        </AuthenticatedBlogRoute>
                    </Switch>
                </Suspense>
            </AnimatePresence>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.authReducer.isAuthenticated,
    };
};

export default connect(mapStateToProps)(App);
