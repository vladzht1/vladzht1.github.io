import { useDispatch } from "react-redux";

import { store } from "../store/store";

type ApplicationStore = typeof store.dispatch;

export const useTypedDispatch = () => useDispatch<ApplicationStore>();
