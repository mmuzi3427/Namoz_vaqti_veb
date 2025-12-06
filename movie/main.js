

function alertf(dTitle, text, timeSleep=1){
                setTimeout(function() {
                    //alert(text);
                    document.getElementById("main-alert__box-title").innerHTML = dTitle;
                    document.getElementById("main-alert__box-description").innerHTML = text;
                    document.getElementById('main-alert__background').classList.toggle('showAlert');
                    document.getElementById("alertBox").classList.add("showal");
                    document.getElementById("alert__box").style.display = "inline"
                }, timeSleep*1000);
                
            }
            function closeAlert(timeSleep=0){
                setTimeout(function() {
                    document.getElementById("main-alert__background").classList.remove("showAlert");
                    document.getElementById("alertBox").classList.remove("showal");
                    document.getElementById("alert__box").style.display = "none"

                }, timeSleep*1000)
            }
            
            function openlink(url, sleeptime=1){
                setTimeout(function() {
                    window.location.href = url;
                }, sleeptime*1000);
            }
            
            function toggleMenu(elelementId = null, isactive = null, timeSleep = 0) {
                setTimeout(function() {
                    document.getElementById('main-navigation').classList.toggle('open');
                    document.getElementById("overlay").classList.toggle("show");
                }, timeSleep*1000)
                let elelementIds = ["mn1", "mn2", "mn3","mn4","mn5","mn6"]
                if (elelementId){
                    document.getElementById(elelementId).classList.add(isactive);
                    document.getElementById(elelementId).disabled = true;
                    for (let i = 0; i < elelementIds.length; i++){
                        if (elelementIds[i] !== elelementId){
                            document.getElementById(elelementIds[i]).classList.remove(isactive);
                        } else {
                            continue
                        }
                    }
                }
            }
            
            function openMenu(timeSleep=1) {
                setTimeout(function() {
                    document.getElementById('main-navigation').classList.add('open');
                    document.getElementById("overlay").classList.add("show");
                }, timeSleep*1000)
            }
            
            function closeMenu(timeSleep=1) {
                setTimeout(function() {
                    document.getElementById('main-navigation').classList.remove('open');
                    document.getElementById("overlay").classList.remove("show");
                }, timeSleep*1000)
            }
            
            function createApp(dataurl){
                fetch(dataurl)
                .then(res => res.text())
                .then(text => {
                    let json = JSON.parse(text.substr(47).slice(0, -2));
                    console.log(json.table.rows);
                    let content = `<!DOCTYPE html><html><head><title>Maqolalarim</title></head><body><h1>Salom Xush kelibsiz!</h1></body></html>`;
                    const blob = new Blob([content], {type: "text/html"});
                    const url =  URL.createObjectURL(blob);
                    window.location.href(url);
                });
            }

// Touch swipe logic
let touchStartX = 0;
let touchEndX = 0;
const swipeThreshold = 100; // minimal masofa

document.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', function (e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    const nav = document.getElementById('main-navigation');
    const overlay = document.getElementById('overlay');
    const isOpen = nav.classList.contains('open');
    const distance = touchEndX - touchStartX;

    if (distance < -swipeThreshold && !isOpen) {
        // Chapdan o‘ngga: ochish
        nav.classList.add('open');
        overlay.classList.add('show');
    } else if (distance > swipeThreshold && isOpen) {
        // O‘ngdan chapga: yopish
        nav.classList.remove('open');
        overlay.classList.remove('show');
    }
}

document.querySelectorAll('.ripple-button').forEach(button => {
      button.addEventListener('click', function(e) {
        const circle = document.createElement('span');
        circle.classList.add('ripple');

        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        circle.style.width = circle.style.height = size + 'px';

        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        circle.style.left = x + 'px';
        circle.style.top = y + 'px';

        button.appendChild(circle);

        circle.addEventListener('animationend', () => {
          circle.remove();
        });
      });
    });

