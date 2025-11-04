import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ProductList } from "@/app/components/ProductsList";
import { initialProducts } from "@/app/data/products";

jest.mock("framer-motion", () => {
  return {
    motion: {
      header: (props: any) => <div {...props} />,
      section: (props: any) => <div {...props} />,
      main: (props: any) => <div {...props} />,
      div: (props: any) => <div {...props} />,
    },
  };
});

jest.mock("@/app/components/shared/Spinner", () => ({
  Spinner: () => <div data-testid="spinner">spinner</div>,
}));

jest.mock("@/app/components/ProductCard", () => ({
  ProductCard: ({ product }: any) => (
    <div data-testid="product-card">{product.name}</div>
  ),
}));

jest.mock("@/app/components/shared/Pagination", () => ({
  Pagination: ({ onPageChange, currentPage, totalPages }: any) => (
    <div>
      <p>
        page {currentPage} of {totalPages}
      </p>
      <button onClick={() => onPageChange(1)}>1</button>
      <button onClick={() => onPageChange(2)}>2</button>
    </div>
  ),
}));

jest.mock("@/app/components/shared/AddProduct", () => ({
  AddProduct: () => <button data-testid="add-product">add</button>,
}));

jest.mock("@/app/components/SearchFilterBar", () => ({
  SearchFilterBar: ({
    searchValue,
    onSearchChange,
    statusValue,
    onStatusChange,
  }: any) => (
    <div>
      <input
        data-testid="search-input"
        value={searchValue}
        onChange={onSearchChange}
      />
      <select
        data-testid="status-select"
        value={statusValue}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <option value="all">Todos</option>
        <option value="active">Activos</option>
        <option value="inactive">Inactivos</option>
      </select>
    </div>
  ),
}));

const mockProducts = [
  { id: "1", name: "Taza", sku: "TAZ-001", status: "active" },
  { id: "2", name: "Remera", sku: "REM-002", status: "inactive" },
  { id: "3", name: "Gorra", sku: "GOR-003", status: "active" },
  { id: "4", name: "Pantalón", sku: "PAN-004", status: "active" },
  { id: "5", name: "Buzo", sku: "BUZ-005", status: "inactive" },
  { id: "6", name: "Campera", sku: "CAM-006", status: "active" },
  { id: "7", name: "Zapatos", sku: "ZAP-007", status: "active" },
];

jest.mock("@/app/context/ProductsContext", () => ({
  useProducts: () => ({
    products: mockProducts,
  }),
}));

jest.useFakeTimers();

describe("ProductList", () => {
  test("renderiza el título y los controles", () => {
    render(<ProductList products={initialProducts} />);
    expect(screen.getByText("Administra tus productos")).toBeInTheDocument();
    expect(screen.getByTestId("add-product")).toBeInTheDocument();
    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(screen.getByTestId("status-select")).toBeInTheDocument();
  });

  test("muestra loader durante el debounce", () => {
    render(<ProductList products={initialProducts} />);

    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "taza" } });

    expect(screen.getByTestId("spinner")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(800);
    });

    expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
  });

  test("filtra por texto después del debounce", () => {
    render(<ProductList products={initialProducts} />);

    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "Taz" } });

    act(() => {
      jest.advanceTimersByTime(800);
    });

    const cards = screen.getAllByTestId("product-card");
    expect(cards).toHaveLength(1);
    expect(cards[0]).toHaveTextContent("Taza");
  });

  test("muestra mensaje si no hay productos tras filtrar", () => {
    render(<ProductList products={initialProducts} />);

    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "no-existe" } });

    act(() => {
      jest.advanceTimersByTime(800);
    });

    expect(
      screen.getByText("No hay productos disponibles.")
    ).toBeInTheDocument();
  });
});
