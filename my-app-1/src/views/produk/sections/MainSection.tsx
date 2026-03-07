type Props = {
  id?: string | string[];
};

const MainSection = ({ id }: Props) => {
  return (
    <section className="p-6 bg-gray-100 rounded-lg shadow-md mt-6 text-center">
      <h2 className="text-2xl font-semibold mb-4">Detail Produk</h2>
      <p className="text-gray-700">Produk: {id}</p>
    </section>
  );
};

export default MainSection;