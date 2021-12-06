import React from 'react';

// Redux
import { useDispatch } from 'react-redux';

// React Router DOM
import { Link } from 'react-router-dom';

// Formik
import { useFormik } from 'formik';

// Material UI
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

// Material Icons
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

// Actions
import { loginRequest } from 'store/ducks/users/actions';

// Yup Schemas
import { signInSchema } from 'yupSchemas/users';

// Constants
import PATH from 'constants/basePath';

const SignIn: React.FC = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: signInSchema,
    onSubmit: (values) => {
      try {
        const { email, password } = values;

        dispatch(
          loginRequest({
            email,
            password,
          }),
        );
      } catch (error) {
        console.error(error);
      }
    },
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    formik;

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Avatar sx={{ m: 2, bgcolor: 'primary.main', width: 70, height: 70 }}>
          <LockOutlinedIcon />
        </Avatar>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                role='textbox'
                error={Boolean(errors.email && touched.email)}
                helperText={errors.email && touched.email && errors.email}
                margin='normal'
                required
                fullWidth
                id='email'
                name='email'
                label='Email'
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputProps={{
                  'data-testid': 'password',
                }}
                error={Boolean(errors.password && touched.password)}
                helperText={
                  errors.password && touched.password && errors.password
                }
                margin='normal'
                required
                fullWidth
                id='password'
                name='password'
                type='password'
                label='Senha'
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}>
            Entrar
          </Button>
          <Grid container justifyContent='center'>
            <Grid item>
              <Link to={PATH.REGISTER}>Fazer cadastro</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
export { SignIn };
