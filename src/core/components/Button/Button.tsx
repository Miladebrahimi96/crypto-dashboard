import { Button, type ButtonProps } from "antd";

type CustomButtonProps = ButtonProps & {
  children: React.ReactNode;
}

const CustomButton = ({ children, onClick, type, size, className, ...rest }: CustomButtonProps) => {
  return (
    <Button
      onClick={onClick}
      type={type}
      size={size}
      className={className}
      {...rest}
    >
      {children}
    </Button>
  )
};

export default CustomButton;