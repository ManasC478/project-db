export default function TextInput({
  id,
  value,
  placeholder,
  type,
  handleCredentials,
}) {
  return (
    <input
      id={id}
      required
      placeholder={placeholder}
      type={type}
      className='p-2 w-full border-slate-200 border-2 rounded-md'
      value={value}
      onBlur={handleCredentials}
    />
  );
}
