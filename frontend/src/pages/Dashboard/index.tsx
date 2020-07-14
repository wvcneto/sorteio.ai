import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FiPower, FiClock, FiEye } from 'react-icons/fi';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Sweepstakes,
  Item,
} from './styles';

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

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const [sweepstakes, setSweepstakes] = useState<Sweepstake[]>([]);
  const history = useHistory();

  useEffect(() => {
    async function loadSweepstakes(): Promise<void> {
      const response = await api.get('/sweepstakes');

      const sweepstakesFormatted = response.data.map(
        (sweepstake: Sweepstake) => ({
          ...sweepstake,
          formattedDate: new Date(sweepstake.date).toLocaleDateString('pt-br'),
        }),
      );

      setSweepstakes(sweepstakesFormatted);
    }

    loadSweepstakes();
  }, []);

  const handleToNew = (): void => {
    history.push('/new-sweepstake');
  };

  const handleToSweepstake = (id: string): void => {
    history.push(`/sweepstakes/${id}`);
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="Sorteio.AI" />

          <Profile>
            <img
              src={
                user.avatar
                  ? `http://localhost:3333/files/${user.avatar}`
                  : 'https://image.flaticon.com/icons/png/512/17/17004.png'
              }
              alt={user.name}
            />
            <div>
              <span>Bem vindo!</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
            <button type="button" onClick={signOut}>
              <FiPower />
            </button>
          </Profile>
        </HeaderContent>
      </Header>
      <Content>
        <Schedule>
          <div>
            <h1>Meus Sorteios</h1>
            <Button type="button" onClick={handleToNew}>
              Novo Sorteio
            </Button>
          </div>
          <Sweepstakes>
            {sweepstakes.map(sweepstake => (
              <Item key={sweepstake.id}>
                <img
                  src="https://previews.123rf.com/images/arhimicrostok/arhimicrostok1708/arhimicrostok170801315/84517402-gift-box-icon-present-a-personal-offer-gift-wrapping-.jpg"
                  alt="reward"
                />
                <span>
                  <strong>{sweepstake.title}</strong>
                </span>
                <span>
                  <p>{sweepstake.award}</p>
                </span>
                <span>
                  <FiClock />
                  {sweepstake.formattedDate}
                </span>
                <span>
                  <Button
                    type="button"
                    onClick={() => handleToSweepstake(sweepstake.id)}
                  >
                    <FiEye />
                  </Button>
                </span>
              </Item>
            ))}
          </Sweepstakes>
        </Schedule>
      </Content>
    </Container>
  );
};

export default Dashboard;
