import { useEffect, useMemo, useState } from "react";
import { getProducts } from "../../api/productApi";
import ProductCard from "../../components/ProductCard/ProductCard";
import { mockProducts } from "../../data/mockProducts";
import { mapApiProducts, unwrapListResponse } from "../../utils/productMapper";
import styles from "./ProductsPage.module.css";

const filters = {
  categories: ["Men", "Women", "Sneakers", "Accessories"],
  sizes: ["S", "M", "L", "XL", "41", "42"],
  colors: ["Black", "White", "Olive", "Blue", "Cream"],
};

function ProductsPage() {
  const [products, setProducts] = useState(mockProducts);
  const [meta, setMeta] = useState(null);
  const [filtersState, setFiltersState] = useState({
    category_id: "",
    min_price: "",
    max_price: "",
    sort_by: "created_at",
    sort_direction: "desc",
    page: 1,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const categoryOptions = useMemo(() => {
    const apiCategories = products
      .filter((product) => product.categoryId)
      .map((product) => ({
        id: product.categoryId,
        name: product.category,
      }));
    const uniqueCategories = Array.from(
      new Map(apiCategories.map((category) => [category.id, category])).values(),
    );

    return uniqueCategories.length
      ? uniqueCategories
      : filters.categories.map((category) => ({ id: category, name: category }));
  }, [products]);

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const response = await getProducts({
          ...filtersState,
          category_id: filtersState.category_id || undefined,
          min_price: filtersState.min_price || undefined,
          max_price: filtersState.max_price || undefined,
        });
        const { items, meta: responseMeta } = unwrapListResponse(response);
        const mappedProducts = mapApiProducts(items);

        if (isMounted) {
          setProducts(mappedProducts.length ? mappedProducts : mockProducts);
          setMeta(responseMeta);
        }
      } catch {
        if (isMounted) {
          setProducts(mockProducts);
          setMeta(null);
          setErrorMessage("Could not load live products. Showing preview items.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, [filtersState]);

  const updateFilters = (updates) => {
    setFiltersState((current) => ({
      ...current,
      ...updates,
      page: 1,
    }));
  };

  const handleSortChange = (event) => {
    const [sort_by, sort_direction] = event.target.value.split(":");
    updateFilters({ sort_by, sort_direction });
  };

  return (
    <main>
      <section className="page-title">
        <div className="container">
          <span className={styles.eyebrow}>Customer Shop</span>
          <h1>Shop Products</h1>
          <p className="text-muted-store">
            Browse live products from the customer API.
          </p>
        </div>
      </section>

      <section className={styles.shopSection}>
        <div className="container">
          <div className={styles.shopLayout}>
            <aside className={styles.filters}>
              <h2>Filters</h2>

              <div className={styles.filterGroup}>
                <h3>Category</h3>
                {categoryOptions.map((item) => (
                  <label key={item.id}>
                    <input
                      checked={String(filtersState.category_id) === String(item.id)}
                      name="category"
                      onChange={() =>
                        updateFilters({
                          category_id:
                            String(filtersState.category_id) === String(item.id)
                              ? ""
                              : item.id,
                        })
                      }
                      type="checkbox"
                    />{" "}
                    {item.name}
                  </label>
                ))}
              </div>

              <div className={styles.filterGroup}>
                <h3>Price</h3>
                <label>
                  <input
                    checked={filtersState.max_price === "50"}
                    name="price"
                    onChange={() => updateFilters({ min_price: "", max_price: "50" })}
                    type="radio"
                  />{" "}
                  Under $50
                </label>
                <label>
                  <input
                    checked={
                      filtersState.min_price === "50" &&
                      filtersState.max_price === "100"
                    }
                    name="price"
                    onChange={() =>
                      updateFilters({ min_price: "50", max_price: "100" })
                    }
                    type="radio"
                  />{" "}
                  $50 - $100
                </label>
                <label>
                  <input
                    checked={filtersState.min_price === "100"}
                    name="price"
                    onChange={() => updateFilters({ min_price: "100", max_price: "" })}
                    type="radio"
                  />{" "}
                  $100+
                </label>
                <button
                  className={styles.clearButton}
                  onClick={() => updateFilters({ min_price: "", max_price: "" })}
                  type="button"
                >
                  Clear price
                </button>
              </div>

              <div className={styles.filterGroup}>
                <h3>Size</h3>
                <div className={styles.chips}>
                  {filters.sizes.map((item) => (
                    <button key={item} type="button">
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.filterGroup}>
                <h3>Color</h3>
                {filters.colors.map((item) => (
                  <label key={item}>
                    <input type="checkbox" /> {item}
                  </label>
                ))}
              </div>
            </aside>

            <div className={styles.productsArea}>
              <div className={styles.toolbar}>
                <span>
                  {isLoading
                    ? "Loading products..."
                    : `${meta?.total || products.length} products`}
                </span>
                <select
                  aria-label="Sort products"
                  onChange={handleSortChange}
                  value={`${filtersState.sort_by}:${filtersState.sort_direction}`}
                >
                  <option value="created_at:desc">Sort: Newest</option>
                  <option value="price:asc">Price: Low to High</option>
                  <option value="price:desc">Price: High to Low</option>
                  <option value="name_en:asc">Name: A to Z</option>
                </select>
              </div>

              {errorMessage && <p className={styles.status}>{errorMessage}</p>}

              <div className={styles.productGrid}>
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div className={styles.pagination}>
                <button
                  disabled={filtersState.page <= 1}
                  onClick={() =>
                    setFiltersState((current) => ({
                      ...current,
                      page: Math.max(current.page - 1, 1),
                    }))
                  }
                  type="button"
                >
                  Prev
                </button>
                <button className={styles.current} type="button">
                  {meta?.current_page || filtersState.page}
                </button>
                <button
                  disabled={meta ? filtersState.page >= meta.last_page : true}
                  onClick={() =>
                    setFiltersState((current) => ({
                      ...current,
                      page: current.page + 1,
                    }))
                  }
                  type="button"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductsPage;
