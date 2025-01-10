import Image from "next/image";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
    <div>
      <h1>home</h1>
      <RegisterLink>Register</RegisterLink>
      <LoginLink>Login</LoginLink>
    </div>
  );
}
