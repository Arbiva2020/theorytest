import { useState, useEffect } from "react";

function Card(props) {
  const [radio, setRadio] = useState({correct:"", isTrue:undefined});
  const [listStyle, setListStyle] = useState({
    width: "30%",
    backgroundColor: "white",
    marginTop: "20px",
    marginRight: "10px",
  });
  const [rowStyle, setRowStyle] = useState([{backgroundColor:'inherit'}, {backgroundColor:'inherit'}, {backgroundColor:'inherit'}, {backgroundColor:'inherit'}]);
  //const[checked, setChecked] = useState(false);
useEffect(()=>{if(props.details.color){
  switch(props.details.color.correct){
    case '1': 
    setRowStyle([{backgroundColor:'green'}, {backgroundColor:'inherit'}, {backgroundColor:'inherit'}, {backgroundColor:'inherit'}])
  break;
  case '2':
    setRowStyle([{backgroundColor:'inherit'}, {backgroundColor:'green'}, {backgroundColor:'inherit'}, {backgroundColor:'inherit'}])
  break;
  case '3': 
    setRowStyle([{backgroundColor:'inherit'}, {backgroundColor:'inherit'}, {backgroundColor:'green'}, {backgroundColor:'inherit'}])
  break;
  case '4':
    setRowStyle([{backgroundColor:'inherit'}, {backgroundColor:'green'}, {backgroundColor:'inherit'}, {backgroundColor:'green'}])
  break;
  }
  if(props.details.color.isTrue == true){
    setListStyle(style={width: "30%",
    backgroundColor: "white",
    marginTop: "20px",
    marginRight: "10px"})
  }
  if(props.details.color.isTrue == false){
    listStyle.backgroundColor = 'red'
  }
  if(props.details.color.isTrue == undefined){
    listStyle.backgroundColor = 'pink'
}
}}, [props.detail.color]);
  //setRowStyle([props.detail.color.correct - 1].backgroundColor ='green');
rowStyle(rowStyle[props.color-1]) //color-1=> to get index
}
  function onChange(e) {
    if(e === undefined){
      radio.isTrue = undefined
    }

    if (e.target.value === undefined) {
      setRadio({ ...radio, isTrue: undefined });
    }
    if (e.target.value === "true") {
      setRadio({ ...radio, isTrue: true });
    }
    if (e.target.value === "false") console.log("3");
    setRadio({ ...radio, isTrue: false });
  
  
  for (let key in props.details) {
    if (key == 1 || key == 2 || key == 3 || key == 4) {
      if (props.details[key].right) {
        radio.correct = key
      }
    }
  }

  for (let key in props.details) {
    if (props.details[key].right === true) {
    }
  }

  let card = {
    question: "fhfhgfh",
    opt1: "gcghchgc",
    opt2: "hjhgjh",
    opt3: "gchgc",
    opt4: "hgchgcg",
    img: "https://cdn.dribbble.com/users/4707577/screenshots/9929751/corgi_2_4x.gif?compress=1&resize=400x300",
  };


  return (
    <div style={listStyle}>
      <div style={{ textAlign: "right", marginRight: "10px" }}>
        <label htmlFor="" style={{ fontWeight: "bold" }}>
          שאלה {props.details.num}:
        </label>
      </div>
      <p style={{ textAlign: "right", marginRight: "10px" }}>
        {props.details.title2}
      </p>
      <div>{}</div>
      <ul style={{ listStyleType: "none", textAlign: "right" }}>
        <li style={rowStyle[0]}>
          <input
            type="radio"
            name={props.details.num.toString()}
            value={props.details[1].right.toString()}
            onChange={(e) => onChange(e)}
          />
          {props.details[1].answer}
        </li>
        <br />
        <li style={rowStyle[1]}>
          <input
            type="radio"
            name={props.details.num.toString()}
            value={props.details[2].right.toString()}
            onChange={(e) => onChange(e)}
          />
          {props.details[2].answer}
        </li>
        <br />
        <li style={rowStyle[2]}>
          <input
            type="radio"
            name={props.details.num.toString()}
            value={props.details[3].right.toString()}
            onChange={(e) => onChange(e)}
          />
          {props.details[3].answer}
        </li>
        <br />
        <li style={rowStyle[3]}>
          <input
            type="radio"
            name={props.details.num.toString()}
            value={props.details[4].right.toString()}
            onChange={(e) => onChange(e)}
          />
          {props.details[4].answer}
        </li>
      </ul>
      {(props.details.img)? 
      <img src={props.details.img} /> : ""}
    </div>
  );
      }
export default Card;
