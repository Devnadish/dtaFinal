export type Session = {
  user?: {
    id: string;
    name: string;
    email: string;
  };
  token?: string;
  expires?: string;
  // Add other session properties as needed
};