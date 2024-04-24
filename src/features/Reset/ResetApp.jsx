import { useDispatch } from "react-redux";
import { resetToDefault } from "./resetActions";

export const ResetApp = () => {
  const dispatch = useDispatch();
  return <button onClick={() => dispatch(resetToDefault())}>Reset</button>;
};
