import useTheme from "@/hooks/useTheme";
import { useUser } from "@/hooks/useUsers";

interface IProps {
  children: React.ReactNode;
}

const Initialize = ({ children }: IProps) => {
  useTheme();
  useUser();

  return children;
};

export default Initialize;
