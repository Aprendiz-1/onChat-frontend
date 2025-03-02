"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const setCookie = async (token: string) => {
  const cookieStore = await cookies();

  cookieStore.set({
    name: "user@token",
    value: token,
    httpOnly: true,
    maxAge: 86400,
    path: "/",
  });
};

const getAuthToken = async () => {
  const token = (await cookies()).get("user@token")?.value;
  return token || null;
}

const removeCookie = async () => {
  const cookieData = await cookies();
  cookieData.delete('user@token');
  redirect('/');
}

export { setCookie, getAuthToken, removeCookie };
