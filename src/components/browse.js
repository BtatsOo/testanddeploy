import React, { useEffect, useState } from "react";
import Header from "./header";
import { Link, useParams } from "react-router-dom";
import { isAuthenticated } from "./auth";
import "../css/browse.css";
function Browse() {
  const [isOpactiy, setIsOpacity] = useState(false);
  const [courseData, setCourseData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [auth, setAuth] = useState(false);

  useEffect(function () {
    async function fetchData() {
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/courses`);
        const data = await res.json();
        console.log(data);
        setCourseData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
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
      // Loading is complete
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (!isLoading) setIsOpacity(true);
  }, [isLoading]);

  //get the title without element

  return (
    <>
      <div className="browse-container">
        <Header isLogin={auth} dataUser={userData} />

        <div className="welcome-sec">
          <h1>اهلا بعودتك !</h1>
          <button className="btn">كورساتي</button>
          <p>تصفح الكورسات 🔽</p>
        </div>
        <section className="courses">
          <h1>الكورسات</h1>
          <div className="crs-container">
            {courseData.map((dataCrs) => (
              <Courses
                dataCrs={dataCrs}
                isOpactiy={isOpactiy}
                key={dataCrs._id}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
export function Courses({ dataCrs, isOpactiy, style }) {
  return (
    <div
      style={style}
      className={`crs-sec ${isOpactiy ? "opacity-active" : ""}`}
    >
      <img style={{}} src={dataCrs.featuredImage} alt="course" />
      <div className="crs-content-box">
        <h3>{dataCrs.title}</h3>
        <p>{dataCrs.description.slice(0, 200)}</p>
        <span className="kofta">
          <span className="price"> {dataCrs.price} جنيه </span>
          <span className="purshase">
            <Link to={`/courses/${dataCrs["_id"]}`}>اشترك الان !</Link>
          </span>
        </span>
      </div>
    </div>
  );
}

export default Browse;
