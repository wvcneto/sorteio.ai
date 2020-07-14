import React, { useCallback, useRef, ChangeEvent } from 'react';
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';
import TextArea from '../../components/TextArea';

import { useToast } from '../../hooks/toast';

import { Container, Content, ImageInput } from './styles';
import { useAuth } from '../../hooks/auth';

interface SweepstakeFormData {
  name: string;
  email: string;
  password: string;
}

const Sweepstake: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const { user, updateUser } = useAuth();

  const handleSubmit = useCallback(
    async (data: SweepstakeFormData) => {
      try {
        /*
          "title": "iPhone",
          "description": "Sorteio de iPhone",
          "type": "open",
          "award": "iPhone XS",
          "award_image": "",
          "date": "{% now 'iso-8601', '' %}",
          "owner_id": "8f16af07-c7a7-4917-a3ca-3df356a6308a",
          "participants": [
            "Walter",
            "Pedro",
            "João"
          ]
        */

        await api.post('/sweepstakes', data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'cadastro Realizado com sucesso',
          description: 'Já é possivel fazer o login no GoBarber.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }
        addToast({
          type: 'error',
          title: 'Erro ao criar sorteio.',
          description:
            'Ocorreu um erro ao tentar criar um sorteio, por favor tente novamente.',
        });
      }
    },
    [addToast, history],
  );

  const handleImageChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('Image', e.target.files[0]);

        api.patch('/sweepstakes/image', data).then(response => {
          updateUser(response.data);

          addToast({
            type: 'success',
            title: 'Image atualizado',
          });
        });
      }
    },
    [addToast, updateUser],
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <Content>
        <Form onSubmit={handleSubmit}>
          <h1>Novo Sorteio</h1>

          <ImageInput>
            <img
              src="https://previews.123rf.com/images/arhimicrostok/arhimicrostok1708/arhimicrostok170801315/84517402-gift-box-icon-present-a-personal-offer-gift-wrapping-.jpg"
              alt="reward"
            />
            <label htmlFor="Image">
              <FiCamera />
              <input type="file" id="Image" onChange={handleImageChange} />
            </label>
          </ImageInput>

          <Input name="title" placeholder="Título" />
          <Input name="description" placeholder="Descrição" />
          <Input name="award" placeholder="Premio" />
          <TextArea
            name="participants"
            placeholder="Insira os valores do sorteio separados por virgula ','"
          />
          <Button type="submit">Confirmar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Sweepstake;
