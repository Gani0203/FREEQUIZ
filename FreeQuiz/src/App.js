import React, { useState, useEffect } from "react";
import "./App.css";
function App() {
  const [count, setCount] = useState(0);
  const [final, setFinal] = useState(false);
  const [que, setQue] = useState(0);
  const closePage = () => {
    window.close();
  };
  const restart = () => {
    setCount(0);
    setFinal(false);
    setQue(0);
  };

  const [res, setRes] = useState([]);
  useEffect(() => {
    fetch(
      "https://quizapi.io/api/v1/questions?apiKey=WV2rlZNzlMqqKyXXB8v9lp3PHIko10HMdg3TsKbG&limit=10"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setRes(data);
      });
  }, []);

  const click = (result) => {
    if (result === "true") {
      setCount(count + 1);
    }
    if (res[que]?.correct_answers?.answer_a_correct === "true") {
      document.getElementById("btna").style.backgroundColor =
        "rgb(34, 216, 10)";
      document.getElementById("btnb").style.backgroundColor = "red";
      document.getElementById("btnc").style.backgroundColor = "red";
      document.getElementById("btnd").style.backgroundColor = "red";
    }
    if (res[que]?.correct_answers?.answer_b_correct === "true") {
      document.getElementById("btna").style.backgroundColor = "red";
      document.getElementById("btnb").style.backgroundColor =
        "rgb(34, 216, 10)";
      document.getElementById("btnc").style.backgroundColor = "red";
      document.getElementById("btnd").style.backgroundColor = "red";
    }
    if (res[que]?.correct_answers?.answer_c_correct === "true") {
      document.getElementById("btna").style.backgroundColor = "red";
      document.getElementById("btnb").style.backgroundColor = "red";
      document.getElementById("btnc").style.backgroundColor =
        "rgb(34, 216, 10)";
      document.getElementById("btnd").style.backgroundColor = "red";
    }
    if (res[que]?.correct_answers?.answer_d_correct === "true") {
      document.getElementById("btna").style.backgroundColor = "red";
      document.getElementById("btnb").style.backgroundColor = "red";
      document.getElementById("btnc").style.backgroundColor = "red";
      document.getElementById("btnd").style.backgroundColor =
        "rgb(34, 216, 10)";
    }

    const update = () => {
      if (que < 9) {
        setQue(que + 1);
        document.getElementById("btna").style.backgroundColor = "blue";
        document.getElementById("btnb").style.backgroundColor = "blue";
        document.getElementById("btnc").style.backgroundColor = "blue";
        document.getElementById("btnd").style.backgroundColor = "blue";
      } else {
        setFinal(true);
      }
    };
    setTimeout(update, 1000);
  };
  return (
    <>
      {final ? (
        <div
          className="position-absolute top-50 start-50 translate-middle "
          style={{ width: "550px" }}
        >
          <div className="card text-center" style={{ width: "550px" }}>
            <div className="card-body" style={{ background: "cyan" }}>
              <h5 className="card-title">Score</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                {count} out of {res.length}
              </h6>
              <div className="my-2 ">
                <button
                  type="button"
                  className="btn btn-danger mx-2"
                  onClick={closePage}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary mx-2"
                  onClick={restart}
                >
                  Restart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <nav className="navbar sticky-top bg-body-secondary ">
            <div className="container-fluid ">
              <h3>
                question {que + 1} of {res.length}
              </h3>
            </div>
            <div className=" position-absolute top-0 start-50 translate-middle-x  ">
              <h2>TECHNICAL QUIZ </h2>
            </div>
            <div className=" position-absolute  end-0">
              <h3>Score: {count} </h3>
            </div>
          </nav>

          <div
            className="position-absolute top-50 start-50 translate-middle"
            style={{ width: "550px" }}
          >
            <div
              className="form-floating mx-auto my-auto  text-center"
              style={{ width: "550px" }}
            >
              <h4>{res[que] && res[que].question}</h4>
            </div>
            <div
              className="btn-group-vertical my-4"
              role="group"
              style={{ width: "550px" }}
            >
              <div
                className="d-flex justify-content-around "
                style={{ width: "550px" }}
              >
                <button
                  type="button"
                  className="btn btn-primary"
                  id="btna"
                  disabled={res[que]?.answers.answer_a === null ? true : false}
                  onClick={() =>
                    click(res[que]?.correct_answers?.answer_a_correct)
                  }
                  style={{ width: "250px" }}
                >
                  {res[que]?.answers?.answer_a}
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  id="btnb"
                  disabled={res[que]?.answers?.answer_b === null ? true : false}
                  onClick={() =>
                    click(res[que]?.correct_answers?.answer_b_correct)
                  }
                  style={{ width: "250px" }}
                >
                  {res[que]?.answers?.answer_b}
                </button>
              </div>

              <div
                className="btn-group-vertical my-4"
                role="group"
                style={{ width: "550px" }}
              >
                <div
                  className="d-flex justify-content-around"
                  style={{ width: "550px" }}
                >
                  <button
                    type="button"
                    className="btn btn-primary"
                    id="btnc"
                    disabled={
                      res[que]?.answers?.answer_c === null ? true : false
                    }
                    onClick={() =>
                      click(res[que]?.correct_answers?.answer_c_correct)
                    }
                    style={{ width: "250px" }}
                  >
                    {res[que]?.answers?.answer_c === null
                      ? "NULL"
                      : res[que]?.answers?.answer_c}
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary"
                    id="btnd"
                    disabled={
                      res[que]?.answers?.answer_d === null ? true : false
                    }
                    onClick={() =>
                      click(res[que]?.correct_answers?.answer_d_correct)
                    }
                    style={{ width: "250px" }}
                  >
                    {res[que]?.answers?.answer_d === null
                      ? "NULL"
                      : res[que]?.answers?.answer_d}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
