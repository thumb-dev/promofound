$(document).ready(() => {
      console.log('ready');

      $('#searchForm').on('submit', (event) => {
          event.preventDefault();
          console.log('submitted', event);

          const formData = new FormData(event.target);
          const queryString = new URLSearchParams(formData).toString();
          console.log('queryString', queryString);

          var matchLookup = {
            1: "Best",
            2: "Good",
            3: "Just Ok",
            4: "Not Great But Gets The Job Done",
            5: "Meh",
          }

          var queryDiv = queryString.replace("=", "");
          console.log('queryDiv 1', queryDiv);


          //fetch('/search?style=unisex&size=m&color=red&search=hello')
          fetch('/api/search?' + queryString)
            .then((response) => response.json())
            .then((data) => {
                const productsElem = $('#products');
                productsElem.empty();

                data.forEach((productData, i) => {
                    console.log(productData);


                    if (productData.Relevancy === 5 && productData.Ranking === 0) {
                      var queryDiv = 'hideShow-search';
                      console.log('queryDiv 2', queryDiv);
                    }
                      /*
                      {"Ranking":0,
                      "supplierName":"Starline",
                      "SupplierProductID":10,
                      "productId":"BCL01",
                      "productName":"Black Clover™ Lucky Heather Charcoal"},
                      */
                      productsElem.append(
                        `<div class="card" style="width: 18rem;">` +
                        // `<img src="..." class="card-img-top" alt="...">` +
                        `<p class="card-text">${productData.supplierName}</p>` +
                        `<p id="ranking-number}" class="ranking-text hideShow-${queryDiv}">Relevancy: <strong class="ranking-${productData.Relevancy}">${matchLookup[productData.Relevancy]}</strong></p>` +
                        `<div class="card-body">` +
                        `<div class="img-body">` +
                        `<img class="product-list-img" src="${productData.primaryImageUrl}" />` +
                        `</div>` +
                        `<h5 class="card-title">${productData.productName}</h5>` +
                        // `<p class="card-text">${productData.productDescription}</p>` +
                        // `<a href="/productDetails.html?id=${productData.SupplierProductID}" class="btn btn-primary">View Product</a>` +
                        `<div class="button-box">` +
                        `<a href="/productDetails.html?id=${productData.SupplierProductID}" class="btn btn-primary">View Product</a>` +
                        `</div>` +
                        `</div>` +
                        `</div>`)
                    });
                });

            })
      });
