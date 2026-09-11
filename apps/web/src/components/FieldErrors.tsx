export function FieldErrors({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;

  return (
    <ul className="mt-1 text-xs text-red-600">
      {errors.map((message) => (
        <li key={message}>{message}</li>
      ))}
    </ul>
  );
}
