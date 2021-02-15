import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Box, Switch, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    header: {
        padding: theme.spacing(1, 0),
        display: "flex",
        justifyContent: "center",
    },
    headerText: {
        flexGrow: 1,
        padding: theme.spacing(0, 4),
        fontStyle: "italic",
        verticalAlign: 'middle',
        textAlign: "center",
    }
}));

export default function Header({ darkMode, setDarkMode }) {
    const classes = useStyles();
    const [quotes, setQuotes] = useState('loading...')

    useEffect(() => {
        getQuotes();
    }, [])

    const getQuotes = async () => {
        let res = await Axios.get('https://api.quotable.io/random')
        let res2 = res.data
        setQuotes(res2.content)
    }
    const toggleTheme = async (mode) => {
        setDarkMode(mode)
        await localStorage.setItem('mode', JSON.stringify(mode));
    }
    return (
        <Box className={classes.header} alignItems="center">
            <Typography varient="body1" className={classes.headerText}>
                {quotes}
            </Typography>
            <Switch
                checked={darkMode}
                onChange={() => toggleTheme(!darkMode)}
            />
        </Box>
    )
}
