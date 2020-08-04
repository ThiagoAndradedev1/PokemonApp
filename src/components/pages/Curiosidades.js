import React, { Fragment } from 'react';
import { Container, Header, Image, Segment } from 'semantic-ui-react';

const Curiosidades = () => {
  return (
    <Fragment>
      <Container text style={{ marginTop: '7em' }}>
        <Segment>
          <Image src='images/ditto.png' size='small' circular centered />{' '}
          <div className='text-header padding-top'>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Ditto
            </Header>
          </div>
          <div className='text-header padding-top'>
            <p style={{ fontSize: '1.33em' }}>
              Acredita-se que o Ditto seja uma tentativa fracassada de clonagem
              do Mew. Os Pokémons compartilham movimentos semelhantes,
              estatísticas e colaboração, além de serem encontrados na mesma
              caverna do clone bem sucedido do Mew, o Mewtwo.
            </p>
          </div>
          <div className='padding-img'>
            <Image src='images/exeggcute.jpg' size='small' circular centered />{' '}
          </div>
          <div className='text-header padding-top'>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Exeggcute
            </Header>
          </div>
          <div className='text-header padding-top'>
            <p style={{ fontSize: '1.33em' }}>
              Exeggcute é formado geralmente por 6 cabeças, pertence a espécie
              "Pokemon Ovo", possui "egg" (que significa ovo) no nome, possui
              uma cor semelhante a de um ovo, mas mesmo assim não é um ovo.
              Exeggcute é na verdade semente de plantas.
            </p>
          </div>
          <div className='padding-img'>
            <Image src='images/gyarados.png' size='small' circular centered />{' '}
          </div>
          <div className='text-header padding-top'>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Gyarados
            </Header>
          </div>
          <div className='text-header padding-top'>
            <p style={{ fontSize: '1.33em' }}>
              No beta do Pokemon Red/Blue, o nome inicial de Gyarados seria
              SkulKraken. Que seria junção de Skull (caveira) e Kraken (aquela
              lula marinha gigante). Outra curiosidade é que Gyarados foi o
              primeiro pokémon Shiny a fazer parte da história dos jogos,
              aparecendo em Pokémon Gold e Silver onde pôde ser capturado. Com
              isso, Shiny gyarados foi o primeiro Pokemon Shiny de muita gente.
            </p>
          </div>
        </Segment>
      </Container>
    </Fragment>
  );
};

export default Curiosidades;
