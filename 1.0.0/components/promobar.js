(async () => {
  
  const config = {
      version: 'gtPink',  // Options: gtDefault, gtGreen, gtBlue, gtRed, gtPink
      icon: '<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.7187 1C16.7187 1 16.9629 2.42609 16.7187 3.74245C16.4557 5.16021 15.3451 6.48491 15.3451 6.48491M18.779 9.91297L20.1526 8.54175M22.625 4.77088L23.2431 3.05684M24.9601 9.22736L26.3337 8.54175M22.213 13.3411C22.213 13.3411 23.2515 13.3848 24.2733 13.7113C25.1943 14.0055 26.3337 14.7123 26.3337 14.7123M11.3597 9.36469L19.319 17.3105C20.6825 18.6716 20.1997 20.9843 18.4057 21.6867L5.31818 26.8096C3.14821 27.6591 1.00705 25.5168 1.85812 23.3479L6.98614 10.2791C7.68888 8.48815 9.99798 8.00537 11.3597 9.36469Z" stroke="#343332" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>'
  };
  const gtTranslations = {
      PL: {
          headline: 'Zapisz się 1',
  
          buttonText: 'Dołącz teraz!',
          buttonLink: 'https://www.zooplus.pl/newsletter'
      },
      DE: {
          headline: 'Melden Sie sich für den Newsletter an',
          subline: 'sichern Sie sich 333 Zoopunkte und Zugang zu exklusiven Angeboten!',
          buttonText: 'Jetzt beitreten!',
          buttonLink: 'https://www.zooplus.de/newsletter'
      },
      HU: {
          headline: 'Iratkozzon fel a hírlevélre',
          subline: 'szerezzen 333 zoopontot és hozzáférést exkluzív ajánlatokhoz!',
          buttonText: 'Csatlakozz most!',
          buttonLink: 'https://www.zooplus.hu/hirlevel'
      }
  }
  
  //fn imports
  const getCountryFromURL = (url) => {
      const countryMatch = url.match(
          /https?:\/\/(?:www\.)?(?:zooplus|zoohit|zoochic)\.([a-z]{2})(?:\/|$)/i
      );
      return countryMatch ? countryMatch[1].toUpperCase() : null;
  };
  
  const addClickTracking = (el, num) => {
  
      let button = document.querySelector(el);
  
      if (button) {
  
          button.addEventListener('click', () => {
              SendAdobeData('target', 'event' + num);
          })
      }
  };
  
  const getTranslation = (key, countryCode) => {
      return gtTranslations[countryCode] && gtTranslations[countryCode][key] ? gtTranslations[countryCode][key] : '';
  };
  //end 
  
  let country = getCountryFromURL(window.location.href);
  
  if (!country || !gtTranslations[country]) {
      return
  }
  if (country === 'CH') {
      const href = window.location.href;
  
      if (href.includes('www.zooplus.ch/fr/')) {
          country = 'CHfr';
      }
  }
  
  const menu = document.querySelector('nav');
  const bar = document.querySelector('#promobar-onsite');
  let promoActivated = window.sessionStorage.getItem('promoDiscount');
  let html;
  
  if (!promoActivated) {
      html = "<style>#promobar-onsite{margin-top:5px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-ms-flex-item-align:stretch;-ms-grid-row-align:stretch;align-self:stretch;position:relative}#promobar-onsite a{color:#343332}#promobar-onsite .gtLeftBlock h3{margin-right:30px}.gtDefault{background-color:rgb(250,248,245)}.gtGreen{background-color:#E6F4DA}.gtBlue{background-color:#D4ECF1}.gtRed{background-color:#FBD5D7}.gtPink{background-color:#faebef}.gtRed button{color:#fff;background-color:#E7131A}.gtGreen button{color:#fff;background-color:#237803}.gtBlue button{background-color:#fff}.gtPink button{color:#fff;background-color:#ce2f4c}.gtContent{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;width:100%;max-width:1450px;margin:0 auto;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;padding:12px}.gtCloseIcon{position:absolute;right:12px;top:12px}.gtButton{width:100%;margin-right:1px;margin-left:1px}.gtLeftBlock{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin-bottom:12px}.gtRightBlock{display:-webkit-box;display:-ms-flexbox;display:flex}#promobar-onsite p,#promobar-onsite h3{margin:0;padding:0}#promobar-onsite h3{font-size:20px}.gtIcon{width:32px;height:32px;margin-right:12px}@media(min-width:544px){.gtContent{padding:16px 24px 16px 15px;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.gtCloseIcon{position:relative;left:0;cursor:pointer}.gtCloseIcon svg{position:relative;bottom:7px;right:12px}.gtLeftBlock{margin-bottom:0}}@media(min-width:780px){.gtLeftBlock{padding-left:20px}}@media(min-width:1100px){.gtContent{width:89%;padding-right:0;padding-left:0}}@media(min-width:1200px){.gtContent{width:88%;padding-right:0;padding-left:0}}@media(min-width:1400px){.gtContent{width:90%}}</style>\n<div id=\"promobar-onsite\" class=\"" + (config.version) + "\">\n<div class=\"gtContent\">\n        <div class=\"gtLeftBlock\">\n            <div class=\"gtIcon\">\n                " + (config.icon) + "\n\n            </div>\n            <div class=\"gtText\">\n               <h3>" + (getTranslation('headline', country)) + "</h3>\n      <p>" + (getTranslation('subline', country)) + "</p>\n       \n      </div>\n      </div>\n      <div class=\"gtRightBlock\">\n      <div class=\"gtButton\">\n      <a href=\"" + (getTranslation('buttonLink', country)) + "\">\n      <button type=\"button\" class=\"z-btn z-btn--small z-btn--secondary\">" + (getTranslation('buttonText', country)) + "</button>\n                </a>\n            </div>\n        </div>\n\n        </div>\n        <div class=\"gtCloseIcon\">\n            <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <g id=\"Slot <Icon>\">\n                    <path id=\"Shape\" fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n                        d=\"M3.46967 3.46967C3.76256 3.17678 4.23744 3.17678 4.53033 3.46967L12 10.9393L19.4697 3.46967C19.7626 3.17678 20.2374 3.17678 20.5303 3.46967C20.8232 3.76256 20.8232 4.23744 20.5303 4.53033L13.0607 12L20.5303 19.4697C20.8232 19.7626 20.8232 20.2374 20.5303 20.5303C20.2374 20.8232 19.7626 20.8232 19.4697 20.5303L12 13.0607L4.53033 20.5303C4.23744 20.8232 3.76256 20.8232 3.46967 20.5303C3.17678 20.2374 3.17678 19.7626 3.46967 19.4697L10.9393 12L3.46967 4.53033C3.17678 4.23744 3.17678 3.76256 3.46967 3.46967Z\"\n                        fill=\"#343332\" />\n                </g>\n            </svg>\n      \n</div>";
  } else {
      return
  }
  
  
  if (menu && !bar) {
      let placement = document.querySelector('div[data-zta="header-search-bar-mobile"]');
      if (placement) {
          placement.insertAdjacentHTML('afterend', html);
      }
  } else { return }
  
  
  
  function addSpCloseListener() {
      let spBannerCloseIcon = document.getElementsByClassName('gtCloseIcon')[0];
      if (spBannerCloseIcon) {
          spBannerCloseIcon.addEventListener("click", function () {
              window.sessionStorage.setItem('promoDiscount', 'set');
              let spBannerWrapper = document.getElementById('promobar-onsite');
              spBannerWrapper.style.display = "none";
          })
      }
  }
  
  setTimeout(addSpCloseListener, 2000);
  setTimeout(() => addClickTracking('#promobar-onsite .gtButton', 653), 500);
  
  
  
})();