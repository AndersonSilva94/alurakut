import React, { useEffect, useState } from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
} from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import ProfileRelationsBox from '../src/components/ProfileRelationsBox';
import Input from '../src/components/Input';
import ProfileSidebar from '../src/components/ProfileSidebar';

export default function Home() {
  const [communities, setCommunities] = useState([]);
  const [followers, setFollowers] = useState([]);

  const user = 'AndersonSilva94';
  const favoriteUsers = [
    'MariaCSilva',
    'rach-vp',
    'icaroharry',
    'filipedeschamps',
    'cyanharlow',
    'diego3g',
  ];

  const handleCreateCommunity = async (ev) => {
    ev.preventDefault();
    // console.log('OIEEEEEEEE');

    const formData = new FormData(ev.target);

    const communityObj = {
      title: formData.get('title'),
      imageUrl: formData.get('image'),
      creatorSlug: user
    };

    const datoPost = await fetch('/api/communities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(communityObj)
    })
    const responseDatoPost = await datoPost.json();

    const actualCommunities = [...communities, responseDatoPost.createRegister];
    setCommunities(actualCommunities);

    ev.target.reset();
  };

  useEffect(() => {
    const renderFollowers = async () => {
      // GET
      const fetchUrl = await fetch(
        'https://api.github.com/users/AndersonSilva94/followers'
      );
      const response = await fetchUrl.json();
      setFollowers(response);

      const fetchDato = await fetch('https://graphql.datocms.com/', {
        method: 'POST',
        headers: {
          'Authorization': 'e88555446842e196d7c40825dcd4a1',
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ "query": `query {
          allCommunities {
            id
            title
            imageUrl
            creatorSlug
          }
        }` })
      })
      const responseDato = await fetchDato.json();
      const { data: { allCommunities }} = responseDato
      setCommunities(allCommunities)
    };
    renderFollowers();
  }, []);

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className='profileArea' style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar user={user} />
        </div>
        <div className='welcomeArea' style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className='title'>Olá! Que bom ter você aqui!</h1>

            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className='subTitle'>Crie uma comunidade única 😎</h2>
            <form onSubmit={(ev) => handleCreateCommunity(ev)}>
              <Input
                name='title'
                placeholder='Qual vai ser o nome da sua comunidade?'
              />
              <Input 
                name='image'
                placeholder='Coloque uma URL para usarmos de capa'
              />
              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>
        <div
          className='profileRelationsArea'
          style={{ gridArea: 'profileRelationsArea' }}
        >
          <ProfileRelationsBoxWrapper>
            <h2 className='smallTitle'>Amigos ({favoriteUsers.length})</h2>
            <ul>
              {favoriteUsers.map((favorite) => {
                return (
                  <li key={favorite}>
                    <a href={`/users/${favorite}`}>
                      <img
                        src={`https://github.com/${favorite}.png`}
                        alt={`${favorite} photo`}
                      />
                      <span>{favorite}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className='smallTitle'>Comunidades ({communities.length})</h2>
            <ul>
              {communities.slice(0, 6).map(({ id, title, imageUrl }) => {
                return (
                  <li key={id}>
                    <a href={`/users/${id}`}>
                      <img src={imageUrl} alt={`${title} photo`} />
                      <span>{title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBox title='Seguidores do github' array={ followers }/>
        </div>
      </MainGrid>
    </>
  );
}
