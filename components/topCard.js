import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: 30
    },
    CardContent: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    CardAction: {
        backgroundColor: "red",
        height: 5,
        padding: 0
    },
    bold: {
        fontWeight: "bold"
    }
}));

export default function TopCard({ total }) {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardContent className={classes.CardContent}>
                    <Typography variant="h5" className={classes.bold}>
                        Total
                </Typography>
                    <Typography variant="h5" className={classes.bold}>
                        ₹ {total}
                    </Typography>
                </CardContent>
                <CardActions className={classes.CardAction}></CardActions>
            </CardActionArea>
        </Card>
    )
}
