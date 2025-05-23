// Import React and useId hook from React
import React, { useId } from "react";

// Define a forwardRef component so we can forward the ref to the <input> element
const Input = React.forwardRef(function Input(
  {
    label, // Optional label to display above the input
    type = "text", // Input type defaults to "text"
    className = "", // Additional classes can be passed for styling
    ...props // All other props (like placeholder, value, onChange, etc.)
  },
  ref // Ref forwarded from the parent to directly access the input element
) {
  // Generate a unique ID using React's useId hook (important for associating label with input)
  const id = useId();

  return (
    <div className="w-full">
      {/* Full width container for the input and label */}
      {/* Conditionally render the label if 'label' prop is provided */}
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label} {/* Display the label text */}
        </label>
      )}
      {/* The actual input field */}
      <input
        type={type} // Set input type (text, password, email, etc.)
        id={id} // Assign the generated unique ID to input (for label association)
        ref={ref} // Attach the forwarded ref to the input element
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none 
                    focus:bg-gray-50 duration-200 border border-gray-200 w-full 
                    ${className}`} // Tailwind classes for styling, and additional custom classes
        {...props} // Spread any other props passed to the component
      />
    </div>
  );
});

// Export the Input component so it can be reused elsewhere
export default Input;
