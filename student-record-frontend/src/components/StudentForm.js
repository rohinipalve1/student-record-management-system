export default function StudentForm({ student, onSubmit, buttonText }) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      {["name","roll","department","address","phone","email"].map((field) => (
        <div key={field}>
          <label className="block font-medium capitalize">{field}</label>
          <input
            type="text"
            name={field}
            defaultValue={student?.[field] || ""}
            className="w-full border rounded p-2"
            required
          />
        </div>
      ))}

      <button className="bg-green-600 text-white px-4 py-2 rounded">
        {buttonText}
      </button>
    </form>
  );
}
