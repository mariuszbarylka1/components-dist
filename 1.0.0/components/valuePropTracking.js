(async () => {
  let gtBox = document.querySelectorAll('div[data-zta="CarouselBetaUIC"] a');
  
  //fn imports
  const docReady = (fn) => {
      if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", fn);
      } else {
          fn();
      }
  };
  //end
  
  const addTracking = () => {
  
      gtBox['0'].addEventListener('click', () => {
          SendAdobeData('target', 'event691')
      });
      gtBox['1'].addEventListener('click', () => {
          SendAdobeData('target', 'event693')
      });
      gtBox['2'].addEventListener('click', () => {
          SendAdobeData('target', 'event694')
      });
  };
  
  docReady(addTracking);
})();