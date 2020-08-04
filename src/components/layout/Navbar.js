import React, { useContext, useState, useEffect, Fragment } from 'react';
import {
  Button,
  Container,
  Menu,
  Image,
  Segment,
  Responsive,
  Sidebar,
  Icon,
} from 'semantic-ui-react';
import AuthContext from '../../context/authContext';
import { firestore } from '../../firebase';
import { auth } from '../../firebase';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [userInfo, setUserInfo] = useState('');
  const [visible, setVisible] = useState(false);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser && currentUser.emailVerified) {
      const returnDocument = async () => {
        await firestore
          .collection('userinfo')
          .where('uid', '==', currentUser.uid)
          .onSnapshot((snapshot) => {
            console.log(snapshot);
            setUserInfo(snapshot.docs[0].data());
          });
      };
      returnDocument();
    }
  }, [currentUser]);

  const logOut = async () => {
    await auth.signOut();
  };

  const mobileLogOut = async () => {
    setVisible(false);
    await auth.signOut();
  };

  return (
    <Fragment>
      <Segment inverted textAlign='center' vertical size='mini'>
        <Menu color='yellow' fixed='top' inverted>
          <Container>
            <Menu.Item as={Link} to='/initialpage' header>
              <Image
                size='mini'
                src='images/logo.png'
                style={{ marginRight: '1.5em' }}
              />
              Projeto Pokémon
            </Menu.Item>
            {currentUser && currentUser.emailVerified && (
              <Responsive as={Fragment} {...Responsive.onlyMobile}>
                <div className='btn-margin'>
                  <Button color='yellow' onClick={() => setVisible(true)}>
                    <Icon name='sidebar' size='large' />
                  </Button>
                </div>
              </Responsive>
            )}

            <Responsive as={Fragment} {...Responsive.onlyMobile}>
              <Sidebar
                as={Menu}
                color='blue'
                animation='overlay'
                icon='labeled'
                inverted
                vertical
                onHide={() => setVisible(false)}
                visible={visible}
                width='thin'
              >
                <Menu.Item
                  onClick={() => setVisible(false)}
                  as={Link}
                  to='/home'
                >
                  <Icon name='home' />
                  Home
                </Menu.Item>
                <Menu.Item
                  onClick={() => setVisible(false)}
                  as={Link}
                  to='/curiosidades'
                >
                  <Icon name='plus' />
                  Curiosidades
                </Menu.Item>
                <Menu.Item
                  onClick={() => setVisible(false)}
                  as={Link}
                  to='/sobre'
                >
                  <Icon name='question' />
                  Sobre
                </Menu.Item>
                <Menu.Item
                  onClick={() => setVisible(false)}
                  as={Link}
                  to='/perfil'
                >
                  <Icon name='user outline' />
                  Perfil
                </Menu.Item>
                <Menu.Item
                  onClick={() => mobileLogOut()}
                  as={Link}
                  to='/perfil'
                >
                  <Icon name='sign-out' />
                  LogOut
                </Menu.Item>
              </Sidebar>
            </Responsive>
            {currentUser && currentUser.emailVerified && (
              <Responsive
                as={Fragment}
                minWidth={Responsive.onlyComputer.minWidth}
              >
                <Menu.Item as={Link} to='/home'>
                  <Icon name='home' /> Home
                </Menu.Item>

                <Menu.Item as={Link} to='/perfil'>
                  <Icon name='user outline' /> Perfil
                </Menu.Item>

                <Menu.Item as={Link} to='/sobre'>
                  <Icon name='question' /> Sobre
                </Menu.Item>

                <Menu.Item as={Link} to='/curiosidades'>
                  <Icon name='plus' /> Cursiodades
                </Menu.Item>
              </Responsive>
            )}
            {currentUser && currentUser.emailVerified && (
              <Responsive
                as={Fragment}
                minWidth={Responsive.onlyComputer.minWidth}
              >
                <Menu.Item position='right'>
                  <Menu.Item as={Link} to='/perfil' header>
                    <Image
                      className='ui mini circular image'
                      src={userInfo.image}
                      style={{ marginRight: '1.5em' }}
                    />
                    Olá, {userInfo.name}!
                  </Menu.Item>
                  <Button
                    onClick={() => logOut()}
                    primary
                    style={{ marginLeft: '0.5em' }}
                  >
                    <Icon name='sign-out' /> Log Out
                  </Button>
                </Menu.Item>
              </Responsive>
            )}
            {(!currentUser || !currentUser.emailVerified) && (
              <Menu.Item position='right'>
                <Link to='/login'>
                  <Button color='blue' inverted={false}>
                    Log In
                  </Button>
                </Link>
                <Link to='/signup'>
                  <Button
                    color='blue'
                    inverted={false}
                    style={{ marginLeft: '0.5em' }}
                  >
                    Sign Up
                  </Button>
                </Link>
              </Menu.Item>
            )}
          </Container>
        </Menu>
      </Segment>
    </Fragment>
  );
};

export default Navbar;
