import { ICompany } from './../../models/company/index';
import { IUser } from './../../models/user/index';

export const formattedResponseAuth = ({
  company,
  user,
  token,
}: {
  company?: ICompany;
  user: IUser | IUser[];
  token: string;
}) => {
  const formattedAuth = [];

  if (company) formattedAuth.push({ company });

  if (!(user instanceof Array)) {
    user.currentLogged = true;

    formattedAuth.push({ users: [user] });
  } else {
    formattedAuth.push({ users: user });
  }

  formattedAuth.push({ token });

  return formattedAuth[0];
};
