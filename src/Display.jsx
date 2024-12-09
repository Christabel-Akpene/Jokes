import React, { useEffect, useState } from "react";
import "./index.css";
import { IoFilter } from "react-icons/io5";
import { Skeleton } from "@mui/material";
import Card from "./Card";
import { identity } from "mathjs";

const Display = () => {
  const url = `https://official-joke-api.appspot.com/jokes/ten`;
  const [jokes, setJokes] = useState([]);
  const [error, setError] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState("all");
  const [handleClick, setHandleClick] = useState(false);
  const [addStatus, setAddStatus] = useState(false);
  const [filtered, setFiltered] = useState([]);

  const options = [
    { label: "Funny", value: "funny" },
    { label: "Humorless", value: "humorless" },
    { label: "All", value: "all" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(url);
        if (!result.ok) {
          throw new Error("Could not fetch data");
        }
        const response = await result.json();

        const data = response.map((joke) => ({
          ...joke,
          status: "",
          funnyBtn: false,
          humorlessBtn: false,
        }));
        setJokes(data);
        setFiltered(data);
        setIsLoading(false);
        setError(null);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterClick = () => {
    setHandleClick(!handleClick);
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    // console.log(newValue);
    handleFilter(newValue);
  };

  const handleFilter = (category) => {
    if (category === "all") {
      setFiltered(jokes);
      return;
    }
    const newJokes = jokes.filter((joke) => {
      return joke.status === category;
    });
    // console.log(newJokes);
    setFiltered(newJokes);
  };


  const onFunnyClick = (id) => {
    const newStatus = !addStatus;
    setAddStatus(newStatus);

    // console.log("new status", newStatus)

    const modifiedJokes = jokes.map((joke) => {

      if (newStatus) {

        // console.log("New status found")

      // console.log(typeof joke.id,typeof id)

        if (joke.id === id) {
          return {
            ...joke,
            status: "funny",
            funnyBtn: false,
            humorlessBtn: true,
          };

        }

        console.log(`${joke.id}, and`)
        

      }
      else{
        // console.log("No new status found")
      }
  

      if (joke.id && joke.status === "funny") {
        return { ...joke, status: "", funnyBtn: false, humorlessBtn: false };
      }

      return joke;
    });

    setFiltered(modifiedJokes);
    handleFilter(value);
  };

  const onHumorlessClick = (id) => {
    const newStatus = !addStatus;
    setAddStatus(newStatus);

    const modifiedJokes = jokes.map((joke) => {
      if (newStatus) {
        if (joke.id === id) {
          return {
            ...joke,
            status: "humorless",
            funnyBtn: true,
            humorlessBtn: false,
          };
        }
      } else {
        if (joke.id && joke.status === "humorless") {
          return {
            ...joke,
            status: "",
            funnyBtn: false,
            humorlessBtn: false,
          };
        }
      }
      return joke;
    });

    setFiltered(modifiedJokes);
    handleFilter(value);
  };

  return (
    <>
      <div className="header">
        <h1>Laugh out Loud</h1>
        <div className="displayIcon">
          <IoFilter className="filter" onClick={handleFilterClick} />
          {handleClick && (
            <div className="displayDropdown">
              <Dropdown
                label={"Select filter"}
                options={options}
                value={value}
                onChange={handleChange}
              />
            </div>
          )}
        </div>
      </div>

      <div className="display-container">
        {error && (
          <p style={{ textAlign: "center", fontSize: "1.3rem" }}>{error}</p>
        )}
        {isLoading && (
          <>
            <Skeleton variant="rounded" width={300} height={100} />

            <Skeleton variant="rectangular" width={300} height={100} />
          </>
        )}
        {filtered &&
          filtered.map(({ id, setup, punchline, funnyBtn, humorlessBtn }) => {
            return (
              <Card
                key={id}
                setup={setup}
                punchline={punchline}
                funny={() => onFunnyClick(id)}
                humorless={() => onHumorlessClick(id)}
                funnyBtn={funnyBtn}
                humorlessBtn={humorlessBtn}
              />
            );
          })}
      </div>
    </>
  );
};

const Dropdown = ({ label, value, options, onChange }) => {
  return (
    <div className="label-container">
      <label>
        <p>{label}</p>

        <select name="" value={value} onChange={onChange}>
          {options.map((option) => (
            <option value={option.value} key={option.value}>
              {" "}
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};
export default Display;
