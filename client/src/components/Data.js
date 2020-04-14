import React, { useState, useEffect, useCallback } from "react";
import Cities from "./Cities";
import "../App.scss";
import uuid from "uuid";

export default function Data() {
  const [crimes, setCrimes] = useState([]);
  const [uniqueOffenses, setUniqueOffenses] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [lat, setLat] = useState("41.881832");
  const [lon, setLon] = useState("-87.623177");
  const [city, setCity] = useState("Chicago");
  const [toggleCrimes, setToggleCrimes] = useState(false);
  const [loading, setLoading] = useState(false);

  const initializeApp = useCallback(() => {
    //Date
    let date = new Date();
    let oneyear = new Date(
      new Date().setFullYear(new Date().getFullYear() - 1)
    );
    const newdatenow = date.toISOString();
    const newdateyear = oneyear.toISOString();

    async function fetchData() {
      try {
        const res = await fetch(
          `/data/${lat}/${lon}/${newdateyear}/${newdatenow}`
        );
        const info = await res.json();

        setCrimes(info.incidents);
        console.log(info);
        const offenses = info.incidents.map((i) => i.incident_offense);
        //Get the unique items from all the offenses
        setUniqueOffenses([...new Set(offenses)]);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    if ((submit, lat, lon)) {
      setLoading(true);
    }
    //If form is submitted then fetch data
    if (submit) {
      fetchData();
    }
  }, [submit, lat, lon]);

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
  };
  const onChange = (e) => {
    return (
      setLat(e.target[e.target.selectedIndex].getAttribute("data-lat")),
      setLon(e.target[e.target.selectedIndex].getAttribute("data-lon")),
      setCity(e.target[e.target.selectedIndex].getAttribute("data-city"))
    );
  };
  const displayCrimes = () => {
    setToggleCrimes(!toggleCrimes);
  };
  return (
    <div className="home">
      <h1>
        GET CRIME IN YOUR CITY <br /> SINCE THE LAST YEAR
      </h1>
      <form onSubmit={onSubmit}>
        <label>Select a City</label>
        <select name="cities" onChange={onChange}>
          <Cities />
        </select>
        <div className="btn">
          <button>GET RATES</button>
        </div>
      </form>

      {submit ? (
        <div className="rates">
          {crimes === undefined ? (
            <div className="undefined">
              <h2>
                Woops! Data Requests Have Run Out For Today Since We Have
                Limited Calls.
              </h2>
              <h3>Better Try Again Tomorrow, Thanks For Your Interest!</h3>
            </div>
          ) : (
            <>
              {loading ? (
                <div className="loading">Loading..</div>
              ) : (
                <div className="data">
                  <h1>Out of 100% of crimes occuring in {city}, </h1>
                  <div className="allRates">
                    {uniqueOffenses.map((i) => {
                      const offenses = crimes.map((i) => i.incident_offense);
                      const numItems = offenses.filter((item) => item === i);
                      return (
                        <div className="eachRate" key={uuid()}>
                          <h3> {i}</h3>
                          <div>
                            <div>
                              <h3>
                                {(numItems.length * 100) / offenses.length}%
                              </h3>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="fyi">
                    <p>
                      FYI: The Crimes Displayed will be in the radius of 10km
                      only. To get more visit{" "}
                      <a href="https://www.crimeometer.com/?utm_source=ParsaMorshed&utm_medium=website">
                        Crimeometer
                      </a>
                    </p>
                    <p>
                      FYI: 'In Review' are crimes that are yet to be labeled
                    </p>
                    <button
                      className={
                        uniqueOffenses.length > 0 ? "allCrimesBtn" : "hide"
                      }
                      onClick={displayCrimes}
                    >
                      {toggleCrimes ? "HIDE CRIMES" : "SHOW CRIMES"}
                    </button>
                  </div>
                  <div className={toggleCrimes ? "details" : "hide"}>
                    {crimes.map((i) => {
                      return (
                        <div key={uuid()} className="eachCrime">
                          <div>
                            <h3>{i.incident_offense}</h3>
                            <h4>{i.incident_offense_detail_description}</h4>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}
