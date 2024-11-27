import { useEffect, useState } from "react";
import { UseApi } from "../Context/ApiContext";
import { availablePrayers } from "../assets/availableAssets";
import moment from "moment";
import "moment/dist/locale/ar-tn";
moment.locale("ar-tn");

const useGetTime = () => {
  const { timing } = UseApi();
  const [nextPrayerIndex, setNextPrayerIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState("");

  // function to get next prayer and how much time for next prayer
  const setUpNameOfPrayer = () => {
    // const isha = timing["Isha"];
    // const ishaMoment = moment(isha, "hh:mm");
    const momentNow = moment();
    let prayerIndex = 0;

    if (
      momentNow.isAfter(moment(timing["Fajr"], "hh:mm")) &&
      momentNow.isBefore(moment(timing["Dhuhr"], "hh:mm"))
    ) {
      prayerIndex = 1;
    } else if (
      momentNow.isAfter(moment(timing["Dhuhr"], "hh:mm")) &&
      momentNow.isBefore(moment(timing["Asr"], "hh:mm"))
    ) {
      prayerIndex = 2;
    } else if (
      momentNow.isAfter(moment(timing["Asr"], "hh:mm")) &&
      momentNow.isBefore(moment(timing["Maghrib"], "hh:mm"))
    ) {
      prayerIndex = 3;
    } else if (
      momentNow.isAfter(moment(timing["Maghrib"], "hh:mm")) &&
      momentNow.isBefore(moment(timing["Isha"], "hh:mm"))
    ) {
      prayerIndex = 4;
    } else {
      prayerIndex = 0;
    }

    setNextPrayerIndex(prayerIndex);

    // now we get the prayer we will get the time
    const nextPrayerObject = availablePrayers[prayerIndex];
    const nextPrayerTime = timing[nextPrayerObject.key];
    const nextPrayerTimeMoment = moment(nextPrayerTime, "hh:mm");

    // الوقت المتبقي سيتم عرضه كا ثواني
    let timeLeft = moment(nextPrayerTime, "hh:mm").diff(momentNow);

    if (timeLeft < 0) {
      const midnightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow);

      const fajrToMidnightDiff = nextPrayerTimeMoment.diff(
        moment("00:00:00", "hh:mm:ss")
      );

      const totalDiffTime = midnightDiff + fajrToMidnightDiff;

      timeLeft = totalDiffTime;
    }
    // عرض الوقت المتبقي كا ساعات ودقايق
    const DurationTimeLeft = moment.duration(timeLeft);

    // Get hours in 12-hour format
    let hours12 = DurationTimeLeft.hours() % 12;
    hours12 = hours12 === 0 ? hours12 / 12 : hours12; // Convert 0 to 12 for 12-hour format

    setTimeLeft(
      `${hours12 < 10 ? "0" + hours12 : hours12}:${
        DurationTimeLeft.minutes() < 10
          ? "0" + DurationTimeLeft.minutes()
          : DurationTimeLeft.minutes()
      }:${
        DurationTimeLeft.seconds() < 10
          ? "0" + DurationTimeLeft.seconds()
          : DurationTimeLeft.seconds()
      } `
    );
  };

  // get how much time is left for the next prayer
  useEffect(() => {
    const interval = setInterval(() => {
      setUpNameOfPrayer();
    }, 1000);
    return () => clearInterval(interval);
  }, [timing]);

  return {
    nextPrayerIndex,
    timeLeft,
  };
};

export default useGetTime;
