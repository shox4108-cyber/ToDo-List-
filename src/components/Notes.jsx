import React, { useContext, useState, useEffect } from "react";
import listIcon from "../assets/images/list.svg";
import gridIcon from "../assets/images/grid.svg";
import NotesItem from "./NotesItem";
import { useTranslation } from "react-i18next";
import useGsapFadeIn from "../animation/useGsapFadeIn";


const Notes = ({ notes }) => {
  const { t } = useTranslation();
  const [view, setView] = useState(true);
  let icon = view ? listIcon : gridIcon;
  let spanText = view ? t("list") : t("grid");
  let notesListClass = `notes__list ${!view ? "active" : ""}`;
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const titleRef = useGsapFadeIn(
    { opacity: 0, y: -20 },
    { opacity: 1, y: 0, duration: 1, delay: 3, ease: "bounce.out" }
  );

  const stickerRef = useGsapFadeIn(
    { opacity: 0, scale: 10 },
    { opacity: 1, scale: 1, duration: 1, delay: 4, ease: "expo.in" }
  );

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 700);
      setView(false)
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  

  return (
    <>
      <main className="main">
        <div ref={titleRef} className="container notes">
          <div className="notes__top">
            <h2  className="notes__top-title">
              {t("allNotes")}
            </h2>
            <button
              className="notes__top-btn"
              onClick={() => isSmallScreen? alert(t('Error')) : setView(!view)}
            >
              <img src={icon} alt="listIcon" />
              <span>{spanText}</span>
            </button>
          </div>
          {notes.length == 0 ? (
            <div ref={stickerRef} className="notes__noitem">
              <div className="z__container">
                <div className="z z-1">Auuuu</div>
                <div className="z z-2">NO</div>
                <div className="z z-3">NOTESSS</div>
                <div className="z z-4">!!!</div>
              </div>
              <div className="z__title">🫨</div>
            </div>
          ) : (
            <div className={notesListClass}>
              {notes.map((note) => (
                <NotesItem key={note.id} note={note} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Notes;