document.querySelectorAll('.ripple1-button').forEach(button => {
      button.addEventListener('click', function(e) {
        const circle = document.createElement('span');
        circle.classList.add('ripple1');

        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        circle.style.width = circle.style.height = size + 'px';

        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        circle.style.left = x + 'px';
        circle.style.top = y + 'px';

        button.appendChild(circle);

        circle.addEventListener('animationend', () => {
          circle.remove();
        });
      });
    });

/*const v = document.getElementById("blog-item")

fetch("https://docs.google.com/spreadsheets/d/1XzUtWC6VFYFVqO36Xs9tvwAYUVOCu45P38lMe9lqQMU/gviz/tq?tqx=out:json")//https://docs.google.com/spreadsheets/d/1XJTmtb3bmePZTMtt8jZSKL5stQXgbPbtDwVOpnZClQU/gviz/tq?tqx=out:json")
.then(res => res.text())
.then(text => {
    let json = JSON.parse(text.substring(47, text.length - 2));
    let rowsList = json.table.rows
    document.getElementById("log").textContent = JSON.stringify(json.table.rows);
    for(let i = 0; i<rowsList.length; i++){
        let dc = rowsList[i].c;
        let rasmURL = dc[0].v;
        let title = dc[1].v;
        let description = dc[2].v;
        let postID = dc[3].v;
        let views = dc[4].v;
        let sana = dc[5].v;
        let vaqt = dc[6].v;
        let blogItem = document.createElement("div");
        blogItem.className = "blog-item"; //<div class="blog-item"></div>
        const textHTML = `
                        <div class="blog-item__image">
                            <img src="${rasmURL}" alt="Blog item image" />
                        </div>
                        <div class="blog-item__info">
                            <div class="blog-item__main-info">
                                <span class="blog-item__author">
                                    <i class="main_icon fa-regular fa-user"></i>
                                    Admin posti
                                </span>
                                <span class="main_icon blog-item__date">
                                    <i class="fa-regular fa-calendar"></i>
                                    ${sana}
                                </span>
                            </div>
                            <h5 class="blog-item__title">
                                ${title}
                            </h5>
                            <p class="blog-item__description">
                                ${description}
                            </p>
                            <a class="blog-item__learn-more" onclick="createApp('https://www.google.com')">
                                Davomi...
                            </a>
                            <div class="blog-item__veaws">
                                <span class="blog-item-veaws__icon">
                                    <i class="fa-solid fa-eye"></i>
                                </span>
                                <span class="blog-item-veaws__number">
                                    ${views}
                                </span>
                                <span class="blog-item-veaws__clock">
                                    ${vaqt}
                                </span>
                            </div>
                        </div>`
        blogItem.innerHTML = textHTML;
        v.appendChild(blogItem);
    }
});*/


