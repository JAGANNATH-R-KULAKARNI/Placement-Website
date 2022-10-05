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
import NotEligibleUI2 from "./utilities/Dialog2";
import DialogUI from "./utilities/Dialog2";

export default function Home() {
  const m1 = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = React.useState(null);
  const [company, setCompany] = React.useState(null);
  const [student, setStudent] = React.useState(null);
  const [messages, setMessages] = React.useState([]);
  const [status, setStatus] = React.useState(1);
  const [statusMsg, setStatusMsg] = React.useState([]);
  const [apply, setApply] = React.useState(null);
  const [control, setControl] = React.useState(false);

  async function timeSince(date) {
    var seconds = Math.floor((date - new Date()) / 1000);

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

  async function fetchTheProfile() {
    const data = await supabase.auth.user();

    if (data) {
      if (data.email == process.env.REACT_APP_ADMIN) {
        Cookies.set("refresh_twice", true);
        navigate("/admin");
      }

      const stuData = await supabase.from("students").select("*");

      // .eq("email", data.email);

      // console.log("Students data");
      if (stuData.data) {
        //    console.log(stuData.data);

        const comData = await supabase
          .from("companies")
          .select("*")
          .eq("id", stuData.data[0].company);

        if (comData.data) {
          let stucom = stuData.data[0];
          stucom["companies"] = comData.data[0];
          setStudent(stucom);
        }

        if (comData.error) {
          console.log(comData.error.message);
        }

        //   console.log(stuData.data);
      }
      if (stuData.error) {
        //   console.log(stuData.error.message);
      }
      setData(data);
      //  console.log(data);
    }
  }

  async function fetchApplications() {
    if (!student || !company) {
      return;
    }
    // console.log(student);
    // console.log(company);
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .eq("form_id", company.id)
      .eq("company_id", company.companies.id)
      .eq("student_id", student.id);

    if (data) {
      setApply({
        applied: data.length == 1 ? true : false,
        data: data,
      });

      return;
    }

    setApply({
      applied: false,
    });
  }

  async function fetchCompany() {
    if (!student) return;
    // console.log(student);

    const { data, error } = await supabase
      .from("forms")
      .select("*")
      .eq("route_id", location.pathname.substr(9));

    if (error) {
      // console.log(error.message);
      return;
    }
    if (data) {
      const companyData = await supabase
        .from("companies")
        .select("*")
        .eq("id", data[0].company_id);
      // console.log("Forms data");
      // console.log(data);
      // console.log(student);

      if (companyData.error) {
        // console.log(companyData.error);
        return;
      }

      let com = data[0];
      com["companies"] = companyData.data[0];
      // console.log(com);
      setCompany(com);
      const applyData = await supabase
        .from("applications")
        .select("*")
        .eq("form_id", com.id)
        .eq("company_id", com.companies.id)
        .eq("student_id", student.id);

      if (applyData.data) {
        setApply({
          applied: applyData.data.length == 1 ? true : false,
          data: applyData.data,
        });
      } else {
        setApply({
          applied: false,
        });
      }

      let messages = [];

      if (com.start_time > Date.now()) {
        setStatus(0);
        setStatusMsg([
          "Form is not yet open",
          `Form for company ${
            com.companies.name
          } will open after ${await timeSince(
            new Date(parseInt(com.start_time))
          )}`,
        ]);
        return;
      }

      if (com.end_time < Date.now()) {
        setStatus(0);
        setStatusMsg([
          "Form is closed",
          `Please consult placement coordinators for further queries`,
        ]);
        return;
      }

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
      console.log(student);
      console.log(com);

      if (hash[student.companies.type] >= hash[com.companies.type]) {
        messages.push(
          `You are already placed in ${student.companies.name}, which is a ${student.companies.type} company`
        );
      }

      if (
        student.max_year_education_gap > com.companies.max_year_education_gap
      ) {
        messages.push(
          `Maximum years of education gap allowed is ${com.companies.max_year_education_gap}`
        );
      }

      let eli_f_c = false;

      for (let i = 0; i < com.companies.eligible_colleges.length; i++) {
        if (student.college == com.companies.eligible_colleges[i]) {
          eli_f_c = true;
          break;
        }
      }

      if (!eli_f_c) {
        messages.push(
          `${student.college} college is not allowed for this company`
        );
      }

      let eli_f_y = false;

      for (let i = 0; i < com.companies.eligible_years.length; i++) {
        if (student.year == com.companies.eligible_years[i]) {
          eli_f_y = true;
          break;
        }
      }

      if (!eli_f_y) {
        let postfix = "st";

        if (student.year == 2 || student.year == 6) postfix = "nd";
        else if (student.year == 3) postfix = "rd";
        else if (student.year == 4) postfix = "th";

        messages.push(
          `${student.branch} - ${student.year}${postfix} year students are not allowed for this company`
        );
      }

      console.log(student);
      console.log(com.companies);
      setControl(messages.length > 0 ? false : true);
      setMessages(messages);
    }

    if (error) {
      // console.log(error.message);
    }
  }

  async function applyForThis() {
    const { data, error } = await supabase.from("applications").insert([
      {
        company_id: company.companies.id,
        student_id: student.id,
        form_id: company.id,
        time_applied: Date.now(),
      },
    ]);

    if (data) {
      //  console.log(data);
      alert(
        `Successfull applied for ${company.companies.name}. All the best :)`
      );
      navigate("/home");
    }

    if (error) {
      alert("Something went wrong");
      alert(error.message);
    }
  }

  React.useEffect(() => {
    setInterval(() => {
      fetchTheProfile();
    }, 1000);

    if (!company || !student) {
      fetchCompany();
      fetchApplications();
    }

    if (!apply) {
      fetchApplications();
    }
  });

  return (
    <div style={{ color: "black", marginTop: m1 ? "0px" : "20px" }}>
      {data && company ? (
        <div>
          {messages.length > 0 ? (
            <NotEligibleUI messages={messages} company={company} />
          ) : null}
          {status ? null : <NotEligibleUI2 messages={statusMsg} />}
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
            {apply && control ? (
              <Button
                variant="contained"
                style={{
                  backgroundColor: apply["applied"] ? "black" : "#017E7E",
                  color: "white",
                }}
                onClick={apply["applied"] ? null : applyForThis}
                disabled={apply["applied"]}
              >
                {apply["applied"]
                  ? `Already Applied`
                  : `Apply for ${company.companies.name}`}
              </Button>
            ) : null}
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
