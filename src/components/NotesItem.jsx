import React, { useContext } from "react";
import iconEdit from "../assets/images/edit.svg";
import iconDel from "../assets/images/del.svg";
import { NotesContext } from "../context";
import { useTranslation } from "react-i18next";

const NotesItem = ({ note }) => {
  const { t } = useTranslation();
  const {deleteNoteHandler, changeModalHandler} = useContext(NotesContext)
  return (
    <>
      <div className="notes__item">
        <div className="notes__item-info">
          <div className="notes__item-info-box">
            {note.edited? t('edited') : ''}
          </div>
          <h2 className="notes__item-title">{note.title}</h2>
          <span className="notes__item-date">{note.date}</span>
        </div>
        <p className="notes__item-text">{note.text}</p>
        <div className="notes__item-btns">
          <button onClick={() => changeModalHandler(note)} className="notes__item-btn blue">
            <img src={iconEdit} alt="" />
            <span>{t('edit')}</span>
          </button>
          <button onClick={() => deleteNoteHandler(note, note.id)} className="notes__item-btn red">
            <img src={iconDel} alt="" />
            <span>{t('delete')}</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default NotesItem;
