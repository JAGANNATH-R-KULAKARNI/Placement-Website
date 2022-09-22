import React from "react";
import Grid from "@mui/material/Grid";
import styles from "./Footer1.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import Footer2 from "./Footer4";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import * as c from "./Colors";

function Footer() {
  const m1 = useMediaQuery("(min-width:430px)");

  return (
    <div>
      {/* <Footer2 /> */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingLeft: m1 ? "10%" : "0%",
          paddingRight: "10%",
          backgroundColor: "#007C7C",
          marginTop: "-25px",
          color: "white",
        }}
      >
        <Grid container spacing={0}>
          <Grid
            item
            xs={m1 ? 4 : 12}
            style={{
              display: "flex",
              justifyContent: m1 ? "center" : "left",
              paddingLeft: m1 ? "0%" : "12%",
              fontFamily: "inherit",
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: m1 ? "30px" : "20px",
                  fontFamily: "inherit",
                  fontWeight: 900,
                }}
              >
                About
              </h3>
              <p
                style={{
                  fontSize: m1 ? "15px" : "12px",
                  lineHeight: 1.4,
                  wordSpacing: m1 ? "5px" : "3px",
                }}
              >
                The New Year Trayagnie promises a period of joy and celebrations
                unlike the past two years Sarvari and Plava where people faced
                the Corona pandemic and loss of life. This year is best for
                performing auspicious events like weddings, construction of new
                homes, housewarming etc. People born in this Trayagnie year will
                be principled ones. trying to do good to others. They will also
                learn many sciences and live long.
              </p>
            </div>
          </Grid>
          <Grid
            item
            xs={m1 ? 4 : 6}
            style={{ display: "flex", justifyContent: m1 ? "center" : "left" }}
          >
            <div>
              <ul
                style={{
                  listStyleType: "none",
                  fontSize: m1 ? "15px" : "12px",
                  lineHeight: 1.7,
                  wordSpacing: m1 ? "5px" : "3px",
                }}
              >
                <h3
                  style={{
                    fontSize: m1 ? "30px" : "20px",
                    fontFamily: "inherit",
                    fontWeight: 900,
                  }}
                >
                  {" "}
                  Legal Info
                </h3>
                <li
                  className={styles.footer}
                  //   onClick={() => router.push("/info/creaters")}
                  style={{
                    fontSize: m1 ? "15px" : "12px",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.color = "#fcbf02";
                    e.target.style.textDecoration = "underline";
                    e.target.style.cursor = "pointer";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "white";
                    e.target.style.textDecoration = "none";
                  }}
                >
                  {"Creaters"}
                </li>
                <li
                  className={styles.footer}
                  //   onClick={() => router.push("/about")}
                  style={{
                    fontSize: m1 ? "15px" : "12px",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.color = "#fcbf02";
                    e.target.style.textDecoration = "underline";
                    e.target.style.cursor = "pointer";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "white";
                    e.target.style.textDecoration = "none";
                  }}
                >
                  {"Council Core"}
                </li>

                <li
                  className={styles.footer}
                  //   onClick={() => router.push("/info/terms&conditions")}
                  style={{
                    fontSize: m1 ? "15px" : "12px",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.color = "#fcbf02";
                    e.target.style.textDecoration = "underline";
                    e.target.style.cursor = "pointer";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "white";
                    e.target.style.textDecoration = "none";
                  }}
                >
                  {"Terms & Conditions"}
                </li>
                <li
                  className={styles.footer}
                  //   onClick={() => router.push("/info/privacy_policies")}
                  style={{
                    fontSize: m1 ? "15px" : "12px",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.color = "#fcbf02";
                    e.target.style.textDecoration = "underline";
                    e.target.style.cursor = "pointer";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "white";
                    e.target.style.textDecoration = "none";
                  }}
                >
                  {"Privacy Policy"}
                </li>
                <li
                  className={styles.footer}
                  //   onClick={() => router.push("/info/refunds")}
                  style={{
                    fontSize: m1 ? "15px" : "12px",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.color = "#fcbf02";
                    e.target.style.textDecoration = "underline";
                    e.target.style.cursor = "pointer";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "white";
                    e.target.style.textDecoration = "none";
                  }}
                >
                  {"Refunds"}
                </li>
              </ul>
            </div>
          </Grid>

          <Grid
            item
            xs={m1 ? 4 : 6}
            style={{ display: "flex", justifyContent: m1 ? "center" : "left" }}
          >
            <div>
              <ul
                style={{
                  listStyleType: "none",
                  fontSize: m1 ? "15px" : "12px",
                  lineHeight: 1.7,
                  wordSpacing: m1 ? "5px" : "3px",
                }}
              >
                <h3
                  style={{
                    fontSize: m1 ? "30px" : "20px",
                    fontFamily: "inherit",
                    fontWeight: 900,
                  }}
                >
                  {" "}
                  {"Designers"}
                </h3>
                <a
                  href="https://www.linkedin.com/in/jagannath-r-kulakarni-a465841a7/"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  {" "}
                  <li
                    style={{
                      fontSize: m1 ? "15px" : "14px",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.color = "#fcbf02";
                      e.target.style.textDecoration = "underline";
                      e.target.style.cursor = "pointer";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "white";
                      e.target.style.textDecoration = "none";
                    }}
                  >
                    Jagannath R K
                  </li>
                </a>

                <a
                  href="https://www.linkedin.com/in/niraj-sharma-5538801a7/"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  {" "}
                  <li
                    style={{
                      fontSize: m1 ? "15px" : "14px",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.color = "#fcbf02";
                      e.target.style.textDecoration = "underline";
                      e.target.style.cursor = "pointer";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "white";
                      e.target.style.textDecoration = "none";
                    }}
                  >
                    Niraj Sharma
                  </li>
                </a>
              </ul>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingLeft: m1 ? "0%" : "10%",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginLeft: "-10px",
                  }}
                >
                  <a
                    href="https://www.instagram.com/niemysuru/?hl=en"
                    passHref={true}
                    rel="noreferrer"
                    target="_blank"
                    style={{ color: "white" }}
                  >
                    <InstagramIcon
                      style={{
                        fontSize: m1 ? "50px" : "30px",
                        paddingLeft: "10px",
                      }}
                      className={styles.footer}
                    />
                  </a>

                  <a
                    href="https://twitter.com/niemysore"
                    passHref={true}
                    rel="noreferrer"
                    target="_blank"
                    style={{ color: "white" }}
                  >
                    <TwitterIcon
                      style={{
                        fontSize: m1 ? "50px" : "30px",
                        paddingLeft: "10px",
                      }}
                      className={styles.footer}
                    />
                  </a>
                  <a
                    href="https://www.facebook.com/NIEMYSURU/"
                    passHref={true}
                    rel="noreferrer"
                    target="_blank"
                    style={{ color: "white" }}
                  >
                    <FacebookIcon
                      style={{
                        fontSize: m1 ? "50px" : "30px",
                        paddingLeft: "10px",
                      }}
                      className={styles.footer}
                    />
                  </a>
                </div>
                <h4
                  className={styles.footer}
                  style={{
                    marginTop: m1 ? "0px" : "0px",
                    textAlign: "center",
                  }}
                >
                  <a
                    href="https://nie.ac.in/"
                    passHref={true}
                    rel="noreferrer"
                    target="_blank"
                    style={{
                      textDecoration: "none",
                      fontWeight: 700,
                      fontSize: m1 ? "15px" : "12px",
                      color: "white",
                      textAlign: "center",
                    }}
                    className={styles.footer}
                  >
                    Copyright© NIE Placements
                  </a>
                </h4>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingLeft: "10%",
          paddingRight: "10%",
          backgroundColor: "#045D5D",
        }}
      >
        <p
          style={{
            textAlign: "center",
            fontSize: m1 ? "20px" : "13px",
            fontWeight: 700,
            color: "white",
          }}
        >
          <i style={{ paddingRight: "10px" }}> Address : </i> Mananthavadi Rd,
          Vidyaranyapura, Mysuru, Karnataka 570008
        </p>
      </div>
    </div>
  );
}

export default Footer;
