(async () => {
  
  //fn imports
  const delay = async (ms) => {
      return new Promise(resolve => setTimeout(resolve, ms));
  };
  
  const onPaginationChange = (callback, delayNum = 300) => {
      // get pagination element
      let paginationList = document.querySelector('ul[data-zta="paginationList"]');
      if (!paginationList) return;
  
      // add click listener to pagination but only once
      paginationList.addEventListener('click', async () => {
  
          await delay(delayNum); // wait for pagination to update the DOM
  
          try {
              callback();
          } catch (e) {
  
          }
      });
  };
  
  const docReady = (fn) => {
      if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", fn);
      } else {
          fn();
      }
  };
  
  const addFilterEventListener = (callback, delay = 300) => {
      const gtFilters = document.querySelectorAll('#shop-left-navigation');
      if (gtFilters.length === 0) {
          console.warn('No #shop-left-navigation element found');
          return;
      }
  
      let debounceTimeout;
  
      const observer = new MutationObserver(mutations => {
          // Log all mutations
  
          // Debounce the callback once per batch
          clearTimeout(debounceTimeout);
          debounceTimeout = setTimeout(() => {
  
              callback();
          }, delay);
      });
  
      gtFilters.forEach(filterEl => {
          observer.observe(filterEl, {
              childList: true,
              subtree: true
          });
      });
  };
  
  const addClickTracking = (el, num) => {
  
      let button = document.querySelector(el);
  
      if (button) {
  
          button.addEventListener('click', () => {
              SendAdobeData('target', 'event' + num);
          })
      }
  };
  
  const debounce = (fn, delay) => {
      let timeout;
  
      return function (...args) {
          clearTimeout(timeout);
          timeout = setTimeout(() => fn.apply(this, args), delay);
      };
  };
  
  const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
  //end
  
  const createHeroBlock = (backgroundImage, headline, subline, buttonText, buttonLink) => {
  
      const heroBlock = document.createElement('div');
      heroBlock.classList.add('gtHeroBlock');
  
      heroBlock.style.cssText = "\n        background-image: url(" + (backgroundImage) + ");\n        background-size: cover;\n        background-position: center; \n        height: 100%;\n        border-radius: 8px;\n        display: flex;\n        flex-direction: column; \n        justify-content: flex-start;  \n        align-items: center;\n        text-align: center;\n        padding: 20px;\n        box-sizing: border-box;\n        overflow: hidden;\n        position: relative; \n    ";
  
      // === CONTENT WRAPPER ===
      const contentWrapper = document.createElement('div');
      contentWrapper.style.cssText = "\n        width: 100%;\n        max-height: 50%;  /* vertical limit */\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        justify-content: flex-start;\n        overflow: scroll;  /* enable scroll if content exceeds max height */\n        overflow-y: auto;\n        transform-origin: top center;  /* scale from top */\n        overflow: hidden;;\n    ";
      contentWrapper.classList.add('gtContentWrapper');
      heroBlock.appendChild(contentWrapper);
  
      // === TEXT BLOCK ===
      const textBlock = document.createElement('div');
      textBlock.style.cssText = "\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        justify-content: flex-start;\n        color: #456aab;\n\n    ";
      textBlock.classList.add('gtHeroContent');
      textBlock.lang = 'de'; // set language for better SEO
      contentWrapper.appendChild(textBlock);
  
      // Headline
      const headlineEl = document.createElement('h2');
      headlineEl.textContent = headline;
      headlineEl.style.cssText = "\n        margin: 0;\n        line-height: 1.2;\n        text-align: center;\n        font-size: 2.5rem;\n        word-break: break-word;\n        hyphens: auto;\n        margin-top: 30px;\n       \n    ";
      headlineEl.classList.add('gtHeroHeadline');
      textBlock.appendChild(headlineEl);
  
      // Subline
      const sublineEl = document.createElement('p');
      sublineEl.textContent = subline;
      sublineEl.style.cssText = "\n        margin: 20px 0;\n        line-height: 1.2;\n        text-align: center;\n        font-size: 0.9rem;\n    ";
      textBlock.appendChild(sublineEl);
  
      // Button
      const buttonEl = document.createElement('button');
      buttonEl.type = 'button';
      buttonEl.textContent = buttonText;
      buttonEl.style.cssText = "\n        line-height: 1.2;\n    ";
      buttonEl.classList.add('gtHeroButton', 'z-btn', 'z-btn--small', 'z-btn--primary');
      buttonEl.style.backgroundColor = '#456aab';
      buttonEl.addEventListener('click', () => {
          if (!buttonLink) return;
          if (buttonLink.startsWith('http')) {
              window.open(buttonLink, '_blank', 'noopener,noreferrer');
          } else {
              window.location.href = buttonLink;
          }
      });
      textBlock.appendChild(buttonEl);
  
  
      return heroBlock;
  };
  
  let gtAddSeoLinkInint = false;
  
  const addSeoLink = async function () {
      await delay(100);
      if (gtAddSeoLinkInint) return;
      gtAddSeoLinkInint = true;
  
      const teaser = document.querySelector('section[data-zta="advantages-teaser-component"]');
      const acc = document.querySelector('div[data-zta="seo-accordion"]');
  
      if (teaser && acc) {
          acc.id = "gtSeoJumpLink";
          let headline = acc.querySelector('h3');
          const heroBlock = createHeroBlock(
              '//media.zooplus.com/bilder/0/veterinary_0.jpg', // background image URL
              headline.textContent, // headline
              'Jetzt Expertentipps zum Thema lesen und das richtige Produkt für dein Haustier finden!', // subline
              'Zum Ratgeber', // button text
              '#gtSeoJumpLink' // button link
          );
          //remove all teser elements and append hero block to teaser
          teaser.innerHTML = '';
          teaser.appendChild(heroBlock);
          delay(200).then(() => {
              let gtContentWrapper = document.querySelector('.gtContentWrapper');
              let gtHeroHeadline = document.querySelector('.gtHeroHeadline');
              if (gtContentWrapper.scrollHeight > gtContentWrapper.clientHeight) {
  
                  let fontSize = parseFloat(
                      window.getComputedStyle(gtHeroHeadline).fontSize
                  );
  
                  let minFontSize = 0.5; // rem equivalent if using rem
                  let iterations = 0;
                  let maxIterations = 100; // safety guard
  
                  while (
                      gtContentWrapper.scrollHeight > gtContentWrapper.clientHeight &&
                      fontSize > minFontSize &&
                      iterations < maxIterations
                  ) {
                      fontSize -= 0.3;
                      gtHeroHeadline.style.fontSize = fontSize + 'px';
  
                      iterations++;
                  }
              }
  
          }); // wait for DOM updates before checking height
  
          addClickTracking('.gtHeroButton', '691'); // Track clicks on the hero button as event691
  
  
      } else { return }
  };
  
  let css = "\n<style>\n\n/* Mobile layout */\n@media (max-width: 544px) {\n    .gtHeroBlock {\n        background-image: none !important;\n        background-color: #d4e5f7 !important;\n        padding: 40px !important;\n}\n        .gtContentWrapper {\n            max-height: 100% !important;\n        }\n        .gtHeroHeadline {\n            margin-top: 0px !important;}\n            line-height: 1.1 !important;\n   \n}</style>";
  
  
  const resetSeoLink = () => {
      gtAddSeoLinkInint = false;
  };
  
  
  document.head.insertAdjacentHTML('beforeend', css);
  docReady(addSeoLink);
  addFilterEventListener(pipe(resetSeoLink, addSeoLink), 500);
  onPaginationChange(pipe(resetSeoLink, addSeoLink), 500);
  window.addEventListener('resize', pipe(resetSeoLink, debounce(addSeoLink, 200)));
  
})();