import { Container, Steps, Step } from './styles';
import { useSteps } from './../../../context/Register/RegisterContext';
import { FiCheck } from 'react-icons/fi';

const RegisterCompanySteps: React.FC = () => {
  const { steps } = useSteps();

  return (
    <Container>
      <Steps>
        {steps &&
          steps.map(({ step, current, finished }, index) => (
            <Step key={index} current={current} finished={finished}>
              <div id="container-step">{finished ? <FiCheck size={20} /> : <p>{step}</p>}</div>
            </Step>
          ))}
        <hr />
      </Steps>
    </Container>
  );
};

export default RegisterCompanySteps;
