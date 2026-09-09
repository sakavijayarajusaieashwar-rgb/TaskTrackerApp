const InputField = ({ label, ...props }) => (
  <label className="input-field">
    <span>{label}</span>
    <input {...props} />
  </label>
)

export default InputField
