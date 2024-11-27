import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Cards from "./Cards";
import useGetTime from "../hooks/useGetTime";
import SelectMenu from "./SelectMenu";
import { UseApi } from "../Context/ApiContext";
import { availablePrayers } from "../assets/availableAssets";
const MainContent = () => {
  const { nextPrayerIndex, timeLeft } = useGetTime();
  const {
    today,
    cityName,
    countryName,
    selectMenuChangeForCity,
    selectMenuChangeForCountry,
    loading,
  } = UseApi();

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid size={{ md: 6, xs: 12 }}>
            <p>{today} </p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <h2>{cityName?.displayName}</h2>
              {cityName === "" ? "" : <span>-</span>}
              <h2>{countryName?.displayName}</h2>
            </div>
          </Grid>
          <Grid size={{ md: 6, xs: 12 }}>
            <h2>
              متبقي حتي صلاة {availablePrayers[nextPrayerIndex].displayName}
            </h2>
            {loading ? (
              <p
                style={{
                  backgroundColor: "#fff",
                  color: "#0D1117",
                  fontSize: "25px",
                  maxWidth: "150px",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                انتظر...
              </p>
            ) : (
              <p
                style={{
                  backgroundColor: "#fff",
                  color: "#0D1117",
                  fontSize: "25px",
                  maxWidth: "150px",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {timeLeft}
              </p>
            )}
          </Grid>
        </Grid>
      </Box>
      {/* end of first label */}

      <Divider style={{ opacity: ".5", borderColor: "#fff" }} />

      <Cards />
      {/* end of cards */}

      <SelectMenu
        cityName={cityName}
        selectMenuChangeForCity={selectMenuChangeForCity}
        selectMenuChangeForCountry={selectMenuChangeForCountry}
        countryName={countryName}
      />
    </>
  );
};

export default MainContent;
