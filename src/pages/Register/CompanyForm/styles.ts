import styled from 'styled-components';
import { device } from '../../../styles/global';

export const Container = styled.section`
  width: 100%;
  height: auto;
`;

export const CompanyForm = styled.form`
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

export const ContainerFlexInputs = styled.div`
  width: 100%;

  > div + div {
    margin-top: 25px;
  }

  @media ${device.tablet} {
    width: 100%;
    justify-content: space-between;
    align-items: flex-start;
    display: flex;

    div + div {
      margin-top: 0px;
    }
  }
`;

export const FlexInput: any = styled.div`
  width: 100%;
  height: auto;

  label,
  input {
    width: 100%;
  }

  @media ${device.tablet} {
    width: ${(props: any) => (props.width ? `calc(${props.width} - 10px)` : 'calc(50% - 10px)')};
  }
`;
