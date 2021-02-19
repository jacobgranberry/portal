import React from 'react';

export enum AuthRoutes {
  dashboard = '/dashboard',
}

export enum NonAuthRoutes {
  login = '/',
  unauthorized = '/unauthorized',
}

interface AuthRouteProps {
  Component: React.FC;
  path: string;
  exact?: boolean;
  location?: any;
}

export const AuthRoute = ({ Component, path, exact = false }: AuthRouteProps): JSX.Element => {
  //   const isAuthed = settings.has("account.accessToken");
  const isAuthed = true;
  console.log({ isAuthed });
  return (
    <Route
      exact={exact}
      path={path}
      render={(props: RouteComponentProps) =>
        isAuthed ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: NonAuthRoutes.login,
              state: {
                requestedPath: path,
              },
            }}
          />
        )
      }
    />
  );
};
