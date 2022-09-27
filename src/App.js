import HomeUI from "./components/Home";
import NavBarUI from "./components/NavBar";
import NavBarUI2 from "./components/NavBar2";
import NavBarUI3 from "./components/NavBar3";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import SignInUI from "./components/SignIn";
import SignInUI2 from "./components/SignIn2";
import SignIn from "./components/SignIn";
import bg from "./components/images/bg3.webp";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { supabase } from "./Supabase";
import React from "react";
import AdminUI from "./components/Admin";
import AdminAnnounceCompanyUI from "./components/coordinators/privileges_list/Company";
import AdminStudentUI from "./components/coordinators/privileges_list/Students";
import AnnounceUI from "./components/coordinators/privileges_list/Announce";
import CompanyUI from "./components/students/privileges_list/Company";
import ProfileUI from "./components/students/privileges_list/Profile";
import FormUI from "./components/coordinators/privileges_list/Form";
import FooterUI from "./components/footer/Footer";
import useMediaQuery from "@mui/material/useMediaQuery";
import Cookies from "js-cookie";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import { AirlineSeatLegroomReduced } from "@mui/icons-material";
import ApplyUI from "./components/Apply";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = React.useState(null);
  const m1 = useMediaQuery("(min-width:600px)");
  const [loc, setLoc] = React.useState("");

  React.useEffect(() => {
    setInterval(() => {
      fetchTheProfile();
      checkUser();
    }, 1000);
  }, []);

  React.useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        LoginChangeHandler(event, session);

        if (event === "SIGNED_IN") {
        }
        if (event === "SIGNED_OUT") {
        }
      }
    );
    checkUser();
    fetchTheProfile();
    return () => {
      authListener.unsubscribe();
    };
  }, []);

  async function checkUser() {
    const user = await supabase.auth.user();
    if (!user) {
      navigate("/signin");
    }
  }

  async function LoginChangeHandler(event, session) {
    await fetch("/api/auth", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    })
      .then((u) => {
        checkUser();
      })
      .catch((u) => {
        checkUser();
      });
  }
  async function fetchTheProfile() {
    const data = await supabase.auth.user();

    if (data) {
      setData(data);
    }
  }

  async function logOut() {
    await supabase.auth.signOut();
    checkUser();
    navigate("/signin");
    window.location.reload();
  }

  return (
    <div
      // style={{ backgroundImage: `url(${bg})`, backgroundAttachment: "fixed" }}
      style={{ backgroundAttachment: "fixed", backgroundColor: "#F6F6F6" }}
    >
      {location &&
      (location.pathname === "/signin" || location.pathname === "/login") ? (
        <NavBarUI2 />
      ) : null}
      {location &&
      (location.pathname === "/" || location.pathname === "/admin") &&
      data ? (
        <NavBarUI logOut={logOut} data={data} />
      ) : null}
      {location &&
      location.pathname !== "/" &&
      location.pathname !== "/admin" &&
      data ? (
        <NavBarUI3 logOut={logOut} data={data} />
      ) : null}
      <div style={{ height: "120px" }}></div>
      <Routes>
        <Route path="/home" element={<HomeUI />} />
        <Route path="/signin" element={<SignInUI />} />
        {/* <Route path="/login" element={<SignInUI2 loc={loc} />} /> */}
        <Route path="/admin" element={<AdminUI />} />
        <Route path="/admin/companies" element={<AdminAnnounceCompanyUI />} />
        <Route path="/admin/students" element={<AdminStudentUI />} />
        <Route path="/admin/announce" element={<AnnounceUI />} />
        <Route path="/admin/forms" element={<FormUI />} />
        <Route path="/home/companies" element={<CompanyUI />} />
        <Route path="/home/profile" element={<ProfileUI />} />
        <Route path="/company/:id" element={<ApplyUI />} />
      </Routes>
      <div style={{ height: m1 ? "340px" : "170px" }}></div>
      <FooterUI />
    </div>
  );
}

export default App;
