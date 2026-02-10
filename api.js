  const API_BASE_URL = "http://localhost:8085";

  const API = {
    // Auth
    LOGIN: `${API_BASE_URL}/api/v1/users/login`,
    REGISTER: `${API_BASE_URL}/api/v1/users/register`,
    ME: `${API_BASE_URL}/api/v1/users/me`,

    // Products
    GET_ALL_PRODUCTS: `${API_BASE_URL}/api/v1/products`,
    GET_PRODUCT_BY_ID: (id) =>
      `${API_BASE_URL}/api/v1/products/${id}`,
    GET_PRODUCT_BY_CATEGORY: (category) =>
      `${API_BASE_URL}/api/v1/products/category/${category}`,
    CREATE_PRODUCT: `${API_BASE_URL}/api/v1/products`,
    UPDATE_PRODUCT: (id) =>
      `${API_BASE_URL}/api/v1/products/${id}`,
    DELETE_PRODUCT: (id) =>
      `${API_BASE_URL}/api/v1/products/${id}`,
    GET_MY_PRODUCTS: `${API_BASE_URL}/api/v1/products/my`,
    SEARCH_PRODUCTS: (query) =>
      `${API_BASE_URL}/api/v1/products/search?keyword=${query}`,
    GET_BY_RATING: (rating) =>
      `${API_BASE_URL}/api/v1/products/rating/${rating}`,
    GET_PRICE_ASC: `${API_BASE_URL}/api/v1/products/price/asc`,
    GET_PRICE_DESC: `${API_BASE_URL}/api/v1/products/price/desc`,

    // Basket (у тебя БЕЗ api/v1)
    ADD_TO_BASKET: (productId) =>
      `${API_BASE_URL}/basket/${productId}`,
    GET_MY_BASKET: `${API_BASE_URL}/basket`,
    REMOVE_FROM_BASKET: (productId) =>
      `${API_BASE_URL}/basket/${productId}`,

    // Reviews
    CREATE_REVIEW: `${API_BASE_URL}/api/v1/reviews`,
    GET_REVIEWS_BY_PRODUCT: (productId) =>
      `${API_BASE_URL}/api/v1/reviews/product/${productId}`,
    DELETE_REVIEW: (id) =>
      `${API_BASE_URL}/api/v1/reviews/${id}`,
  };
