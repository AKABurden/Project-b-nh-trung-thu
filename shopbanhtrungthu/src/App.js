import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";
import QRthanhtoan from "./image/QRthanhtoan.jpg";
/* ===== Bản Home ===== */
function Home({ addToCart }) {
  const sweetProducts = [
    { id: 1, name: "Nhân sầu riêng - đậu xanh", price: 160000 },
    { id: 2, name: "Nhân mè đen", price: 140000 },
    { id: 3, name: "Nhân sữa dừa", price: 130000 },
  ];
  const savoryProducts = [
    { id: 4, name: "Thập cẩm", price: 150000 },
    { id: 5, name: "Bông lan trứng muối", price: 170000 },
  ];

  return (
    <div className="home page fade-in">
      <h2>🍪 Danh mục bánh</h2>
      <div className="categories">
        <Link to="/sweet" className="category">
          🍰 Bánh ngọt
        </Link>
        <Link to="/savory" className="category">
          🥪 Bánh mặn
        </Link>
      </div>
    </div>
  );
}

/* ===== Bản ProductList ===== */
function ProductList({ type, addToCart }) {
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

  const items = PRODUCTS[type] || [];

  return (
    <div className="product-list page fade-in">
      <h2>{type === "sweet" ? "Bánh ngọt" : "Bánh mặn"}</h2>
      <div className="grid">
        {items.map((p) => (
          <div className="card zoom-in" key={p.id}>
            <h3>{p.name}</h3>
            <div className="price">{p.price.toLocaleString()}₫</div>
            <button className="buy-btn" onClick={() => addToCart(p)}>
              Thêm giỏ
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===== Bản Cart ===== */
function Cart({ cart, updateQty, clearCart }) {
  const [showModal, setShowModal] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [accountInfo, setAccountInfo] = useState("");
  const navigate = useNavigate();

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const handlePay = () => {
    if (!userInfo.name || !userInfo.phone || !userInfo.address) {
      alert("Vui lòng nhập đầy đủ thông tin cá nhân!");
      return;
    }
    if (
      (paymentMethod === "bank" || paymentMethod === "wallet") &&
      !accountInfo.trim()
    ) {
      alert("Vui lòng nhập thông tin thanh toán!");
      return;
    }
    setShowModal(true);
  };

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
                    <button
                      className="qty-btn"
                      onClick={() => updateQty(item.id, item.qty - 1)}
                    >
                      -
                    </button>
                    <span className="qty">{item.qty}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQty(item.id, item.qty + 1)}
                    >
                      +
                    </button>
                  </td>
                  <td>{(item.price * item.qty).toLocaleString()}₫</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="user-info">
            <h3>Thông tin khách hàng:</h3>
            <input
              type="text"
              placeholder="Họ và tên"
              value={userInfo.name}
              onChange={(e) =>
                setUserInfo({ ...userInfo, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Số điện thoại"
              value={userInfo.phone}
              onChange={(e) =>
                setUserInfo({ ...userInfo, phone: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Địa chỉ giao hàng"
              value={userInfo.address}
              onChange={(e) =>
                setUserInfo({ ...userInfo, address: e.target.value })
              }
            />
          </div>

          {userInfo.name && userInfo.phone && userInfo.address && (
            <div className="payment-method">
              <h3>Chọn phương thức thanh toán:</h3>
              <label>
                <input
                  type="radio"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Thanh toán khi nhận hàng
              </label>

              <label>
                <input
                  type="radio"
                  value="bank"
                  checked={paymentMethod === "bank"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Chuyển khoản
              </label>
              {paymentMethod === "bank" && (
                <div className="bank-payment">
                  <p>Quét QR để thanh toán:</p>
                  <img
                    src={QRthanhtoan}
                    alt="QR Thanh toán"
                    style={{
                      width: "300px",
                      height: "300px",
                      margin: "20px",
                      cursor: "pointer",
                    }}
                    onClick={() => alert("✅ Thanh toán thành công!")}
                  />
                </div>
              )}
              <label>
                <input
                  type="radio"
                  value="wallet"
                  checked={paymentMethod === "wallet"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Ví điện tử
              </label>
              {paymentMethod === "wallet" && (
                <input
                  type="text"
                  placeholder="Nhập số điện thoại ví"
                  value={accountInfo}
                  onChange={(e) => setAccountInfo(e.target.value)}
                />
              )}
            </div>
          )}

          <div className="cart-summary">
            <h3>Tổng: {total.toLocaleString()}₫</h3>
            <button className="pay-btn" onClick={handlePay}>
              Thanh toán
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal fade-in">
          <div className="modal-content slide-up">
            <h3>🎉 Đặt hàng thành công!</h3>
            <p>
              Cảm ơn khách hàng {userInfo.name}, đơn hàng sẽ được giao đến{" "}
              {userInfo.address}.
            </p>
            <button
              className="close-btn"
              onClick={() => {
                setShowModal(false);
                clearCart();
                navigate("/");
              }}
            >
              Về trang chủ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ===== Toast ===== */
function Toast({ message, onClose }) {
  return (
    <div className="toast slide-down">
      {message}
      <button className="toast-close" onClick={onClose}>
        ×
      </button>
    </div>
  );
}

/* ===== App chính ===== */
export default function App() {
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState("");

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists)
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      return [...prev, { ...product, qty: 1 }];
    });
    setToast(`Đã thêm ${product.name} vào giỏ hàng`);
    setTimeout(() => setToast(""), 2000);
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) setCart(cart.filter((i) => i.id !== id));
    else setCart(cart.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  const clearCart = () => setCart([]);

  return (
    <div className="app">
      <header>
        <h1>
          <Link to="/">Tiệm Bánh MuyMuy</Link>
        </h1>
        <nav>
          <Link to="/">Trang chủ</Link>
          <Link to="/cart">Giỏ hàng ({cart.length})</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route
            path="/sweet"
            element={<ProductList type="sweet" addToCart={addToCart} />}
          />
          <Route
            path="/savory"
            element={<ProductList type="savory" addToCart={addToCart} />}
          />
          <Route
            path="/cart"
            element={
              <Cart cart={cart} updateQty={updateQty} clearCart={clearCart} />
            }
          />
        </Routes>
      </main>

      <footer>© SĐT Order bánh: 0762425342</footer>

      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </div>
  );
}
