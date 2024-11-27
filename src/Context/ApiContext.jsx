/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { availableCountries } from "../assets/availableAssets";

const ApiContextBuilder = createContext();
const ApiContext = ({ children }) => {
  const [today, setToday] = useState("");
  const [loading, setLoading] = useState(false);

  const [countryName, setCountryName] = useState({
    displayName: availableCountries[0].displayName,
    apiName: availableCountries[0].apiName,
  });

  const [cityName, setCityName] = useState({
    displayName: availableCountries[0].cities[0].displayName,
    apiName: availableCountries[0].cities[0].apiName,
  });

  const [timing, setTiming] = useState({
    Fajr: "",
    Dhuhr: "",
    Asr: "",
    Maghrib: "",
    Isha: "",
  });

  useEffect(() => {
    const getDataAboutPrayerTime = async () => {
      setLoading(true);
      const { data } = await axios.get(
        `https://api.aladhan.com/v1/timingsByCity?country=${countryName.apiName}&city=${cityName.apiName}`
      );
      setTiming(data.data.timings);
      setLoading(false);
    };
    getDataAboutPrayerTime();
  }, [cityName, countryName]);

  //  get current time and day
  useEffect(() => {
    const t = moment();
    setToday(t.format("MMMM Do YYYY | hh:mm"));
  }, [timing]);

  const selectMenuChangeForCountry = (e) => {
    setLoading(true);
    const countryObject = availableCountries.find((country) => {
      return country.apiName === e.target.value;
    });

    setCountryName(countryObject);
    setCityName("");
    setLoading(false);
  };

  let indexOfCountry;
  if (countryName.apiName === "EG") {
    indexOfCountry = 0;
  } else {
    indexOfCountry = 1;
  }

  // select menu change
  const selectMenuChangeForCity = (e) => {
    setLoading(true);
    const cityObject = availableCountries[indexOfCountry].cities.find(
      (city) => {
        return city.apiName === e.target.value;
      }
    );
    setCityName(cityObject);
    setLoading(false);
  };

  return (
    <ApiContextBuilder.Provider
      value={{
        cityName,
        countryName,
        today,
        setCityName,
        setCountryName,
        setTiming,
        timing,
        selectMenuChangeForCity,
        selectMenuChangeForCountry,
        setToday,
        loading,
        setLoading,
      }}
    >
      {children}
    </ApiContextBuilder.Provider>
  );
};

function UseApi() {
  const context = useContext(ApiContextBuilder);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { UseApi, ApiContext };
