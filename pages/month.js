import React from 'react';
import SimpleCard from '../components/simpleCard';
import TopCard from '../components/topCard';
import auth0 from '../utils/auth0';
import Axios from 'axios';
import Navbar from '../components/Navbar';
import { Grid, Container } from '@material-ui/core';
import { MonthDaysSort } from '../utils/helpFunc';
import baseUrl from '../utils/baseUrl'

export default function Month({ user, data }) {
    const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return (
        <>
            <Navbar user={user} />
            <Container maxWidth="sm">
                <TopCard total={data.reduce((a, b) => a + b.total, 0)} />
                <Grid container spacing={3}>
                    {data.map(item => (
                        <Grid item xs={12} sm={6} md={4} key={item._id}>
                            <SimpleCard text={monthArray[item._id]} amount={item.total} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    )
}

export async function getServerSideProps(ctx) {
    const session = await auth0.getSession(ctx.req)
    const monthDays = []
    if (session?.user) {
        try {
            let res = await Axios.get(`${baseUrl}/api/${user.sub}`)
            let res2 = res.data
            monthDays = MonthDaysSort(res2)
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
            data: monthDays,
            user: session?.user || null,
        }
    }
}