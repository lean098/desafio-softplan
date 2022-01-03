import { UserInterface } from 'store/ducks/users/types';

export const defaultUser = {
  id: '267fd5f2-3f5f-4a8e-9964-73dfb50b0738',
  firstName: 'Teste',
  lastName: 'teste',
  birthDate: '15/04/1997',
  email: 'teste@gmail.com',
  password: '1246',
  picture: '',
  document: '123.456.789-00',
  role: 'ADMIN',
} as UserInterface;
