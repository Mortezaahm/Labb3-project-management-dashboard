type SectionProps = {
  title?: string;
  children: React.ReactNode;
};


export default function Section({
  title,
  children,
}: SectionProps) {

  return (
    <section
      className="
        space-y-4
      "
    >

      {title && (
        <h2
          className="
            text-xl
            font-semibold

            text-gray-900
            dark:text-white
          "
        >
          {title}
        </h2>
      )}


      {children}

    </section>
  );
}
