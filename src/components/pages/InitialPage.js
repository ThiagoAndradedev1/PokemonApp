import React from 'react';
import { Grid, Header, Image, Segment } from 'semantic-ui-react';

const InitialPage = () => {
  return (
    <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
      <Grid.Column mobile={14} style={{ maxWidth: 450 }}>
        <Segment size='massive'>
          <Header color='grey' as='h2' textAlign='center'>
            <Image src='images/initialpage.png' />{' '}
            <p style={{ fontSize: '1.33em' }}>Bem Vindo</p>
            <Header.Subheader>
              Cadastre-se e tenha acesso a vários Pokémons.
            </Header.Subheader>
          </Header>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default InitialPage;
