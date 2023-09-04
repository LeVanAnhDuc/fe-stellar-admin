import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import { publishRoute, privateRoute } from './routes';

import DefaultLayout from './layouts/DefaultLayout';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { select } from './redux';

function App() {
    const { isSignIn } = useSelector(select.getStateSignInSlice);

    return (
        <>
            {(!isSignIn && (
                <Router>
                    <div className="App">
                        <Routes>
                            {publishRoute.map((item, index) => {
                                const Layout = item.layout === null ? Fragment : item.layout || DefaultLayout;

                                const Element = item.component;
                                return (
                                    <Route
                                        key={index}
                                        path={item.path}
                                        element={
                                            <Layout>
                                                <Element />
                                            </Layout>
                                        }
                                    />
                                );
                            })}
                        </Routes>
                    </div>
                </Router>
            )) || (
                <Router>
                    <div className="App">
                        <Routes>
                            {[...publishRoute, ...privateRoute].map((item, index) => {
                                const Layout = item.layout === null ? Fragment : item.layout || DefaultLayout;

                                const Element = item.component;
                                return (
                                    <Route
                                        key={index}
                                        path={item.path}
                                        element={
                                            <Layout>
                                                <Element />
                                            </Layout>
                                        }
                                    />
                                );
                            })}
                        </Routes>
                    </div>
                </Router>
            )}
        </>
    );
}

export default App;
