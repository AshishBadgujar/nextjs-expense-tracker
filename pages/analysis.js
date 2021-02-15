import React, { useEffect, useState } from 'react';
import BarChart from '../components/barChart';
import LineChart from '../components/lineChart';
import baseUrl from '../utils/baseUrl';
import auth0 from '../utils/auth0';
import Axios from 'axios';
import Navbar from '../components/Navbar';
import { AllDaysCategorySort } from '../utils/helpFunc';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Modal, Backdrop, Fade, Button, Divider, Typography, Container, Grid } from '@material-ui/core'
import { motion } from 'framer-motion'

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
  const router = useRouter()

  useEffect(() => {
    convertArray(data)
  }, [data])

  const convertArray = (data) => {
    let arr = data.map(item => {
      return {
        date: item._id,
        value: item.data.reduce((a, b) => a + b.amount, 0)
      }
    })
    setLineArray(arr)
  }

  const handleDelete = async () => {
    setOpen(false)
    const res = await Axios.delete(`${baseUrl}/api/ashish`)
    const res2 = res.data
    console.log(res2, "this is delete response")
    router.push('/')
  }

  const classes = useStyles()
  return (
    <>
      <Navbar user={user} />
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
              <motion.div
                initial={{ opacity: 0, x: -300 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                <img src="/analysis.jpg" style={{ width: "100%", height: "100%" }} />
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                <Typography variant='h4' align="center">
                  Category wise
                </Typography>
                <BarChart data={AllDaysCategorySort(data)} />
              </motion.div>
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
          <Divider />
        </Box>
      </Container>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const session = await auth0.getSession(ctx.req)
  const res2 = []
  if (session) {
    let user = session.user;
    try {
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
      data: res2,
      user: session?.user || null,
    }
  }
}