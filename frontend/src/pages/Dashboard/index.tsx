import React from 'react';

import { FiPower, FiClock } from 'react-icons/fi';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Sweepstakes,
} from './styles';

import { useAuth } from '../../hooks/auth';

import logoImg from '../../assets/logo.svg';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="Sorteio.AI" />

          <Profile>
            <img
              src={
                user.avatar_url
                  ? user.avatar_url
                  : 'https://image.flaticon.com/icons/png/512/17/17004.png'
              }
              alt={user.name}
            />
            <div>
              <span>Bem vindo!</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
      <Content>
        <Schedule>
          <h1>Sorteios Disponiveis</h1>
          <p>Sorteios em aberto</p>
          <Sweepstakes>
            <div>
              <img
                src="https://previews.123rf.com/images/arhimicrostok/arhimicrostok1708/arhimicrostok170801315/84517402-gift-box-icon-present-a-personal-offer-gift-wrapping-.jpg"
                alt="reward"
              />
              <span>
                <strong>Título do Sorteio</strong>
              </span>
              <span>
                <p>Premio</p>
              </span>
              <span>
                <h4>Nome do Criador</h4>
              </span>
              <span>
                <FiClock />
                15/07/2020 17:00
              </span>
            </div>
            <div>
              <img
                src="https://previews.123rf.com/images/arhimicrostok/arhimicrostok1708/arhimicrostok170801315/84517402-gift-box-icon-present-a-personal-offer-gift-wrapping-.jpg"
                alt="reward"
              />
              <span>
                <strong>Título do Sorteio</strong>
              </span>
              <span>
                <p>Premio</p>
              </span>
              <span>
                <h4>Nome do Criador</h4>
              </span>
              <span>
                <FiClock />
                15/07/2020 17:00
              </span>
            </div>
          </Sweepstakes>
        </Schedule>
      </Content>
    </Container>
  );
};

export default Dashboard;
