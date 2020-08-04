import React, {
  Fragment,
  useEffect,
  useContext,
  useState,
  useRef,
} from 'react';
import {
  Image,
  Grid,
  Button,
  Modal,
  Form,
  Icon,
  Header,
  Segment,
  Message,
  Container,
  Dimmer,
  Loader,
  GridColumn,
} from 'semantic-ui-react';
import AuthContext from '../../context/authContext';
import { firestore, storage } from '../../firebase';

const Perfil = () => {
  const [userInfo, setUserInfo] = useState('');
  const [changeInfo, setChangeInfo] = useState('');
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const inputImage = useRef(undefined);

  useEffect(() => {
    const returnDocument = async () => {
      await firestore
        .collection('userinfo')
        .where('uid', '==', currentUser.uid)
        .onSnapshot((snapshot) => {
          setUserInfo(snapshot.docs[0].data());
          setBio(snapshot.docs[0].data().bio);
          setName(snapshot.docs[0].data().name);
          setChangeInfo(snapshot.docs[0].id);
        });
    };
    returnDocument();
  }, [currentUser]);

  const handleChange = async () => {
    setLoading(true);
    const image = inputImage.current.files[0];
    if (name === '' || bio === '') {
      setShowError(true);
      setLoading(false);
    } else if (image) {
      setShowError(false);
      await storage.ref(`images/${image.name}`).put(image);
      await storage
        .ref('images')
        .child(image.name)
        .getDownloadURL()
        .then((image) => {
          firestore.collection('userinfo').doc(changeInfo).update({
            image,
            bio,
            name,
          });
        });
      setLoading(false);
      setModal(false);
    } else {
      setShowError(false);
      await firestore.collection('userinfo').doc(changeInfo).update({
        bio,
        name,
      });
      setLoading(false);
      setModal(false);
    }
  };

  const openModal = () => {
    setName(userInfo.name);
    setBio(userInfo.bio);
    setShowError(false);
    setModal(true);
  };

  const openInputFile = () => {
    inputImage.current.click();
  };

  return (
    <Fragment>
      <Container>
        <Grid
          columns={3}
          textAlign='center'
          style={{ marginTop: '120px' }}
          verticalAlign='middle'
        >
          <GridColumn width={3}></GridColumn>
          <Grid.Column
            mobile={16}
            tablet={8}
            computer={10}
            style={{ maxWidth: 900 }}
          >
            <Button color='blue' onClick={() => openModal()} primary>
              <Icon name='edit' /> Editar Perfil
            </Button>
            <Segment>
              <Image size='small' centered src={userInfo.image} circular />{' '}
              <h1>{userInfo.name}</h1>
              <p>{userInfo.email}</p>
              <strong style={{ fontSize: '1.33em' }}>Bio:</strong>{' '}
              {userInfo.bio}
            </Segment>
          </Grid.Column>
          <GridColumn width={3}></GridColumn>
        </Grid>
        <Modal
          size='tiny'
          open={modal}
          onClose={() => setModal(false)}
          centered={true}
          closeIcon
        >
          <Modal.Content>
            {loading && (
              <Dimmer active inverted>
                <Loader size='large' inverted>
                  Alterando Informações...
                </Loader>
              </Dimmer>
            )}
            {showError && (
              <Message size='large' negative>
                <Message.Header> Opssss... Aconteceu um erro:</Message.Header>
                <p>Você não pode deixar nenhum campo vazio !</p>
              </Message>
            )}
            <div className='header-style'>
              <Header as='h2' icon>
                Edite seu Perfil
                <Header.Subheader>
                  Você pode alterar todas as informações referentes ao seu
                  perfil por aqui.
                </Header.Subheader>
              </Header>
            </div>
            <Image
              centered
              src={userInfo.image}
              size='tiny'
              verticalAlign='top'
              circular
            />{' '}
            <Form onSubmit={handleChange}>
              <Form.Field>
                <Grid>
                  <Grid.Column textAlign='center'>
                    <Button
                      type='button'
                      onClick={() => openInputFile()}
                      secondary
                    >
                      <Icon name='upload' /> Alterar Imagem
                    </Button>
                  </Grid.Column>
                </Grid>

                <input hidden type='file' ref={inputImage} />
              </Form.Field>
              <Form.Field>
                <div className='label-style'>
                  <label>Nome</label>
                </div>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Alterar Nome'
                />
              </Form.Field>
              <Form.Field>
                <div className='label-style'>
                  <label>Bio</label>
                </div>
                <textarea
                  rows='4'
                  cols='50'
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder='Alterar Bio'
                />
              </Form.Field>

              <Grid>
                <Grid.Column textAlign='center'>
                  <Button type='submit' secondary>
                    <Icon name='check circle' />
                    Editar
                  </Button>
                </Grid.Column>
              </Grid>
            </Form>
          </Modal.Content>
        </Modal>
      </Container>
    </Fragment>
  );
};

export default Perfil;
