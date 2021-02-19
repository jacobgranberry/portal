export type EmptyObject = {
  [K in any]: never;
};

type User = {
  access_token: string;
  client_token: string;
};

export type AppStateProps = {
  user: User;
};
