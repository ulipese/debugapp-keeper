import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import { Fab, Zoom } from "@material-ui/core";
import callApi from "../api";
import { v4 as uuid } from "uuid";

const CreateArea = (props) => {
  const [focus, isFocus] = useState(false);
  const [newNote, setNewNote] = useState({
    dbId: "",
    title: "",
    content: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setNewNote((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
        dbId: uuid(),
      };
    });
  };
  const handleClick = (event) => {
    const { className, id } = event.target;

    if (className === "form__title") {
      event.target.style.borderBottom = "none";
      event.target.style.borderRadius = "0.5em 0.5em 0em 0em";
      isFocus(true);
    }
    if (id === "addButton") {
      const titleInput = document.querySelector(".form__title");
      const contentInput = document.querySelector(".form__content");

      if (titleInput.value.length <= 3) {
        titleInput.focus();
      }
      if (contentInput.value.length <= 3) {
        contentInput.focus();
      }
      if (
        titleInput.value.length > 3 &&
        contentInput.value.length > 3
      ) {
        const token = localStorage.getItem("token");

        callApi("notes/saveNote", token).post("", newNote);

        props.setNotes(newNote);

        titleInput.value = "";
        contentInput.value = "";
      }
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    handleClick(event);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form__title"
        name="title"
        placeholder="Title"
        onClick={handleClick}
        onChange={handleChange}
      />
      {focus && (
        <textarea
          rows="3"
          className="form__content"
          name="content"
          placeholder="Content"
          resize="none"
          onChange={handleChange}
          autoFocus={true}
        ></textarea>
      )}
      <Zoom
        in={focus}
        className="form__button"
        title="Create"
        id="addButton"
        onClick={handleClick}
      >
        <Fab
          className="form__button"
          disabled={!focus}
          title="Create"
          id="addButton"
          onClick={handleClick}
        >
          <AddIcon
            className="button__icon"
            id="addButton"
            title="Create"
            onClick={handleClick}
          />
        </Fab>
      </Zoom>
    </form>
  );
};

export default CreateArea;
