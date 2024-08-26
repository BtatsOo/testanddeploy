import React, { Children, useEffect, useState } from "react";
import Header from "./header";
import { Link, useParams } from "react-router-dom";
import { isAuthenticated } from "./auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../css/course.css";

function CourseContent() {
  const [courseData, setCourseData] = useState([]);
  const [lessonData, setLessonData] = useState([]);
  const [userData, setUserData] = useState([]);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setErr] = useState("");
  const [auth, setAuth] = useState(false); //dont repeat your self
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  useEffect(function () {
    async function fetchData() {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/courses/enroll/${id}`,
          {
            withCredentials: true,
          }
        );
        const { courseContentenrolled } = res.data;

        setCourseData(courseContentenrolled);
        setLessonData(courseContentenrolled.content[0].topic[0].lessons[0]);
        console.log(res.data);
      } catch (error) {
        console.log(error.response.data.message);
        setErr(error);
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    const checkAuth = async () => {
      const { user } = await isAuthenticated();
      console.log(user);
      if (user) {
        setAuth(true); // User is authenticated
        setUserData(user);
      } else {
        setAuth(false); // User is not authenticated
      }
      setIsLoading(false); // Loading is complete
    };

    checkAuth();
  }, []);
  //handle lesson data
  function handleLessonData(lesson, i) {
    setLessonData(lesson);
    setCurrentLessonIndex(i);
  }
  //hanlenextlessondata

  //end handling

  return (
    <>
      <Header isLogin={auth} dataUser={userData} />
      <div
        className="course-container"
        style={{
          flexWrap: "Wrap",
          padding: "70px 30px",
          justifyContent: "flex-end",
          gap: "30px",
        }}
      >
        {error ? (
          <>
            <h1>{error.response.data.message}</h1>
            <Link to={`/courses/${id}`}>Purchase The Course</Link>
          </>
        ) : (
          <>
            <LessonContent lessonData={lessonData} />
            <CourseInfo
              handleLessonData={handleLessonData}
              courseData={courseData}
            />
          </>
        )}
      </div>
    </>
  );
}

function CourseInfo({ courseData, handleLessonData }) {
  return (
    <div
      className="crs-body"
      style={{
        display: "flex",
        flexDirection: "column",
        flexBasis: "35%",
        boxShadow: "#00000026 0px 0 8px 1px",
      }}
    >
      <div className="crs-info" style={{ padding: "0 40px" }}>
        <div className="crs-content">
          <h1 className="title-framework">محتوى الكورس : </h1>
          <Topic
            courseData={courseData}
            handleLessonData={handleLessonData}
          ></Topic>
        </div>
      </div>
    </div>
  );
}
function Topic({ children, courseData, handleLessonData }) {
  const [isOpened, setisOpened] = useState(false);
  return (
    <div className="topics">
      {courseData.content &&
        courseData.content.map((c) => {
          return c.topic.map((t) => {
            return (
              <div
                className="topic"
                onClick={() => {
                  setisOpened(!isOpened);
                }}
              >
                <div className="topic-title">
                  <h1 className="title-framework">{t.title}</h1>
                  <FontAwesomeIcon
                    icon={faSortUp}
                    className={`${isOpened ? "opened" : ""}`}
                  />
                </div>
                {t.lessons.map((lesson, i) => (
                  <Lessons
                    handleLessonData={handleLessonData}
                    isOpened={isOpened}
                    lesson={lesson}
                    i={i}
                  />
                ))}
              </div>
            );
          });
        })}
    </div>
  );
}
function Lessons({ lesson, i, isOpened, children, handleLessonData }) {
  return (
    <div
      onClick={() => handleLessonData(lesson, i)}
      className={`lessons ${isOpened ? "opened" : ""}`}
    >
      <h1 style={{ fontSize: "1.3rem" }} className="">
        {lesson.title}
      </h1>
    </div>
  );
}
function LessonContent({ lessonData }) {
  return (
    <div
      className="lesson-content "
      style={{ flexGrow: "2", display: "flex", flexDirection: "column" }}
    >
      {lessonData.url && (
        <>
          <div
            className="video"
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <iframe
              style={{ width: "100%" }}
              title="This is a unique title"
              src={lessonData.url ? lessonData.url : ""}
              width=""
              height="480"
              allow="fullscreen;web-share;"
              referrerpolicy="strict-origin-when-cross-origin"
            ></iframe>
            <div className="btn-box"></div>
          </div>

          <div className="lesson-info">
            <h1 className="title-framework">{lessonData.title}:</h1>
            <p>{lessonData.description}</p>
          </div>
        </>
      )}
    </div>
  );
}
export { CourseContent };
