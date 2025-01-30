import { io } from 'socket.io-client';

export const socket = (user_id: string) => io('http://localhost:4000', {
    auth: {
        token: user_id,
    }
});
