import React,{useState,useEffect} from 'react';
import { ThemeProvider ,createMuiTheme} from '@material-ui/core/styles';
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Paper } from '@material-ui/core';

export default function Layout({children}) {
    const [darkMode,setDarkMode]=useState(false)

    useEffect(() => {
        Mode()
    }, [])
    
    const Mode=async()=>{
        let theme=await localStorage.getItem('mode')
        theme=JSON.parse(theme)
        if(theme!=null){
        setDarkMode(theme)
        } 
    }

    const theme = createMuiTheme({
        typography: {
            "fontFamily":"Caveat",
           },
        palette: {
            type: darkMode ? "dark" : "light",
            primary: {
            main: darkMode ? "#333" : "#fff"
            },
    
        },
    });
    return (
        <ThemeProvider theme={theme}>
        <Paper square style={{minHeight:"100vh"}}>
            <Header  darkMode={darkMode} setDarkMode={setDarkMode}/>
                {children}
            <Footer/>
        </Paper>
      </ThemeProvider>
    )
}
