import { useState } from "react";

const videos = [
  {
    id: "t1P0SeYt2TA",
    title: "Your Next Ski Adventure",
    description: "Experience the mountains, snow and unforgettable moments.",
  },
  {
    id: "NtZVFUvn3_U",
    title: "Rooftop Skiing in France",
    description:
      "Right after getting out of bed, rides down the snow-covered rooftops of Avoriaz.",
  },
  {
    id: "8z9SqmHGtBI",
    title: "Ski in Austria",
    description:
      "A week of snow madness on the slopes in Nassfeld with a group of friends.",
  },
];

function HeroVideo() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % videos.length);
  };

  const previousSlide = () => {
    setCurrent((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const currentVideo = videos[current];

  return (
    <section className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-2xl">
      <div className="relative aspect-video w-full">
        {/* YouTube Video */}
        <iframe
          key={currentVideo.id}
          className="pointer-events-none absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${currentVideo.id}?autoplay=1&mute=1&loop=1&playlist=${currentVideo.id}&controls=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&playsinline=1`}
          title={currentVideo.title}
          allow="autoplay; encrypted-media"
          allowFullScreen
        />

        {/* Dark gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Text */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 px-6 py-10 text-center text-white md:px-12">
          <h2 className="text-2xl font-bold md:text-4xl">
            {currentVideo.title}
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-sm text-white/90 md:text-lg">
            {currentVideo.description}
          </p>
        </div>

        {/* Previous button */}
        <button
          type="button"
          onClick={previousSlide}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-3 text-white backdrop-blur-sm transition hover:bg-black/60"
          aria-label="Previous video"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        {/* Next button */}
        <button
          type="button"
          onClick={nextSlide}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-3 text-white backdrop-blur-sm transition hover:bg-black/60"
          aria-label="Next video"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>

        {/* Video indicators */}
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {videos.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrent(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === current
                  ? "w-10 bg-white"
                  : "w-6 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to video ${index + 1}`}
              aria-current={index === current ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroVideo;
