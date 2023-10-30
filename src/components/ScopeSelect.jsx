import Select from "react-select";

export default function ScopeSelect(props) {
  const { selectedValue, handleScopeChange } = props;
  const options = [
    { label: "Select a scope", value: "" },
    { label: "Scope 1", value: "Scope 1" },
    { label: "Scope 2", value: "Scope 2" },
    { label: "Scope 3", value: "Scope 3" },
  ];
  const customStyles = {
    control: (styles) => ({
      ...styles,
      height: 59, // Adjust the height as needed
    }),
  };
  return (
    <>
      <Select
        options={options}
        value={options.find((option) => option.value === selectedValue)}
        onChange={handleScopeChange}
        styles={customStyles} // Apply the custom styles
      />
    </>
  );
}
