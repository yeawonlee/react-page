import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

/*
const lightTheme = {
    body: "#fff",
    fontColor: "#000",
};

const darkTheme = {
    body: "#000",
    fontColor: "#fff",
};
*/

const Themes = () => {

    /*
    const [theme, setTheme] = useState("light");

    const themeToggler = () => { 
        theme === "light" ? setTheme("dark") : setTheme("light");
    };
    */
    
    const [darkMode, setDarkMode] = useState(false);

    const theme = React.createMuiTheme({
        palttte: {
            typs: darkMode ? "dark" : "light"
        }
    })

    return(
        /*
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            <div>
                hello react!
            </div>
        </ThemeProvider>
        */
        <ThemeProvider theme={theme}>
            <Paper style={{ height: "250vh" }}>

            </Paper>
        </ThemeProvider>
    );
}

export default Themes;