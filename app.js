window.addEventListener("DOMContentLoaded", () => {

  /* ---------------- TOGGLE MENU ---------------- */
  const accordion = document.querySelector(".accordion");
  const panel = document.querySelector(".panel");
  const toggle = document.getElementById("toggle");

  toggle.addEventListener("click", () => {
    panel.classList.toggle("active");
    accordion.classList.toggle("active");

    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });

  /* ---------------- SELECT REGION ---------------- */
  const region = document.getElementById("region");
  const reg = document.getElementById("reg");
  const regions = document.querySelectorAll("li");

  regions.forEach((item) => {
    item.addEventListener("click", (e) => {
      const selectRegion = e.target.innerText;
      region.innerText = selectRegion;
      panel.style.maxHeight = null;
      accordion.classList.remove("active");
    });
  });

  /* ---------------- DATE & TIME ---------------- */
  const hour = document.getElementById("hour");
  const newDate = document.querySelector(".date");

  function updateDate() {
    const date = new Date();
    hour.innerHTML =
      getZero(date.getHours()) + ":" +
      getZero(date.getMinutes()) + ":" +
      getZero(date.getSeconds());

    newDate.innerHTML = dateBuilder(date);
    setTimeout(updateDate, 1000);
  }

  function getZero(num) {
    return num < 10 ? "0" + num : num;
  }

  function dateBuilder(a) {
    const months = ["Yanvar","Fevral","Mart","April","May","Iyun","Iyul","Avgust","Sentabr","Oktabr","Noyabr","Dekabr"];
    const weekDays = ["Yakshanba","Dushanba","Seshanba","Chorshanba","Payshanba","Juma","Shanba"];
    return `${weekDays[a.getDay()]}, ${a.getDate()}-${months[a.getMonth()]}`;
  }

  updateDate();

  /* ---------------- PRAY TIMES API ---------------- */
  const prayTimes = document.querySelectorAll(".pray-time");
  const cards = document.querySelectorAll(".card");

  const api = {
    baseurl: "https://api.aladhan.com/v1/timingsByCity",
  };

  async function getResult(query) {
    try {
      const res = await fetch(`${api.baseurl}?city=${query}&country=Uzbekistan&method=99&methodSettings=15.5%2C1.5%2C15.5&school=1&tune=2,0,0,0,0,2,0,0`);
      const result = await res.json();
      const re = result.data.timings;

      let dat = {
        region: query,
        timings: {
          Fajr: re.Fajr,
          Sunrise: re.Sunrise,
          Dhuhr: re.Dhuhr,
          Asr: re.Asr,
          Maghrib: re.Maghrib,
          Isha: re.Isha
        }
      };

      displayResult(dat);
    } catch (err) {
      console.error("API xatolik:", err);
    }
  }

  getResult(reg.innerHTML);

  regions.forEach((regionItem) => {
    regionItem.addEventListener("click", (e) => {
      getResult(e.target.innerHTML);
    });
  });

  function displayResult(time) {
    reg.innerHTML = time.region;

    const order = ["Fajr","Sunrise","Dhuhr","Asr","Maghrib","Isha"];
    prayTimes.forEach((item, index) => {
      item.innerHTML = time.timings[order[index]];
    });

    removeCardActive();
  }

  /* ---------------- ACTIVE PRAY TIME ---------------- */
  function removeCardActive() {
    const now = new Date();
    const nowTime = getZero(now.getHours()) + getZero(now.getMinutes());

    let times = [];
    prayTimes.forEach((time) => {
      times.push(time.innerHTML.replace(":", ""));
    });

    let current = times.reverse().find(t => t <= nowTime);
    let sorted = times.sort((a,b) => a-b);
    const index = times.indexOf(current);

    cards.forEach(card => card.classList.remove("active"));

    if (nowTime < sorted[0]) {
      cards[5].classList.add("active");
    } else {
      cards[index].classList.add("active");
    }

    setTimeout(removeCardActive, 10000);
  }

  /* ---------------- HIJRI DATE ---------------- */
  const hijri = document.getElementById("hijri");
  const hijriYear = new Intl.DateTimeFormat("en-EN-u-ca-islamic", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(Date.now());

  hijri.innerHTML = hijriYear;

});
