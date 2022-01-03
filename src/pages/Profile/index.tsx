import React from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// React Router DOM
import { Link } from 'react-router-dom';

// Formik
import { useFormik } from 'formik';

// Yup
import { object, string } from 'yup';

// Material UI
import { Box, Button, TextField, Avatar, Grid, Container } from '@mui/material';

// Helpers
import { stringAvatar } from 'helpers/stringAvatar';

// Constants
import PATH from 'constants/basePath';

// Actions
import { updateUserRequest } from 'store/ducks/users/actions';

// Types
import { ApplicationState } from 'store';
import { UserInterface } from 'store/ducks/users/types';

const Profile: React.FC = () => {
  const dispatch = useDispatch();

  const loggedUser = useSelector(
    (state: ApplicationState) => state.users.loggedUser,
  );

  const factoryValues = (data: UserInterface | null | undefined) => {
    if (data) {
      return {
        id: loggedUser?.id || '',
        firstName: loggedUser?.firstName || '',
        lastName: loggedUser?.lastName || '',
        picture: loggedUser?.picture || '',
        birthDate: loggedUser?.birthDate || '',
        email: loggedUser?.email || '',
        document: loggedUser?.document || '',
        role: loggedUser?.role || 'USER',
        name: `${loggedUser?.firstName} ${loggedUser?.lastName}`,
        password: '',
      };
    }

    return {
      id: '',
      firstName: '',
      lastName: '',
      picture: '',
      birthDate: '',
      email: '',
      document: '',
      role: '',
      name: '',
      password: '',
    };
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: factoryValues(loggedUser),
    validationSchema: object({
      password: string().required('Campo obrigátorio'),
    }),
    onSubmit: (values) => {
      try {
        const { id: userId, password } = values;

        dispatch(
          updateUserRequest({
            userId,
            user: {
              ...values,
              password: btoa(password),
            },
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
    <Container component='main' maxWidth='sm'>
      <Box
        sx={{
          marginTop: 8,
          marginBottom: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 4,
                }}>
                {loggedUser?.picture ? (
                  <Avatar
                    alt={loggedUser.firstName}
                    src={loggedUser.picture}
                    sx={{
                      width: 100,
                      height: 100,
                    }}
                  />
                ) : (
                  <Avatar
                    {...stringAvatar(
                      `${loggedUser?.firstName} ${loggedUser?.lastName}`,
                    )}
                    sx={{
                      width: 100,
                      height: 100,
                    }}
                  />
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                inputProps={{
                  'data-testid': 'fullName',
                }}
                margin='normal'
                required
                autoFocus
                fullWidth
                name='name'
                label='Nome completo'
                value={values.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                margin='normal'
                required
                autoFocus
                fullWidth
                name='email'
                label='Email'
                value={values.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                margin='normal'
                required
                autoFocus
                fullWidth
                name='birthDate'
                label='Data de nascimento'
                value={values.birthDate}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={Boolean(errors.password && touched.password)}
                helperText={
                  errors.password && touched.password && errors.password
                }
                inputProps={{
                  'data-cy': 'new-password',
                  'data-testid': 'new-password',
                }}
                margin='normal'
                required
                fullWidth
                name='password'
                type='password'
                label='Nova senha'
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            disabled={!values.password}
            type='submit'
            data-cy='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}>
            Atualizar
          </Button>
          <Grid container justifyContent='center'>
            <Grid item>
              <Link to={PATH.USERS}>Voltar</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
export { Profile };
