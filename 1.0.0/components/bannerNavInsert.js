(async () => {
  //fn imports
  const docReady = (fn) => {
      if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", fn);
      } else {
          fn();
      }
  };
  //end
  
  function init() {
      const desktopMenu = (el, html) => {
          let elements = document.querySelectorAll('nav #header-category-flyout');
          let element = elements[el];
          element.children[0].insertAdjacentHTML('beforeend', html);
      };
      const burgerMenu = html => {
          let elements = document.querySelectorAll('nav[data-zta="hamburger-navigation"] div ul');
          elements[0].insertAdjacentHTML('afterbegin', html);
      };
      const createImg = (link, imgLink) => {
          return '<a href="' + link + '" style="display: inline-block; border-radius: 20px;padding:20px;padding-top:0px;padding-bottom:14px">' + '<img src="' + imgLink + '" alt="OB image" style="width: 1600px; max-width: 100%; height: auto; display: block;border-radius:13px;" onclick="SendAdobeData(\'target\', \'event655\')">' + '</a>';
      };
      let html = createImg("", "https://media.zooplus.com/bilder/0/2025_06_OBF_MenuBanner_C_D_500x320_DE_0.jpg", "15");
      let htmlCat = createImg("", "https://images.ctfassets.net/qp85kbzn8noe/68uBezoob4j5qyfzedeZp2/26191f600c80dc831ca247d33a42a32c/2025_07_OBF_Campaign_AllBrands_Offer_2880x480_BE.jpg?fm=webp&w=1005");
      let htmlDog = createImg("", "https://images.ctfassets.net/qp85kbzn8noe/68uBezoob4j5qyfzedeZp2/26191f600c80dc831ca247d33a42a32c/2025_07_OBF_Campaign_AllBrands_Offer_2880x480_BE.jpg?fm=webp&w=1005");
  
      setTimeout(function () {
          burgerMenu(html);
          desktopMenu(0, htmlCat);
          desktopMenu(1, htmlDog);
      }, 300);
  }
  
  docReady(init);
  
})();