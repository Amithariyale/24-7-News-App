import "./App.css";

import React from "react";
import Navbar from "./component/Navbar";

import News from "./component/News";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { useState } from "react";

const App =()=> {
  const pageSize = 15;
  const apiKey = process.env.REACT_APP_NEWS_API;

  const [progress,setProgress]=useState(10)
  

  const changeProgress = (progress) => {
    setProgress(progress);
  };
 
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            height={3}
            color="blue"
            progress={progress}
            onLoaderFinished={() => changeProgress(0)}
          />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <News apiKey={apiKey}
                  setProgress={changeProgress}
                  key="/"
                  pageSize={pageSize}
                  category="general"
                  gerne="primary"
                />
              }
            ></Route>
            <Route
              exact
              path="/science"
              element={
                <News apiKey={apiKey}
                  setProgress={changeProgress}
                  key="science"
                  pageSize={pageSize}
                  category="science"
                  gerne="dark"
                />
              }
            ></Route>

            <Route
              exact
              path="/entertainment"
              element={
                <News apiKey={apiKey}
                  setProgress={changeProgress}
                  key="entertainment"
                  pageSize={pageSize}
                  category="entertainment"
                  gerne="dark"
                />
              }
            ></Route>
            <Route
              exact
              path="/health"
              element={
                <News apiKey={apiKey}
                  setProgress={changeProgress}
                  key="health"
                  pageSize={pageSize}
                  category="health"
                  gerne="success"
                />
              }
            ></Route>
            <Route
              exact
              path="/business"
              element={
                <News apiKey={apiKey}
                  setProgress={changeProgress}
                  key="business"
                  pageSize={pageSize}
                  category="business"
                  gerne="secondary"
                />
              }
            ></Route>
            <Route
              exact
              path="/technology"
              element={
                <News apiKey={apiKey}
                  setProgress={changeProgress}
                  key="technology"
                  pageSize={pageSize}
                  category="technology"
                  gerne="info"
                />
              }
            ></Route>
            <Route
              exact
              path="/sports"
              element={
                <News apiKey={apiKey}
                  setProgress={changeProgress}
                  key="sports"
                  pageSize={pageSize}
                  category="sports"
                  gerne="danger"
                />
              }
            ></Route>
          </Routes>
        </Router>
      </div>
    );
  
}
export default App;