import LoginRegisterPage from "@/components/loginregister";
export default function Login() {
  return (
    <LoginRegisterPage
      a={"LOGIN"}
      b={"TO"}
      c={"YOUR ACCOUNT"}
      d={
        "Login to your account in order to use our exclusive messenging app. Then enjoy seamless connectivity with your loved ones."
      }
      e={false}
      f={"LOG IN"}
      g={"DO NOT HAVE AN ACCOUNT?"}
      h={"SIGN UP"}
      i={"/register"}
    />
  );
}
