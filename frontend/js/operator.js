var app = angular.module('productApp', []);

// Membuat controller untuk menangani operasi produk
app.controller('ProductController', function ($scope) {
    // Mendapatkan daftar produk dari localStorage atau inisialisasi sebagai array kosong
    $scope.productList = JSON.parse(localStorage.getItem("productList")) || [];

    // Fungsi untuk mengupdate localStorage setiap kali daftar produk berubah
    $scope.updateLocalStorage = function () {
        localStorage.setItem("productList", JSON.stringify($scope.productList));
    };

    // Fungsi untuk menambahkan produk
    $scope.addProduct = function () {
        var productName = $scope.productName;
        var productPrice = $scope.productPrice;
        var productStock = $scope.productStock;
        var productImage = $scope.productImage;

        var reader = new FileReader();
        reader.onload = function (e) {
            var newProduct = {
                name: productName,
                price: productPrice,
                stock: productStock,
                image: e.target.result
            };

            $scope.productList.push(newProduct);
            $scope.updateLocalStorage();
            $scope.renderProductTable();
            $scope.clearForm();
            $scope.$apply();
        };
        reader.readAsDataURL(productImage);
    };

    // Fungsi untuk menampilkan gambar produk
    $scope.viewImage = function (imageSrc) {
        var modalImage = document.getElementById("modalImage");
        modalImage.src = imageSrc;
        new bootstrap.Modal(document.getElementById('imageModal')).show();
    };

    // Fungsi untuk mengedit produk
    $scope.editProduct = function (index) {
        var product = $scope.productList[index];
        $scope.productName = product.name;
        $scope.productPrice = product.price;
        $scope.productStock = product.stock;
        $scope.productImage = null; // Gambar tidak disertakan dalam edit (untuk penanganan gambar lebih lanjut, bisa ditambahkan)
        $scope.deleteProduct(index);
    };

    // Fungsi untuk menghapus produk
    $scope.deleteProduct = function (index) {
        $scope.productList.splice(index, 1);
        $scope.updateLocalStorage();
        $scope.renderProductTable();
    };

    // Fungsi untuk merender daftar produk ke dalam tabel
    $scope.renderProductTable = function () {
        var tableBody = document.getElementById("productTable").getElementsByTagName("tbody")[0];
        tableBody.innerHTML = "";

        $scope.productList.forEach(function (product, index) {
            var row = document.createElement("tr");

            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.stock}</td>
                <td><button class="btn btn-info" onclick="angular.element(this).scope().viewImage('${product.image}')">Lihat Gambar</button></td>
                <td>
                    <button class="btn btn-warning" onclick="angular.element(this).scope().editProduct(${index})">Edit</button>
                    <button class="btn btn-danger" onclick="angular.element(this).scope().deleteProduct(${index})">Hapus</button>
                </td>
            `;

            tableBody.appendChild(row);
        });
    };

    // Fungsi untuk membersihkan form input
    $scope.clearForm = function () {
        $scope.productName = '';
        $scope.productPrice = '';
        $scope.productStock = '';
        $scope.productImage = null;
    };

    // Render produk ketika halaman dimuat
    window.onload = function () {
        $scope.renderProductTable();
    };
});
