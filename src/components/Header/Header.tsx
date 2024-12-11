import { Grid2 as Grid, Typography } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { HeaderContainer } from "./Header.style";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
function Header(): JSX.Element {
  const { auth, session } = useSelector((state: RootState) => state)

  return (
    <HeaderContainer>
      <Grid columns={4}>
        <Typography>WebChat</Typography>
      </Grid>
      <Grid container spacing={1} columns={6}>
        <FiberManualRecordIcon color={session.session ? 'success' : 'error'} />
        <Typography>{session.session ? 'Conectado' : 'Desconectado'}</Typography>
      </Grid>
    </HeaderContainer>
  );
}

export default Header;
