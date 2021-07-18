import React, { useEffect, useState } from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
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

export default function Home({ githubUser }) {
  const [communities, setCommunities] = useState([]);
  const [userGithub, setUserGithub] = useState('');
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const user = githubUser;

  const handleCreateCommunity = async (ev) => {
    ev.preventDefault();

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
      const fetchUser = await fetch(`https://api.github.com/users/${user}`);
      const responseUser = await fetchUser.json();
      setUserGithub(responseUser.name);

      const fetchFollowers = await fetch(
        `https://api.github.com/users/${user}/followers`
      );
      const responseFollowers = await fetchFollowers.json();
      setFollowers(responseFollowers);

      const fetchFollowing = await fetch(
        `https://api.github.com/users/${user}/following`
      );
      const responseFollowing = await fetchFollowing.json();
      setFollowing(responseFollowing);

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
            <h1 className='title'>Olá {userGithub}! Que bom ter você aqui!</h1>

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
          <ProfileRelationsBox title='Seguidores do github' array={ followers }/>
          <ProfileRelationsBox title='Quem você segue' array={ following }/>
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
          
        </div>
      </MainGrid>
    </>
  );
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;
  
  const fetchAuth = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
      Authorization: token,
    }
  })
  const responseApi = await fetchAuth.json()
  const { isAuthenticated } = responseApi;
  /* .then((response) => response.json()) */
  // console.log('auth', isAuthenticated);
  
  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }
  
  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser
    }, // will be passed to the page component as props
  }
}
