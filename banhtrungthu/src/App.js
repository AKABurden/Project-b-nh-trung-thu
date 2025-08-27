import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

const PRODUCTS = {
  sweet: [
    { id: 1, name: "Nhân sầu riêng - đậu xanh", price: 160000 },
    { id: 2, name: "Nhân mè đen", price: 140000 },
    { id: 3, name: "Nhân sữa dừa", price: 130000 },
  ],
  savory: [
    { id: 4, name: "Thập cẩm", price: 150000 },
    { id: 5, name: "Bông lan trứng muối", price: 170000 },
  ],
};

function Home() {
  return (
    <div className="home page fade-in">
      <h2> Danh mục bánh</h2>
      <div className="categories">
        <Link to="/sweet" className="category">🍰 Nhân ngọt</Link>
        <Link to="/savory" className="category">🥪 Nhân Mặn</Link>
      </div>
    </div>
  );
}

function ProductList({ type, addToCart }) {
  const items = PRODUCTS[type] || [];

  return (
    <div className="product-list page fade-in">
      <h2>{type === "sweet" ? "Bánh ngọt" : "Bánh mặn"}</h2>
      <div className="grid">
        {items.map((p) => (
          <div className="card zoom-in" key={p.id}>
            <h3>{p.name}</h3>
            <div className="price">{p.price.toLocaleString()}₫</div>
            <button className="buy-btn" onClick={() => addToCart(p)}>Thêm giỏ</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Cart({ cart, updateQty, clearCart }) {
  const [showModal, setShowModal] = useState(false);

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="cart page fade-in">
      <h2>🛒 Giỏ hàng</h2>
      {cart.length === 0 ? (
        <p>Giỏ hàng trống.</p>
      ) : (
        <div>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.price.toLocaleString()}₫</td>
                  <td>
                    <button className="qty-btn" onClick={() => updateQty(item.id, item.qty - 1)}>-</button>
                    <span className="qty">{item.qty}</span>
                    <button className="qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                  </td>
                  <td>{(item.price * item.qty).toLocaleString()}₫</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-summary">
            <h3>Tổng: {total.toLocaleString()}₫</h3>
            <button className="pay-btn" onClick={() => setShowModal(true)}>Thanh toán</button>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal fade-in">
          <div className="modal-content slide-up">
            <h3>🎉 Thanh toán thành công!</h3>
            <p>Bạn đã mua {cart.length} sản phẩm.</p>
            <button className="close-btn" onClick={() => { setShowModal(false); clearCart(); }}>
              Về trang chủ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((p) => p.id === product.id);
      if (exist) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        );
      } else {
        return [...prev, { ...product, qty: 1 }];
      }
    });
  };

  const updateQty = (id, qty) => {
    setCart((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, qty } : p))
        .filter((p) => p.qty > 0)
    );
  };

  const clearCart = () => setCart([]);

  return (
    <div className="app">
      <header className="header slide-down">
        <h1>🍪 Tiệm Bánh Online</h1>
        <nav>
          <Link to="/">Trang chủ</Link>
          <Link to="/sweet">Bánh ngọt</Link>
          <Link to="/savory">Bánh mặn</Link>
          <Link to="/cart">🛒 Giỏ hàng ({cart.reduce((sum, i) => sum + i.qty, 0)})</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sweet" element={<ProductList type="sweet" addToCart={addToCart} />} />
          <Route path="/savory" element={<ProductList type="savory" addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} updateQty={updateQty} clearCart={clearCart} />} />
        </Routes>
      </main>

      <footer className="footer fade-in">
        <p>© 2025 Tiệm Bánh Online</p>
      </footer>
    </div>
  );
}
