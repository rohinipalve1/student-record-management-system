export default function StatCard({ title, value, color }) {
  return (
    <div className={`p-6 rounded-xl shadow-md text-white ${color}`}>
      <h3 className="text-sm uppercase opacity-80">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
