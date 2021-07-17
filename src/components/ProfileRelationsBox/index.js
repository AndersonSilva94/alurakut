import React from 'react';
import { ProfileRelationsBoxWrapper } from '../ProfileRelations';

const ProfileRelationsBox = ({ title, array }) => {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">{title} ({array.length})</h2>
      <ul>
        {array.slice(0, 6).map(({ id, login, avatar_url }) => {
          return (
            <li key={id}>
              <a href={`/users/${login}`}>
                <img src={avatar_url} alt={`${login} photo`} />
                <span>{login}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  );
};

export default ProfileRelationsBox;
