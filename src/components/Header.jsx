import React from "react";

const Header = () => {
  return (
    <header className="header">
      <h1 className="header__title">
        <img
          src="/img/BugHeader.svg"
          alt="Bug Header Icon"
          className="header__icon"
        />
        DebugApp <span className="header__name">Keeper</span>
      </h1>
    </header>
  );
};

export default Header;
