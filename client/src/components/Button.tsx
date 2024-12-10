export default function Button({text}: {text: string}) {
  return (
    <button className="px-4 py-2 border border-gray-200 shadow-lg text-sm rounded-full">
      {text}
    </button>
  )
}