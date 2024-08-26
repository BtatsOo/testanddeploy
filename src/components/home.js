import React from "react";
import { dataLis, secdata } from "../data/data";
import style from "../css/Home.css";
import { Link } from "react-router-dom";
import Header from "./header";
import { useEffect, useState } from "react";

function Home() {
  return (
    <>
      <div className="top-container">
        <div className="container">
          <Header isLogin={false} />
          <section className="bdy-head">
            <div className="text-box">
              <h1>أفضل منصة تعليمية في الوطن العربي!</h1>
              <p>
                لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار
                النشوة وتمجيد الألم نشأت بالفعل، وسأعرض لك التفاصيل لتكتشف حقيقة
                وأساس تلك السعادة البشرية.
              </p>
              <button className="btn">المزيد</button>
            </div>
            <div className="img-box">
              <img src="images/hero.png"></img>
            </div>
          </section>
        </div>
      </div>
      <div className="container">
        {secdata.map((data) => (
          <Section key={data.h1} secdatas={data} />
        ))}
      </div>
    </>
  );
}

function Section({ secdatas }) {
  return (
    <section className={`${secdatas.class} sec`}>
      <div className="sectitle-box" style={secdatas.style.divBox}>
        <h1>{secdatas.h1}</h1>
        <p>{secdatas.p}</p>
        <button className="btn" style={secdatas.style.btn}>
          المزيد
        </button>
      </div>
      <div className="secimg-box" style={secdatas.style.imgBox}>
        <img src={secdatas.url}></img>
      </div>
    </section>
  );
}

export default Home;
