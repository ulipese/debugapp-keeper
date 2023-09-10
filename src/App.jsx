import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import CreateArea from "./components/CreateArea";
import Note from "./components/Note";
import PopUpNote from "./components/PopUpNote";
import AuthScreen from "./components/AuthScreen";
import callApi from "./api";

function App() {
  const [authenticated, isAuthenticated] = useState(false);
  const [displayNotes, setDisplayNotes] = useState([]);
  const [notes, setNotes] = useState([]);
  const [popup, setPopup] = useState({
    id: "",
    title: "",
    content: "",
  });
  const handleClick = (event) => {
    const { className, name } = event.target;
    if (
      name === "exit" &&
      window.confirm("Do you want to exit the account?")
    ) {
      localStorage.removeItem("token");
      window.location.reload(false);
    }
    if (className === "background-popup") {
      setPopup({ id: "", title: "", content: "" });
    }
  };
  const getNotes = async () => {
    const token = localStorage.getItem("token");
    const { data } = await callApi("notes", token).get();
    setDisplayNotes([...data]); // data === database notes
  };

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const access = callApi("", token).get();
        access.then((res) => {
          res.status === 200
            ? isAuthenticated(true)
            : isAuthenticated(false);
        });
        if (authenticated) {
          getNotes();
        }
      }
    };
    checkToken();
  }, [authenticated]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    callApi("notes", token)
      .get()
      .then((res) => {
        setDisplayNotes([...res.data]);
      });
  }, [notes]);

  return !authenticated ? (
    <main className="App">
      <Header />
      <AuthScreen />
    </main>
  ) : (
    <main className="App" onClick={handleClick}>
      <Header />
      <CreateArea setNotes={setNotes} />
      <section className="section-notes">
        {popup.id !== "" ? (
          <PopUpNote
            popup={popup}
            setNotes={setNotes}
            setPopup={setPopup}
          />
        ) : (
          ""
        )}
        {displayNotes.map((note, index) => {
          return (
            <Note
              key={index}
              id={note._id}
              title={note.title}
              content={note.content}
              setNotes={setNotes}
              setPopup={setPopup}
              popup={popup}
            />
          );
        })}
      </section>

      <img
        src="/img/exitIcon.svg"
        name="exit"
        alt="Exit Icon"
        className="App__icon-exit"
        title="Exit"
        onClick={handleClick}
      />
    </main>
  );
}

export default App;
