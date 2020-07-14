import React, { useState } from 'react';

import { FiPower } from 'react-icons/fi';
import { Container, Header, HeaderContent, Profile, Content } from './styles';

import { useAuth } from '../../hooks/auth';

import Button from '../../components/Button';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

interface Sweepstake {
  id: string;
  title: string;
  award: string;
  award_image: string;
  date: string;
  formattedDate: string;
  owner_id: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

const NewSweepstake: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="Sorteio.AI" />
          <Profile>
            <img
              src={
                user.avatar
                  ? user.avatar
                  : 'https://image.flaticon.com/icons/png/512/17/17004.png'
              }
              alt={user.name}
            />
            <div>
              <span>Bem vindo!</span>
              <strong>{user.name}</strong>
            </div>
            <button type="button" onClick={signOut}>
              <FiPower />
            </button>
          </Profile>
        </HeaderContent>
      </Header>
      <Content />
    </Container>
  );
};

export default NewSweepstake;
