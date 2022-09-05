import React from 'react';
import { Container } from './styles';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { theme } from '../../styles/global';
import { Link } from '@reach/router';
import { CONFIG } from '../../config/constants';
import { returnUser } from './../../utils/index';
import { IUser } from './../../models/user/index';
import { useDispatch } from 'react-redux';
import { clearReduxAuthData } from './../../store/modules/auth/actions';

import LogoGnvImage from '../../assets/logo_gnv_white.png';
import Image from '../Image';
import { USER_TYPES } from './../../config/constants';

const Header: React.FC = () => {
  const dispatch = useDispatch();

  const stringifyUser = returnUser();

  const user: IUser = stringifyUser ? JSON.parse(stringifyUser) : null;

  const handleLogOut = () => {
    localStorage.clear();

    dispatch(clearReduxAuthData());
  };

  return (
    <Container>
      <div id="title">
        <Image image={LogoGnvImage} />
        <h1>GNV SEGURO</h1>
      </div>
      {user && user.userType.name && (
        <div id="icons">
          {user.userType.name !== USER_TYPES.ADMIN && (
            <Link to={'/user'}>
              <FiUser size={25} color={theme.colors.white} />
            </Link>
          )}
          <Link to={`${CONFIG.DEFAULT_ELECTRON_URL}`} onClick={() => handleLogOut()}>
            <FiLogOut size={25} color={theme.colors.white} />
          </Link>
        </div>
      )}
    </Container>
  );
};

export default Header;
