import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "./index.css";

const App = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get("https://limitless-wildwood-37360.herokuapp.com/api/grid/data")
      .then(r => {
        setData(r.data);
      })
      .catch(err => {
        if (err) throw err;
      });
  }, []);

  function updateGrid() {
    axios
      .get("https://limitless-wildwood-37360.herokuapp.com/update")
      .then(r => setData(r.data))
      .catch(err => {
        if (err) throw err;
      });
  }

  async function reset() {
    const r = await axios.get(
      "https://limitless-wildwood-37360.herokuapp.com/reset"
    );
    console.log(r);
  }

  return (
    <>
      <table className="Grid">
        <tbody>
          {Object.entries(data).map(([k, v]) => (
            <tr key={k}>
              {v.map((item, idx) => (
                <td className={item === 0 ? "white" : "black"} key={idx}>
                  {item}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={updateGrid}>UPDATE</button>
      <button onClick={reset}>RESET</button>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
