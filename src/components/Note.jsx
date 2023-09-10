import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { Fab } from "@material-ui/core";
import callApi from "../api";

const Note = (props) => {
  const token = localStorage.getItem("token");

  const deleteNote = async (id) => {
    callApi("notes/deleteNote", token).post("", { noteId: id });

    props.setNotes([]);
  };
  const handleClick = (event) => {
    const { baseVal } = event.target.className;

    if (baseVal === "" || baseVal !== "") {
    }
    if (baseVal === undefined) {
      props.setPopup({
        id: props.id,
        title: props.title,
        content: props.content,
        deleteNote: deleteNote,
      });
    }
  };

  return props.id === props.popup.id ? (
    ""
  ) : (
    <div className="note" onClick={handleClick}>
      <img
        src="/img/BugNotes.svg"
        alt="Bug Notes Icon"
        className="note__icon"
      />
      <h2 className="note__title">
        {props.title.length >= 25
          ? props.title.substring(0, 25) + "..."
          : props.title}
      </h2>
      <p className="note__content">
        {props.content.length >= 25
          ? props.content.substring(0, 25) + "..."
          : props.content}
      </p>

      <Fab
        className="note__delete"
        onClick={() => {
          deleteNote(props.id);
        }}
        title="Delete"
      >
        <DeleteIcon
          className="delete__icon"
          title="Delete"
          onClick={() => {
            deleteNote(props.id);
          }}
        />
      </Fab>
    </div>
  );
};
export default Note;
