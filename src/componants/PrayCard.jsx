/* eslint-disable react/prop-types */
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
// import Grid from "@mui/material/Grid2";

import moment from "moment";
import { UseApi } from "../Context/ApiContext";

const PrayCard = ({ prayerName, prayerTime, prayerImage }) => {
  const { loading } = UseApi();
  // Convert the prayer time to a moment object and format it in 12-hour format with AM/PM
  const time12h = moment(prayerTime, "HH:mm").format("hh:mm");

  return (
    <>
      <Card sx={{ display: "flex" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {prayerName}
            </Typography>
            {loading ? (
              <Typography
                component="div"
                variant="h4"
                sx={{ color: "text.secondary" }}
              >
                انتظر...
              </Typography>
            ) : (
              <Typography
                component="div"
                variant="h4"
                sx={{ color: "text.secondary" }}
              >
                {time12h}
              </Typography>
            )}
          </CardContent>
          <Box
            xs={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
          ></Box>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 110 }}
          image={prayerImage}
          alt={prayerName}
        />
      </Card>
    </>
  );
};

export default PrayCard;
