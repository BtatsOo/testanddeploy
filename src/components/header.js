import React from "react";
import { useState, useEffect } from "react";
import { dataLis, dataLis2, isLoginData } from "../data/data";
import Li1 from "./Lis";
import { Link } from "react-router-dom";
function Header({ isLogin, dataUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const viewportWidth = window.innerWidth;
  const [isOpactiy, setIsOpacity] = useState(false);
  useEffect(
    function () {
      if (isOpen) setIsOpacity(true);
      return () => setIsOpacity(false);
    },
    [isOpen]
  );
  return (
    <header>
      <div className="top-container">
        <nav className="small-screen">
          <div className="user-btn">
            <img
              alt="kofta"
              src="/images/man.png"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            />
            {isLogin && (
              <div style={{ marginRight: "5vw" }} className="balance">
                <Link
                  to={"/profile/balance"}
                  style={{
                    textShadow: "#3e3d4d 1px 1px 10px",
                    fontSize: "24px",
                    fontWeight: "bold",
                    lineHeight: "0",
                    color: "white",
                  }}
                >
                  الرصيد : {dataUser.balance}
                </Link>
              </div>
            )}
          </div>

          {isOpen && (
            <div
              className={`ul-container ${
                isOpactiy ? "opacity-active" : "opacity-hidden"
              }`}
            >
              <ul>
                {isLogin ? (
                  <>
                    <li
                      className="profileLi"
                      style={{
                        position: "relative",
                        justifyContent: "space-between",
                        paddingBottom: "15px",
                      }}
                    >
                      <Link to="/profile">{dataUser.name}</Link>

                      <img
                        style={{ width: "40%" }}
                        alt="kofta"
                        src="/images/man.png"
                      />
                    </li>
                    {dataLis2.map((data) => (
                      <Li1 datas={data} key={data.title}></Li1>
                    ))}
                  </>
                ) : (
                  dataLis.map((data) => (
                    <Li1 datas={data} key={data.title}></Li1>
                  ))
                )}
              </ul>
            </div>
          )}

          <div className="logo small-screen">
            <img src="/images/VIRUS.png"></img>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
