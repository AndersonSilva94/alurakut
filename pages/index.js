import React, { useState } from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

const ProfileSidebar = ({ user }) => {
  return (
    <Box as="aside">
      <img
        src={`https://github.com/${user}.png`}
        alt="Anderson Silva photo"
        style={{ borderRadius: '8px' }}
      />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${user}`}>
          @{user}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

const initialStateCom = [{
  id: '343243434234324',
  title: 'Eu odeio acordar cedo',
  image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
}]

export default function Home() {
  const [communities, setCommunities] = useState(initialStateCom)
  const user = 'AndersonSilva94';
  const favoriteUsers = [
    'MariaCSilva',
    'rach-vp',
    'icaroharry',
    'filipedeschamps',
    'cyanharlow',
    'diego3g'
  ];

  const handleCreateCommunity = (ev) => {
    ev.preventDefault();
    // console.log('OIEEEEEEEE');

    const formData = new FormData(ev.target)

    const communityObj = {
      id: new Date().toISOString(),
      title: formData.get('title'),
      image: formData.get('image')
    }
    const actualCommunities = [...communities, communityObj]
    setCommunities(actualCommunities);
  }

  return (
  <>
    <AlurakutMenu />
    <MainGrid>
      <div className="profileArea" style={{ gridArea: 'profileArea' }}>
        <ProfileSidebar user={ user }/>
      </div>
      <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
        <Box>
          <h1 className="title">
            Olá! Que bom ter você aqui!
          </h1>

          <OrkutNostalgicIconSet />
        </Box>
        <Box>
          <h2 className="subTitle">O que você deseja fazer?</h2>
          <form onSubmit={ (ev) => handleCreateCommunity(ev) }>
            <div>
              <input
                type="text"
                placeholder="Qual vai ser o nome da sua comunidade?"
                name="title"
                aria-label="Qual vai ser o nome da sua comunidade?"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Coloque uma URL para usarmos de capa"
                name="image"
                aria-label="Coloque uma URL para usarmos de capa"
              />
            </div>
            <button>
              Criar comunidade
            </button>
          </form>
        </Box>
      </div>
      <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Amigos ({favoriteUsers.length})
          </h2>
          <ul>
            {favoriteUsers.map((favorite) => {
              return (
                <li key={favorite}>
                  <a href={`/users/${favorite}`}>
                    <img
                      src={`https://github.com/${favorite}.png`}
                      alt={ `${favorite} photo`}
                    />
                    <span>{favorite}</span>
                  </a>
                </li>
              )
            })}

          </ul>
        </ProfileRelationsBoxWrapper>
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Comunidades ({communities.length})
          </h2>
          <ul>
            {communities.map(({ id, title, image }) => {
              return (
                <li key={id}>
                  <a href={`/users/${title}`}>
                    <img
                      src={image}
                      alt={ `${title} photo`}
                    />
                    <span>{title}</span>
                  </a>
                </li>
              )
            })}

          </ul>
        </ProfileRelationsBoxWrapper>
      </div>
    </MainGrid>
  </>
  )
}
