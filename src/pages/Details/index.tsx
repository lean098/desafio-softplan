import React from 'react';

// React
import { useSelector, useDispatch } from 'react-redux';

// React Router DOM
import { useLocation, Link } from 'react-router-dom';

// Material UI
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

// Constants
import CONST_RULES from 'constants/rules';
import CONST_IMAGE from 'constants/images';
import PATH from 'constants/basePath';

// Actions
import { deleteUserRequest } from 'store/ducks/users/actions';

// Types
import { ApplicationState } from 'store';

const Details: React.FC = () => {
  const dispatch = useDispatch();

  const { state: user }: any = useLocation();

  const loggedUser = useSelector(
    (state: ApplicationState) => state.users.loggedUser,
  );

  const handleDelete = async (userId: string) => {
    try {
      dispatch(
        deleteUserRequest({
          userId,
        }),
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          marginBottom: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Box sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 4,
                }}>
                <Avatar
                  alt={user.state.firstName}
                  src={user.state.picture || CONST_IMAGE.PLACEHOLDER_IMAGE}
                  sx={{
                    width: 100,
                    height: 100,
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled
                margin='normal'
                name='firstName'
                required
                fullWidth
                id='firstName'
                label='Nome'
                value={user.state.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled
                margin='normal'
                name='lastName'
                required
                fullWidth
                id='lastName'
                label='Sobre Nome'
                value={user.state.lastName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled
                margin='normal'
                name='document'
                required
                fullWidth
                id='document'
                label='CPF'
                value={user.state.document}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled
                margin='normal'
                name='birthDate'
                required
                fullWidth
                id='birthDate'
                label='Nascimento'
                value={user.state.birthDate}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                margin='normal'
                required
                fullWidth
                id='email'
                name='email'
                label='Email'
                value={user.state.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                margin='normal'
                fullWidth
                id='role'
                name='role'
                select
                label='Cadastrado como'
                value={user.state.role}>
                {CONST_RULES.RULES.map(({ KEY, VALUE }) => (
                  <MenuItem key={KEY} value={KEY}>
                    {VALUE}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          {loggedUser?.role === 'ADMIN' && (
            <Button
              data-cy='remove'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2, bgcolor: 'red' }}
              onClick={() => handleDelete(user.state.id)}>
              Deletar
            </Button>
          )}
          <Grid
            container
            justifyContent='center'
            sx={{
              marginTop: 2,
            }}>
            <Grid item>
              <Link to={PATH.USERS}>Voltar</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Details;
export { Details };
