import LoginForm from "@/components/LoginForm";
import { ToastContainer } from "react-toastify";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <LoginForm />
      <ToastContainer aria-label="toast-container" />
    </div>
  );
}
