import { Link } from "react-router";

type AuthSwitchProps = {
  text: string;
  linkText: string;
  to: string;
};

export const AuthSwitch = ({ text, linkText, to }: AuthSwitchProps) => {
  return (
    <p className="text-sm text-center text-gray-600 mt-4">
      {text}{" "}
      <Link
        to={to}
        className="text-sky-600 font-semibold hover:underline"
      >
        {linkText}
      </Link>
    </p>
  );
};