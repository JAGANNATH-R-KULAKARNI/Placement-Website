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
import Company3UI from "./Company3";
import useSWR from "swr";

export default function AnnounceACompany() {
  const m1 = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const location = useLocation();
  const finalData = useSWR("/api/endpoint", fetchTheCompanies);

  const [data, setData] = React.useState(null);
  const [registerModal, setRegisterModal] = React.useState(false);

  const [companies, setCompanies] = React.useState([]);
  const [fCompanies, setFCompanies] = React.useState([]);
  const [companiesHash, setCompaniesHash] = React.useState(null);
  const [sCResult, setSCResult] = React.useState(null);
  const [control, setControl] = React.useState(false);
  const [times, setTimes] = React.useState([]);

  async function fetchTheProfile() {
    const data = await supabase.auth.user();

    if (data) {
      setData(data);
      if (data.email != process.env.REACT_APP_ADMIN) navigate("/");
    }
  }

  async function filterCompanies1(str) {
    const temp = [];

    for (let i = 0; i < companies.length; i++) {
      if (str) {
        if (str === companies[i].name) temp.push(companies[i]);
      } else {
        temp.push(companies[i]);
      }
    }
    console.log("After filter");
    console.log(temp);
    setFCompanies(temp);
  }

  async function searchCompanyResults(str) {
    console.log("Seach company result");
    console.log(str);
    filterCompanies1(str);
  }

  async function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " year";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  async function fetchTheCompanies(argc) {
    const { data, error } = await supabase
      .from("companies")
      .select("*")
      .order("time_posted", {
        ascending: false,
      });

    if (data) {
      const temp = [];
      const times = [];
      let hash = {};
      for (let i = 0; i < data.length; i++) {
        if (data[i]["id"] !== 0) {
          temp.push(data[i]);
          hash[data[i].id] = data[i];
          times.push(await timeSince(new Date(parseInt(data[i].time_posted))));
        }
      }

      setCompaniesHash(hash);
      setFCompanies(temp);

      setTimes(times);
      setCompanies(temp);
    }
  }

  // async function updateTime() {
  //   if (!fCompanies) return;

  //   let times = [];

  //   for (let i = 0; i < fCompanies.length; i++) {
  //     if (fCompanies[i]["id"] !== 0) {
  //       times.push(
  //         await timeSince(new Date(parseInt(fCompanies[i].time_posted)))
  //       );
  //     }
  //   }

  //   setTimes(times);
  // }

  React.useEffect(() => {
    setInterval(() => {
      fetchTheProfile();
    }, 1000);
  });

  // React.useEffect(() => {
  //   setWidth(caro.current.scrollWidth - caro.current.offsetWidth);
  // }, []);

  return (
    <div style={{ width: "100%" }}>
      {fCompanies &&
      fCompanies.length > 0 &&
      times &&
      times.length > 0 &&
      companiesHash ? (
        <Company3UI
          fCompanies={fCompanies}
          times={times}
          companiesHash={companiesHash}
        />
      ) : null}
    </div>
  );
}
