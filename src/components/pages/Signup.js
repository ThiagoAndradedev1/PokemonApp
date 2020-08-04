import React, { useState, Fragment } from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  TextArea,
  Modal,
  Icon,
} from 'semantic-ui-react';
import { auth, firestore } from '../../firebase';
import { useHistory, Link } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = async () => {
    setLoading(true);
    if (name === '' || bio === '' || email === '' || password === '') {
      setError('Você precisa preencher todos os campos !');
      setLoading(false);
    } else {
      setError('');
      try {
        const response = await auth.createUserWithEmailAndPassword(
          email,
          password
        );
        await response.user.sendEmailVerification();
        await firestore.collection('userinfo').add({
          email,
          name,
          bio,
          uid: response.user.uid,
          image: 'images/placeholder.png',
        });
        await auth.signOut();
        setLoading(false);
        setModal(true);
        setName('');
        setPassword('');
        setBio('');
        setEmail('');
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
  };

  const closeModal = () => {
    setModal(false);
    history.push('/login');
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
          <Form onSubmit={handleSubmit} size='large'>
            <Segment stacked>
              <Header as='h2' color='grey' textAlign='center'>
                <Image src='images/logo.png' />{' '}
                <p style={{ fontSize: '1.33em' }}>Crie sua Conta</p>
              </Header>

              <Form.Field>
                <Form.Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='Nome'
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fluid
                  icon='envelope outline'
                  iconPosition='left'
                  placeholder='E-mail'
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Senha'
                  type='password'
                />
              </Form.Field>
              <Form.Field>
                <TextArea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder='Biografia'
                />
              </Form.Field>
              <Button
                loading={loading}
                fluid
                size='large'
                color='blue'
                type='submit'
              >
                Criar
              </Button>
            </Segment>
          </Form>
          <Message>
            Que logar em sua conta ? <Link to='/login'>Log In</Link>
          </Message>
        </Grid.Column>
      </Grid>
      <Modal
        size='tiny'
        open={modal}
        onClose={() => closeModal()}
        centered={false}
        closeIcon
      >
        <Modal.Content>
          <p style={{ fontSize: '1.33em' }}>
            <span role='img' aria-label='emoji'>
              ✔️
            </span>{' '}
            Confirme nosso e-mail de verificação na sua caixa de entrada!
          </p>
        </Modal.Content>
      </Modal>
    </Fragment>
  );
};

export default Signup;
