document.addEventListener("DOMContentLoaded", async function () {
      // ✅ Firebase Configuration
      const firebaseConfig = {
          apiKey: "AIzaSyAlzel753dB9z2cBmC3xKEk3ppjX-tHM1Y",
          authDomain: "authentication-bc55e.firebaseapp.com",
          projectId: "authentication-bc55e",
          storageBucket: "authentication-bc55e.appspot.com",
          messagingSenderId: "1062754336196",
          appId: "1:1062754336196:web:3d079d4f9d91fbf7ecb891",
          measurementId: "G-EW42Y38J5C"
      };

      if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig);
      }

      const auth = firebase.auth();
      const db = firebase.firestore();
      let cart = [];
      const cartContainer = document.querySelector('#cart-items');
      const totalPriceElement = document.getElementById('total-price');
      const checkoutButton = document.getElementById('checkout-btn');
      const googleLoginBtn = document.getElementById('google-login-button');
      const logoutButton = document.getElementById('logout-button');
      const userNameElement = document.getElementById('user-name');

      // ✅ Firebase Auth State Listener - Keeps user logged in
      auth.onAuthStateChanged((user) => {
          if (user) {
              googleLoginBtn.style.display = 'none';
              logoutButton.style.display = 'block';
              displayUserName(user.displayName);
              saveUserToFirestore(user);
          } else {
              googleLoginBtn.style.display = 'block';
              logoutButton.style.display = 'none';
              displayUserName("Guest");
          }
          loadCart();
      });

      // ✅ Display User Name
      function displayUserName(name) {
          if (userNameElement) {
              userNameElement.textContent = `Welcome, ${name}`;
          }
      }

      // ✅ Save User to Firestore (only if new)
      function saveUserToFirestore(user) {
          const userRef = db.collection("users").doc(user.uid);
          userRef.get().then((doc) => {
              if (!doc.exists) {
                  userRef.set({
                      name: user.displayName,
                      email: user.email,
                      uid: user.uid,
                      lastLogin: firebase.firestore.FieldValue.serverTimestamp() // Adding timestamp
                  }).catch((error) => console.error("❌ Error saving user:", error));
              } else {
                  // If the user already exists, update the lastLogin timestamp
                  userRef.update({
                      lastLogin: firebase.firestore.FieldValue.serverTimestamp()
                  }).catch((error) => console.error("❌ Error updating login timestamp:", error));
              }
          });
      }

      // ✅ Load Cart from LocalStorage
      function loadCart() {
          const storedCart = localStorage.getItem("cart");
          cart = storedCart ? JSON.parse(storedCart) : [];
          renderCart();
      }

      // ✅ Save Cart to LocalStorage
      function saveCart() {
          localStorage.setItem("cart", JSON.stringify(cart));
      }

      // ✅ Render Cart
      function renderCart() {
          cartContainer.innerHTML = '';
          let totalPrice = 0;

          cart.forEach((item, index) => {
              const itemDiv = document.createElement('div');
              itemDiv.className = 'my-carts-items';
              itemDiv.innerHTML = ` 
                  <p>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</p>
                  <button class="remove-btn" data-index="${index}">Remove</button>
              `;
              cartContainer.appendChild(itemDiv);
              totalPrice += item.price * item.quantity;
          });

          if (totalPriceElement) {
              totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
          }

          document.querySelectorAll('.remove-btn').forEach((btn) => {
              btn.addEventListener('click', function () {
                  const index = parseInt(btn.getAttribute('data-index'));
                  cart.splice(index, 1);
                  saveCart();
                  renderCart();
              });
          });
      }

      // ✅ Add to Cart
      document.querySelectorAll('.add-to-cart').forEach((btn) => {
          btn.addEventListener('click', function () {
              const productName = btn.getAttribute('data-name');
              const productPrice = parseFloat(btn.getAttribute('data-price'));

              const existingItem = cart.find(item => item.name === productName);
              if (existingItem) {
                  existingItem.quantity += 1;
              } else {
                  cart.push({ name: productName, price: productPrice, quantity: 1 });
              }

              saveCart();
              renderCart();
          });
      });

      // ✅ Google Login
      if (googleLoginBtn) {
          googleLoginBtn.addEventListener('click', function () {
              const provider = new firebase.auth.GoogleAuthProvider();
              auth.signInWithPopup(provider)
                  .then((result) => {
                      alert(`Welcome, ${result.user.displayName}!`);
                      googleLoginBtn.style.display = 'none';
                      logoutButton.style.display = 'block';
                  })
                  .catch((error) => console.error('❌ Error signing in:', error.message));
          });
      }

      // ✅ Logout
      if (logoutButton) {
          logoutButton.addEventListener('click', function () {
              auth.signOut().then(() => {
                  alert("Logged out successfully!");
                  logoutButton.style.display = 'none';
                  googleLoginBtn.style.display = 'block';
              }).catch((error) => console.error("❌ Error logging out:", error.message));
          });
      }

      // ✅ Checkout Button Click - Ensures user is logged in before proceeding
      if (checkoutButton) {
          checkoutButton.addEventListener('click', function () {
              const user = auth.currentUser; // Check real-time login status
              if (!user) {
                  alert("Please log in first!");
                  return;
              }
              window.location.href = `https://bookshop-f33cbc.webflow.io/my-checkout?userId=${user.uid}`;
          });
      }

      // ✅ Automatically Load Cart on Page Load
      loadCart();
  });
