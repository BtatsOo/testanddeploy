import React from "react";
import { dataLis, secdata } from "../data/data";

import Home from "./home.js";
import Login from "./login.js";
import { Route, Link, Routes } from "react-router-dom";
import Browse from "./browse.js";
import { Course } from "./course.js";
import { CourseContent } from "./courseContent.js";
import { Profile } from "./profile.js";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/login" Component={Login} />
        <Route exact path="/browse" Component={Browse} />
        <Route path="/courses/:id" Component={Course} />
        <Route path="/courses/enroll/:id" Component={CourseContent} />
        <Route exact path="/profile" Component={Profile} />
      </Routes>
    </>
  );
}
export default App;