(function(){
  const sc = document.getElementById('sc');
  const content = document.getElementById('content');
  const edgeTop = document.getElementById('edgeTop');
  const edgeBottom = document.getElementById('edgeBottom');
  const bubbleTop = document.getElementById('bubbleTop');
  const bubbleBottom = document.getElementById('bubbleBottom');

  // Parametrlar
  const maxStretch = 1400; // px — maksimal cho'zilish
  const resistance = 1; // 0..1 — kichik qiymat ko'proq cho'zadi (rezina)
  let startY = null;
  let lastTranslate = 0;
  let isTouching = false;
  let direction = null; // 'top' yoki 'bottom'
  let active = false;

  // Touch events (mobil uchun)
  sc.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) return;
    startY = e.touches[0].clientY;
    isTouching = true;
    direction = null;
    // remove transition for immediate response
    content.style.transition = 'none';
  }, {passive: true});

  sc.addEventListener('touchmove', (e) => {
    if (!isTouching || e.touches.length !== 1) return;
    const y = e.touches[0].clientY;
    const dy = y - startY;

    const scrollTop = sc.scrollTop;
    const scrollBottom = sc.scrollHeight - sc.clientHeight - sc.scrollTop;

    // Pull down at top
    if (scrollTop <= 0 && dy > 0) {
      e.preventDefault(); // iOS native bounce oldini olishga yordam beradi
      direction = 'top';
      const stretch = Math.min(maxStretch, Math.pow(dy * resistance, 0.9)); // biroz non-lin
      applyStretch(stretch);
    }
    // Pull up at bottom
    else if (scrollBottom <= 0 && dy < 0) {
      e.preventDefault();
      direction = 'bottom';
      const stretch = Math.min(maxStretch, Math.pow(-dy * resistance, 0.9));
      applyStretch(-stretch);
    } else {
      // odatiy scrollga ruxsat bering; ammo agar hozir cho'zilgan bo'lsa, tiklash
      if (lastTranslate !== 0) {
        // agar foydalanuvchi cheklangan joydan chiqib ketgan bo'lsa, tiklang
        resetStretch();
      }
    }
  }, {passive: false});

  sc.addEventListener('touchend', (e) => {
    if (!isTouching) return;
    isTouching = false;
    startY = null;
    // qaytish animatsiyasi
    content.style.transition = 'transform 420ms cubic-bezier(.2,.85,.25,1)';
    resetStretch();
  });

  // Wheel (desktop) – oddiy yengil effekt
  sc.addEventListener('wheel', (e) => {
    const deltaY = e.deltaY;
    const scrollTop = sc.scrollTop;
    const scrollBottom = sc.scrollHeight - sc.clientHeight - sc.scrollTop;

    // Agar yuqori va foydalanuvchi tepaga scroll qilib bo'lsa
    if (scrollTop <= 0 && deltaY < 0) {
      e.preventDefault();
      direction = 'top';
      const d = Math.min(maxStretch/2, Math.abs(deltaY) * 0.8);
      applyStretch(d);
      clearTimeout(sc._wheelTimeout);
      sc._wheelTimeout = setTimeout(() => { content.style.transition = 'transform 300ms cubic-bezier(.2,.8,.2,1)'; resetStretch(); }, 120);
    } else if (scrollBottom <= 0 && deltaY > 0) {
      e.preventDefault();
      direction = 'bottom';
      const d = Math.min(maxStretch/2, Math.abs(deltaY) * 0.8);
      applyStretch(-d);
      clearTimeout(sc._wheelTimeout);
      sc._wheelTimeout = setTimeout(() => { content.style.transition = 'transform 300ms cubic-bezier(.2,.8,.2,1)'; resetStretch(); }, 120);
    }
  }, {passive: false});

  function applyStretch(value){
    // value >0 => pastga cho'zilgan (translateY positive)
    // value <0 => tepaga cho'zilgan (translateY negative)
    lastTranslate = value;
    content.style.transform = `translateY(${value}px)`;

    // vizual balonlarni faollashtirish va kengaytirish
    if (value > 0) {
      // pulled down from top
      edgeTop.classList.add('active');
      bubbleTop.style.transform = `scale(${Math.min(1 + value/220, 1.8)}) translateY(${Math.min(value/8, 12)}px)`;
      bubbleTop.textContent = value > maxStretch*0.9 ? 'Maksimum' : 'Chap-yon...';
      edgeBottom.classList.remove('active');
    } else if (value < 0) {
      edgeBottom.classList.add('active');
      bubbleBottom.style.transform = `scale(${Math.min(1 + (-value)/220, 1.8)}) translateY(${Math.max(value/8, -12)}px)`;
      bubbleBottom.textContent = Math.abs(value) > maxStretch*0.9 ? 'Maksimum' : 'Chap-yon...';
      edgeTop.classList.remove('active');
    } else {
      edgeTop.classList.remove('active');
      edgeBottom.classList.remove('active');
    }
  }

  function resetStretch(){
    lastTranslate = 0;
    content.style.transform = 'translateY(0px)';
    // after transition remove active classes
    edgeTop.classList.remove('active');
    edgeBottom.classList.remove('active');

    // ensure transition removed after finishing so next touch is snappy
    clearTimeout(sc._resetTimeout);
    sc._resetTimeout = setTimeout(() => {
      content.style.transition = 'none';
    }, 450);
  }

  // --- Qo'shimcha: agar ekran o'lchami o'zgarsa, transformni tozalash ---
  window.addEventListener('resize', () => {
    resetStretch();
  });

})();
