export interface GetUserResponse {
  userId: string;
  email: string;
  first_name: string;
  last_name: string;
  accounts: [{ acc_type: string; uid: string }];
}
