import React, { useReducer, useEffect, useState } from "react";
import "./index.css";
import "./app.css";
import reducer from "./components/Reducer";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { TextField } from "@mui/material";

const initialState = {
  name: "",
  whatsapp: "",
  shots: 0,
  ShotOnTarget: 0,
  CompletePasses: 0,
  TotalPasses: 0,
  Goals: 0,
  Assists: 0,
  averagePosition: "Start",
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [disable, setDisable] = useState(false);
  useEffect(() => {
    setDisable(state.name === "" || state.whatsapp === "");
  }, [state.name, state.whatsapp]);
  const handleChange = (e) => {
    dispatch({
      type: "UpdateField",
      field: e.target.name,
      value: e.target.value,
    });
  };

  const sendDetails = () => {
    let message = `Hi ${state.name}, Hope you're doing great. Your match performance\n
  Shots: ${state.shots}\n
  Shots On Target: ${state.ShotOnTarget}\n
  Complete Passes: ${state.CompletePasses}\n
  Total Passes: ${state.TotalPasses}\n
  Goals: ${state.Goals}\n
  Assists: ${state.Assists}\n
  Average Position: ${state.averagePosition}\n`;

    let encodedMessage = encodeURIComponent(message);
    let link = `https://api.whatsapp.com/send?phone=${state.whatsapp}&text=${encodedMessage}`;
    window.open(link, "_blank");
  };
  return (
    <section>
      <div className="container">
        <h1>Performance Sheet</h1>
        <form>

          <TextField
            required
            id="outlined-required"
            label="name"
            name="name"
            value={state.name}
            onChange={handleChange}
          />
          <TextField
            required
            id="outlined-required"
            label="Whatsapp"
            name="whatsapp"
            value={state.whatsapp}
            onChange={handleChange}
          />
        </form>
        <main>
          <div onClick={() => dispatch({ type: "increment_Shots" })}>Shots</div>
          <div onClick={() => dispatch({ type: "increment_SOT" })}>
            Shots on target
          </div>
          <div onClick={() => dispatch({ type: "increment_CPasses" })}>
            Complete Passes
          </div>
          <div onClick={() => dispatch({ type: "increment_TPasses" })}>
            Total Passes
          </div>
          <div onClick={() => dispatch({ type: "increment_Goals" })}>Goals</div>
          <div onClick={() => dispatch({ type: "increment_Assists" })}>
            Assists
          </div>
          <div>
            <label htmlFor="avgPos">Average Positioning</label>
            <select name="AveragePosition">
              <option value="Attacking 3rd">Attacking 3rd</option>
              <option value="Middle 3rd">Middle 3rd</option>
              <option value="Defensive 3rd">Defenseive 3rd</option>
            </select>
          </div>
        </main>

        <div className="table">
          {state.name === "" ? (
            <div>
              <strong>name </strong>
              <p> John Doe</p>
            </div>
          ) : (
            <div>
            <strong>name </strong>
            <p> {state.name}</p>
          </div>
          )}
          {state.whatsapp === "" ? <div>
            <strong>whatsapp</strong> <p>923000000000</p>
          </div>  : <div>
            <strong>whatsapp</strong> <p>{state.whatsapp}</p>
          </div>}
          
          <div>
            <strong>Shots </strong>
            <p> {state.shots}</p>
          </div>
          <div>
            <strong>Shots on target </strong>
            <p> {state.ShotOnTarget}</p>
          </div>
          <div>
            <strong>Complete Passes </strong> <p>{state.CompletePasses}</p>
          </div>
          <div>
            <strong>Total Passes </strong>
            <p> {state.TotalPasses}</p>
          </div>
          <div>
            <strong>Goals </strong> <p>{state.Goals}</p>
          </div>
          <div>
            <strong>Assists </strong> <p>{state.Assists}</p>
          </div>
          <div>
            <strong>Average Position </strong> <p>{state.averagePosition}</p>
          </div>
        </div>
      </div>
        <div className="btn_container">
      <button disabled={disable}>

        <WhatsAppIcon
          className={disable ? "disableIcon" : "icon"}
          onClick={sendDetails}
        />
      </button>
      {disable ? <span>please fill all the fileds!!!</span> : ""}
        </div>
      
    </section>
  );
};

export default App;
