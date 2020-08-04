import React, { useState, Fragment } from 'react';
import { auth } from '../../firebase';
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Modal,
  Icon,
} from 'semantic-ui-react';
import { useHistory, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    setLoading(true);
    if (email === '' || password === '') {
      setError('Você precisa preencher todos os campos !');
      setLoading(false);
    } else {
      setError('');
      try {
        const response = await auth.signInWithEmailAndPassword(email, password);
        if (response.user.emailVerified) {
          history.push('/home');
        } else {
          await auth.signOut();
          setLoading(false);
          setOpenModal(true);
        }
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    }
  };

  return (
    <Fragment>
      <Grid
        textAlign='center'
        style={{ height: '100vh' }}
        verticalAlign='middle'
      >
        <Grid.Column mobile={14} style={{ maxWidth: 450 }}>
          {error && (
            <Message negative>
              <Icon size='big' color='red' name='exclamation triangle' />{' '}
              {error}
            </Message>
          )}
          <Form onSubmit={handleLogin} size='large'>
            <Segment stacked>
              <Header color='grey' as='h2' textAlign='center'>
                <Image src='images/login.png' />{' '}
                <p style={{ fontSize: '1.33em' }}>Faça Login em Sua Conta</p>
              </Header>
              <Form.Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fluid
                icon='user'
                iconPosition='left'
                placeholder='E-mail'
              />
              <Form.Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Senha'
                type='password'
              />

              <Button
                loading={loading}
                type='submit'
                color='blue'
                fluid
                size='large'
              >
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            Esqueceu a sua senha ? <Link to='/resetpassword'>Mudar Senha</Link>
          </Message>
        </Grid.Column>
      </Grid>
      <Modal
        size='tiny'
        open={openModal}
        onClose={() => setOpenModal(false)}
        centered={false}
        closeIcon
      >
        <Modal.Content>
          <p style={{ fontSize: '1.33em' }}>
            {' '}
            <span role='img' aria-label='emoji'>
              ❌
            </span>{' '}
            Você precisa confirmar o nosso e-mail na caixa de entrada!
          </p>
        </Modal.Content>
      </Modal>
    </Fragment>
  );
};

export default Login;
