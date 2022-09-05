import { ICreateUser } from '../../models/user';
import { returnSha256 } from './../index';

export const formattedRegisterLogin = async (data: ICreateUser, userType: { id?: number; name?: string }) => {
  delete data.passwordConfirmation;

  return {
    name: data.name,
    username: data.username,
    password: await returnSha256(data.password || ''),
    userType,
  };
};
