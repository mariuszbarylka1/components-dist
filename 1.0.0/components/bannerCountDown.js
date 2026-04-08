(async () => {
  
  const gtTranslations = {
      PL: {
          imgDesktop: "//media.zooplus.com/bilder/2/2026_03_zoodays_CountdownTest_2400x800_TPL_2.jpg",
          imgMobile: "//media.zooplus.com/bilder/5/2026_03_zoodays_CountdownTest_500x320_TPL_5.jpg",
          left: "zostało ",
      },
      CZ: {
          imgDesktop: "//media.zooplus.com/bilder/5/2026_03_zoodays_General_2400x800_CZ_5.jpg",
          imgMobile: "//media.zooplus.com/bilder/8/2026_03_zoodays_General_500x320_CZ_8.jpg",
          left: "zbývá "
      },
      HU: {
          imgDesktop: "//media.zooplus.com/bilder/2/2026_03_zoodays_General_2400x800_HU_2.jpg",
          imgMobile: "//media.zooplus.com/bilder/3/2026_03_zoodays_General_500x320_HU_3.jpg",
          left: "hátra van ",
          h: 'ó',
          min: 'p',
      },
      RO: {
          imgDesktop: "//media.zooplus.com/bilder/7/2026_03_zoodays_General_2400x800_RO_7.jpg",
          imgMobile: "//media.zooplus.com/bilder/9/2026_03_zoodays_General_500x320_RO_9.jpg",
          left: "au rămas "
      },
      FR: {
          imgDesktop: "//media.zooplus.com/bilder/4/2026_03_zoodays_General_2400x800_FR_4.jpg",
          imgMobile: "//media.zooplus.com/bilder/7/2026_03_zoodays_General_500x320_FR_7.jpg",
          left: "Plus que "
      },
      ES: {
          imgDesktop: "//media.zooplus.com/bilder/3/2026_03_zoodays_General_2400x800_ES_3.jpg",
          imgMobile: "//media.zooplus.com/bilder/2/2026_03_zoodays_General_500x320_ES_2.jpg",
          left: "quedan "
      },
      IT: {
          imgDesktop: "//media.zooplus.com/bilder/0/2026_03_zoodays_General_2400x800_IT_0.jpg",
          imgMobile: "//media.zooplus.com/bilder/4/2026_03_zoodays_General_500x320_IT_4.jpg",
          left: "restano "
      },
      BE: {
          imgDesktop: "//media.zooplus.com/bilder/6/2026_03_zoodays_General_2400x800_BE_6.jpg",
          imgMobile: "//media.zooplus.com/bilder/1/2026_03_zoodays_General_500x320_BE_1.jpg",
          left: "Plus que "
      },
      PT: {
          imgDesktop: "//media.zooplus.com/bilder/3/2026_03_zoodays_General_2400x800_PT_3.jpg",
          imgMobile: "//media.zooplus.com/bilder/7/2026_03_zoodays_General_500x320_PT_7.jpg",
          left: "faltam "
      },
      UK: {
          imgDesktop: "//media.zooplus.com/bilder/7/2026_03_zoodays_General_2400x800_UK_7.jpg",
          imgMobile: "//media.zooplus.com/bilder/4/2026_03_zoodays_General_500x320_UK_4.jpg",
          left: "left"
      },
      SE: {
          imgDesktop: "//media.zooplus.com/bilder/2/2026_03_zoodays_General_2400x800_SE_2.jpg",
          imgMobile: "//media.zooplus.com/bilder/8/2026_03_zoodays_General_500x320_SE_8.jpg",
          left: "kvar"
      }
  };
  
  //fn imports
  const delay = async (ms) => {
      return new Promise(resolve => setTimeout(resolve, ms));
  };
  
  const until = (condition, timeout, wait) => {
      const startTime = new Date().getTime();
      if (gtCondition()) {
  
          return Promise.resolve(gtCondition())
  
      } else {
          return new Promise((resolve, reject) => {
  
              const interval = window.setInterval(function () {
                  if (gtCondition()) {
  
                      let imageList = gtCondition();
                      window.clearInterval(interval);
                      resolve(imageList);
  
                  } else if (new Date().getTime() - startTime > wait) {
  
                      window.clearInterval(interval);
  
                  }
  
              }, timeout);
          })
      }
  };
  
  const getCountryFromURL = (url) => {
      const countryMatch = url.match(
          /https?:\/\/(?:www\.)?(?:zooplus|zoohit|zoochic)\.([a-z]{2})(?:\/|$)/i
      );
      return countryMatch ? countryMatch[1].toUpperCase() : null;
  };
  //end
  
  let country = getCountryFromURL(window.location.href);
  
  if (!country || !gtTranslations[country]) {
      country = 'PL'
      return;
  }
  
  
  
  const gtConfig = {
      searchedTerm: "2026_03_Zooplus",
      imgDesktop: gtTranslations[country].imgDesktop,
      imgMobile: gtTranslations[country].imgMobile,
      left: gtTranslations[country].left,
      pageLink: "",
      tracking: "",
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" data-pp-icon="Clock"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 16.6944 7.30558 20.5 12 20.5C16.6944 20.5 20.5 16.6944 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5ZM2 12C2 6.47716 6.47716 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 7C12.4142 7 12.75 7.33579 12.75 7.75V11.6893L15.2803 14.2197C15.5732 14.5126 15.5732 14.9874 15.2803 15.2803C14.9874 15.5732 14.5126 15.5732 14.2197 15.2803L11.4697 12.5303C11.329 12.3897 11.25 12.1989 11.25 12V7.75C11.25 7.33579 11.5858 7 12 7Z"></path></svg>'
  }
  
  
  
  const gtCondition = () => {
  
      let imageList = document.querySelectorAll('div[data-zta="hero-banner-primary"] picture');
      return imageList.length > 0 ? imageList : undefined;
  }
  
  const css = "\n<style>\n  .gtCountDown {\n    position: absolute;\n    top: 9%;\n    left: 59%;\n    color: white; \n    font-size: 90%;\n  }\n\n  .gtCountDown h3 svg {\n    width: 18px;\n    height: 18px;\n    position: relative;\n    top: 2px;\n    margin-right: 3px;\n    \n  }\n\n  @media (min-width: 545px) and (max-width: 767px) {\n    .gtCountDown {\n      top:6%;\n      left: 58%;\n    }\n  }\n\n  @media (min-width: 768px) and (max-width: 1023px) {\n    .gtCountDown {\n      left: 57%;\n      top: 6%;\n      font-size:95%;\n    }\n  }\n\n  @media (min-width: 1024px) and (max-width: 1440px) {\n    .gtCountDown {\n      top: 8%;\n      left: 58%;\n      font-size: 113%;\n    }\n  }\n\n  @media (min-width: 1441px) {\n    .gtCountDown {\n      top: 11%;\n      left: 58%;\n      font-size: 120%;\n    }\n  }\n    @media (min-width: 545px) {\n    h3 .gtEndNode {\n    font-weight: 200!important;\n    }\n    }\n\n    @media (max-width: 410px) {\n    .gtCountDown {\n        top: 6%; }\n        .gtCountDown swg {\n         margin-right: 0;\n        }\n    }\n    }\n</style>\n";
  
  document.head.insertAdjacentHTML('beforeend', css);
  
  const gtCallback = (imageList) => {
  
  
      const swapBanner = function (item, imageLink) {
          //ensureCountdownStyles();
  
  
          // remove existing picture/img children
          Array.from(item.children).forEach(child => child.remove());
  
          const pictureHtml =
              '<picture class="ContentfulImage_contentfulImage__pzwkk" style="position:relative;">' +
              '<source src="' + imageLink + '?fm=webp&w=&q=85" type="image/webp">' +
              '<img ' +
              'src="' + imageLink + '?fm=jpeg&fl=progressive&w=&q=85" ' +
              'sizes="' +
              '(min-width: 200px) and (max-width: 554px) 550px, ' +
              '(min-width: 555px) and (max-width: 767px) 550px, ' +
              '(min-width: 768px) and (max-width: 1023px) 90vw, ' +
              '(min-width: 1024px) and (max-width: 1440px) 855px, ' +
              '(min-width: 1441px) 1005px" ' +
              'srcset="' +
              imageLink + '?fm=webp&w=400&q=85 400w, ' +
              imageLink + '?fm=webp&w=550&q=85 550w, ' +
              imageLink + '?fm=webp&w=700&q=85 700w, ' +
              imageLink + '?fm=webp&w=800&q=85 800w, ' +
              imageLink + '?fm=webp&w=855&q=85 855w, ' +
              imageLink + '?fm=webp&w=900&q=85 900w, ' +
              imageLink + '?fm=webp&w=1000&q=85 1000w, ' +
              imageLink + '?fm=webp&w=1005&q=85 1005w" ' +
              'alt="' + gtConfig.searchedTerm + '" ' +
              'class="CarouselDesktopImage_desktopImage__iURG1 CarouselDesktopImage_wideImageContainer__Mlg_1" ' +
              'loading="lazy" ' +
              'style="width: 100%; height: auto; display: block;">' +
              '</picture>';
  
  
  
          item.insertAdjacentHTML('beforeend', pictureHtml);
  
  
  
          // ensure countdown container exists inside the newly inserted picture
          const pictures = item.querySelectorAll('picture.ContentfulImage_contentfulImage__pzwkk');
          const lastPicture = pictures[pictures.length - 1];
          if (lastPicture) {
              let countdown = lastPicture.querySelector('.gtCountDown');
              if (!countdown) {
                  countdown = document.createElement('div');
                  countdown.className = 'gtCountDown';
                  const h = document.createElement('h3');
                  h.textContent = '00:00:00';
                  countdown.appendChild(h);
                  lastPicture.insertAdjacentElement('afterbegin', countdown);
              }
          }
  
          if (gtConfig.pageLink) {
              item.parentElement.href = gtConfig.pageLink + gtConfig.tracking;
          }
      };
  
      imageList.forEach(function (item) {
          let condition = item.innerHTML;
          setTimeout(function () {
              if (condition.includes(gtConfig.searchedTerm) && (condition.includes('500x320')) && gtConfig.imgMobile) {
  
                  swapBanner(item.parentElement, gtConfig.imgMobile)
              }
  
              if (condition.includes(gtConfig.searchedTerm) && (condition.includes('1000x320') || condition.includes('2400x800')) && gtConfig.imgDesktop) {
  
  
  
                  swapBanner(item.parentElement, gtConfig.imgDesktop)
  
              }
  
          }, 0)
  
      })
  
  }
  
  
  until(gtCondition, 100, 2000).then(async (data) => {
      await delay(300); // wait for DOM updates before starting countdown logic
      gtCallback(data);
      await delay(200); // wait for DOM updates before starting countdown logic
  
      // SET TARGET DATE
      const targetDate = new Date("2026-03-17T00:00:01").getTime();
  
      const countdownBox = document.querySelector(".gtCountDown");
      const countdownText = document.querySelector(".gtCountDown h3");
  
  
      if (!countdownText) return;
  
  
      function updateCountdown() {
          const now = Date.now();
          const diff = targetDate - now;
  
          if (diff <= 0) {
              // update all countdowns
              const iconHtml = gtConfig.icon || '';
              document.querySelectorAll('.gtCountDown h3').forEach(el => el.innerHTML = iconHtml + '<span class="gtTime">00:00:00</span>');
              clearInterval(timer);
              return;
          }
  
          const totalSeconds = Math.floor(diff / 1000);
  
          const hours = Math.floor(totalSeconds / 3600);
          const minutes = Math.floor((totalSeconds % 3600) / 60);
          const seconds = totalSeconds % 60;
  
          // update all countdown h3 nodes freshly each tick (handle replaced/duplicated nodes)
          const iconHtml = gtConfig.icon || '';
          //end node 
          let endNode = '<span class="gtEndNode">' + gtConfig.left.toUpperCase() + '</span>';
          //get screen width for responsive text adjustments
          const screenWidth = window.innerWidth;
          if (screenWidth < 520) {
              endNode = '';
          }
  
          const timeText = String(hours).padStart(2, " 0") + " " + (gtTranslations[country]?.h || " H ") + " " + String(minutes).padStart(2, "0") + " " + (gtTranslations[country]?.min || " MIN ") + " ";
          document.querySelectorAll('.gtCountDown h3').forEach(el => el.innerHTML = iconHtml + '<span class="gtTime">' + endNode + timeText + '</span>');
          //String(seconds).padStart(2, "0") + "s "
      }
  
      // declare timer before first use to avoid temporal-dead-zone errors
      let timer;
  
      updateCountdown(); // initial render
      timer = setInterval(updateCountdown, 30000);
  });
  
})();