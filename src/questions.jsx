import "./questions.css";
import Card from "./card";
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardCheck,
  faExchangeAlt,
  faArrowDown,
  faHome,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [round, setRound] = useState([]); 
  const [array, setArray] = useState([]);
  const [pushed, setPushed] = useState(false);       //round - one round of the game: 10 questions
  const [kaka, setKaka] = useState([]);

//each card is an object, that includes question number (in the array, hence we add 1), the 
//question number itself as it is in the api (in the api it is called "title2") and the image
  function toCard(item, index) {
    let obj = {
      num: index + 1,
      title2: item.title2,
      img: "",
      color: "",
    };

    //"descripton4" is the key which value is the ul of 4 options
    //if we want to extract the image (which is a **part** of the value, by taking just the
    //substring it is in)
    if (item.description4.includes("src")) {
      obj.img = item.description4.substring(
        item.description4.indexOf("https:"),
        item.description4.indexOf("jpg") + 3
      );
    }
    let temp2 = item.description4.split("<li>"); //the 4 options, splitted according to "li"
    
    if(pushed){
      console.log(kaka);
      console.log(index);
      obj.color = kaka[index]
    }
    // if(la){
    //   obj.color = ""
    // }
    for (let i = 1; i < 5; i++) {
      //index 0 is just css
      obj[i] = { answer: temp2[i].replace(/<[^>]+>/g, ""), right: false }
      if (temp2[i].includes("id")) {
        //only right answer has id
        obj[i].right = true;
      }
      if (i === 4) {
        obj[i].answer = obj[i].answer.substring(
          0,
          obj[i].answer.indexOf("|")
        ).substring(0, obj[i].answer.indexof('.')+1)
        
      }
      console.log(obj[i].answer);
    }
    

    return (
      <Card
        checkanswer={(a) => {
          array.push(a);
          setArray(array);
          console.log(array);
        }}
        details={obj}
      ></Card>
    ); //every obj is send as props to card
  }

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        "https://data.gov.il/api/3/action/datastore_search?resource_id=bf7cb748-f220-474b-a4d5-2d59f93db28d&limit=100"
      );
      setQuestions(data.result.records); //defined in the api
      let len = 100; //size of arr
      let ten = [];
      let rands = []; //arr of random nums
      let rand = Math.floor(Math.random() * len); //a random index of arr
      while (rands.includes(rand)) {
        rand = Math.floor(Math.random() * len);
      }
      for (let i = 0; i < 10; i++) {
        ten.push(data.result.records[Number(rand)]);
        rands.push(rand); //pushing random index from arr into new array
        rand = Math.floor(Math.random() * len);
      }
      setRound(ten);
    };
    getData();
  }, []);

function getRandom(){
  let len = 100;
  let ten = []
  let rands = []
  let rand = Math.floor(Math.random()*len)
  while(rands.includes(rand)){
    rand = Math.floor(Math.random()*len)
  }
  for(let i=0; i<10; i++){
    ten.push(questions[Number(rand)])
    rands.push(rand)
    rand = Math.floor(Math.random()*len)
  }
  setRound(ten);
  if(pushed){
    setPushed(false)
    setLa(true)
  }
};


  //scroll down to the bottom of window function
  function handleScroll() {
    window.scroll({
      top: document.body.offsetHeight,
      left: 0,
      behavior: "smooth",
    });
  }

  //scroll up to the top of window function
  function handleScrollUp() {
    window.scroll({ top: 0, behavior: "smooth" });
  }
  //the array, for some reason, contains two of each elements.
  //we want to cut it in half:
  
  function Check() {
    setPushed(true);
    let countRight = 0;
    let countWrong = 0;
    let notAnswered = 0;
    setArray(array.slice(array.length - 20));
    for (let i = 0; i < 20; i++) {
      if (i % 2 === 1) {
        kaka.push(array[i]);
      }
    }
   // console.log(kaka);
 
  for (let j = 0; j < 10; j++) {
    if (kaka[j].isTrue === true) {
      countRight ++;
    }
    if (kaka[j].isTrue === false) {
      countWrong ++;
    }
    if (kaka[j].isTrue === undefined) {
      notAnswered ++;
    }
    let pop = `המבחן כולל 10 שאלות \n
    ${countRight} שאלות נענו נכון \n
    ${countWrong} שאלות לא נענו נכון \n
    ${notAnswered} שאלות לא נענו`
    window.alert(pop);
    setKaka(kaka);  //when rerender, we need to have the results in the array
  }
  console.log(kaka);
}
  return (
    <div>
      <div>
        <button onClick={Check}>
          <FontAwesomeIcon
            icon={faClipboardCheck}
            style={{ marginLeft: "5px" }}
          />
          בדוק
        </button>
       <a href="http://localhost:3000/questions"> <button onClick={getRandom}>
          <FontAwesomeIcon icon={faExchangeAlt} style={{ marginLeft: "5px" }} />
          החלף שאלות
        </button></a>
        <button onClick={handleScroll}>
          <FontAwesomeIcon icon={faArrowDown} style={{ marginLeft: "5px" }} />
          למטה
        </button>
        <button>
          <FontAwesomeIcon icon={faHome} style={{ marginLeft: "5px" }} />
          דף הבית
        </button>
      </div>
      <div>{round.map(toCard)}</div>
      <button onClick={handleScrollUp}>
        <FontAwesomeIcon icon={faArrowUp} style={{ marginLeft: "5px" }} />
        למעלה
      </button>
    </div>
  );
}
export default Questions;
