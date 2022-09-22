import React from "react";
import styles from "./Footer.css";
import * as c from "./Colors";
import useMediaQuery from "@mui/material/useMediaQuery";

function Footer() {
  const m1 = useMediaQuery("(min-width:430px)");

  return (
    <div className={styles.container}>
      <div className={styles.contents_top} style={{ backgroundColor: c.c4 }}>
        <div className={styles.img_container}>
          <div className={styles.img_absolute} style={{ marginTop: "-150px" }}>
            <img
              src="/images/dance2.webp"
              alt=""
              style={{
                height: m1 ? "400px" : "300px",
                width: "auto",
                marginTop: m1 ? "0px" : "100px",
              }}
            ></img>
          </div>
        </div>
        <div className={styles.desc}>
          <h1
            style={{
              margin: "10px 0",
              color: "white",
              textShadow: "2px 0 white",
              letterSpacing: "3px",
              fontSize: 38,
              fontWeight: "bold",
              fontFamily: "Bungee",
            }}
          >
            ತ್ರಯಾಗ್ನಿ Trayagnie
            <br />
            2022
          </h1>
          <div style={{ height: "50px" }}></div>
        </div>
      </div>
      <br />
    </div>
  );
}

export default Footer;
