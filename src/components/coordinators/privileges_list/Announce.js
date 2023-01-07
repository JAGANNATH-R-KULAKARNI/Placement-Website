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
import { AltRoute, ContactSupportOutlined } from "@mui/icons-material";
import axios from "axios";
import SearcUI from "./utilities3/Search";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import PropTypes from "prop-types";
import { useAutocomplete } from "@mui/base/AutocompleteUnstyled";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { autocompleteClasses } from "@mui/material/Autocomplete";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SpinnerUI from "./utilities/Spinner";
import Button from "@mui/material/Button";
import BackDropUI from "./utilities3/Backdrop";

const Root = styled("div")(
  ({ theme }) => `
  color: ${
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,.85)"
  };
  font-size: 14px;
`
);

const Label = styled("label")`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;

const InputWrapper = styled("div")(
  ({ theme }) => `
  width: 300px;
  border: 1px solid ${theme.palette.mode === "dark" ? "#434343" : "#d9d9d9"};
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
  }

  &.focused {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
    color: ${
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.65)"
        : "rgba(0,0,0,.85)"
    };
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`
);

function Tag(props) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const StyledTag = styled(Tag)(
  ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: ${
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "#fafafa"
  };
  border: 1px solid ${theme.palette.mode === "dark" ? "#303030" : "#e8e8e8"};
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`
);

const Listbox = styled("ul")(
  ({ theme }) => `
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === "dark" ? "#2b2b2b" : "#fafafa"};
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`
);

