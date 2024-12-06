import { Grid2 as Grid, Typography } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { HeaderContainer } from "./Header.style";
function Header(): JSX.Element {
  return (
    <HeaderContainer>
      <Grid columns={4}>
        <Typography>WebChat</Typography>
      </Grid>
      <Grid container spacing={1} columns={6}>
        <FiberManualRecordIcon color="success" />
        <Typography>Conectado</Typography>
      </Grid>
    </HeaderContainer>
  );
}

export default Header;
