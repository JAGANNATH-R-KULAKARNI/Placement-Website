import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { supabase } from "../../../Supabase";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import FilterListIcon from "@mui/icons-material/FilterList";
import CompanyUI from "./utilities/Company";
import Fab from "@mui/material/Fab";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import RegisterUI from "./utilities/Register";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import SearchUI from "./utilities/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import { motion } from "framer-motion";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { ConstructionOutlined } from "@mui/icons-material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function AnnounceACompany(props) {
  const m1 = useMediaQuery("(min-width:600px)");
  const [width, setWidth] = React.useState(0);
  const caro = React.useRef();
  const navigate = useNavigate();
  const location = useLocation();

  //   React.useEffect(() => {
  //     if (companies.length === 0) {
  //       fetchTheCompanies();
  //     }
  //   }, []);

  //   React.useEffect(() => {
  //     setInterval(() => {
  //       fetchTheProfile();
  //     }, 1000);
  //   });

  React.useEffect(() => {
    setWidth(caro.current.scrollWidth - caro.current.offsetWidth);
  }, []);

  return (
    <div style={{ width: "100%" }}>
      {m1 ? (
        <h3
          style={{
            marginLeft: "5%",
            marginTop: "10px",
            marginBottom: "0px",
            fontWeight: 600,
          }}
        >
          Recent Registered Companies
        </h3>
      ) : (
        <h4
          style={{
            marginLeft: "4%",
            marginTop: "15px",
            marginBottom: "0px",
            fontWeight: 600,
            color: "#7A7A7A",
          }}
        >
          Recent Registered Companies
        </h4>
      )}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "-19px",
        }}
      >
        <div
          style={{
            width: m1 ? "95%" : "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <motion.div
            style={{
              cursor: "grab",
              overflow: "hidden",
              width: m1 ? "100%" : "100%",
            }}
            ref={caro}
          >
            <motion.div
              drag="x"
              dragConstraints={{
                right: 0,
                left: -width,
              }}
              style={{ display: "flex" }}
              id="shiftblogs"
            >
              {props.fCompanies &&
                props.fCompanies.map((item, index) => {
                  return (
                    <motion.div
                      style={{
                        minWidth: m1 ? "30%" : "50%",
                        minHeight: m1 ? "250px" : "150px",
                        marginLeft: index == 0 ? "1.5%" : "0px",
                        marginRight:
                          index === props.fCompanies.length - 1
                            ? "120px"
                            : "5px",
                        borderRadius: "10px",
                        marginBottom: "20px",
                      }}
                    >
                      <div
                        key={item.id}
                        style={{
                          width: "100%",
                        }}
                      >
                        <div style={{ width: "100%", height: "30px" }}></div>
                        <Paper
                          style={{
                            width: "94%",
                            display: "flex",
                            justifyContent: "center",
                            marginLeft: "3%",
                            backgroundImage: `url(${item.logo})`,
                            height: m1 ? "250px" : "170px",
                            backgroundSize: "100% auto",
                            backgroundPosition: "center",
                            zIndex: 3,
                            position: "relative",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            // boxShadow: `inset 0 0 0 50vw rgba(0,0,0,${0.5})`,
                            boxShadow: `inset 0 -60px 50px 0px rgba(0, 0, 0, 0.5)`,
                            borderRadius: "10px",
                            transition: "transform .3s",
                            backgroundRepeat: "no-repeat",
                          }}
                          onMouseOver={(e) => {
                            e.target.style.transform = "scale(1.03)";
                            e.target.style.cursor = "pointer";
                          }}
                          onMouseOut={(e) => {
                            e.target.style.transform = "scale(1)";
                          }}
                          onClick={() => {
                            // if (m1) return;
                            // window.open(item.url);
                            // alert("need the logic");
                          }}
                          elevation={5}
                        ></Paper>
                        <div
                          style={{
                            width: "100%",
                            zIndex: 4,
                            position: "relative",

                            marginTop:
                              item.name && item.name.length > 16
                                ? "-70px"
                                : "-70px",
                            height: "50px",
                            display: "flex",
                            justifyContent: "center",
                          }}
                          onClick={() => {
                            // window.open(item.url);
                            alert("need the logic");
                          }}
                        >
                          <h1
                            style={{
                              color: "white",
                              textAlign: "left",
                              fontWeight: 600,
                              fontSize: m1 ? "25px" : "17px",
                              textTransform: "capitalize",
                              width: "80%",
                              maxWidth: "80%",
                              marginTop: "17px",
                            }}
                          >
                            {item &&
                              item.name.substr(0, m1 ? 26 : 14) +
                                (item && item.name.length > (m1 ? 26 : 14)
                                  ? "..."
                                  : "")}
                          </h1>
                        </div>
                        <div
                          style={{
                            width: "100%",
                            zIndex: 4,
                            position: "relative",
                            marginTop: "-32px",
                            height: "50px",
                            display: "flex",
                            justifyContent: "center",
                          }}
                          onClick={() => {
                            // window.open(item.url);
                            alert("need the logic");
                          }}
                        >
                          <h6
                            style={{
                              color: "white",
                              textAlign: "left",
                              fontWeight: 100,
                              textTransform: "capitalize",
                              width: "80%",
                              maxWidth: "80%",
                            }}
                          >
                            Registered {props.times[index]} ago
                          </h6>
                        </div>
                        <br />
                      </div>
                    </motion.div>
                  );
                })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
