import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./index.css";

const App = () => {
  const [data, setData] = useState({});
  const [run, setRun] = useState(false);

  useEffect(() => {
    fetch("https://limitless-wildwood-37360.herokuapp.com/api/grid/data")
      .then(res => res.json())
      .then(r => {
        setData(r);
      })
      .catch(err => {
        if (err) throw err;
      });
  }, []);

  useEffect(() => {
    let inter;
    if (run) {
      inter = setInterval(updateGrid, 325);
    } else {
      return () => clearInterval(inter);
    }
  }, [run]);

  function updateGrid() {
    fetch("https://limitless-wildwood-37360.herokuapp.com/update")
      .then(res => res.json())
      .then(r => setData(r))
      .catch(err => {
        if (err) throw err;
      });
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
      <button onClick={() => setRun(true)}>RUN</button>
      <button onClick={() => setRun(false)}>STOP</button>
      <button onClick={() => setData({})}>RESET</button>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
