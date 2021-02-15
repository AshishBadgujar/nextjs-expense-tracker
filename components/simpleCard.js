import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Typography, Card, CardActionArea, CardContent } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: 10
    },
    CardContent: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }
}));

export default function SimpleCard({ text, amount }) {
    const classes = useStyles();
    return (
        <>
            <Card className={classes.root} elevation={0}>
                <Divider />
                <CardActionArea>
                    <CardContent className={classes.CardContent}>
                        <Typography variant="h5">
                            {text}
                        </Typography>
                        <Typography variant="h5">
                            ₹ {amount}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <Divider />
            </Card>
        </>
    )
}
