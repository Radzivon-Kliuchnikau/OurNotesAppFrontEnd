import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
    interface BreakpointOverrides {
        xs: false; // removes the `xs` breakpoint
        sm: false;
        md: false;
        lg: false;
        xl: false;
        mobile: true; // adds the `mobile` breakpoint
        tablet: true;
        biggerTablet: true;
        laptop: true;
        desktop: true;
    }
}

export const theme = createTheme({
    breakpoints: {
        values: {
            mobile: 0,
            tablet: 640,
            biggerTablet: 800,
            laptop: 1024,
            desktop: 1200,
        },
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    "&.Mui-focused": {
                        color: "black",
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    height: "50px",
                    border: "1px solid black",
                    borderRadius: "25px",
                    color: "black",
                    textDecoration: "none",
                    textTransform: "none",
                    fontSize: "18px",
                },
            },
        },
    },
});
