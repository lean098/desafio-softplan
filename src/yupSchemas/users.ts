// Yup
import { object, string } from 'yup';

export const signInSchema = object().shape({
  email: string().email('Digite um email válido').required('Campo obrigátorio'),
  password: string().required('Campo obrigátorio'),
});

export const signUpSchema = object().shape({
  firstName: string().required('Campo obrigátorio'),
  lastName: string().required('Campo obrigátorio'),
  birthDate: string().required('Campo obrigátorio'),
  email: string().email('Digite um email válido').required('Campo obrigátorio'),
  document: string().required('Campo obrigátorio'),
  password: string().required('Campo obrigátorio'),
  role: string().required('Campo obrigátorio'),
});
