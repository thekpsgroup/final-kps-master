type Props = {
  src?: string;
  poster?: string;
  width?: number;
  height?: number;
};

export default function VideoTestimonial({
  src = '/videos/dfw-testimonial.mp4',
  poster = '/videos/dfw-poster.svg',
  width = 1280,
  height = 720,
}: Props) {
  return (
    <div className="w-full max-w-3xl mx-auto" style={{ aspectRatio: `${width} / ${height}` }}>
      <video
        controls
        preload="metadata"
        poster={poster}
        width={width}
        height={height}
        className="w-full h-auto rounded-xl shadow-sm bg-black"
      >
        <source src={src} />
  <track kind="captions" src="/Customer-Testimonial.vtt" srcLang="en" label="English captions" />
        Sorry, your browser doesn&apos;t support embedded videos. You can{' '}
        <a href={src}>download the testimonial</a> instead.
      </video>
    </div>
  );
}
