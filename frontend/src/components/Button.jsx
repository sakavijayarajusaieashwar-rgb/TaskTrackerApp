const Button = ({ children, type = 'button', disabled = false, onClick, variant = 'primary' }) => (
  <button className={`button button-${variant}`} type={type} disabled={disabled} onClick={onClick}>
    {children}
  </button>
)

export default Button
