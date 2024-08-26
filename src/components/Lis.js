import React, { Children } from "react";
import { Route, Link, useNavigate } from "react-router-dom";

function Li1({ datas, children, isLogin, class2 }) {
  const navigate = useNavigate();
  return (
    <li className={`${datas.class ? datas.class : ""}`}>
      <Link
        onClick={() => {
          {
            datas.callback && datas.callback();
          }
        }}
        to={datas.src}
      >
        {datas.title}
      </Link>
    </li>
  );
}

export default Li1;
