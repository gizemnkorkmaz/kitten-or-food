import clsx from 'clsx';

const Button = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  ...props
}) => {
  const baseStyles = 'font-bold py-3 px-6 rounded-md w-full mx-auto w-full';

  const variants = {
    primary: 'bg-purple-600 hover:bg-purple-700 text-white',
    secondary: 'bg-pink-600 hover:bg-pink-700 text-white',
    ghost: 'bg-transparent hover:text-purple-800 text-purple-400 underline text-[12px]',
    disabled: 'bg-gray-400 text-gray-700 cursor-not-allowed',
  };

  const buttonClasses = clsx(
    baseStyles,
    variants[variant],
    disabled && 'opacity-50 cursor-not-allowed',
  );

  return (
    <button
      onClick={!disabled ? onClick : undefined}
      className={buttonClasses}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
