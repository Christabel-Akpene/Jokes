import { useEffect, useState } from "react";
import "./index.css";
import { IoFilter } from "react-icons/io5";
// import { Skeleton } from "@mui/material";
import Card from "./Card";
// import { identity } from "mathjs";

const url = `https://official-joke-api.appspot.com/jokes/ten`;


// fetch data from the api.
const Display = () => {
  
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(url);
        if (!result.ok) {
          throw new Error("Could not fetch data");
        }
        const response = await result.json();

        const data = response.map((joke) => {
          return {...joke, jokeStatus: "", funnyBtnDisabled: false, humorlessBtnDisabled: false}
        })

        setJokes(data)
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();

  }, []);


  function handleFunnyClick(id){

    const updatedJokes = jokes.map((joke) => {
      if (joke.id === id){
        return {...joke, jokeStatus: joke.jokeStatus === "" ? "funny" : "", humorlessBtnDisabled: !joke.humorlessBtnDisabled}
      }
      return joke
    });
    setJokes(updatedJokes);

  }

  function handleHumorlessClick(id){

    const updatedJokes = jokes.map((joke) => {
      if (joke.id === id){
        return {...joke, jokeStatus: joke.jokeStatus === "" ? "humorless" : "", funnyBtnDisabled: !joke.funnyBtnDisabled}
      }
      return joke
    });

    setJokes(updatedJokes);
  }


  return (
    <>
      <div className="header">
        <h1>Laugh out Loud</h1>
        <div className="displayIcon">
          <IoFilter className="filter" />
          {/* {handleClick && (
            <div className="displayDropdown">
              <Dropdown
                label={"Select filter"}
                options={options}
                value={value}
                onChange={handleChange}
              />
            </div>
          )} */}
        </div>
      </div>

      <div className="display-container">

        {/* {isLoading && (
          <>
            <Skeleton variant="rounded" width={300} height={100} />

            <Skeleton variant="rectangular" width={300} height={100} />
          </>
        )} */}


        {jokes &&
          jokes.map(({ id, setup, punchline, funnyBtnDisabled, humorlessBtnDisabled }) => {
            return (
              <Card
                key={id}
                setup={setup}
                punchline={punchline}
                handleFunnyClick={()=>handleFunnyClick(id)}
                handleHumorlessClick={()=> handleHumorlessClick(id)}
                funnyBtnDisabled={funnyBtnDisabled}
                humorlessBtnDisabled={humorlessBtnDisabled}
              />
            );
          })}
      </div>
    </>
  );
};

 
// const Dropdown = ({ label, value, options, onChange }) => {
//   return (
//     <div className="label-container">
//       <label>
//         <p>{label}</p>

//         <select name="" value={value} onChange={onChange}>
//           {options.map((option) => (
//             <option value={option.value} key={option.value}>
//               {" "}
//               {option.label}
//             </option>
//           ))}
//         </select>
//       </label>
//     </div>
//   );
// };
export default Display;
