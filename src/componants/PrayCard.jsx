/* eslint-disable react/prop-types */
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
// import Grid from "@mui/material/Grid2";

import moment from "moment";

const PrayCard = ({ prayerName, prayerTime, prayerImage }) => {
  // Convert the prayer time to a moment object and format it in 12-hour format with AM/PM
  const time12h = moment(prayerTime, "HH:mm").format("hh:mm");

  return (
    <>
      <Card sx={{ maxWidth: 365, minWidth: 220 }}>
        <Box>
          <CardMedia
            sx={{ height: 170 }}
            image={prayerImage}
            title={prayerName}
          />
          <CardContent>
            <h2>{prayerName}</h2>
            <Typography variant="h3" sx={{ color: "text.secondary" }}>
              {time12h}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </>
  );
};

export default PrayCard;
