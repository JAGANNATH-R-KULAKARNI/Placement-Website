import React from "react";
import NavBarUI from "./NavBar";
import nie from "./images/nie.jpg";
import nie2 from "./images/nie2.jpg";
import useMediaQuery from "@mui/material/useMediaQuery";
import StepperUI from "./utilities/Stepper";
import { supabase } from "../Supabase";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Cookies from "js-cookie";
import Button from "@mui/material/Button";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import { ConstructionOutlined } from "@mui/icons-material";
import NotEligibleUI from "./utilities/Dialog";

export default function Home() {
  const m1 = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = React.useState(null);
  const [company, setCompany] = React.useState(null);
  const [student, setStudent] = React.useState(null);
  const [messages, setMessages] = React.useState([]);

  async function fetchTheProfile() {
    const data = await supabase.auth.user();

    if (data) {
      if (data.email === process.env.REACT_APP_ADMIN) {
        Cookies.set("refresh_twice", true);
        navigate("/admin");
      }

      const stuData = await supabase
        .from("students")
        .select("*,companies(*)")
        .eq("email", data.email);

      // console.log("Students data");
      if (stuData.data) {
        // console.log(stuData.data);
        setStudent(stuData.data[0]);
      }

      setData(data);
    }
  }

  async function fetchCompany() {
    if (!student) return;
    // console.log(student);
    const { data, error } = await supabase
      .from("forms")
      .select("*,companies(*)")
      .eq("route_id", location.pathname.substr(9));

    if (data) {
      // console.log("Forms data");
      // console.log(data);
      setCompany(data[0]);
      // console.log(location.pathname.substr(9));
      let com = data[0];
      let messages = [];

      if (
        !com.companies.active_backlogs_allowed &&
        student.current_backlogs > 0
      ) {
        messages.push(
          `You should not have any active backlogs. But you have ${student.current_backlogs} active backlogs`
        );
      }

      if (
        !com.companies.history_backlogs_allowed &&
        student.cleared_backlogs > 0
      ) {
        messages.push(
          `You should not have any history of backlog. But you have  ${student.cleared_backlogs}  history of backlog`
        );
      }

      let fg = true;

      for (let i = 0; i < com.companies["eligible_branches"].length; i++) {
        if (com.companies["eligible_branches"][i] == student.branch) {
          fg = false;
          break;
        }
      }

      if (fg) {
        messages.push(
          `${student.branch} students are not eligible for this company`
        );
      }

      if (com.companies.gender != 0 && student.gender != com.companies.gender) {
        messages.push(
          student.gender == 2
            ? "Only Female candidates are allowed"
            : "Only male candidates are allowed"
        );
      }

      if (student.cgpa < com.companies.min_cgpa) {
        messages.push(`Minimum CGPA required is ${com.companies.min_cgpa}`);
      }

      if (student.tenth_percentage < com.companies.min_in_ten) {
        messages.push(
          `Minimum of ${com.companies.min_in_ten}% is required in 10th standard`
        );
      }

      if (student.twelth_percentage < com.companies.min_in_twelve) {
        messages.push(
          `Minimum of ${com.companies.min_in_twelve}% is required in 12th standard`
        );
      }

      let hash = {
        Mass: 0,
        Core: 1,
        Dream: 2,
        "Open Dream": 3,
      };

      if (hash[student.companies.type] >= hash[com.companies.type]) {
        messages.push(
          `You are already placed in ${student.companies.name}, which is a ${student.companies.type} company`
        );
      }

      setMessages(messages);
    }

    if (error) {
      // console.log(error.message);
    }
  }

  React.useEffect(() => {
    setInterval(() => {
      fetchTheProfile();
      fetchCompany();
    }, 1000);
  });

  return (
    <div style={{ color: "black", marginTop: m1 ? "0px" : "0px" }}>
      {data && company ? (
        <div>
          {messages.length > 0 ? (
            <NotEligibleUI messages={messages} company={company} />
          ) : null}
          {m1 ? (
            <h1 style={{ textAlign: "center" }}>
              {" "}
              {company.companies.name} Campus Placements
            </h1>
          ) : (
            <h2
              style={{
                color: "black",
                textAlign: "center",
                paddingLeft: "10%",
                paddingRight: "10%",
                marginTop: "-10px",
              }}
            >
              {" "}
              {company.companies.name} Campus Placements
            </h2>
          )}
          <br />
          <p style={{ textAlign: "center" }}>--- Company Details ---</p>
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#017E7E",
              }}
            >
              Apply for {company.companies.name}
            </Button>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            paddingLeft: m1 ? "25%" : "10%",
          }}
        >
          <div style={{ width: "100%" }}>
            <Skeleton
              variant="text"
              sx={{ fontSize: "1rem", backgroundColor: "white" }}
              width={m1 ? "50%" : "80%"}
              height={100}
            />

            <Skeleton
              variant="rectangular"
              width={m1 ? "50%" : "80%"}
              style={{ backgroundColor: "white" }}
              height={200}
            />
            <br />
            <Skeleton
              variant="rounded"
              width={m1 ? "50%" : "80%"}
              style={{ backgroundColor: "white" }}
              height={300}
            />
          </div>
        </div>
      )}
    </div>
  );
}
