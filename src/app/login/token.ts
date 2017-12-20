export class Token {
  access_token: string;
  id_token: string;
  scope: string;
  expires_in: number;
  token_type: string;

  toString():string {
    return this.access_token + "-" + this.id_token + "-" + this.scope + "-" + this.expires_in + "-" + this.token_type;
  }
}
