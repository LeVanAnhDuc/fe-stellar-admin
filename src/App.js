import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publishRoute } from './routes';

import DefaultLayout from './layouts/DefaultLayout';
import { Fragment } from 'react';

function App() {
    return (
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
    );
}

export default App;
