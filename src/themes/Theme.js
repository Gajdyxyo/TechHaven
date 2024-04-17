import { createTheme } from "@mui/material";
const Theme = createTheme ({
    palette: {
        background: {
          default: '#CCCCCC',
        },
    },
    typography: {
        fontFamily: 'Poppins, sans-serif',
        button: {
            textTransform: 'none',
            fontWeight: '700',
        },
        h1:{
            fontSize: '1.5em',
            fontWeight: '800',
        },
        h2:{
            fontSize: '1.3em',
            fontWeight: '600',
        }
        ,
        body1:{
            fontSize: '0.95em',
            fontWeight: '400',
        },
        body2:{
            fontWeight: '600',
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
                a, a:visited, a:hover, a:focus, a:active {
                    text-decoration: none !important;
                    
                }
                .MuiInput-underline:before {
                    border-bottom: none !important;
                }
                .MuiInput-underline:after {
                    border-bottom: none !important;
                }
            `,
        },
        MuiButton: {
            variants: [
              {
                props: { variant: 'webName' },
                style: {
                  fontFamily: 'Poppins, sans-serif',  
                  fontSize: '1.3em',
                  fontWeight: '700',
                },
              },
              {
                props: { variant: 'linkBttns'},
                style: {
                    fontSize: '1.1em',
                    fontWeight: '600',
                }
              },
            ],
        },
    },
});
export default Theme;