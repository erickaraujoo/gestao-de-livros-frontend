import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

interface OperationListContextInterface {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const OperationListContext = createContext<OperationListContextInterface | null>(null);

const OperationListProvider: React.FC = ({ children }) => {
  const [visible, setVisible] = useState(false);

  return <OperationListContext.Provider value={{ visible, setVisible }}>{children}</OperationListContext.Provider>;
};

export function useVisible() {
  const context = useContext(OperationListContext);
  const visible = context?.visible;
  const setVisible = context?.setVisible;
  return { visible, setVisible };
}

export default OperationListProvider;
