import React, { useEffect, useState } from 'react';
import BarChart from '../components/barChart';
import LineChart from '../components/lineChart';
import baseUrl from '../utils/baseUrl';
import auth0 from '../utils/auth0';
import Axios from 'axios';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import { AllDaysCategorySort } from '../utils/helpFunc';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Modal, Backdrop, Fade, Button, Divider, Typography, Container, Grid, Snackbar } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topFlex: {
    display: "flex",
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "none",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3),
    width: "70%"
  },
  margin: {
    marginTop: 20,
  },
  flex: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: 50
  }
}));

export default function Analysis({ user, data }) {
  const [lineArray, setLineArray] = useState([])
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState(false)
  const [toastText, setToastText] = useState('')
  const router = useRouter()

  useEffect(() => {
    let arr = data.map(item => {
      return {
        date: item._id,
        value: item.data.reduce((a, b) => a + b.amount, 0)
      }
    })
    setLineArray(arr)
  }, [])

  const handleDelete = async () => {
    setOpen(false)
    let res = await Axios.delete(`${baseUrl}/api/${user.sub}`)
    let res2 = res.data
    if (res2.message) {
      setToastText(res2.message)
    }
    setToast(true)
    router.push('/')
  }

  const classes = useStyles()
  return (
    <>
      <Navbar user={user} />
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={toast}
        autoHideDuration={4000}
        message={toastText}
      />
      <Container maxWidth="md">
        <Box className={classes.flex}>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={() => setOpen(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}>
            <Fade in={open}>
              <Box className={classes.paper}>
                <Typography variant='h6'>Are you sure want to Delete all your data ?</Typography>
                <Button color="secondary" className={classes.margin} onClick={() => handleDelete()}>yes</Button>
                <Button className={classes.margin} onClick={() => setOpen(false)}>No</Button>
              </Box>
            </Fade>
          </Modal>
          <Grid
            container
            justify="space-around"
            alignItems="stretch"
            spacing={0}>
            <Grid item xs={12} md={6}>
              <Image src="/analysis2.jpg" width={600} height={600} alt="image" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant='h4' align="center">
                Category wise
                </Typography>
              <BarChart data={AllDaysCategorySort(data)} />
            </Grid>
          </Grid>
          <Box className={classes.margin}>
            <Typography variant='h4' align="center">
              Yearly Analysis
            </Typography>
            <LineChart data={lineArray} />
          </Box>
          <Divider />
          <Button color="secondary" onClick={() => setOpen(true)}>Clear all data</Button>
        </Box>
      </Container>
    </>
  )
}

export async function getStaticProps(ctx) {
  const session = await auth0.getSession(ctx.req)
  var res2 = [];
  if (session) {
    try {
      let user = session.user;
      let res = await Axios.get(`${baseUrl}/api/${user.sub}`)
      res2 = res.data
    } catch (error) {
      console.log(error)
    }
  } else {
    const { res } = ctx
    res.writeHead(302, { Location: '/' })
    res.end()
  }

  return {
    props: {
      user: session?.user || null,
      data: res2,
    }
  }
}