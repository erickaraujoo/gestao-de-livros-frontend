import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { ICreateCompany, InitialCompanyData } from '../../models/company';

import { ICreateUser } from '../../models/user';
import { InitialUserData } from './../../models/user/index';

interface RegisterContextInterface {
  steps: { step: number; current: boolean; finished: boolean }[];
  setSteps: Dispatch<SetStateAction<{ step: number; current: boolean; finished: boolean }[]>>;

  user: ICreateUser;
  setUser: Dispatch<SetStateAction<ICreateUser>>;

  selectedUserType: { id?: number; name?: string };
  setSelectedUserType: Dispatch<SetStateAction<{ id?: number; name?: string }>>;

  company: ICreateCompany;
  setCompany: Dispatch<SetStateAction<ICreateCompany>>;

  registerLoginStep: boolean;
  setRegisterLoginStep: Dispatch<SetStateAction<boolean>>;

  finishRegister: boolean;
  setFinishRegister: Dispatch<SetStateAction<boolean>>;
}

const RegisterContext = createContext<RegisterContextInterface | null>(null);

const RegisterProvider: React.FC = ({ children }) => {
  const [steps, setSteps] = useState([
    {
      step: 1,
      current: true,
      finished: false,
    },
    {
      step: 2,
      current: false,
      finished: false,
    },
    {
      step: 3,
      current: false,
      finished: false,
    },
  ]);
  const [user, setUser] = useState(InitialUserData);
  const [selectedUserType, setSelectedUserType] = useState({});
  const [company, setCompany] = useState(InitialCompanyData);
  const [registerLoginStep, setRegisterLoginStep] = useState(false);
  const [finishRegister, setFinishRegister] = useState(false);

  return (
    <RegisterContext.Provider
      value={{
        steps,
        setSteps,
        user,
        setUser,
        selectedUserType,
        setSelectedUserType,
        company,
        setCompany,
        registerLoginStep,
        setRegisterLoginStep,
        finishRegister,
        setFinishRegister,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
};

export function useSteps() {
  const context = useContext(RegisterContext);

  const steps = context?.steps;
  const setSteps = context?.setSteps;

  return { steps, setSteps };
}

export function useUser() {
  const context = useContext(RegisterContext);

  const user = context?.user;
  const setUser = context?.setUser;

  return { user, setUser };
}

export function useSelectedUserType() {
  const context = useContext(RegisterContext);

  const selectedUserType = context?.selectedUserType;
  const setSelectedUserType = context?.setSelectedUserType;

  return { selectedUserType, setSelectedUserType };
}

export function useCompany() {
  const context = useContext(RegisterContext);

  const company = context?.company;
  const setCompany = context?.setCompany;

  return { company, setCompany };
}

export function useRegisterLoginStep() {
  const context = useContext(RegisterContext);

  const registerLoginStep = context?.registerLoginStep;
  const setRegisterLoginStep = context?.setRegisterLoginStep;

  return { registerLoginStep, setRegisterLoginStep };
}

export function useFinishRegister() {
  const context = useContext(RegisterContext);

  const finishRegister = context?.finishRegister;
  const setFinishRegister = context?.setFinishRegister;

  return { finishRegister, setFinishRegister };
}

export default RegisterProvider;
