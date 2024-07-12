type HeaderProps = {
  description?: string,
  image?: string,
  title: string,
}

export default function Header(props: HeaderProps) {
  const { description, image, title } = props;
  return (
    <section className="w-full h-72 relative overflow-hidden">
      {image ? (
        <img
          src="/placeholder.svg"
          width={1200}
          height={600}
          alt="Featured Image"
          className="aspect-[2/1] object-cover"
        />
      ) : (
        <div className="h-full">
          <p className="text-[400px] text-yellow opacity-30 h-full -translate-y-1/2">{title}</p>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white-300/75 to-transparent p-6 md:p-8 lg:p-10">
        <h1 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="text-xl tracking-tight text-secondary sm:text-2xl md:text-3xl">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
