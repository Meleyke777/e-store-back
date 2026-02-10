document.addEventListener("DOMContentLoaded", function () {
  const footer = `
          <footer class="bg-gray-800 text-white mt-12">
              <div class="container mx-auto py-8 px-4">
                  <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                      <div>
                          <h5 class="text-lg font-bold mb-4">Exclusive</h5>
                          <p class="mb-2">Subscribe</p>
                          <p class="mb-2">Get 10% off your first order</p>
                          <input type="email" placeholder="Enter your email" class="w-full px-3 py-2 rounded text-gray-800">
                      </div>
                      <div>
                          <h5 class="text-lg font-bold mb-4">Support</h5>
                          <p class="mb-2">111 Bijoy sarani, Dhaka, Bangladesh.</p>
                          <p class="mb-2">exclusive@gmail.com</p>
                          <p class="mb-2">+88015-88888-9999</p>
                      </div>
                      <div>
                          <h5 class="text-lg font-bold mb-4">Account</h5>
                          <p class="mb-2"><a href="profile.html" class="hover:text-gray-300">My Account</a></p>
                          <p class="mb-2"><a href="cart.html" class="hover:text-gray-300">Cart</a></p>
                          <p class="mb-2"><a href="shop.html" class="hover:text-gray-300">Shop</a></p>
                      </div>
                      <div>
                          <h5 class="text-lg font-bold mb-4">Quick Link</h5>
                          <p class="mb-2"><a href="#" class="hover:text-gray-300">Privacy Policy</a></p>
                          <p class="mb-2"><a href="#" class="hover:text-gray-300">Terms Of Use</a></p>
                          <p class="mb-2"><a href="#" class="hover:text-gray-300">FAQ</a></p>
                      </div>
                  </div>
                  <div class="text-center mt-8">
                      <p>Copyright &copy; Rimel 2022. All rights reserved.</p>
                  </div>
              </div>
          </footer>
      `;

  document.getElementById("footer-placeholder").innerHTML = footer;
});
