import React from "react";

export default function Highlighter(props) {
  async function textHandler() {
    // let txt =
    //   '<div id="myDiv"><h1 style="color:red;">This is text vjolaolaol</h1></div>';

    let text = props.text;
    let pattern = props.pattern;
    let position = text.search(pattern);
    document.getElementById("myText").innerHTML = text;
    console.log("-----------------");
    console.log(text);
    console.log(pattern);
    console.log("-----------------");
    if (position == -1) {
      //   document.getElementById("myText").innerHTML = text;
      return;
    } else {
      // document.getElementById("myText").innerHTML = `${text.substr(
      //   0,
      //   position
      // )}<span style="font-weight:900">${text.substr(
      //   position,
      //   pattern.length
      // )}</span>${text.substr(position + pattern.length)}`;
    }
  }

  React.useEffect(() => {
    textHandler();
  });
  return (
    <div>
      <div id="myText"></div>
      <br />
    </div>
  );
}
