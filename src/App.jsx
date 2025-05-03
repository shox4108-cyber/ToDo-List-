import { useEffect, useState, useRef } from "react";
import Navbar from "./components/Navbar";
import Notes from "./components/Notes";
import Model from "./components/Model";
import { ToastContainer } from "react-toastify";
import { NotesContext } from "./context";
import gsap from "gsap";
import { toast } from "react-toastify";
import useGsapFadeIn from "./animation/useGsapFadeIn";

function App() {
  const getLs = () =>
    localStorage.notes ? JSON.parse(localStorage.notes) : [];
  const setLs = () => (localStorage.notes = JSON.stringify(notes));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDel, setIsDel] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [notes, setNotes] = useState(getLs);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);


  const notesBySearch = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  const appearRef = useGsapFadeIn(
    { opacity: 0},
    { opacity: 1, duration: 0.4, ease: "power3.out" },
    [isModalOpen]
  );

  const closeModalHandler = () => {
    if (appearRef.current) {
      gsap.to(appearRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power3.out",
        onComplete: () => {
          setIsModalOpen(false);
          setTimeout(() => {
            setShowModal(false);
          }, 100);
          setIsEdit(false);
          setCurrentNote(null);
          setIsDel(false);
        },
      });
    }
  };

  const openModalHandler = () => {
    setIsModalOpen(true);
    setShowModal(true);
  };

  const addOrChangeHandler = (note) => {
    if (currentNote?.id) {
      const updatedNotes = notes.map((item) => {
        if (item.id == note.id) {
          if (item.title !== note.title || item.text !== note.text) {
            toast.success(`Note ${note.title} edited`, {
              position: "top-right",
              autoClose: 1000,
            });
            console.log("item", item.title);
            console.log("note", note.title);
            return note;
          } else {
            toast.error(`Note ${item.title} was not changed by you`, {
              position: "top-right",
              autoClose: 1000,
            });
          }
        }
        return item;
      });
      setNotes(updatedNotes);
    } else {
      setNotes([...notes, note]);
    }
  };

  const deleteNoteHandler = (note, id, confirmation) => {
    if (confirmation) {
      setNotes(notes.filter((item) => item.id != id));
      closeModalHandler();
      toast.success(`Note "${note.title}" deleted`, {
        position: "top-right",
        autoClose: 1000,
      });
      closeModalHandler();
      confirmation = false;
    } else {
      openModalHandler();
      setIsDel(true);
      setCurrentNote(note);
    }
  };

  const changeModalHandler = (note) => {
    setIsEdit(true);
    openModalHandler();
    setCurrentNote(note);
  };

  useEffect(() => {
    setLs();
  }, [notes]);

  useEffect(() => {
    let tl;
    if (!isModalOpen) {
      tl = gsap.timeline({ repeat: -1, yoyo: true });
      tl.fromTo(
        ".editBtn",
        { scale: 1 },
        { scale: 1.1, duration: 0.6, ease: "power1.inOut" }
      );
    }

    return () => {
      if (tl) tl.kill();
    };
  }, [isModalOpen]);

  return (
    <NotesContext.Provider
      value={{
        addOrChangeHandler,
        deleteNoteHandler,
        changeModalHandler,
        closeModalHandler,
        isEdit,
        isDel,
        currentNote,
        notes,
        appearRef,
      }}
    >
      <Navbar setSearch={setSearch} search={search} />
      <Notes notes={notesBySearch} />
      {isModalOpen && <Model appearRef={appearRef} />}
      {!isModalOpen && (
        <button onClick={() => openModalHandler()} className="editBtn">
          <svg height="1em" viewBox="0 0 512 512">
            <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
          </svg>
        </button>
      )}
      <ToastContainer />
    </NotesContext.Provider>
  );
}

export default App;