export default function AnnounceACompany() {
  const m1 = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const location = useLocation();

  const diffBranches = [
    "CSE",
    "ISE",
    "ECE",
    "EEE",
    "ME",
    "CIVIL",
    "IP",
    "MCA",
    "MTECH",
  ];

  const diffYear = [
    { year: 1, text: "First Year" },
    { year: 2, text: "Second Year" },
    { year: 3, text: "Third Year" },
    { year: 4, text: "Fourth Year" },
    { year: 5, text: "Mtech First Year" },
    { year: 6, text: "Mtech Second Year" },
  ];

  const [data, setData] = React.useState(null);

  const [subject, setSubject] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [companies, setCompanies] = React.useState([]);
  const [students, setStudents] = React.useState([]);
  const [compEmail, setCompEmail] = React.useState([]);
  const [stuEmail, setStuEmail] = React.useState([]);
  const [selectCompany, setSelectCompany] = React.useState(false);
  const [selectStudent, setSelectStudent] = React.useState(true);
  const [wholeCollege, setWholeCollege] = React.useState(false);
  const [particularBranch, setParticularBranch] = React.useState(false);

  const [urls, setUrls] = React.useState([]);
  const [fileNames, setFileNames] = React.useState([]);
  const [uploading, setUploading] = React.useState(false);
  const [sending, setSending] = React.useState(false);

  const handleUpload = async (e) => {
    console.log("files upload bro");
    if (!e.target.files) {
      return;
    }
    console.log(e.target.files);

    const temp = [...urls];
    const fnames = [...fileNames];

    setUploading(true);
    let count = e.target.files.length;

    for (let i = 0; i < e.target.files.length; i++) {
      let file = e.target.files[i];

      const { data, error } = await supabase.storage
        .from("companies")
        .upload("announce/" + Date.now() + file.name, file);

      if (data) {
        console.log("Successfully uploded");
        console.log(
          "URL is : " +
            process.env.REACT_APP_PUBLIC_SUPABASE_URL +
            "/storage/v1/object/public/" +
            data["Key"]
        );
        temp.push(
          process.env.REACT_APP_PUBLIC_SUPABASE_URL +
            "/storage/v1/object/public/" +
            data["Key"]
        );
        fnames.push(file.name);
        setUrls(temp);
        setFileNames(fnames);
        console.log(data);
        count--;
      }

      if (error) {
        alert("Something went wrong :( try again");
        console.log("Unsuccessful");
        console.log(error.message);
      }
    }
    setUploading(false);
  };

  const SearchBar1 = useAutocomplete({
    id: "customized-hook-demo",
    multiple: true,
    options: companies,
    getOptionLabel: (option) => {
      return option.name;
    },
  });

  const SearchBar2 = useAutocomplete({
    id: "customized-hook-demo",
    multiple: true,
    options: students,
    getOptionLabel: (option) => {
      return option.name;
    },
  });

  const branches = useAutocomplete({
    id: "customized-hook-demo",
    multiple: true,
    options: diffBranches,
    getOptionLabel: (option) => {
      return option;
    },
  });

  const engineeYear = useAutocomplete({
    id: "customized-hook-demo",
    multiple: true,
    options: diffYear,
    getOptionLabel: (option) => {
      return option.text;
    },
  });

  async function fetchTheProfile() {
    const data = await supabase.auth.user();

    if (data) {
      setData(data);
      if (data.email != process.env.REACT_APP_ADMIN) navigate("/");
    }
  }

  async function fetchTheCompanies() {
    const { data, error } = await supabase
      .from("companies")
      .select("*")
      .order("name", {
        ascending: true,
      });

    if (data) {
      const temp = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i]["id"] !== 0) temp.push(data[i]);
      }
      setCompanies(temp);
    }
  }

  async function fetchTheStudents() {
    const { data, error } = await supabase
      .from("students")
      .select("*,companies(*)")
      .order("name", {
        ascending: true,
      });

    if (data) {
      console.log("Students Data");
      console.log(data);
      setStudents(data);
    }
  }

  React.useEffect(() => {
    if (companies.length == 0) {
      fetchTheCompanies();
    }

    if (students.length == 0) {
      fetchTheStudents();
    }

    setInterval(() => {
      fetchTheProfile();
    }, 1000);
  });

  const submitHandler = async (uploadData) => {
    // const uploadData = {
    //   subject: subject,
    //   text: description,
    //   attachments: attachments,
    //   to: to,
    // };
    if (!process.env.REACT_APP_API_ENDPOINT) {
      return;
    }
    setSending(true);

    const { data, error } = await supabase.from("emails").insert([
      {
        subject: uploadData.subject,
        description: uploadData.text,
        to: uploadData.to,
        attachments: uploadData.attachments,
        time_posted: Date.now(),
      },
    ]);

    if (data) {
      console.log("Data uploaded to supabase");
    }

    if (error) {
      console.log("Something went wrong");

      console.log(error.message);
    }

    await axios
      .post(process.env.REACT_APP_API_ENDPOINT, {
        htm: ` <div>
        <i>${uploadData.text}</i>
        <br />
        <h3 style="text-align:right;marin-top:10px;"><b>- Placements NIE</b></h3>
      </div>`,
        text: uploadData.text,
        subject: uploadData.subject,
        to: uploadData.to,
        attachments: uploadData.attachments,
      })
      .then((u) => {
        console.log(u);
        setSending(false);
        if (u["data"].success) alert("Email sent successfully");
        else alert("Something went wrong :( try again later");
      })
      .catch((err) => {
        console.log(err);
        setSending(false);
        alert("Something went wrong :( try again later");
      });
  };

  const handleFilter = async () => {
    console.log("Handle Filter");
    console.log(students);
    const to = [];

    if (subject.length == 0 || description.length == 0) {
      alert("Fill all the fields");
      return;
    }

    if (selectCompany) {
      let hash = {};

      if (SearchBar1.value.length == 0) {
        alert("Add atleast one company");
        return;
      }

      for (let i = 0; i < SearchBar1.value.length; i++) {
        hash[SearchBar1.value[i].name] = true;
      }

      for (let j = 0; j < students.length; j++) {
        if (hash[students[j].companies.name]) {
          to.push(students[j].email);
        }
      }
    } else if (selectStudent) {
      if (SearchBar2.value.length == 0) {
        alert("Add atleast one Student");
        return;
      }

      for (let i = 0; i < SearchBar2.value.length; i++) {
        to.push(SearchBar2.value[i].email);
      }
    } else if (wholeCollege) {
      for (let i = 0; i < students.length; i++) {
        to.push(students[i].email);
      }
    } else if (particularBranch) {
      console.log(branches.value);
      console.log(engineeYear.value);

      if (branches.value.length == 0) {
        alert("Select atleast one branch");
        return;
      }

      if (engineeYear.value.length == 0) {
        alert("Select atleast one engineering year");
        return;
      }

      for (let i = 0; i < students.length; i++) {
        let flg = 0;

        for (let j = 0; j < branches.value.length; j++) {
          if (students[i].branch == branches.value[j]) {
            flg = 1;
            break;
          }
        }

        if (flg != 1) continue;

        for (let k = 0; k < engineeYear.value.length; k++) {
          if (students[i].year == engineeYear.value[k].year) {
            flg = 2;
            break;
          }
        }

        if (flg != 2) continue;

        to.push(students[i].email);
      }
    }

    const attachments = [];

    for (let k = 0; k < fileNames.length && k < urls.length; k++) {
      attachments.push({
        fileName: fileNames[k],
        href: urls[k],
      });
    }

    const uploadData = {
      subject: subject,
      text: description,
      attachments: attachments,
      to: to,
    };

    console.log("Upload Data");
    console.log(uploadData);
    await submitHandler(uploadData);
  };

  return (
    <div>
      {data ? (
        <div>
          {sending ? <BackDropUI /> : false}
          {/* //<CssBaseline /> */}
          <div style={{ height: m1 ? "70px" : "40px" }}></div>
           <main> 
            
            <Paper
              style={{
                marginTop: "30px",
                borderRadius: "40px",
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <div
                style={{
                  width: "100%",
                  marginTop: "25px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAABZCAMAAAAzQUv+AAAA6lBMVEX////qQzVChfQ0qFPFIh/7vAQ0f/T5+/8ipEj5/Pn8wAP/vQDqQTPBAAD7uAD7ugDqPCzpNiX98fDoKBDpMBzGIRv75OP50M7taWDLFwAlp1XvgXr1trPEFhLznZjoHgDsXVLIHQ2xPmHtZFr3w8B7rkbylY+RW57629nveHHrSz/rUUbwiIFsnPbourrXgYHMSUfINDHSa2rgoqH+9uX93aH8zGX8xED80X395bjbi4vSY2H81oz+7c3dlZXNWFf8xlNqdNDduSGxtDa4Nk/BKjOrQGhnuXqowPeh0awid/MGoDuDqfd4v4hnbz7oAAADpklEQVRoge3aaXeaQBQG4AtComFQUFCToCaNTc3SJG2zL23tlq39/3+nA2443DugDCdfvB8F5jnz5j2jMQEYz8npmW98+vylCUXM+cWlaZpX1zeV+ddvbbvjG4bRse079fL5ZbVmhlOrVu9jcsuwjel07K+K2YuxGk3VfJi8fmL7Rnzsu7pClW/WnJvqzehCyzaE6fgtZeyDWTOFqUY7rvu+6Bq+sqzvq6IaTvgzvk1sN8r6m4qsz7+jbPWaX0NZnrWRP2sk4zFc4aXCXZ51NyfbJdSoWqcdwjUMr50n63rb26Dc2jWcJVs1Gc1xls+65Tga6ZpXQKrc1Vhj2ay7DaZJXFPuatpyWfOMw4dzuEtlHWac19WYt2jWXY9p+V1NcxfKut52Jw/mdBfKepKxCldjvaxZd3tMU+fyXu9lybq+58UfUuBqDkvPusUcTbXLe72fwu57TFPv8l7vyLKu77jiAzJ3U3I+i+N4dNYtz0ncT7sWDI3dzC4/r6ms9xsseTvlWuZ70PV3m5ldqtdCj1Nc60dpi7v6ByJrbCl+hvQTbN9JZky71s+tUil09WEHffNH10J6neixzOUZc3bk6vovLGt8MbHXSI8lbphxaeaiWVPL8V7Psu4jPSZdK8o47urD34lek+vFeo32mHLHGc+5SK/pBXmvo6zrO2iPCXeSseAmspYtGfWa6jHuTjMWXX3o72Z2Nea2XUnGohvLOOEKWcsX5XLaDRt4xog7l3XasqmzgWeMuXrsvFbmChmjrq7/2VTsihkT7jRrRW4iY8rl5/WuMteyEhmT7rjXKlwsY4kbZZ3ftdCMZW54XivYL5qx1OW9buRkXSLjFFcPeqknkmRYLyhTqtRdgyaTn/uycVgTlnTXAQ6ojzBpm/UOACrLuxCkvefgrBtAPhcGh+THJ3LcwwHkdXnWi/a6cTB6MKcLi/Wa9xjUuNBcIGv3cPq9eW4XYDtjr5m3PXtIgQtBJph5Aah1oXmUnrV7NADVLs86rdeN7fkHFLkQyH434L9DBFCMK+11rMfKXYBjol7MO07erNDl5zX2FuW4YsaqXbTX7hH6NzalLtJrsccFuUKvkz0uyp3Lmsi4EHfWa7THBbrQj2DmJb9UKtaNzhDkrCjc5b3uET0u2IVByvWi3LRZuSt35a7clbtyM7sf38R9hKe1N3DLz7D+8gbuawXoDRfn8u3y+UvAhbnlf6PrTy+oXJBbfn2e3LD+hLW6GPfxOfpHxv8oOH4dVWny8gAAAABJRU5ErkJggg=="
                    alt="Gmail"
                    style={{ width: "70px", height: "auto" }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "30px",
                    width: "100%",
                  }}
                >
                  <div style={{ width: "85%" }}>
                    <TextField
                      id="standard-basic"
                      label="Subject"
                      variant="standard"
                      style={{ width: "100%" }}
                      placeholder="Goldman Sachs shortlists"
                      value={subject}
                      onChange={(e) => {
                        setSubject(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "30px",
                    width: "100%",
                  }}
                >
                  <div style={{ width: "85%" }}>
                    <TextField
                      id="standard-multiline-static"
                      label="Description"
                      multiline
                      rows={4}
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                      variant="standard"
                      placeholder="All of the GS selects, assemble near placement office"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    marginTop: "20px",
                    marginBottom: "-15px",
                  }}
                >
                  <FormGroup style={{ width: "85%" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked
                          style={{ color: "#541554" }}
                          checked={wholeCollege}
                          onChange={(e) => {
                            setWholeCollege(e.target.checked);

                            if (e.target.checked) {
                              setSelectCompany(false);
                              setSelectStudent(false);
                              setParticularBranch(false);
                            } else {
                              setSelectStudent(true);
                            }
                          }}
                        />
                      }
                      label="Send to the whole college"
                    />
                  </FormGroup>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    marginTop: "20px",
                    marginBottom: particularBranch ? "0px" : "-15px",
                  }}
                >
                  <FormGroup style={{ width: "85%" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked
                          style={{ color: "#541554" }}
                          checked={particularBranch}
                          onChange={(e) => {
                            setParticularBranch(e.target.checked);

                            if (e.target.checked) {
                              setSelectCompany(false);
                              setSelectStudent(false);
                              setWholeCollege(false);
                            } else {
                              setSelectStudent(true);
                            }
                          }}
                        />
                      }
                      label="Send only to particular branch"
                    />
                  </FormGroup>
                </div>
                {particularBranch ? (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "85%",
                      }}
                    >
                      <Root>
                        <div {...branches.getRootProps()}>
                          <Label {...branches.getInputLabelProps()}>
                            Select Branches
                          </Label>
                          <InputWrapper
                            ref={branches.setAnchorEl}
                            className={branches.focused ? "focused" : ""}
                          >
                            {branches.value.map((option, index) => (
                              <StyledTag
                                label={option}
                                {...branches.getTagProps({ index })}
                              />
                            ))}

                            <input {...branches.getInputProps()} />
                          </InputWrapper>
                        </div>
                        {branches.groupedOptions.length > 0 ? (
                          <Listbox {...branches.getListboxProps()}>
                            {branches.groupedOptions.map((option, index) => (
                              <li
                                {...branches.getOptionProps({
                                  option,
                                  index,
                                })}
                              >
                                <span>{option}</span>
                                <CheckIcon fontSize="small" />
                              </li>
                            ))}
                          </Listbox>
                        ) : null}
                      </Root>
                    </div>
                  </div>
                ) : null}
                {particularBranch ? (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <div
                      style={{
                        width: "85%",
                      }}
                    >
                      <Root>
                        <div {...engineeYear.getRootProps()}>
                          <Label {...engineeYear.getInputLabelProps()}>
                            Select Engineering Year
                          </Label>
                          <InputWrapper
                            ref={engineeYear.setAnchorEl}
                            className={engineeYear.focused ? "focused" : ""}
                          >
                            {engineeYear.value.map((option, index) => (
                              <StyledTag
                                label={option.text}
                                {...engineeYear.getTagProps({ index })}
                              />
                            ))}

                            <input {...engineeYear.getInputProps()} />
                          </InputWrapper>
                        </div>
                        {engineeYear.groupedOptions.length > 0 ? (
                          <Listbox {...engineeYear.getListboxProps()}>
                            {engineeYear.groupedOptions.map((option, index) => (
                              <li
                                {...engineeYear.getOptionProps({
                                  option,
                                  index,
                                })}
                              >
                                <span>{option.text}</span>
                                <CheckIcon fontSize="small" />
                              </li>
                            ))}
                          </Listbox>
                        ) : null}
                      </Root>
                    </div>
                  </div>
                ) : null}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    marginTop: "20px",
                  }}
                >
                  <FormGroup style={{ width: "85%" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked
                          style={{ color: "#541554" }}
                          checked={selectCompany}
                          onChange={(e) => {
                            setSelectCompany(e.target.checked);

                            if (e.target.checked) {
                              setSelectStudent(false);
                              setWholeCollege(false);
                              setParticularBranch(false);
                            } else {
                              setSelectStudent(true);
                            }
                          }}
                        />
                      }
                      label="Send only to company selects"
                    />
                  </FormGroup>
                </div>
                {selectCompany ? (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <div
                      style={{
                        width: "85%",
                      }}
                    >
                      <Root>
                        <div {...SearchBar1.getRootProps()}>
                          <Label {...SearchBar1.getInputLabelProps()}>
                            Select Companies
                          </Label>
                          <InputWrapper
                            ref={SearchBar1.setAnchorEl}
                            className={SearchBar1.focused ? "focused" : ""}
                          >
                            {SearchBar1.value.map((option, index) => (
                              <StyledTag
                                label={option.name}
                                {...SearchBar1.getTagProps({ index })}
                              />
                            ))}

                            <input {...SearchBar1.getInputProps()} />
                          </InputWrapper>
                        </div>
                        {SearchBar1.groupedOptions.length > 0 ? (
                          <Listbox {...SearchBar1.getListboxProps()}>
                            {SearchBar1.groupedOptions.map((option, index) => (
                              <li
                                {...SearchBar1.getOptionProps({
                                  option,
                                  index,
                                })}
                              >
                                <span>{option.name}</span>
                                <CheckIcon fontSize="small" />
                              </li>
                            ))}
                          </Listbox>
                        ) : null}
                      </Root>
                    </div>
                  </div>
                ) : null}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    marginTop: "5px",
                  }}
                >
                  <FormGroup style={{ width: "85%" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked
                          style={{ color: "#541554" }}
                          checked={selectStudent}
                          onChange={(e) => {
                            setSelectStudent(e.target.checked);

                            if (e.target.checked) {
                              setWholeCollege(false);
                              setParticularBranch(false);
                              setSelectCompany(false);
                            } else {
                              setWholeCollege(true);
                            }
                          }}
                        />
                      }
                      label="Send only to particular students"
                    />
                  </FormGroup>
                </div>
                {selectStudent ? (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <div
                      style={{
                        width: "85%",
                      }}
                    >
                      <Root>
                        <div {...SearchBar2.getRootProps()}>
                          <Label {...SearchBar2.getInputLabelProps()}>
                            Select Students
                          </Label>
                          <InputWrapper
                            ref={SearchBar2.setAnchorEl}
                            className={SearchBar2.focused ? "focused" : ""}
                          >
                            {SearchBar2.value.map((option, index) => (
                              <StyledTag
                                label={option.name}
                                {...SearchBar2.getTagProps({ index })}
                              />
                            ))}

                            <input {...SearchBar2.getInputProps()} />
                          </InputWrapper>
                        </div>
                        {SearchBar2.groupedOptions.length > 0 ? (
                          <Listbox {...SearchBar2.getListboxProps()}>
                            {SearchBar2.groupedOptions.map((option, index) => (
                              <li
                                {...SearchBar2.getOptionProps({
                                  option,
                                  index,
                                })}
                              >
                                <span>{option.name}</span>
                                <CheckIcon fontSize="small" />
                              </li>
                            ))}
                          </Listbox>
                        ) : null}
                      </Root>
                    </div>
                  </div>
                ) : null}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "30px",
                  }}
                >
                  <Button
                    variant="contained"
                    component="label"
                    style={{ backgroundColor: "#541554", width: "85%" }}
                    // onClick={handleOpenPicker}
                    startIcon={<AttachFileIcon />}
                  >
                    {uploading ? "Uploading...Wait" : "Attach Files (optional)"}

                    {uploading ? null : (
                      <input
                        hidden
                        multiple
                        type="file"
                        onChange={(e) => {
                          console.log(e);
                          handleUpload(e);
                        }}
                      />
                    )}
                  </Button>
                </div>
                <br />
                {uploading ? (
                  <div
                    style={{
                      width: "90%",
                      display: "flex",
                      justifyContent: "center",
                      paddingLeft: "7.5%",
                    }}
                  >
                    <SpinnerUI />
                  </div>
                ) : null}
                <br />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "30px",
                    marginTop: "-15px",
                  }}
                >
                  <div style={{ width: "85%" }}>
                    {urls &&
                      urls.map((item) => {
                        return (
                          <iframe
                            src={item}
                            style={{
                              width: m1 ? "10%" : "50%",
                              height: "100px",
                              overflow: "hidden",
                            }}
                            scrolling="no"
                            key={item}
                          ></iframe>
                        );
                      })}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "0px",
                      width: "88%",
                    }}
                  >
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "black",
                        width: "100%",
                        height: "50px",
                        borderRadius: "16px",
                      }}
                      onClick={handleFilter}
                      // onClick={submitHandler}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
                <div style={{ height: "50px" }}></div>
              </div>
            </Paper>
            <div style={{ height: "70px" }}></div>
           </main> 
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
