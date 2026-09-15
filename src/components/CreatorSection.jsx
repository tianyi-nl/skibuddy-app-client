function CreatorSection({ trips }) {
  const uniqueCreators = Array.from(
    new Map(trips.map((trip) => [trip.creator?._id, trip.creator])).values()
  ).filter(Boolean);

  return (
     <section className="mx-auto max-w-7xl px-6 py-12 mt-[120px]">
      <h2 className="text-3xl font-bold text-gray-900">Creator</h2>
      <p className="mt-2 text-gray-500">
        Meet the people organizing these trips.
      </p>

<div className="flex flex-wrap gap-4">
        {uniqueCreators.map((creator) => (
          <div key={creator._id} className="flex flex-col items-center w-[120px]">
            <img
              src={creator.profilePicture}
              alt={creator.name}
              className="w-[128px] h-[128px] rounded-full object-cover w-[48px] "
            />
            <span className="mt-1 text-xs text-gray-600 text-center truncate w-full">
              {creator.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CreatorSection;