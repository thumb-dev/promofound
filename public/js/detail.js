function getParsedData (data) {
  const parser = new DOMParser()
  const parsedData = parser.parseFromString(data.productXML, 'text/xml')
  return (attr) => {
    return parsedData.querySelector(attr).innerHTML;
  }
}

function submitReviewButton() {
  alert("Thank you for submitting a review. Have a great day and keep PROMO SEARCHING!!");
}

$(document).ready(() => {
  console.log('ready');

    const searchParams = new URLSearchParams(window.location.search);

    // TODO add other search criteria
    //fetch('/search?style=unisex&size=m&color=red&search=hello')
    fetch(`/api/products/${searchParams.get('id')}`)
      .then((response) => response.json())
      .then((productData) => {
        const productElem = $('#product');
        const data = getParsedData(productData);
        const productJSON = JSON.parse(productData.productJSON).Product;

        productElem.empty();
        console.log('productData',productData);
        console.log('productJSON', productJSON);
        const formattedJSON = JSON.stringify(productJSON, undefined, 2);
        console.log('formatted', formattedJSON);
        productElem.append(`<div class="card" style="margin: auto;padding-top: 35px;">` +

          `<div class="container" style="padding-top:0;">` +
            `<div class="row">` +
              `<div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">` +
                `<div class="item">` +
                // `<div>${productData.mediaJSON}</div>` +
                  `<img class="product-img" src="${data('primaryImageUrl')}"/>` +
                `</div>` +
              `</div>` +
              `<div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 product-data">` +
                `<div class="product-dtl">` +
                  `<div class="product-info">` +
                    `<div class="product-name">${productData.productName}</div>` +
                    // `<div class="reviews-counter">` +
                    //   `<div class="rate">` +
                    //     `<input type="radio" id="star5" name="rate" value="5" checked />` +
                    //     `<label for="star5" title="text">5 stars</label>` +
                    //     `<input type="radio" id="star4" name="rate" value="4" checked />` +
                    //     `<label for="star4" title="text">4 stars</label>` +
                    //     `<input type="radio" id="star3" name="rate" value="3" checked />` +
                    //     `<label for="star3" title="text">3 stars</label>` +
                    //     `<input type="radio" id="star2" name="rate" value="2" checked/>` +
                    //     `<label for="star2" title="text">2 stars</label>` +
                    //     `<input type="radio" id="star1" name="rate" value="1" />` +
                    //     `<label for="star1" title="text">1 star</label>` +
                    //   `</div>` +
                    //   `<span>4 Reviews</span>` +
                    // `</div>` +
                    `<div class="product-price-discount">$<span>${productJSON.ProductPriceGroupArray[0].ProductPriceArray[0].price}</span></div>` +
                    // `<div class="product-price-discount">$<span>${productJSON.ProductPriceGroupArray[0].description}</span></div>` +
                    `<div class="supplier-name">Supplier: ${productData.supplierName}</div>` +
                    `<div class="supplier-name">Product ID: ${productData.productId}</div>` +
                  `</div>` +
                  `<p style="padding-top: 40px;">${productJSON.ProductPriceGroupArray[0].description}</p>` +
                //   `<div class="row">` +
                //   `<div class="product-count">` +
                //     `<label for="size">Quantity</label>` +
                //     `<form action="#" class="display-flex">` +
                //       `<div class="qtyminus">-</div>` +
                //       `<input type="text" name="quantity" value="1" class="qty">` +
                //       `<div class="qtyplus">+</div>` +
                //     `</form>` +
                //     `<a href="#" class="round-black-btn">Add to Cart</a>` +
                //   `</div>` +
                // `</div>` +
                // <!-- Button trigger modal -->
                `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">` +
                  `View Product JSON Data` +
                `</button>` +
              `</div>` +
            `</div>` +
            `<div class="product-info-tabs">` +
              `<ul class="nav nav-tabs" id="myTab" role="tablist">` +
                `<li class="nav-item">` +
                  `<a class="nav-link active" id="description-tab" data-toggle="tab" href="#description" role="tab" aria-controls="description" aria-selected="true">Description</a>` +
                `</li>` +
                `<li class="nav-item">` +
                  `<a class="nav-link" id="review-tab" data-toggle="tab" href="#review" role="tab" aria-controls="review" aria-selected="false">Reviews (0)</a>` +
                `</li>` +
              `</ul>` +
              `<div class="tab-content" id="myTabContent">` +
                `<div class="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab">` +
                  `${productJSON.description}` +
                `</div>` +
                `<div class="tab-pane fade" id="review" role="tabpanel" aria-labelledby="review-tab">` +
                  `<div class="review-heading">REVIEWS</div>` +
                  `<p class="mb-20">There are no reviews yet.</p>` +
                  `<form class="review-form">` +
                    `<div class="form-group">` +
                      `<label>Your rating</label>` +
                      `<div class="reviews-counter">` +
                        `<div class="rate">` +
                          `<input type="radio" id="star5" name="rate" value="5" />` +
                          `<label for="star5" title="text">5 stars</label>` +
                          `<input type="radio" id="star4" name="rate" value="4" />` +
                          `<label for="star4" title="text">4 stars</label>` +
                          `<input type="radio" id="star3" name="rate" value="3" />` +
                          `<label for="star3" title="text">3 stars</label>` +
                          `<input type="radio" id="star2" name="rate" value="2" />` +
                          `<label for="star2" title="text">2 stars</label>` +
                          `<input type="radio" id="star1" name="rate" value="1" />` +
                          `<label for="star1" title="text">1 star</label>` +
                        `</div>` +
                      `</div>` +
                    `</div>` +
                    `<div class="form-group">` +
                      `<label>Your message</label>` +
                      `<textarea class="form-control" rows="10"></textarea>` +
                    `</div>` +
                    `<div class="row">` +
                      `<div class="col-md-12">` +
                        `<div class="form-group">` +
                          `<input type="text" name="" class="form-control" placeholder="Name*">` +
                        `</div>` +
                      `</div>` +
                      `<div class="col-md-12">` +
                        `<div class="form-group">` +
                          `<input type="text" name="" class="form-control" placeholder="Email Id*">` +
                        `</div>` +
                      `</div>` +
                    `</div>` +
                    `<button id="review-button" class="round-black-btn" onclick="submitReviewButton()"><a href="https://promofound.herokuapp.com/" style="text-decoration: none;">Submit Review</a></button>` +
                  `</form>` +
                `</div>` +
              `</div>` +
            `</div>` +
          `</div>` +
          `</div>` +
          // <!-- Modal -->
          `<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">` +
            `<div class="modal-dialog" role="document">` +
              `<div class="modal-content">` +
                `<div class="modal-header">` +
                  `<h5 class="modal-title" id="exampleModalLabel">${productData.productName} Data</h5>` +
                  `<button type="button" class="close" data-dismiss="modal" aria-label="Close">` +
                    `<span aria-hidden="true">&times;</span>` +
                  `</button>` +
                `</div>` +
                `<div class="modal-body">` +
                  `<pre id="formatted-json">${formattedJSON}</pre>` +
                `</div>` +
                `<div class="modal-footer">` +
                  `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>` +
                `</div>` +
              `</div>` +
            `</div>` +
          `</div>` +

        `</div>`)

      });
});
