export default function Alert({ message }) {
  if (!message) return null;

  return (
    <div className="bg-green-100 text-green-800 p-3 rounded mb-4 text-center">
      {message}
    </div>
  );
}
