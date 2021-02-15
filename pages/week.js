import React from 'react'
import SimpleCard from '../components/simpleCard'
import TopCard from '../components/topCard';
import auth0 from '../utils/auth0';
import Axios from 'axios';
import { Container, Grid } from '@material-ui/core';
import { DaySort } from '../utils/helpFunc';
import Navbar from '../components/Navbar';
import baseUrl from '../utils/baseUrl';

export default function Week({ user, data }) {
    const daysArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return (
        <>
            <Navbar user={user} />
            <Container maxWidth="sm">
                <TopCard total={data.reduce((a, b) => a + b.total, 0)} />
                <Grid container spacing={3}>
                    {data.map(item => (
                        <Grid item xs={12} sm={6} md={4} key={item._id}>
                            <SimpleCard text={daysArray[item._id]} amount={item.total} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    )
}

export async function getServerSideProps(ctx) {
    const session = await auth0.getSession(ctx.req)
    const weekData = []
    if (session) {
        let user = session.user;
        try {
            let res = await Axios.get(`${baseUrl}/api/weeks/${user.sub}`)
            let res2 = res.data
            weekData = DaySort(res2)
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
            data: weekData,
            user: session?.user || null,
        }
    }
}