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
import SignIn from "./components/SignIn";
import bg from "./components/images/bg3.webp";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { supabase } from "./Supabase";
import React from "react";
import AdminUI from "./components/Admin";
import AdminAnnounceCompanyUI from "./components/coordinators/privileges_list/Company";
import AdminStudentUI from "./components/coordinators/privileges_list/Students";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = React.useState(null);

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
      style={{ backgroundImage: `url(${bg})`, backgroundAttachment: "fixed" }}
    >
      {location && location.pathname === "/signin" ? <NavBarUI2 /> : null}
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

      <Routes>
        <Route path="/" element={<HomeUI />} />
        <Route path="/signin" element={<SignInUI />} />
        <Route path="/admin" element={<AdminUI />} />
        <Route path="/admin/companies" element={<AdminAnnounceCompanyUI />} />
        <Route path="/admin/students" element={<AdminStudentUI />} />
      </Routes>
    </div>
  );
}

export default App;
