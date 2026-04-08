(async () => {
  
  const gtConfig = {
      startPointDesktop: 1, //row number after which first banner is inserted
      startPointMobile: 5, //item=row number after which first banner is inserted
      startPointTablet: 3, //row number after which first banner is inserted
      everyWhichRowDesktop: 2,
      everyWhichRowMobile: 5,
      considerOnlyXBanners: 50,
  };
  //everyBanner must have it's desktop, mobile and link. Number of banners unlimited but consider only X banners must be adjusted
  const gtBannerReference = {
      banner1: 'https://media.zooplus.com/bilder/4/2026_03_Cosma_Pure_General_2880x480_DE_4.jpg',
      banner2: 'https://media.zooplus.com/bilder/3/2025_07_Smilla_Wet_General_2880x480_DE_3.jpg',
      banner3: 'https://media.zooplus.com/bilder/3/2024_10_WildFreedom_TripleTaste_Wet_2880x480_DE_3.jpg',
      banner4: 'https://media.zooplus.com/bilder/3/2026_03_Animonda_Carny_General_C_2880x480_DE_3.jpg',
  
      bannerMobile1: 'https://media.zooplus.com/bilder/5/2026_03_Cosma_Pure_General_500x320_DE_5.jpg',
      bannerMobile2: 'https://media.zooplus.com/bilder/4/2025_07_Smilla_Wet_General_500x320_DE_4.jpg',
      bannerMobile3: 'https://media.zooplus.com/bilder/7/2024_10_WildFreedom_TripleTaste_Wet_500x320_DE_7.jpg',
      bannerMobile4: 'https://media.zooplus.com/bilder/5/2026_03_Animonda_Carny_General_C_500x320_DE_5.jpg',
  
      bannerLink1: 'https://www.zooplus.de/search/results?q=Cosma%20Pure',
      bannerLink2: 'https://www.zooplus.de/search/results?q=Smilla',
      bannerLink3: 'https://www.zooplus.de/search/results?q=WildFreedom',
      bannerLink4: 'https://www.zooplus.de/shop/katzen/katzenfutter_dose/animonda',
  };
  
  //fn imports
  const getGridSize = (gridEl, itemSelectorOrNodeList) => {
      const items = (typeof itemSelectorOrNodeList === 'string')
          ? (gridEl ? gridEl.querySelectorAll(itemSelectorOrNodeList) : [])
          : (itemSelectorOrNodeList || (gridEl ? gridEl.querySelectorAll(':scope > *') : []));
  
      if (!gridEl || !items || items.length === 0) return { columns: 0, rows: 0, items: 0 };
  
      const cs = getComputedStyle(gridEl);
      // try CSS Grid template
      const colsFromGrid = (cs.gridTemplateColumns && cs.gridTemplateColumns !== 'none')
          ? cs.gridTemplateColumns.split(/\s+/).filter(Boolean).length
          : 0;
  
      let columns = colsFromGrid;
      if (!columns) {
          // fallback: count how many items share the first item's top offset
          const firstTop = items[0].getBoundingClientRect().top;
          columns = Array.from(items).filter(i => Math.abs(i.getBoundingClientRect().top - firstTop) < 2).length;
      }
  
      const total = items.length;
      const rows = columns ? Math.ceil(total / columns) : 1;
      return { columns, rows, items: total };
  };
  
  const onWindowResize = (callback, delay = 300) => {
      let resizeTimeout;
      window.addEventListener('resize', () => {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(callback, delay);
      });
  };
  
  const removeAllElements = (elements) => {
      elements.forEach(el => el.remove());
  };
  
  const delay = async (ms) => {
      return new Promise(resolve => setTimeout(resolve, ms));
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
  //end
  
  //initial variable setup for first insertion
  let size;
  const grid = document.querySelector('div[data-zta="product-grid-wrapper"]');
  const items = grid ? grid.querySelectorAll(':scope > *') : [];
  let itemsArray = Array.from(items);
  const sanitizedItems = itemsArray.filter(
      item => !item.className.includes('middleBannerM3')
  );
  size = getGridSize(grid, items);
  
  const countInsertPosition = (size, pass = 1) => {
      const { columns } = size;
      const isMobile = columns < 2;
  
      if (isMobile) {
          if (pass === 1) {
              return columns === 1
                  ? gtConfig.startPointMobile
                  : gtConfig.startPointTablet * columns;
          }
          return gtConfig.everyWhichRowMobile * pass * columns;
      }
  
      // desktop, bigger tablets
      if (pass === 1) {
          return columns * gtConfig.startPointDesktop;
      }
  
      // place subsequent banners after startPointDesktop + (pass-1)*everyWhichRowDesktop rows
      return ((pass * gtConfig.everyWhichRowDesktop * columns) - gtConfig.startPointDesktop * columns);
  };
  
  const createMiddleBanner = (src, href) => {
      // create link
      const link = document.createElement('a');
      link.href = href;
      link.style.display = 'block';
      link.style.margin = '15px auto';
      link.style.width = '100%';
  
      // create banner image
      const banner = document.createElement('img');
      link.className = 'gtBannerInsert';
      banner.src = src;
      banner.alt = 'Promo Banner';
      banner.style = 'width: 98%; height: auto; display: block; border-radius: 10px;margin:0 auto;';
  
      // assemble
      link.appendChild(banner);
      return link;
  };
  
  const insertBanners = (size, sanitizedItems) => {
  
      // Calculate all insertion positions first
      const insertions = [];
      const bannerKeys = Object.keys(gtBannerReference); // ["banner1", "banner2", "banner3"]
      let bannerCount = bannerKeys.length / 3; // 3
  
      for (let bannerPass = 1; bannerPass <= gtConfig.considerOnlyXBanners; bannerPass++) {
          // Compute the position for this banner
          let insertPosition = countInsertPosition(size, bannerPass);
          // Stop if the insertion position is beyond the items array
          if (insertPosition > items.length) break;
          // Add this insertion
          insertions.push(insertPosition);
  
  
          // Stop if we already have as many insertions as banners available
          if (insertions.length === bannerCount) break;
      }
  
      const insertionSet = new Set(insertions);
  
  
      // Insert by referencing the original items array elements directly.
      // This avoids index-shift problems because we insert relative to the original element reference.
      let pass = 1;
      let bannerIndex = 0;   // <-- FIX
  
      for (let el of sanitizedItems) {
  
          let isMobile = size.columns < 2;
          let banner;
  
          if (insertionSet.has(pass)) {
  
              bannerIndex++;  // <-- increment only when inserting
  
              let bannerKey = isMobile ?
                  'bannerMobile' + ((bannerIndex - 1) % bannerCount + 1) :
                  'banner' + ((bannerIndex - 1) % bannerCount + 1);
  
              let bannerLinkKey =
                  'bannerLink' + ((bannerIndex - 1) % bannerCount + 1);
  
              banner = createMiddleBanner(
                  gtBannerReference[bannerKey],
                  gtBannerReference[bannerLinkKey]
              );
  
              if (banner) {
                  el.parentNode.insertBefore(banner, el.nextSibling);
              }
          }
  
          pass++;
      }
  };
  
  const onChangeCallback = async () => {
      //old banner removal 
      let existingBanners = document.querySelectorAll('.gtBannerInsert');
      if (existingBanners.length > 0) {
          removeAllElements(existingBanners);
      }
      await delay(100);
      //fresh variable setup
      let grid = document.querySelector('div[data-zta="product-grid-wrapper"]');
      let items = grid ? grid.querySelectorAll(':scope > *') : [];
      let itemsArray = Array.from(items);
      const sanitizedItems = itemsArray.filter(
          item => (!item.className.includes('middleBannerM3') && !item.className.includes('gtBannerInsert'))
      );
  
      //size recounting
      size = getGridSize(grid, sanitizedItems);
      //banner insertion
      insertBanners(size, sanitizedItems);
  };
  
  
  
  insertBanners(size, sanitizedItems);
  onWindowResize(onChangeCallback);
  addFilterEventListener(onChangeCallback);
  onPaginationChange(onChangeCallback);
  
  
  
  
  
  
})();