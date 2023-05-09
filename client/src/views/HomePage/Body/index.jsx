import { Container, Typography } from "@mui/material";
import { ChangeLog } from "./Changelog";

export const HomePageBody = () => {

  return (
    <Container maxWidth={false} sx={{
      bgcolor: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '5%'
    }}>
      <Typography variant="h4" gutterBottom>
        Weclome to ATC!
      </Typography>
      <Typography variant="body1">
        This is the 3rd version of the website. It works the same way as before.
      </Typography>
      <Typography variant="body1" sx={{ mt: 5}}>
        By Gareth.
      </Typography>

      <ChangeLog />
    </Container >
  )
}