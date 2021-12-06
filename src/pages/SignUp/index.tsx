import React, { useState } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// React Router DOM
import { Link } from 'react-router-dom';

// Formik
import { useFormik } from 'formik';

// UUID
import { v4 as uuidv4 } from 'uuid';

// Image Uploading
import ImageUploading, {
  ImageListType,
  ImageType,
} from 'react-images-uploading';

import InputMask from 'react-input-mask';

// Material UI
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Zoom from '@mui/material/Zoom';

// Material Icons
import CameraAltIcon from '@mui/icons-material/CameraAlt';

// Constants
import CONST_RULES from 'constants/rules';
import CONST_IMAGES from 'constants/images';
import MASKS from 'constants/masks';
import PATH from 'constants/basePath';

// Actions
import { createUserRequest } from 'store/ducks/users/actions';

// Types
import { ApplicationState } from 'store';

// Yup Schemas
import { signUpSchema } from 'yupSchemas/users';

const SignUp: React.FC = () => {
  const dispatch = useDispatch();

  const [picture] = useState<ImageType[]>([]);

  const loggedUser = useSelector(
    (state: ApplicationState) => state.users.loggedUser,
  );

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      id: '',
      firstName: '',
      lastName: '',
      birthDate: '',
      email: '',
      document: '',
      password: '',
      role: '',
      picture,
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      try {
        const { pathname: currentLocation } = window.location;

        dispatch(
          createUserRequest({
            body: {
              ...values,
              id: uuidv4(),
              password: btoa(values.password),
              picture: values.picture[0]?.dataURL,
            },
            redirectTo:
              currentLocation === PATH.REGISTER ? PATH.HOME : PATH.USERS,
          }),
        );
      } catch (error) {
        console.error(error);
      }
    },
  });

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = formik;

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
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Tooltip
                placement='top'
                title='Arraste uma imagem (.png, .jpg, .jpeg) e solte aqui ou clique pra escolher no computador'
                TransitionComponent={Zoom}
                arrow>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 4,
                  }}>
                  <ImageUploading
                    value={values.picture}
                    acceptType={['png', 'jpg', 'jpeg']}
                    onChange={(imageList: ImageListType) =>
                      setFieldValue('picture', imageList)
                    }>
                    {({ onImageUpload, dragProps }) => (
                      <IconButton onClick={onImageUpload} {...dragProps}>
                        <Stack
                          direction='row'
                          spacing={2}
                          sx={{
                            borderRadius: '50%',
                            border: '0.5px dotted #ccc',
                            padding: '4px',
                          }}>
                          <Badge
                            overlap='circular'
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'right',
                            }}
                            badgeContent={
                              !values.picture[0]?.dataURL ? (
                                <CameraAltIcon />
                              ) : null
                            }>
                            <Avatar
                              alt='foto do usuário'
                              src={
                                values.picture[0]?.dataURL ||
                                CONST_IMAGES.PLACEHOLDER_IMAGE
                              }
                              sx={{
                                width: 100,
                                height: 100,
                                '& img': {
                                  objectFit: 'contain',
                                },
                              }}
                            />
                          </Badge>
                        </Stack>
                      </IconButton>
                    )}
                  </ImageUploading>
                </Box>
              </Tooltip>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={Boolean(errors.firstName && touched.firstName)}
                helperText={
                  errors.firstName && touched.firstName && errors.firstName
                }
                margin='normal'
                name='firstName'
                required
                fullWidth
                id='firstName'
                label='Nome'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={Boolean(errors.lastName && touched.lastName)}
                helperText={
                  errors.lastName && touched.lastName && errors.lastName
                }
                margin='normal'
                name='lastName'
                required
                fullWidth
                id='lastName'
                label='Sobre Nome'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputMask
                mask={MASKS.CPF}
                name='document'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.document}>
                {(inputProps: any) => (
                  <TextField
                    {...inputProps}
                    error={Boolean(errors.document && touched.document)}
                    helperText={
                      errors.document && touched.document && errors.document
                    }
                    margin='normal'
                    name='document'
                    required
                    fullWidth
                    id='document'
                    label='CPF'
                  />
                )}
              </InputMask>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputMask
                mask={MASKS.DATE}
                name='birthDate'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.birthDate}>
                {(inputProps: any) => (
                  <TextField
                    {...inputProps}
                    error={Boolean(errors.birthDate && touched.birthDate)}
                    helperText={
                      errors.birthDate && touched.birthDate && errors.birthDate
                    }
                    margin='normal'
                    required
                    fullWidth
                    id='birthDate'
                    label='Nascimento'
                  />
                )}
              </InputMask>
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={Boolean(errors.email && touched.email)}
                helperText={errors.email && touched.email && errors.email}
                margin='normal'
                required
                fullWidth
                id='email'
                name='email'
                label='Email'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
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
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={Boolean(errors.role && touched.role)}
                helperText={errors.role && touched.role && errors.role}
                margin='normal'
                fullWidth
                id='role'
                name='role'
                select
                label='Cadastrar como'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.role}>
                {CONST_RULES.RULES.map(({ KEY, VALUE }) => (
                  <MenuItem key={KEY} value={KEY}>
                    {VALUE}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}>
            Cadastrar
          </Button>
          <Grid container justifyContent='center'>
            <Grid item>
              <Link to={loggedUser?.id ? PATH.USERS : PATH.HOME}>
                {loggedUser?.id ? 'Voltar' : 'Tenho cadastro'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
export { SignUp };
