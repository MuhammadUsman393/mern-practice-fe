import { Home, Login, SignUp } from "../pages/index";
import { AuthGuard, GuestGuard } from "../auth";

export const AllRoutes = [
  {
    path: "/",
    title: Home,
    Guard: AuthGuard,
  },
  {
    path: "/auth-login",
    title: Login,
    Guard: GuestGuard,
  },
  {
    path: "/auth-sign-up",
    title: SignUp,
    Guard: GuestGuard,
  },
];
