import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { Fab } from "@material-ui/core";
import callApi from "../api";

const PopUpNote = (props) => {
  const deleteNote = async (id) => {
    const token = localStorage.getItem("token");
    callApi("deleteNote", token).post("", { noteId: id });

    props.setNotes([]);
  };
  const handleClick = () => {
    deleteNote(props.popup.id);

    props.setPopup({ id: "", title: "", content: "" });
  };

  return (
    <section className="background-popup">
      <div className="popup-box">
        <h2 className="popup-box__title">{props.popup.title}</h2>
        <p className="popup-box__content">{props.popup.content}</p>
        <Fab className="note__delete" onClick={handleClick}>
          <DeleteIcon
            className="delete__icon"
            onClick={handleClick}
          />
        </Fab>
      </div>
    </section>
  );
};
export default PopUpNote;
