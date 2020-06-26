import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./index.css";

const App = () => {
  const [data, setData] = useState({});
  const [initial, setInitial] = useState({});
  useEffect(() => {
    fetch("https://limitless-wildwood-37360.herokuapp.com/api/grid/data")
      .then(res => res.json())
      .then(r => {
        setData(r);
        setInitial(r);
      })
      .catch(err => {
        if (err) throw err;
      });
  }, []);

  useEffect(() => {
    setInterval(updateGrid, 325);
  }, []);

  function updateGrid() {
    fetch("https://limitless-wildwood-37360.herokuapp.com/update")
      .then(res => res.json())
      .then(r => setData(r))
      .catch(err => {
        if (err) throw err;
      });
  }

  function reset() {
    fetch("https://limitless-wildwood-37360.herokuapp.com/reset")
      .then(res => res.json())
      .then(r => r)
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
      <button onClick={reset}>RESET</button>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
