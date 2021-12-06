# **Desafio Softplan**

### **Desenvolver uma aplicação web contendo os seguintes requisitos:**

- [x] A aplicação deverá estar protegida por login e senha;
- [x] Deverá existir 2 tipos de perfis (`ADMIN` e `USER`);
- [x] Deverá possuir interface para pesquisa dos usuários cadastrados;
- [x] Deverá possuir interface para cadastro (`CRUD`) dos usuários da aplicação;
- [x] Deverá possuir interface para visualizar “Meu perfil”, podendo alterar a senha;
- [x] Deverá possuir a opção de “Sair” da aplicação;
- [x] Deverá aparecer o nome e/ou foto do usuário no `header` da aplicação;
- [x] somente ADMIN pode deletar usuário;

### **Regras de negócio:**

- [x] O usuário com acesso `ADMIN` poderá executar cadastro (`CRUD`) de outros usuários e visualizar;
- [x] O usuário com acesso `USER` poderá apenas visualizar os usuários do sistema;

### **Requisitos não funcionais:**

- [ ] Testes unitários;
- [x] O frontend deverá ser desenvolvido em React;
- [x] Utilizar algum mock http, exemplo: [json-server](https://github.com/typicode/json-server);
- [x] Utilizar algum framework UI (Material-UI, Bootstrap, AntDesign, etc…);

### **Passo a Passo pra executar o projeto**

Clone o repositorio:

- ### `git clone git@github.com:lean098/desafio-softplan.git`

Instale as dependências:

- ### `yarn install ou somente yarn`

Execute o projeto:

- ### `yarn start`

Abra [http://localhost:3001](http://localhost:3001) caso não seja aberto automaticamente;

Para rodar os testes, execute o comando abaixo:

- ### `yarn test`

### **Passos iniciais pra usar o projeto**

- Fazer cadastro (foto é opcional);
- Ou usar usuário pré cadastrado

```
Email: teste@gmail.com
Senha: 123456
```
