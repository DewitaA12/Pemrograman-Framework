import { render, screen } from "@testing-library/react";
import TampilanProduk from "@/views/produk";

// mock next/image karena tidak bisa render di environment jest
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

// mock next/link
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

const mockProducts = [
  {
    id: "1",
    name: "Produk A",
    price: 10000,
    image: "/img/test.jpg",
    category: "Kategori A",
  },
  {
    id: "2",
    name: "Produk B",
    price: 25000,
    image: "/img/test2.jpg",
    category: "Kategori B",
  },
];

describe("TampilanProduk Component", () => {
  // 1. Snapshot test - kondisi kosong
  it("renders skeleton when products is empty", () => {
    const page = render(<TampilanProduk products={[]} />);
    expect(page).toMatchSnapshot();
  });

  // 2. getByTestId - cek judul
  it("renders title correctly", () => {
    render(<TampilanProduk products={[]} />);
    expect(
      screen.getByTestId("produk-title").textContent
    ).toBe("Daftar Produk");
  });

  // 3. toBe - cek skeleton muncul saat products kosong
  it("shows skeleton when products is empty", () => {
    render(<TampilanProduk products={[]} />);
    const skeleton = screen.getByTestId("produk-skeleton");
    expect(skeleton).toBeTruthy();
  });

  // 4. Snapshot test - kondisi ada data
  it("renders products list correctly", () => {
    const page = render(<TampilanProduk products={mockProducts} />);
    expect(page).toMatchSnapshot();
  });

  // 5. toBe - cek nama produk pertama tampil
  it("renders product name correctly", () => {
    render(<TampilanProduk products={mockProducts} />);
    const firstName = screen.getAllByRole("heading", { level: 4 })[0];
    expect(firstName.textContent).toBe("Produk A");
  });
});