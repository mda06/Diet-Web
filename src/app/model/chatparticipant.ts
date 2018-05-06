export class ChatParticipant {
  id: number = 0;
  username: string = "";
  authId: string = "";
  sessionId: string = "";
  messages: Array<any> = [];
  hasUnreadMessages: boolean = false;
}
