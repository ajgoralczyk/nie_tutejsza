type AuthorProps = {}

export default function Author({ authors }: AuthorProps) {
  const { name, photo, email, description } = authors.data[0].attributes;
  // console.log('Author:', name, photo, email, description);

  return (
    <section className="mx-auto px-4 lg:px-6 pb-4 lg:pb-6 max-w-screen-lg">
      <div className="border border-lightGrey rounded-xl p-4 lg:p-6 flex flex-row gap-6">
        <div className="w-12 h-12 lg:w-20 lg:h-20 bg-yellow rounded-full flex justify-center items-center text-3xl">A</div>
        <div className="">
          <h5 className="font-semibold">{name}</h5>
          <p>{description}</p>
        </div>
      </div>
    </section>
  );
}
