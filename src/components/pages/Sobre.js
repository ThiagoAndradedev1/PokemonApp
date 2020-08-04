import React, { Fragment } from 'react';
import {
  Image,
  Grid,
  Button,
  Segment,
  Header,
  Container,
} from 'semantic-ui-react';

const Sobre = () => {
  return (
    <Fragment>
      <Container>
        <Segment padded='very' style={{ marginTop: '90px' }}>
          <Grid container stackable verticalAlign='middle'>
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as='h3' style={{ fontSize: '2em' }}>
                  Firebase + React
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  Esse projeto pessoal faz uso das ferramentas do Firebase,
                  React e Semantic UI, a proposta inicial é de replicar uma
                  aplicação full stack com autenticação e consumo de API, os
                  recursos "storage", "firestore" e "auth" foram usados para
                  auxiliar na construção da aplicação.
                </p>
                <Header as='h3' style={{ fontSize: '2em' }}>
                  Cheque minha conta no GitHub
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  Gostou do projeto? Acesse minha conta no Github e encontre
                  outras aplicações e projetos pessoais.
                </p>
              </Grid.Column>
              <Grid.Column floated='right' width={6}>
                <Image bordered rounded size='large' src='images/sobre.png' />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign='center'>
                <Button
                  onClick={() =>
                    (window.location.href =
                      'https://github.com/ThiagoAndradedev1')
                  }
                  size='huge'
                >
                  GitHub
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    </Fragment>
  );
};

export default Sobre;
