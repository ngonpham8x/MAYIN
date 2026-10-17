export interface ChatActionButton {
  label: string;
  action: string;
  payload?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'technician';
  text: string;
  time: string;
  actionButtons?: ChatActionButton[];
}
