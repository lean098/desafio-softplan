import callAPiBase from './base';

const user = {
  list: ({ params }: { params: object }) =>
    callAPiBase({
      endpoint: '/users',
      method: 'GET',
      title: 'Get Users',
      params,
    }),
  create: ({ data }: { data: object }) =>
    callAPiBase({
      endpoint: '/users',
      method: 'POST',
      title: 'Create User',
      data,
    }),
  update: ({ data, userId }: { data: object; userId: string }) =>
    callAPiBase({
      endpoint: `/users/${userId}`,
      method: 'PUT',
      title: 'Update User',
      data,
    }),
  delete: ({ params, userId }: { params: object; userId: string }) =>
    callAPiBase({
      endpoint: `/users/${userId}`,
      method: 'DELETE',
      title: 'Delete User',
      params,
    }),
};

export { user };
