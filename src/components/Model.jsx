import React, { useContext, useState } from "react";
import { v4 } from "uuid";
import { toast } from "react-toastify";
import { NotesContext } from "../context";
import { useTranslation } from "react-i18next";

const Model = ({appearRef}) => {
  const { addOrChangeHandler, closeModalHandler, isEdit, currentNote, isDel, deleteNoteHandler,} =
    useContext(NotesContext);
  const [title, setTitle] = useState(currentNote?.title ?? "");
  const [text, setText] = useState(currentNote?.text ?? "");
  const { t } = useTranslation();

  const addOrChange = () => {
    if (title.length > 2 && text.length > 2) {
      const note = {
        id: currentNote?.id ?? v4(),
        title: title,
        text: text,
        date: currentNote?.date ?? new Date().toLocaleDateString(),
        edited: currentNote ? true : false,
      };
      addOrChangeHandler(note);
      closeModalHandler();
      !currentNote
        ? toast.success(`Note ${title} added`, {
            position: "top-right",
            autoClose: 1000,
          })
        : "";
    } else {
      toast.warning(`Need 3 symbols at least`, {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  

  return (
    <>
      <div ref={appearRef}  className="modal" onClick={() => closeModalHandler()}>
        <div 
          className="modal__box"
          onClick={(event) => event.stopPropagation()}
        >
          <h2 className="modal__box-title">
            
            {isDel? `${t('sure')} " ${currentNote?title : ''} " ?` : isEdit ? t("editNote") : t("addNote")}
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (isDel) {
                deleteNoteHandler(currentNote, currentNote?.id, true);
              } else {
                addOrChange();
              }              
            }}
            className="modal__box-fields"
          >
            {!isDel && (
              <>
                <label>
                  <input
                    type="text"
                    placeholder={t("title")}
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                  <span>{t("title")}</span>
                </label>
                <label>
                  <input
                    type="text"
                    placeholder={t("text")}
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                  />
                  <span>{t("text")}</span>
                </label>
              </>
            )}

            <div className="modal__box-btns">
              <button
                className="modal__box-btn red"
                type="button"
                onClick={() => closeModalHandler()}
              >
                {t("cancel")}
              </button>
              <button className="modal__box-btn blue" type="submit">
                {isDel ? t("confirm") : isEdit ? t("edit") : t("add")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Model;
