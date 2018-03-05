export class LoginAccess {
  authId: string = "";
  loginTime: Date = new Date();
  logOutTime: Date = new Date();
  expirationTime: Date = new Date();
  lastActivityTime: Date = new Date();
  isBlacklisted: boolean = false;
}
