type Props = {
  title: string;
  value: string | number;
  color?: string;
};

export default function StatCard({
  title,
  value,
  color = "text-white",
}: Props) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 md:p-5">

      <p className="text-sm text-slate-400 mb-2">
        {title}
      </p>

      <h3
        className={`text-xl sm:text-2xl md:text-3xl font-bold ${color}`}
      >
        {value}
      </h3>

    </div>
  );
}