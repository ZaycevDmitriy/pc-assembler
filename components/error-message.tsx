import { FC } from "react";

type ErrorMessageProps = {
  message: string
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => (<p className="text-sm text-destructive">{message}</p>);

export default ErrorMessage;