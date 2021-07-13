import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

const ProfileSidebar = ({ user }) => {
  return (
    <Box>
      <img
        src={`https://github.com/${user}.png`}
        alt="Anderson Silva photo"
        style={{ borderRadius: '8px' }}
      />
    </Box>
  );
}

export default function Home() {
  const user = 'AndersonSilva94';
  const favoriteUsers = [
    'MariaCSilva',
    'rach-vp',
    'icaroharry',
    'filipedeschamps',
    'cyanharlow',
    'diego3g'
  ];

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
      </div>
      <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Pessoas da comunidade ({favoriteUsers.length})
          </h2>
          <ul>
            {favoriteUsers.map((favorite) => {
              return (
                <li>
                  <a href={`/users/${favorite}`} key={favorite}>
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
      </div>
    </MainGrid>
  </>
  )
}
