import React, { useContext, useState } from 'react'
import { Avatar, Box, Button, Container, Grid, IconButton, Snackbar, TextField, Typography } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import blogContext from '../Context/BlogContext';
import { Link, useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';


export const Login = () => {
    let history = useNavigate()
    const context = useContext(blogContext)
    let { theme, url, setLoggedinUser } = context;

    const [loginDetails, setLoginDetails] = useState({ username: "", password: "" })
    const [loginError, setLoginError] = useState(null)
    const [open, setOpen] = React.useState(false);

    const darkTheme = createTheme({
        palette: {
            mode: theme ? 'light' : 'dark',
            primary: {
                main: '#1976d2',
            },
        },
    });

    const handleSubmit = async () => {
        // console.log(loginDetails)
        let res = await fetch(`${url}/api/v1/users/login/`, {
            method: "POST",
            body: JSON.stringify(loginDetails),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        let status = await res.json()
        if (res.status === 200) {
            setLoggedinUser(status)
            setLoginError({ type: "success", msg: "Logged in success." })
            localStorage.setItem('user', JSON.stringify(status))
            history('/')
        }
        else {

            setLoginError({ type: "error", msg: status.msg })
            setOpen(true)
            // await console.log(loginError);
        }
        // .then(data => {

        //     if (data.status == 401) {
        //         console.log(data.json().then(d => console.log(d)));
        //         // setLoginError(data.json())
        //     }

        //     console.log(loginError);
        //     // data.json()
        // })
        // .then(d => (
        //     // setLoggedinUser(d),
        //     // localStorage.setItem('user', JSON.stringify(d)),
        //     history('/')
        // ))

    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });


    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="name"
                                autoFocus
                                value={loginDetails.username}
                                onChange={(e) => setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value })}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={loginDetails.password}
                                onChange={(e) => setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value })}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleSubmit}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link to="#" variant="body2" color='blue'>
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link to="/signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                        <Alert onClose={handleClose} severity={loginError?.type} sx={{ width: '100%' }}>
                            {loginError?.msg}
                        </Alert>
                    </Snackbar>
                </Container>
            </ThemeProvider>
        </>
    )
}
