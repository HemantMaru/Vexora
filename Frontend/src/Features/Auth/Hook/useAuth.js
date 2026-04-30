import { useDispatch } from "react-redux";
import {
  register,
  login,
  getMe,
  inquiry,
  subscribe,
} from "../services/auth.api";
import { setError, setLoading, setUser } from "../State/auth.slice";
import toast from "react-hot-toast";
export const useAuth = () => {
  const dispatch = useDispatch();
  const handleRegister = async ({
    fullname,
    email,
    contact,
    isSeller = false,
    password,
  }) => {
    try {
      dispatch(setLoading(true));

      const response = await register({
        fullname,
        email,
        contact,
        isSeller,
        password,
      });

      toast.success("Account created 🚀");
      dispatch(setUser(response.user));
      dispatch(setLoading(false));
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Register failed");
      return false;
    }
  };
  const handleLogin = async ({ identifier, password }) => {
    const toastId = toast.loading("Logging in...");
    try {
      dispatch(setLoading(true));
      const response = await login({ identifier, password });
      toast.success("Login successful ", { id: toastId });
      dispatch(setUser(response.user));
      dispatch(setLoading(false));
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed", {
        id: toastId,
      });
      return false;
    }
  };

  const handleGetMe = async () => {
    try {
      dispatch(setLoading(true));
      const data = await getMe();
      dispatch(setUser(data.user));
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSendMessage = async ({
    fullname,
    email,
    orderNumber,
    message,
  }) => {
    try {
      const response = await inquiry({
        fullname,
        email,
        orderNumber,
        message,
      });

      toast.success(" Message Send Successfully🚀");

      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || "message send failed");
      return false;
    }
  };

  const handleSubscribe = async ({ email }) => {
    try {
      if (!email.trim()) {
        toast.error("Email is required");
        return;
      }
      const response = await subscribe({ email });

      toast.success(" Subscribe Successfully🚀");

      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Subscribe failed");
      return false;
    }
  };

  return {
    handleRegister,
    handleLogin,
    handleGetMe,
    handleSendMessage,
    handleSubscribe,
  };
};
