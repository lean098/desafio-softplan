import React, { useState, useCallback, useMemo } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// React Router DOM
import { useHistory } from 'react-router-dom';

// Material UI
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

// Material Icons
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';

// Helpers
import { removeToken } from 'helpers/auth';
import { stringAvatar } from 'helpers/stringAvatar';

// Constants
import PATH from 'constants/basePath';

// Actions
import { logout } from 'store/ducks/users/actions';

// Types
import { ApplicationState } from 'store';

const Header: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const loggedUser = useSelector(
    (state: ApplicationState) => state.users.loggedUser,
  );

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = useCallback(() => {
    setAnchorEl(null);
    removeToken();

    dispatch(logout());

    history.push(PATH.HOME);
  }, [dispatch, history]);

  const handleProfile = useCallback(() => {
    setAnchorEl(null);
    history.push(PATH.USER_PROFILE);
  }, [history]);

  return useMemo(
    () => (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='open drawer'
              sx={{ mr: 2 }}>
              <AllInclusiveIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            {loggedUser?.id && (
              <Box sx={{ display: 'flex' }}>
                <Box display='flex' alignItems='center'>
                  <Typography>{loggedUser.firstName || ''}</Typography>
                  <IconButton
                    size='large'
                    edge='end'
                    aria-label='account of current user'
                    aria-haspopup='true'
                    onClick={handleProfileMenuOpen}
                    color='inherit'>
                    {loggedUser.picture ? (
                      <Avatar
                        alt={loggedUser.firstName}
                        src={loggedUser.picture}
                      />
                    ) : (
                      <Avatar
                        {...stringAvatar(
                          `${loggedUser.firstName} ${loggedUser.lastName}`,
                        )}
                      />
                    )}
                  </IconButton>
                </Box>
              </Box>
            )}
          </Toolbar>
        </AppBar>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={isMenuOpen}
          onClose={() => setAnchorEl(null)}>
          <MenuItem onClick={handleProfile}>Perfil</MenuItem>
          <MenuItem onClick={handleLogout}>Sair</MenuItem>
        </Menu>
      </Box>
    ),
    [loggedUser, anchorEl, handleLogout, handleProfile, isMenuOpen],
  );
};

export default Header;
export { Header };
