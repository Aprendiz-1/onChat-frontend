import { io } from 'socket.io-client';

export const socket = (user_id: string | undefined) => io('http://localhost:4000', {
    auth: {
        token: user_id,
    }
});
