import styled from 'styled-components';

export const Container = styled.section`
  width: 100%;
  height: auto;
`;

export const LoginForm = styled.form`
  width: 100%;
  height: auto;
  max-width: 600px;
  margin: 100px auto 0;
  display: flex;
  flex-direction: column;

  > div + div {
    margin-top: 25px;
  }

  button[type='submit'] {
    margin: 60px auto 0;
  }

  hr {
    width: 50%;
    border: 0;
    height: 1px;
    margin: 60px auto 40px;
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0));
  }
`;
