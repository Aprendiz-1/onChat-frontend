"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const setCookie = async (token: string) => {
  const cookieStore = await cookies();

  cookieStore.set({
    name: "user@token",
    value: token,
    httpOnly: true,
    path: "/",
  });
};

const removeCookie = async () => {
  const cookieData = await cookies();
  cookieData.delete('user@token');
  redirect('/');
}

export { setCookie, removeCookie };
