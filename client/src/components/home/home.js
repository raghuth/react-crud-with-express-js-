import * as React from "react";
import {
  Container,
  Grid,
  AppBar,
  Box,
  Typography,
  Toolbar,
  Tooltip,
  IconButton,
  Avatar,
} from "@material-ui/core";

const Home = () => {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Grid>
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
              >
                React Crud With Express js
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton></IconButton>
              </Box>
              <Box
                sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              ></Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton sx={{ p: 0 }}>
                    <Avatar alt="Raghavendra" src="" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Toolbar>
          </Grid>
        </Container>
      </AppBar>
    </>
  );
};
export default Home;
