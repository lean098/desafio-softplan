import React, { useState, useEffect } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// React Router DOM
import { useHistory } from 'react-router-dom';

// Material UI
import {
  Container,
  Box,
  Grid,
  Stack,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
  Fab,
  Typography,
  Zoom,
  Button,
} from '@mui/material';

// Material Icons
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';

// useDebounce
import { useDebounce } from 'use-debounce';

// Constants
import CONST_IMAGE from 'constants/images';
import PATH from 'constants/basePath';

// Actions
import { listUsersRequest } from 'store/ducks/users/actions';

// Types
import { ApplicationState } from 'store';
import { UserInterface } from 'store/ducks/users/types';

// Styles
import { Search, SearchIconWrapper, StyledInputBase } from './styles';

const Users: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const initialUsersList = useSelector(
    (state: ApplicationState) => state.users.usersList,
  );

  const loggedUser = useSelector(
    (state: ApplicationState) => state.users.loggedUser,
  );

  const [users, setUsers] = useState<UserInterface[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [debounceSearchTerm] = useDebounce(searchTerm, 200);

  useEffect(() => {
    dispatch(listUsersRequest({}));
  }, [dispatch]);

  useEffect(() => {
    setUsers(initialUsersList);
  }, [initialUsersList]);

  useEffect(() => {
    if (debounceSearchTerm) {
      const found = initialUsersList.filter(
        (user) =>
          user.firstName.replace(' ', '').toLowerCase().includes(searchTerm) ||
          user.lastName.replace(' ', '').toLowerCase().includes(searchTerm),
      );

      setUsers(found);
    } else {
      setUsers(initialUsersList);
    }
  }, [debounceSearchTerm, initialUsersList, searchTerm]);

  return (
    <main>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
        }}>
        <Container maxWidth='sm'>
          <Stack direction='row' spacing={2} justifyContent='center'>
            {Array.isArray(initialUsersList) &&
            initialUsersList.filter((user) => user.id !== loggedUser?.id)
              .length > 0 ? (
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder='Digite o nome do usuário…'
                  inputProps={{
                    'aria-label': 'search',
                  }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Search>
            ) : (
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                <Typography variant='h5' color='primary'>
                  Os usuários cadastrados aparecerão aqui.
                </Typography>

                {loggedUser?.role === 'ADMIN' && (
                  <Button
                    variant='contained'
                    endIcon={<AddIcon />}
                    sx={{
                      marginTop: 4,
                    }}
                    onClick={() => history.push(PATH.USER_REGISTER)}>
                    Cadastrar
                  </Button>
                )}
              </Box>
            )}
          </Stack>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth='md'>
        <Grid container spacing={4}>
          {Array.isArray(users) &&
            users
              .filter((user) => user.id !== loggedUser?.id)
              .map((user: UserInterface) => (
                <Grid item key={user.id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}>
                    <CardMedia
                      component='img'
                      image={user.picture || CONST_IMAGE.PLACEHOLDER_IMAGE}
                      alt={`imagem ${user.firstName}`}
                      sx={{
                        maxHeight: 210,
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant='h5' component='h2'>
                        {user.firstName}&nbsp;
                        {user.lastName}
                      </Typography>
                      <Typography>{`Contato: ${user.email}`}</Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                      <Tooltip
                        placement='top'
                        title='Detalhes do usuário'
                        TransitionComponent={Zoom}
                        arrow>
                        <IconButton
                          onClick={() => {
                            history.push(`/user/${user.id}`, { state: user });
                          }}>
                          <InfoIcon color='primary' />
                        </IconButton>
                      </Tooltip>
                    </CardActions>
                  </Card>
                </Grid>
              ))}

          {loggedUser?.role === 'ADMIN' &&
            Array.isArray(users) &&
            users.filter((user) => user.id !== loggedUser?.id).length > 0 && (
              <Tooltip
                placement='left'
                title='Cadastrar usuário'
                TransitionComponent={Zoom}
                arrow>
                <Fab
                  sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                  }}
                  onClick={() => history.push(PATH.USER_REGISTER)}
                  aria-label='cadastrar usuário'
                  color='primary'>
                  <AddIcon />
                </Fab>
              </Tooltip>
            )}
        </Grid>
      </Container>
    </main>
  );
};

export default Users;
export { Users };
