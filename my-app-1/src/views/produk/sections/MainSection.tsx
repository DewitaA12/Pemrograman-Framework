type Props = {
  id?: string | string[];
};

const MainSection = ({ id }: Props) => {
  return (
    <section>
      <p>Produk: {id}</p>
    </section>
  );
};

export default MainSection;