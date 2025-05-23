// Import React so we can define a React component
import React from "react";

// Define a functional component named 'Button' that accepts props
function Button({
  children,                      // 'children' refers to the content placed inside the <Button> component
  type = "button",              // default button type is "button" (can also be "submit" or "reset")
  bgColor = "bg-blue-600",      // default background color using Tailwind CSS class
  textColor = "text-white",     // default text color using Tailwind CSS class
  className = "",               // allows additional custom classes passed from parent
  ...props                      // spread operator captures all other props (e.g., onClick, disabled)
}) {
  // Return JSX: a button element with dynamic styles and behavior
  return (
    <button
      // Combine Tailwind CSS classes for padding, rounding, bgColor, textColor, and any additional classes
      className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
      type={type}       // Assign the button's type (button/submit/reset)
      {...props}        // Spread remaining props onto the button (e.g., onClick, disabled, id, etc.)
    >
      {children}        // Render any nested elements or text inside the button
    </button>
  );
}

// Export the Button component so it can be imported and used elsewhere
export default Button;
