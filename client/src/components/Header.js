import React from "react";
import Logo from "../logo.png";
import Crimeo from "../crimeo.png";
export default function Header() {
  return (
    <header>
      <div className="navbar">
        <div className="logo">
          <div className="img">
            <img src={Logo} alt="crimeratescheck" />
          </div>
          <div className="cname">
            <p>Crime Rates Check</p>
          </div>
        </div>

        <div className="crimeo">
          <div className="powered">
            <p>Powered By</p>
          </div>
          <div className="img">
            <a href="https://www.crimeometer.com/?utm_source=ParsaMorshed&utm_medium=website">
              <img src={Crimeo} alt="crimeometer" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
