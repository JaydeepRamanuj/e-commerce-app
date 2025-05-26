export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-[60vh] bg-black rounded-xl border border-yellow-500/20 shadow-xl shadow-yellow-500/10 text-center text-gray-200 px-6">
      <div className="relative h-16 w-16 mb-6">
        <div className="absolute top-0 left-0 right-0 bottom-0 border-4 border-yellow-500 border-dashed rounded-full animate-spin [animation-duration:_2.5s]"></div>
        <div className="absolute top-3 left-3 right-3 bottom-3 bg-yellow-500 rounded-full shadow-md shadow-yellow-500/30"></div>
      </div>

      <h2 className="text-xl font-semibold text-yellow-400">Loading...</h2>
      <p className="text-gray-400 mt-2">
        Just a moment while we prepare something awesome ⚡
      </p>
    </div>
  );
}
