import React, { useState } from 'react';
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Typography, Toolbar, AppBar, Button, Box, SwipeableDrawer, List, ListItem, Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  AppBar: {
    marginBottom: theme.spacing(2)
  },
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
  },
  warnFont: {
    fontFamily: "Exo",
  },
  font: {
    fontFamily: 'Caveat'
  },
  navIconHide: {
    marginRight: theme.spacing(2),
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: 500,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: "center"
  },
}));

export default function Navbar({ user }) {
  const [openMobile, setopenMobile] = useState(false)
  const classes = useStyles();

  const list = () => (
    <List>
      <ListItem>
        <Link href='/'>
          <Typography variant="h6" className={classes.font}>
            <Link href="/">Expense tracker</Link>
          </Typography>
        </Link>
      </ListItem>
      <Divider />
      {user &&
        <>
          <ListItem>
            <Typography variant="body1">
              <Link href="/today">Today</Link>
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1">
              <Link href="/week">Weekly</Link>
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1">
              <Link href="/month">Monthly</Link>
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1">
              <Link href="/analysis">Analyse</Link>
            </Typography>
          </ListItem>
        </>
      }
    </List>
  )
  return (
    <>
      <AppBar position="static" className={classes.AppBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.navIconHide}
            color="inherit"
            onClick={() => setopenMobile(!openMobile)}
            aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Box className={classes.title}>
            <Typography variant="h5" className={classes.font}>
              <Link href="/">₹ Expense tracker</Link>
            </Typography>
          </Box>
          {user ?
            <Button color="inherit"><Link href="/api/logout">logout</Link></Button>
            :
            <Button color="inherit"><Link href="/api/login">login</Link></Button>
          }
        </Toolbar>
      </AppBar>
      {(!user) &&
        <Typography variant="h5" align="center" className={classes.warnFont}>
          Please login to access the expense tracker , <Link href="/api/login">login</Link>
        </Typography>
      }
      <SwipeableDrawer
        anchor='left'
        open={openMobile}
        className={classes.drawerPaper}
        onClose={() => setopenMobile(false)}
        onOpen={() => setopenMobile(true)}
      >
        {list()}
      </SwipeableDrawer>
    </>
  );
}
