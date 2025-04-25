import type { FC } from 'react';
import type { RouteProps } from 'react-router';

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute: FC<RouteProps> = props => {
  const { logged } = useSelector(state => state.user);

  return logged ? (
    (props.element as React.ReactElement)
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
