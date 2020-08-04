import React, { useContext, Fragment, useState } from 'react';
import PokemonApiContext from '../../context/pokemonapi/pokemonapiContext';
import { toast } from 'react-toastify';
import 'semantic-ui-react';
import {
  Grid,
  Image,
  Container,
  Segment,
  Input,
  Button,
  Header,
  Label,
  GridColumn,
  Form,
  Divider,
} from 'semantic-ui-react';

toast.configure();
const Home = () => {
  const [pokemonInfo, setPokemonInfo] = useState('');
  const {
    data,
    searchPokemons,
    loading,
    species,
    error,
    setShowError,
  } = useContext(PokemonApiContext);

  const notify = () => {
    toast.error('❌ Esse Pokemon não foi encontrado...');
  };

  const showToast = () => {
    notify();
    setShowError(false);
  };

  const searchData = () => {
    searchPokemons(pokemonInfo.toLowerCase().trim());
    setPokemonInfo('');
  };

  const calculateWidth = (valor) => {
    return (valor * 100) / 255 + '%';
  };

  const calculateHeight = (data) => {
    return Math.round(data * 0.1 * 100) / 100;
  };

  const calculateWeight = (data) => {
    return Math.round(data * 0.1 * 100) / 100;
  };

  const pokemonCatchRate = (data) => {
    return Math.round((100 / 255) * data);
  };

  const hatchSteps = (data) => {
    return 255 * (data + 1);
  };

  const eggGroups = species
    ? species.data.egg_groups
        .map((group) => {
          return group.name
            .toLowerCase()
            .split('-')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
        })
        .join(', ')
    : '';

  const abilities = data
    ? data.data.abilities
        .map((abilities) => {
          return abilities.ability.name
            .toLowerCase()
            .split('-')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
        })
        .join(', ')
    : '';

  const evs = data
    ? data.data.stats
        .filter((stat) => {
          if (stat.effort > 0) {
            return true;
          }
          return false;
        })
        .map((stat) => {
          return `${stat.effort} ${stat.stat.name
            .toLowerCase()
            .split('-')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ')}`;
        })
        .join(', ')
    : '';

  const femaleRate = species ? species.data.gender_rate : '';
  const genderRatioFemale = 12.5 * femaleRate;
  const genderRatioMale = 12.5 * (8 - femaleRate);

  const TYPE_COLORS = {
    bug: 'B1C12E',
    dark: '4F3A2D',
    dragon: '755EDF',
    electric: 'FCBC17',
    fairy: 'F4B1F4',
    fighting: '823551D',
    fire: 'E73B0C',
    flying: 'A3B3F7',
    ghost: '6060B2',
    grass: '74C236',
    ground: 'D3B357',
    ice: 'A3E7FD',
    normal: 'C8C4BC',
    poison: '934594',
    psychic: 'ED4882',
    rock: 'B9A156',
    steel: 'B5B5C3',
    water: '3295F6',
  };

  return (
    <Fragment>
      <Container>
        <Grid columns={3}>
          <GridColumn width={4}></GridColumn>
          <GridColumn mobile={16} tablet={8} computer={8}>
            <Form style={{ paddingTop: '35px' }} onSubmit={searchData}>
              {error && showToast()}
              <Input
                onChange={(e) => setPokemonInfo(e.target.value)}
                style={{ marginTop: '60px' }}
                loading={loading}
                fluid
                size='big'
                value={pokemonInfo}
                placeholder='Pesquisar por Pokemons...'
              />
              <Button color='blue' style={{ marginTop: '10px' }} fluid>
                Pesquisar
              </Button>
            </Form>
          </GridColumn>
          <GridColumn width={4}></GridColumn>
        </Grid>
        {data && (
          <Grid>
            <Grid.Column width={3}></Grid.Column>
            <Grid.Column computer={10} mobile={16}>
              <Segment raised style={{ marginTop: '10px' }} padded='very'>
                <Label attached='top'>
                  {data.data.types.map((data, index) => (
                    <Label
                      key={index}
                      style={{
                        backgroundColor: `#${TYPE_COLORS[data.type.name]}`,
                        color: '#fff',
                      }}
                    >
                      {data.type.name}
                    </Label>
                  ))}
                </Label>

                <Grid columns={2} stackable>
                  <Grid.Column width={4}>
                    <Image
                      size='medium'
                      src={data.data.sprites.front_default}
                    />
                  </Grid.Column>
                  <Grid.Column width={12}>
                    <h1>
                      {data.data.name
                        .toLowerCase()
                        .split('  ')
                        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                        .join('  ')}
                    </h1>
                    <div className='box'>
                      <div style={{ flex: '0 0 5em' }}>
                        <h3>HP</h3>
                      </div>
                      <div className='flex2'>
                        <div className='progressbar'>
                          <div
                            className='filler'
                            style={{
                              width: calculateWidth(
                                data.data.stats[5].base_stat
                              ),
                            }}
                          >
                            {data.data.stats[5].base_stat}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='box'>
                      <div style={{ flex: '0 0 5em', paddingTop: '10px' }}>
                        <h3>Ataque</h3>
                      </div>
                      <div className='flex2'>
                        <div className='progressbar'>
                          <div
                            className='filler'
                            style={{
                              width: calculateWidth(
                                data.data.stats[4].base_stat
                              ),
                            }}
                          >
                            {data.data.stats[4].base_stat}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='box'>
                      <div style={{ flex: '0 0 5em', paddingTop: '10px' }}>
                        <h3>Veloc.</h3>
                      </div>
                      <div className='flex2'>
                        <div className='progressbar'>
                          <div
                            className='filler'
                            style={{
                              width: calculateWidth(
                                data.data.stats[0].base_stat
                              ),
                            }}
                          >
                            {data.data.stats[0].base_stat}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='box'>
                      <div style={{ flex: '0 0 5em', paddingTop: '10px' }}>
                        <h3>Defesa</h3>
                      </div>
                      <div className='flex2'>
                        <div className='progressbar'>
                          <div
                            className='filler'
                            style={{
                              width: calculateWidth(
                                data.data.stats[3].base_stat
                              ),
                            }}
                          >
                            {data.data.stats[3].base_stat}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='box'>
                      <div style={{ flex: '0 0 5em', paddingTop: '15px' }}>
                        <h3>Atq Spc.</h3>
                      </div>
                      <div className='flex2'>
                        <div className='progressbar'>
                          <div
                            className='filler'
                            style={{
                              width: calculateWidth(
                                data.data.stats[2].base_stat
                              ),
                            }}
                          >
                            {data.data.stats[2].base_stat}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='box'>
                      <div style={{ flex: '0 0 5em', paddingTop: '15px' }}>
                        <h3>Def Spc.</h3>
                      </div>
                      <div className='flex2'>
                        <div className='progressbar'>
                          <div
                            className='filler'
                            style={{
                              width: calculateWidth(
                                data.data.stats[1].base_stat
                              ),
                            }}
                          >
                            {data.data.stats[1].base_stat}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Grid.Column>
                </Grid>
                <Divider />
                <Header textAlign='center' as='h2'>
                  <Image
                    circular
                    src='https://media3.giphy.com/media/JgCZ2hksM1abS/source.gif'
                  />{' '}
                  Perfil
                </Header>
                {species && (
                  <Grid textAlign='center' columns={2} padded>
                    <Grid.Column reversed='computer vertically'>
                      <Grid.Row>
                        <Grid.Column>
                          <p style={{ fontSize: '1.15em' }}>
                            {' '}
                            Altura: {calculateHeight(data.data.height)} m
                          </p>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column>
                          <p style={{ fontSize: '1.15em' }}>
                            Peso: {calculateWeight(data.data.weight)} Kg
                          </p>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column>
                          <p style={{ fontSize: '1.15em' }}>
                            Porcentagem de Captura:{' '}
                            {pokemonCatchRate(species.data.capture_rate)}%
                          </p>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column>
                          <p style={{ fontSize: '1.15em' }}>
                            {' '}
                            Gênero: {genderRatioFemale} % Fêmea,{' '}
                            {genderRatioMale} % Macho
                          </p>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid.Column>
                    <Grid.Column>
                      <Grid.Row>
                        <Grid.Column>
                          {' '}
                          <p style={{ fontSize: '1.15em' }}>
                            Habilidades: {abilities}
                          </p>{' '}
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column>
                          <p style={{ fontSize: '1.15em' }}>
                            Hatch Steps:{' '}
                            {hatchSteps(species.data.hatch_counter)}
                          </p>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <p style={{ fontSize: '1.15em' }}>
                          Grupo de Ovos: {eggGroups}
                        </p>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column>
                          <p style={{ fontSize: '1.15em' }}> EVs: {evs}</p>{' '}
                        </Grid.Column>
                      </Grid.Row>
                    </Grid.Column>
                  </Grid>
                )}
              </Segment>
            </Grid.Column>
            <Grid.Column width={3}></Grid.Column>
          </Grid>
        )}
      </Container>
    </Fragment>
  );
};

export default Home;
