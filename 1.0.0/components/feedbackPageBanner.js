(async () => {
  
  //fn imports
  const delay = async (ms) => {
      return new Promise(resolve => setTimeout(resolve, ms));
  };
  
  const docReady = (fn) => {
      if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", fn);
      } else {
          fn();
      }
  };
  //end
  
  const gtConfig = {
      title: "",
      message: "",
      buttonText: "Jetzt Preis prüfen",
      buttonLink: "#",
      iconUrl: ""
  };
  
  const css = "\n<style>\n  .gtFeedbackBanner {\n    position: fixed;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    width: 100%;\n    background: rgb(230, 244, 218);\n    border-top: 1px solid #ccc;\n    padding: 15px;\n    box-shadow: 0 -2px 10px rgba(0,0,0,0.1);\n    z-index: 1000;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n\n  .gtFeedbackBanner .gtContent {\n    max-width: 1000px;\n    display: flex;\n    align-items: center;\n    gap: 15px;\n    flex: 1;\n\n    position: relative;\n    padding-right: 40px; /* space for close icon */\n  }\n\n  .gtFeedbackBanner .gtIcon {\n    width: 40px;\n    height: 40px;\n    flex-shrink: 0;\n    border-radius: 4px;\n  }\n\n  .gtFeedbackBanner .gtText {\n    flex: 1;\n    min-width: 0; /* prevents overflow */\n  }\n\n  .gtFeedbackBanner h2 {\n    margin: 0;\n    font-size: 18px;\n    color: #333;\n\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  .gtFeedbackBanner .gtCloseIconFeedbackPages {\n    cursor: pointer;\n    font-size: 20px;\n    color: #666;\n    padding: 5px;\n\n    position: absolute;\n    top: 8px;\n    right: 10px;\n  }\n\n  .gtFeedbackBanner .gtCloseIconFeedbackPages:hover {\n    color: #333;\n  }\n\n  @media (max-width: 768px) {\n\n    .gtFeedbackBanner .gtContent {\n      flex-direction: column;\n      align-items: flex-start;\n      gap: 10px;\n      text-align: center;\n    }\n\n    .gtFeedbackBanner .gtContent a {\n      width: 100%;\n      text-align: center;\n      order: 2;\n    }\n\n    .gtFeedbackBanner .gtCloseIconFeedbackPages {\n      top: 6px;\n      right: 8px;\n    }\n\n    .gtFeedbackBanner .gtIcon {\n      display: none;\n    }\n\n    .gtFeedbackBanner h2 {\n      white-space: normal;\n      text-align: left;\n    }\n  }\n</style>\n";
  
  const createHTML = (
      image,
      heading,
      buttonText,
      buttonLink
  ) => {
  
      return "\n<div class=\"gtFeedbackBanner\">\n  <div class=\"gtContent\">\n\n    <img class=\"gtIcon\" src=\"" + (image) + "\" alt=\"Icon\">\n\n    <div class=\"gtText\">\n      <p class=\"z-h2 pp-my-2xs\">" + (heading) + "</p>\n    </div>\n\n    <a class=\"z-btn z-btn--primary\" href=\"" + (buttonLink) + "\">\n      " + (buttonText) + "\n    </a>\n\n    <span class=\"gtCloseIconFeedbackPages\">\n      &times;\n    </span>\n\n  </div>\n</div>\n";
  };
  
  docReady(() => {
  
      let gtTitle = document.querySelector('h1[data-zta="productTitle"]');
  
      if (!gtTitle) return;
  
      let toRemove = gtTitle.firstChild.textContent;
      gtTitle = gtTitle.textContent;
  
      if (gtTitle.includes(toRemove)) {
          gtTitle = gtTitle.replace(toRemove, '').trim();
      }
  
      let gtImage = document.querySelector('img[data-zta="product-image"]');
      let btnLink = document.querySelector('a[data-zta="backToPDPButton"]');
  
      // Check session close
      if (sessionStorage.getItem('feedbackBannerClosed') === 'true') {
          return;
      }
  
      document.head.insertAdjacentHTML('beforeend', css);
  
      document.body.insertAdjacentHTML(
          'beforeend',
          createHTML(
              gtImage ? gtImage.src : '',
              gtTitle,
              gtConfig.buttonText,
              btnLink ? btnLink.href : '#'
          )
      );
  
      const banner = document.querySelector('.gtFeedbackBanner');
  
      if (!banner) return;
  
      // Close handler (CLASS based)
      banner.addEventListener('click', (e) => {
  
          if (e.target.classList.contains('gtCloseIconFeedbackPages')) {
  
              banner.remove();
  
              sessionStorage.setItem(
                  'feedbackBannerClosed',
                  'true'
              );
          }
  
      });
  
  });
  
  
  // additional actions
  
  await delay(1000);
  
  
  // move go to top button above banner
  
  const container = document.querySelector(
      '.container.page__content'
  );
  
  if (container) {
  
      const checkLastChild = () => {
  
          const lastChild = container.lastElementChild;
  
          if (lastChild && lastChild.tagName === 'BUTTON') {
  
              lastChild.style.bottom = '120px';
          }
  
      };
  
      checkLastChild();
  
      const observer = new MutationObserver(() => {
          checkLastChild();
      });
  
      observer.observe(container, {
          childList: true
      });
  
  }
  
  
  // Move recommendations
  
  const reccomendations = document.querySelector(
      'div[data-zta="first-horizontal"]'
  );
  
  if (reccomendations) {
  
      const newRefPoint = document.querySelector(
          '.Feedback_reviews__9nXea'
      );
  
      if (newRefPoint) {
  
          newRefPoint.append(reccomendations);
  
      }
  
  }
})();