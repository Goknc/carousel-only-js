(() => {
  const init = () => {
    buildHTML();
    buildCSS();
    setEvents();
  };

  const buildHTML = () => {
    const html = `
            <div class="container">
                <h1>You Might Also Like</h1>
                <div class="product-carousel"></div>
            </div>
            <div class="btn-container">
                <button class="btn-prev"><svg xmlns="http://www.w3.org/2000/svg" width="14.242" height="24.242" viewBox="0 0 14.242 24.242"><path fill="none" stroke="#333" stroke-linecap="round" stroke-width="3px" d="M2106.842 2395.467l-10 10 10 10" transform="translate(-2094.721 -2393.346)"></path></svg></button>
                <button class="btn-next"><svg xmlns="http://www.w3.org/2000/svg" width="14.242" height="24.242" viewBox="0 0 14.242 24.242"><path fill="none" stroke="#333" stroke-linecap="round" stroke-width="3px" d="M2106.842 2395.467l-10 10 10 10" transform="translate(-2094.721 -2393.346)"></path></svg></button>
            </div>
        `;

    $(".product-detail").append(html);
  };

  const buildCSS = () => {
    const css = `
                body {
                    margin:0px;
                    padding:0px;
                }
                .product-detail {
                    background-color: #faf9f7;
                    position:relative;
                }
                .container {
                    font-family: 'Open Sans';
                    width: 80%;
                    height: 100vh;
                    margin: 0 auto;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
                h1 {
                    font-weight: 100;
                }
                .product-carousel {
                    display: flex;
                    transition: 0.5s;
                    display: flex;
                    align-items: center;
                    flex-direction: row;
                }
                .product{
                    display: flex;
                    flex-direction: column;
                    margin-right: 8px;
                    position: relative;
                }
                .product-information {
                    background-color: white;
                    padding: 5px 10px; 
                    height: 95px;
                }
                .product-name {
                    color: black;
                    text-decoration: none;
                    font-size: 14px;
                    line-height: 1.5;
                }
                .product-price {
                    color: #193db0;
                    font-size: 18px;
                    line-height: 22px;
                    font-weight: 600;
                }
                .btn-container {
                    display: flex;
                    position: absolute;
                    justify-content: space-between;
                    top: 50%;
                    width: 100%;
                }                
                .favourite-product {
                    position: absolute;
                    top: 9px;
                    right: 15px;
                    width: 34px;
                    height: 34px;
                    background-color: #fff;
                    border-radius: 5px;
                    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, .16);
                    border: solid .5px #b6b7b9;
                    display: flex ;
                    justify-content: center;
                    align-items: center;
                }
                .active path {
                    fill: #193db0;
                    stroke: #193db0;
                }
                .btn-prev, .btn-next {
                    background:none;
                    border:none;
                }
                .btn-next {
                    rotate: 180deg;
                }
                @media screen and (max-width: 480px) {
                    .product {
                        margin-right: 0px;
                    }
                }
                @media screen and (min-width: 481px) and (max-width: 991px) {
                    .product {
                        margin-right: 2px;
                    }
                }
                @media screen and (min-width: 1025px) {
                    .btn-container {
                        width: 84%;
                        left: 8%;
                    }
                }
          `;

    $("<style>").addClass("carousel-style").html(css).appendTo("head");
  };

  const setEvents = () => {
    // Font family importing

    var fontLink = document.createElement("link");
    fontLink.setAttribute("rel", "stylesheet");
    fontLink.setAttribute("type", "text/css");
    fontLink.setAttribute(
      "href",
      "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
    );
    document.head.appendChild(fontLink);

    // Adding products to favourites list

    function addingToFavourite() {
      $(".favourite-product").click(function () {
        if ($(this).parent().hasClass("active")) {
          $(this).parent().removeClass("active");
        } else {
          $(this).parent().addClass("active");
        }

        let favouritedProducts = localStorage.getItem("storedProducts")
          ? JSON.parse(localStorage.getItem("storedProducts"))
          : [];

        let selectedElement = $(this).parent().attr("id");

        if (!favouritedProducts.includes(selectedElement)) {
          favouritedProducts.push(selectedElement);
        } else {
          favouritedProducts = favouritedProducts.filter(
            (element) => element != selectedElement
          );
        }

        localStorage.setItem(
          "storedProducts",
          JSON.stringify(favouritedProducts)
        );
      });
    }

    // Listing active favourites on reload

    function listingFavourites() {
      let favouritedProducts = localStorage.getItem("storedProducts");
      let items = JSON.parse(favouritedProducts);
      items.map((item) => {
        $(`#${item}`).addClass("active");
      });
    }

    // Carousel

    const setupCarousel = () => {
      var screenSize = window.innerWidth;
      let noOfElements;
      if (screenSize <= 480) {
        noOfElements = 1;
      } else if (screenSize > 480 && screenSize <= 767) {
        noOfElements = 2;
      } else if (screenSize > 767 && screenSize <= 1024) {
        noOfElements = 3;
      } else if (screenSize > 1024 && screenSize <= 1280) {
        noOfElements = 4;
      } else if (screenSize > 1280 && screenSize <= 1440) {
        noOfElements = 5;
      } else if (screenSize > 1440) {
        noOfElements = 7;
      }

      let position = 0;
      const slidesToMove = 1;
      const slidesToShow = noOfElements;
      const container = $(".container");
      const carousel = $(".product-carousel");
      const nextButton = $(".btn-next");
      const prevButton = $(".btn-prev");
      const productWidth = container.outerWidth() / slidesToShow;
      const productCount = $(".product").length;
      const movePosition = slidesToMove * productWidth;

      $(".product").each((index, element) => {
        $(element).css("max-width", `${productWidth - slidesToShow}px`);
      });

      nextButton.on("click", () => {
        const itemsLeft =
          productCount -
          (Math.abs(position) + slidesToShow * productWidth) / productWidth;

        position -=
          itemsLeft >= slidesToMove ? movePosition : itemsLeft * productWidth;

        setPosition();
      });

      prevButton.on("click", () => {
        const itemsLeft = Math.abs(position) / productWidth;

        position +=
          itemsLeft >= slidesToMove ? movePosition : itemsLeft * productWidth;

        setPosition();
      });

      const setPosition = () => {
        carousel.css("transform", `translateX(${position}px)`);
        checkButtons();
      };

      const checkButtons = () => {
        prevButton.prop("disabled", position === 0);
        nextButton.prop(
          "disabled",
          position <= -(productCount - slidesToShow) * productWidth
        );
      };

      checkButtons();
    };

    // Fetching the products and priting them

    async function getProductsData() {
      let products;
      const productsInStorage = JSON.parse(
        localStorage.getItem("productsInStorage")
      );
      if (productsInStorage) {
        products = productsInStorage;
      } else {
        const url =
          "https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json";
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error("An error occured while fetching data.");
          }
          products = await response.json();
        } catch (error) {
          console.error(error.message);
        }
        localStorage.setItem("productsInStorage", JSON.stringify(products));
      }
      const productList = products.map((product) => {
        return `
                <div class="product" id="${product.id}">
                    <button class="favourite-product"><svg xmlns="http://www.w3.org/2000/svg" width="20.576" height="19.483" viewBox="0 0 20.576 19.483"><path fill="none" stroke="#555" stroke-width="1.5px" d="M19.032 7.111c-.278-3.063-2.446-5.285-5.159-5.285a5.128 5.128 0 0 0-4.394 2.532 4.942 4.942 0 0 0-4.288-2.532C2.478 1.826.31 4.048.032 7.111a5.449 5.449 0 0 0 .162 2.008 8.614 8.614 0 0 0 2.639 4.4l6.642 6.031 6.755-6.027a8.615 8.615 0 0 0 2.639-4.4 5.461 5.461 0 0 0 .163-2.012z" transform="translate(.756 -1.076)"></path></svg></button>
                    <img src=${product.img}></img>
                    <div class="product-information">
                        <a target="_blank" class="product-name" href="${product.url}">${product.name}</a>
                        <div class="product-price">${product.price} TL</div>
                    </div>
                </div>
            `;
      });
      $(".product-carousel").append(productList);
      setupCarousel();
      addingToFavourite();
      listingFavourites();
    }
    getProductsData();
  };
  init();
})();
