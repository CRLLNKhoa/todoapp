import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase.js";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import BrushIcon from "@mui/icons-material/Brush";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import WorkIcon from "@mui/icons-material/Work";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import "./Home.css";
import ClearIcon from "@mui/icons-material/Clear";
import GradeIcon from "@mui/icons-material/Grade";

let day;

switch (new Date().getDay()) {
  case 0:
    day = "Sunday";
    break;
  case 1:
    day = "Monday";
    break;
  case 2:
    day = "Tuesday";
    break;
  case 3:
    day = "Wednesday";
    break;
  case 4:
    day = "Thursday";
    break;
  case 5:
    day = "Friday";
    break;
  case 6:
    day = "Saturday";
    break;
  default:
    console.log(day);
}

function Home() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [todo, setTodo] = useState("");
  const [time, setTime] = useState("");
  const [minute, setMinute] = useState("00");
  const [todos, setTodos] = useState([]);
  const [setting, setSetting] = useState(false);
  const [tempUidd, setTempUidd] = useState("");
  const [complete, setComplete] = useState(false);
  const [home, setHome] = useState(true);
  const [create, setCreate] = useState(false);
  const [type, setType] = useState(0);
  const [category, setCategory] = useState("food");

  const d = new Date();
  const date = d.getDate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setTodos([]);
          const data = snapshot.val();
          if (data !== null) {
            // eslint-disable-next-line array-callback-return
            Object.values(data).map((todo) => {
              setTodos((oldArray) => [...oldArray, todo]);
            });
          }
        });
      }
      if (!user) {
        navigate("/");
      }
    });
  }, []);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        const variant = "success";
        enqueueSnackbar("Logout success! ", { variant });
      })
      .catch((err) => {
        alert("not");
      });
  };

  const writeToDatabase = () => {
    const uidd = uid(); //sadawqeqw
    set(ref(db, `${auth.currentUser.uid}/${uidd}`), {
      todo: todo,
      time: time,
      uidd: uidd,
      type: type,
      category: category,
      minute: minute,
      complete: complete,
    });
    setTime("");
    setTodo("");
    setType(0);
  };

  const handleDelete = (uid) => {
    remove(ref(db, `${auth.currentUser.uid}/${uid}`));
  };

  const handleUpdate = (todo) => {
    setTodo(todo.todo);
    setTempUidd(todo.uidd);
    setComplete(todo.complete);
    setType(todo.type);
  };

  const handleEditConfirm = () => {
    update(ref(db, `${auth.currentUser.uid}/${tempUidd}`), {
      todo: todo,
      tempUidd: tempUidd,
      complete: complete,
    });
  };

  // {todos.map((todo, index) => (
  //   <div className="item-todo" key={index} onClick={() => setComplete(1)}>
  //     <div className="card-todo">
  //       <BrushIcon />
  //       <button onClick={() => handleUpdate(todo)}>Update</button>
  //       <button onClick={() => handleDelete(todo.uidd)}>Delete</button>
  //     </div>
  //   </div>
  // ))}
  // console.log(todos.sort(function(a,b){return a.time - b.time}))
  // <button onClick={handleSignOut}>SignOut</button>
  return (
    <div className="wrapper-home">
      {home && (
        <div className="list-todo">
          <h2 className="title">Today's schedule</h2>
          <h2 className="date">
            {day} {date}
          </h2>
          {todos.length < 1 && (
            <div className="not-task">
              <img
                alt=""
                className="img-not-task"
                src="https://user-images.githubusercontent.com/107914230/199768356-5fba9a7d-0a3c-46e6-9649-5e67d5afbd45.png"
              />
            </div>
          )}
          {todos
            .sort(function (a, b) {
              return a.time - b.time;
            })
            .map((todo, index) => (
              <div
                className="item-todo"
                onClick={() => {
                  handleEditConfirm();
                }}
                key={index}
              >
                <label
                  for={`check${index}`}
                  className={(complete && "card-todo") || "card-todo complete"}
                >
                  {(todo.category === "design" && (
                    <button className="design-icon">
                      <BrushIcon />
                    </button>
                  )) ||
                    (todo.category === "food" && (
                      <button className="food-icon">
                        <FastfoodIcon />
                      </button>
                    )) ||
                    (todo.category === "work" && (
                      <button className="work-icon">
                        <WorkIcon />
                      </button>
                    )) ||
                    (todo.category === "workout" && (
                      <button className="workout-icon">
                        <FitnessCenterIcon />
                      </button>
                    )) ||
                    (todo.category === "alarm" && (
                      <button className="alarm-icon">
                        <AccessAlarmIcon />
                      </button>
                    )) || (
                      <button className="design-icon">
                        <WorkIcon />
                      </button>
                    )}
                  <h4 className="title-todo">
                    {todo.todo}
                    {todo.type === 0 && (
                      <span className="type">
                        <GradeIcon fontSize="inherit" />
                      </span>
                    )}
                  </h4>
                  <p className="time">{`${todo.time}:${todo.minute}`}</p>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(todo.uidd)}
                  >
                    <ClearIcon fontSize="inherit" />
                  </button>
                </label>
              </div>
            ))}
        </div>
      )}
      {create && (
        <div className="create-todo">
          <button
            className="btn-back"
            onClick={() => {
              setHome(true);
              setCreate(false);
            }}
          >
            <KeyboardBackspaceIcon sx={{ fontSize: "40px" }} />
          </button>
          <h1 className="title-create">Create new task</h1>
          <input
            className="input-title"
            type="text"
            placeholder="Task Title..."
            value={todo}
            onChange={(e) => {
              setTodo(e.target.value);
            }}
          />
          <h3 className="title-create">Task Type</h3>
          <div className="gr-btn">
            <button
              onClick={() => setType(0)}
              className={type === 0 ? "btn-type select" : "btn-type"}
            >
              Important
            </button>
            <button
              onClick={() => setType(1)}
              className={type === 1 ? "btn-type select" : "btn-type"}
            >
              Planned
            </button>
          </div>
          <h3 className="title-create">Choose time</h3>
          <div className="set-time">
            <input
              className="input-time"
              type="number"
              placeholder="Time..."
              value={time}
              onChange={(e) => {
                setTime(e.target.value);
              }}
            />
            <input
              className="input-time"
              type="number"
              placeholder="minute..."
              value={minute}
              onChange={(e) => {
                setMinute(e.target.value);
              }}
            />
          </div>
          <h3 className="title-create">Category</h3>
          <div className="list-category">
            <button
              onClick={() => setCategory("food")}
              className={
                category === "food" ? "btn-type select-food" : "btn-type"
              }
            >
              Food
            </button>
            <button
              onClick={() => setCategory("work")}
              className={
                category === "work" ? "btn-type select-work" : "btn-type"
              }
            >
              Work
            </button>
            <button
              onClick={() => setCategory("workout")}
              className={
                category === "workout" ? "btn-type select-workout" : "btn-type"
              }
            >
              Workout
            </button>
            <button
              onClick={() => setCategory("design")}
              className={
                category === "design" ? "btn-type select-design" : "btn-type"
              }
            >
              Design
            </button>
            <button
              onClick={() => setCategory("alarm")}
              className={
                category === "alarm" ? "btn-type select-alarm" : "btn-type"
              }
            >
              Alarm
            </button>
          </div>
          <button className="btn-create" onClick={writeToDatabase}>
            Create Task
          </button>
        </div>
      )}
      {setting && (
        <div className="setting">
          <h2 className="title-setting">Setting</h2>
          <button className="btn-signout" onClick={handleSignOut}>
            SignOut
          </button>
        </div>
      )}
      <div className="nav-bar-bottom">
        <button
          className="btn-home"
          onClick={() => {
            setHome(true);
            setCreate(false);
            setSetting(false)
          }}
        >
          <HomeIcon />
        </button>
        <button
          className="btn-add"
          onClick={() => {
            setHome(false);
            setCreate(true);
            setSetting(false)
          }}
        >
          <AddIcon />
        </button>
        <button className="btn-setting" onClick={() => {
          setHome(false);
          setCreate(false);
          setSetting(true)
        }}>
          <SettingsIcon />
        </button>
      </div>
    </div>
  );
}

export default Home;
