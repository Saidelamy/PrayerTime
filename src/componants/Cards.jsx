import { Stack } from "@mui/material";
import PrayCard from "./PrayCard";
import { UseApi } from "../Context/ApiContext";

const Cards = () => {
  const { timing } = UseApi();
  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent={"space-around"}
        style={{ marginTop: "50px" }}
      >
        <PrayCard
          prayerName={"الفجر"}
          prayerTime={timing?.Fajr}
          prayerImage={
            "https://www.arabiantongue.com/wp-content/uploads/2023/02/waking-up-for-fajr-1024x640-1.jpg"
          }
        />
        <PrayCard
          prayerName={"الضهر"}
          prayerTime={timing?.Dhuhr}
          prayerImage={
            "https://jesusprayerministry.com/wp-content/uploads/2023/12/how-to-pray-dhuhr-930x620.jpg"
          }
        />
        <PrayCard
          prayerName={"العصر"}
          prayerTime={timing?.Asr}
          prayerImage={
            "https://www.troid.org/wp-content/uploads/2007/06/quran_room.jpg"
          }
        />
        <PrayCard
          prayerName={"المغرب"}
          prayerTime={timing?.Maghrib}
          prayerImage={
            "https://jesusprayerministry.com/wp-content/uploads/2023/12/maghrib-prayer-preparation-1024x585.jpg"
          }
        />
        <PrayCard
          prayerName={"العشاء"}
          prayerTime={timing?.Isha}
          prayerImage={
            "https://i.pinimg.com/originals/0d/7c/1c/0d7c1c5b381e96eb69e2af2399b861bc.png"
          }
        />
      </Stack>
    </>
  );
};

export default Cards;
