"use server";

import { cookies } from "next/headers";
import ChatsPage from "./chats";

export default async function Chats() {
  const cookie = await cookies();
  const token = cookie.get("user@token")?.value as string;

  return <ChatsPage token={token} />;
}
