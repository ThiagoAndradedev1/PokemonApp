import React, { Fragment, useState } from 'react';
import { auth } from '../../firebase';
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Segment,
  Modal,
  Message,
  Icon,
} from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = async () => {
    setLoading(true);
    if (email === '') {
      setError('Você precisa preencher todos os campos !');
      setLoading(false);
    } else {
      setError('');
      try {
        await auth.sendPasswordResetEmail(email);
        setModal(true);
        setEmail('');
        setLoading(false);
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
                <Image src='https://www.shareicon.net/data/256x256/2015/08/24/90230_pokeball_512x512.png' />{' '}
                <p style={{ fontSize: '1.33em' }}>Mude sua Senha</p>
              </Header>
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
              <Button
                loading={loading}
                fluid
                size='large'
                color='blue'
                type='submit'
              >
                Confirmar
              </Button>
            </Segment>
          </Form>
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
            Enviamos um e-mail de redifinição de senha para a sua conta!
          </p>
        </Modal.Content>
      </Modal>
    </Fragment>
  );
};

export default ResetPassword;
