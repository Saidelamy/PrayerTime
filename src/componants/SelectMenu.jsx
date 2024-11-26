import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Stack } from "@mui/material";
import { availableCountries } from "../assets/AvailableCities";
import { UseApi } from "../Context/ApiContext";

const SelectMenu = () => {
  const {
    cityName,
    countryName,
    selectMenuChangeForCity,
    selectMenuChangeForCountry,
  } = UseApi();
  return (
    <>
      <Stack direction="row" display={"flex"} gap={10}>
        <Box style={{ marginTop: "50px", color: "#fff" }}>
          <FormControl
            sx={{ minWidth: 130, maxWidth: 250 }}
            style={{ color: "#fff" }}
          >
            <InputLabel id="demo-simple-select-label">المحافظة</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="المحافظة"
              onChange={selectMenuChangeForCity}
              value={cityName?.apiName}
            >
              {availableCountries
                .find((country) => country.apiName === countryName.apiName)
                ?.cities.map((city) => (
                  <MenuItem key={city.apiName} value={city.apiName}>
                    {city.displayName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
        <Box style={{ marginTop: "50px", color: "#fff" }}>
          <FormControl
            sx={{ minWidth: 130, maxWidth: 250 }}
            style={{ color: "#fff" }}
          >
            <InputLabel id="demo-simple-select-label">البلد</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="البلد"
              onChange={selectMenuChangeForCountry}
              value={countryName?.apiName}
            >
              {availableCountries.map((country) => (
                <MenuItem key={country.apiName} value={country.apiName}>
                  {country.displayName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Stack>
    </>
  );
};

export default SelectMenu;
