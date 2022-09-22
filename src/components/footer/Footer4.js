import React from "react";
import styles from "./Footer.css";
import * as c from "./Colors";
import useMediaQuery from "@mui/material/useMediaQuery";
import stu from "../images/stu.png";

function Footer() {
  const m1 = useMediaQuery("(min-width:430px)");

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          backgroundColor: "#00C1C1",
          width: "100%",
        }}
      >
        <div className={styles.img_container} style={{ width: "100%" }}>
          <div
            className={styles.img_absolute}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={stu}
              alt=""
              style={{
                marginTop: m1 ? "-300px" : "-140px",
                width: m1 ? "40%" : "80%",
                height: "auto",
              }}
            ></img>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}

export default Footer;
