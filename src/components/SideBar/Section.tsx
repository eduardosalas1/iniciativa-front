


interface SectionProps {
  title: string;
  items?: { title: string; desc?: string; color?: string }[];
  placeholder?: string;
}

export function Section({ title, items, placeholder }: SectionProps) {
  return (
    <div className="mb-6">
      <h4 className="font-semibold text-gray-800 mb-2 border-b-2 border-orange-400 w-fit pb-1">
        {title}
      </h4>

      {items && items.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {items.map((item, i) => (
            <div
              key={i}
              className={`bg-gray-50 border-l-4 ${item.color} rounded-lg p-3 shadow-sm flex flex-col w-full`}
            >
              <p className="font-medium text-gray-800">{item.title}</p>
              {item.desc && (
                <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-sm">{placeholder}</p>
      )}
    </div>
  );
}