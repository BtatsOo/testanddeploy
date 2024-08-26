import React, { Children, useEffect, useState } from "react";
import Header from "./header";
import { useParams, Link } from "react-router-dom";
import { isAuthenticated } from "./auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../css/course.css";

function Course() {
  const [courseData, setCourseData] = useState([]);
  const [userData, setUserData] = useState([]);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const [openConfirmMessage, setOpenConfirmMessage] = useState(false);
  const [auth, setAuth] = useState(false); //dont repeat your self

  const handleOpenConfirmMessage = (e) => {
    if (userData?.enrolledCourses?.includes(id)) {
      window.location.href = `/courses/enroll/${id}`;
    } else {
      setOpenConfirmMessage(!openConfirmMessage);
    }
  };
  const updateUserData = (updateduser) => {
    setUserData(updateduser);
  };
  useEffect(function () {
    async function fetchData() {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/courses/${id}`
        );

        const data = await res.json();
        console.log(data);
        setCourseData(data);
      } catch (error) {}
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

  return (
    <>
      {openConfirmMessage && (
        <ConfirmMessage
          auth={auth}
          courseData={courseData}
          handleOpenConfirmMessage={handleOpenConfirmMessage}
          updateUserData={updateUserData}
        />
      )}
      <Header isLogin={auth} dataUser={userData} />
      <div
        className="course-container"
        style={{ flexWrap: "Wrap", padding: "70px 30px" }}
      >
        <CourseInfo courseData={courseData} />
        <Aside
          handleOpenConfirmMessage={handleOpenConfirmMessage}
          courseData={courseData}
          dataUser={userData}
          id={id}
        ></Aside>
      </div>
    </>
  );
}

function CourseInfo({ courseData }) {
  return (
    <div
      className="crs-body"
      style={{
        display: "flex",
        flexDirection: "column",
        flexBasis: "60%",
        boxShadow: "#00000026 0px 0 8px 1px",
      }}
    >
      <div className="crs-page-img">
        <img src={courseData.featuredImage} />
      </div>
      <div className="crs-info" style={{ padding: "0 40px" }}>
        <div className="about-crs">
          <h1 className="title-framework">عن الكورس :</h1>
          <p>{courseData.description}</p>
        </div>
        <div className="crs-content">
          <h1 className="title-framework">محتوى الكورس : </h1>
          <Topic courseData={courseData}></Topic>
        </div>
      </div>
    </div>
  );
}
function Topic({ children, courseData }) {
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
                {t.lessons.map((lesson) => (
                  <Lessons isOpened={isOpened} lesson={lesson} />
                ))}
              </div>
            );
          });
        })}
    </div>
  );
}
function Lessons({ lesson, isOpened, children }) {
  return (
    <div className={`lessons ${isOpened ? "opened" : ""}`}>
      <h1 style={{ fontSize: "1.3rem" }} className="">
        {lesson.title}
      </h1>
      {children}
    </div>
  );
}
function Aside({ courseData, dataUser, id, handleOpenConfirmMessage }) {
  return (
    <div
      className="aside"
      style={{
        marginTop: "30px",
        flexBasis: "30%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        className="course-card"
        style={{ borderRadius: "12px", boxShadow: "#00000026 0px 0 8px 1px" }}
      >
        <div
          className="course-card-body"
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#f4f6f9",
            padding: "1.4rem",
            fontSize: "20px",
            gap: "20px",
          }}
        >
          <span style={{ fontWeight: "bold", textAlign: "" }}>
            {courseData.price ? `${courseData.price} جنيه` : "مجاني"}
          </span>
          <button
            onClick={handleOpenConfirmMessage}
            style={{
              backgroundColor: "#3E64DE",
              border: "none",
              color: "white",
              padding: "8px",
              borderRadius: "9px",
              fontSize: "24px",
              letterSpacing: "1px",
              cursor: "pointer",
            }}
          >
            {dataUser?.enrolledCourses?.includes(id) || !courseData.price
              ? "الدخول للكورس"
              : "اشتري الان !"}
          </button>
        </div>
        <div
          className="course-card-footer"
          style={{ position: "relative", padding: "5px" }}
        >
          <span>المدة: {courseData.duration}</span>
        </div>
      </div>
    </div>
  );
}
// confirm purhase!
function ConfirmMessage({
  courseData,
  handleOpenConfirmMessage,
  auth,
  updateUserData,
  children,
}) {
  const [error, setError] = useState("");
  const handleUpdate = async () => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/courses/purchase/${courseData._id}`,
        {},
        {
          withCredentials: true,
        }
      );

      // setResponseMessage("Update successful!");

      console.log("Response data:", response.data);
      updateUserData(response.data);
    } catch (error) {
      // setResponseMessage("Update failed.");
      console.log(error);
      setError(error.response.data.message);
    }
  };
  return (
    // we should make it more dynamic and fill content with props
    <div className="overlayConfrimMessage">
      {auth ? (
        <div className="confirmCard">
          <MessageTitle>
            هل انت متاكد من شراء هذا الكورس : <br />
            {courseData.title}
            <br />
            سيتم خصم {courseData.price} جنيه
          </MessageTitle>
          <div>
            <MessageButton
              auth={auth}
              onClick={handleOpenConfirmMessage}
              className="btn"
            >
              الغاء
            </MessageButton>
            <MessageButton
              auth={auth}
              onClick={() => {
                handleUpdate();
                handleOpenConfirmMessage();
              }}
              className="btn"
            >
              شراء
            </MessageButton>
          </div>
        </div>
      ) : (
        <div className="confirmCard">
          <MessageTitle>تحتاج لتسجيل دخولك اولا!</MessageTitle>
          <div>
            <Link to={"/login"} className="btn">
              تسجيل دخول
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
export function MessageTitle({ children }) {
  return <h1>{children}</h1>;
}
export function MessageButton({ children, auth, onClick, className }) {
  return (
    <>
      {auth ? (
        <button className={className} onClick={onClick}>
          {children}
        </button>
      ) : (
        <Link>{children}</Link>
      )}
    </>
  );
}
export { Course };
