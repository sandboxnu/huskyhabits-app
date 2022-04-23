export interface GetUserResponse {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  accounts: [{ acc_type: string; uid: string }];
}
