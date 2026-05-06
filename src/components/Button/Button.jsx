import MuiButton from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";

const variantStyles = {
  primary: {
    backgroundColor: "var(--color-primary)",
    borderColor: "var(--color-primary)",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "var(--color-primary-hover)",
      borderColor: "var(--color-primary-hover)",
    },
  },
  purple: {
    backgroundColor: "var(--color-accent-purple)",
    borderColor: "var(--color-accent-purple)",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "var(--color-accent-purple-hover)",
      borderColor: "var(--color-accent-purple-hover)",
    },
  },
  orange: {
    backgroundColor: "var(--color-highlight-orange)",
    borderColor: "var(--color-highlight-orange)",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "var(--color-highlight-orange-hover)",
      borderColor: "var(--color-highlight-orange-hover)",
    },
  },
  outline: {
    backgroundColor: "transparent",
    borderColor: "var(--color-primary)",
    color: "var(--color-primary)",
    "&:hover": {
      backgroundColor: "var(--color-primary)",
      borderColor: "var(--color-primary)",
      color: "#ffffff",
    },
  },
};

const baseStyles = {
  alignItems: "center",
  border: "1px solid transparent",
  borderRadius: "8px",
  boxShadow: "none",
  display: "inline-flex",
  fontFamily: "inherit",
  fontWeight: 800,
  gap: "0.5rem",
  justifyContent: "center",
  minHeight: "2.9rem",
  px: "1.25rem",
  py: "0.75rem",
  textTransform: "uppercase",
  transition:
    "background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.2s ease",
  "&:hover": {
    boxShadow: "none",
    transform: "translateY(-2px)",
  },
};

function Button({
  children,
  to,
  variant = "primary",
  type = "button",
  className = "",
  sx,
  ...props
}) {
  const buttonVariant = variant === "outline" ? "outlined" : "contained";
  const buttonStyles = {
    ...baseStyles,
    ...(variantStyles[variant] || variantStyles.primary),
    ...sx,
  };

  if (to) {
    return (
      <MuiButton
        className={className}
        component={RouterLink}
        disableElevation
        to={to}
        type={type}
        variant={buttonVariant}
        sx={buttonStyles}
        {...props}
      >
        {children}
      </MuiButton>
    );
  }

  return (
    <MuiButton
      className={className}
      disableElevation
      type={type}
      variant={buttonVariant}
      sx={buttonStyles}
      {...props}
    >
      {children}
    </MuiButton>
  );
}

export default Button;
