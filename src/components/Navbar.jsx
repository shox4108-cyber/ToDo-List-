import React, { useState } from "react";
import searchIcon from "../assets/images/search.svg";
import backIcon from "../assets/images/back.svg";
import closeIcon from "../assets/images/close.svg";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import useGsapFadeIn from "../animation/useGsapFadeIn";
import gsap from "gsap";

const Navbar = ({ search, setSearch }) => {
  const [show, setShow] = useState(true);
  const { t } = useTranslation();

  const changeLang = () => {
    const newLang = i18n.language == "en" ? "ru" : "en";
    i18n.changeLanguage(newLang);
  };

  const reset = () => {
    if (appearRef.current) {
      gsap.to(appearRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power3.out",
        onComplete: () => {
          setShow((prev) => !prev);
          setSearch("");
        },
      });
    } else {
      setShow((prev) => !prev);
      setSearch("");
    }
  };

  const langFadeInRef = useGsapFadeIn(
    { opacity: 0, x: -20 },
    { opacity: 1, x: 0, duration: 2.5, ease: "elastic.out(5,0.3)" }
  );
  const titleFadeInRef = useGsapFadeIn(
    { opacity: 0, y: -20 },
    { opacity: 1, y: 0, duration: 1.2, ease: "bounce.out", delay: 2 }
  );
  const searchFadeInRef = useGsapFadeIn(
    { opacity: 0, x: 20 },
    { opacity: 1, x: 0, duration: 2.5, ease: "elastic.out(5,0.3)", delay: 1 }
  );
  const appearRef = useGsapFadeIn(
    { opacity: 0, delay: 2 },
    { opacity: 1, duration: 0.8, ease: "power3.out" },
    [show]
  );

  return (
    <>
      <nav className="nav">
        {show ? (
          <div className="nav__box" ref={appearRef}>
            <button
              ref={langFadeInRef}
              className="nav__lang"
              onClick={() => changeLang()}
            >
              {i18n.language == "en" ? "RU" : "EN"}
            </button>
            <h1 ref={titleFadeInRef} className="nav__title">
              {t("notesText")}
            </h1>
            <button ref={searchFadeInRef} className="nav__search">
              <img
                src={searchIcon}
                alt="searchIcon"
                onClick={() => {
                  gsap.to(appearRef.current, {
                    opacity: 0,
                    duration: 0.4,
                    ease: "power3.out",
                    onComplete: () => {
                      setShow((prev) => !prev);
                    },
                  });
                }}
              />
            </button>
          </div>
        ) : (
          <div className="nav__box" ref={appearRef}>
            <button className="nav__back" onClick={() => reset()}>
              <img src={backIcon} alt="" />
            </button>
            <input
              type="text"
              className="nav__input"
              placeholder={t("search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="nav__close" onClick={() => setSearch("")}>
              <img src={closeIcon} alt="" />
            </button>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
