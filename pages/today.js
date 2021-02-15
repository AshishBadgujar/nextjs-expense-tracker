import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Box, Fab, Modal, Backdrop, Fade, Input, Button, InputLabel, FormControl, Select, MenuItem, InputAdornment, Divider, Container } from '@material-ui/core'
import FormHelperText from '@material-ui/core/FormHelperText';
import Add from '@material-ui/icons/Add'
import SimpleCard from '../components/simpleCard'
import TopCard from '../components/topCard';
import Navbar from '../components/Navbar';
import auth0 from '../utils/auth0';
import Axios from 'axios'
import { DateSort } from '../utils/helpFunc';
import baseUrl from '../utils/baseUrl';

const useStyles = makeStyles((theme) => ({
    fab: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
        marginLeft: theme.spacing(1),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "none",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "column",
        width: "60%"
    },
    margin: {
        marginTop: 20,
        margin: theme.spacing(1),
        minWidth: 115
    },
    flex: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center"
    }
}));

export default function Today({ user, data }) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [text, setText] = useState('');
    const [amount, setAmount] = useState(null);
    const [category, setCategory] = useState('')
    const [expense, setExpense] = useState(data);

    const handleSubmit = async () => {
        setOpen(false)
        try {
            const res = await Axios.put(`${baseUrl}/api/${user.sub}`, { text, category, amount })
            const res2 = res.data
            let newData = DateSort(res2)
            setText('')
            setAmount(null)
            setExpense(newData)
            setCategory('')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Navbar user={user} />
            <Container maxWidth="sm">
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
                        <Box className={classes.paper} >
                            <FormControl fullWidth className={classes.margin}>
                                <InputLabel htmlFor="standard-adornment-amount">Why</InputLabel>
                                <Input
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                />
                            </FormControl>
                            <FormControl className={classes.margin}>
                                <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    label="Category"
                                >
                                    <MenuItem value='Food'>Food</MenuItem>
                                    <MenuItem value='Rent'>Rent</MenuItem>
                                    <MenuItem value='College'>College</MenuItem>
                                    <MenuItem value='Other'>Other</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className={classes.margin}>
                                <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
                                <Input
                                    id="component-helper-text"
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                                />
                                <FormHelperText id="component-helper-text">Please be loyal:)</FormHelperText>
                            </FormControl>
                            <Button color="secondary" className={classes.margin} onClick={() => handleSubmit()}>Done</Button>
                        </Box>
                    </Fade>
                </Modal>
                <TopCard total={expense.reduce((a, b) => a + b.amount, 0)} />
                {expense.map(item => <SimpleCard key={item._id} text={item.text} amount={item.amount} />)}
                <Fab color="primary" variant="round" aria-label="add" className={classes.fab} onClick={() => setOpen(true)}>
                    <Add />
                </Fab>
            </Container>
        </>
    )
}

export async function getServerSideProps(ctx) {
    const session = await auth0.getSession(ctx.req)
    const dayData = []
    if (session) {
        let user = session.user;
        try {
            let res = await Axios.get(`${baseUrl}/api/${user.sub}`)
            let res2 = res.data
            dayData = DateSort(res2)
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
            data: dayData,
            user: session?.user || null,
        }
    }
}