async function namozvaqtianiqla(shahar) {
    const apiUrl = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(shahar)}&country=Uzbekistan&method=2`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.code === 200) {
            const timings = data.data.timings;
            return [
                timings.Fajr,
                timings.Sunrise,
                timings.Dhuhr,
                timings.Asr,
                timings.Maghrib,
                timings.Isha
            ];
        } else {
                return [
                "00:00",
                "00:00",
                "00:00",
                "00:00",
                "00:00",
                "00:00",
                ];
            }
        } catch (error) {
            console.error(error);
            return [
                "00:00",
                "00:00",
                "00:00",
                "00:00",
                "00:00",
                "00:00",
                ];
        }
}
// Milodiy sana
const today = new Date();
const months = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"];
const miladiSana = `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;

// Arabcha → lotincha Hijriy oylar tarjimasi
const hijriMonthMap = {
      "محرم": "Muharram",
      "صفر": "Safar",
      "ربيع الأول": "Rabi'ul-avval",
      "ربيع الآخر": "Rabi'us-soniy",
      "جمادى الأولى": "Jumadul-avval",
      "جمادى الآخرة": "Jumadus-soniy",
      "رجب": "Rajab",
      "شعبان": "Sha'bon",
      "رمضان": "Ramazon",
      "شوال": "Shavvol",
      "ذو القعدة": "Zulqa'da",
      "ذو الحجة": "Zulhijja"
    };
// Hijriy sana olish
const hijriFormatter = new Intl.DateTimeFormat('ar-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

const hijriParts = hijriFormatter.formatToParts(today);
let hijriDay = '', hijriMonth = '', hijriYear = '';

hijriParts.forEach(part => {
    if (part.type === 'day') hijriDay = part.value;
    if (part.type === 'month') hijriMonth = hijriMonthMap[part.value] || part.value;
    if (part.type === 'year') hijriYear = part.value;
});

const hijriSana = `${hijriDay} ${hijriMonth} ${hijriYear}`;

// Natijani chiqarish
document.getElementById('umumiysana').innerHTML = `
    ${miladiSana} - ${hijriSana}`;
const now = new Date();
const hours = now.getHours().toString().padStart(2, '0');
const minutes = now.getMinutes().toString().padStart(2, '0');
const seconds = now.getSeconds().toString().padStart(2, '0');

document.getElementById('current_time').textContent = `${hours}:${minutes}:${seconds}`;

const times = await namozvaqtianiqla("Shahrixon");
const timeBlocks = ['Bomdodgacha', 'Quyoshgacha', 'Peshingacha', 'Asrgacha', 'Shomgacha', 'Xuftongacha', `Ertangi bomdodgacha` ];

function msToTime(s) {
    if (s < 0) s = -s;
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
    hrs = hrs < 10 ? "0" + hrs : hrs;
    mins = mins < 10 ? "0" + mins : mins;
    secs = secs < 10 ? "0" + secs : secs;
    return hrs + ':' + mins + ':' + secs;
}

var currentTime = moment($("#current_time").text(), "HH:mm:ss");
var period = 0;
for (var i = 0; i < 6; i++) {
    if (currentTime.diff(moment(times[i], "HH:mm")) > 0){
        period = i;
    }
    if(currentTime.diff(moment(times[5], "HH:mm")) > 0){
        period++
    }
}

var time = times[period]
var difference = currentTime.diff(moment(times[period], "HH:mm"))

setInterval(() => {
    $("#current_time").text(currentTime.format("HH:mm:ss"));

    if(period === 6){
        difference = moment(times[period], "HH:mm").add(1, 'days').diff(currentTime)
    } else {
        difference = currentTime.diff(moment(times[period], "HH:mm"))
    }

    currentTime = currentTime.add(1, "seconds");
        
    if(period > 0){
        $(".ad__item").eq(period-1).addClass(" active_time ");
    } else{
        $(".ad__item").eq(period).addClass(" active_time ");
    }
    if (currentTime.diff(moment(times[period], "HH:mm")) > 0) {
        if(period > 0){
            if(period === 6){
                $(".ad__item").eq(period - 2).removeClass(" active_time ");
            } else {
                $(".ad__item").eq(period - 1).removeClass(" active_time ");
            }
        } else{
            $(".ad__item").eq(period).removeClass(" active_time ");
        }
        period++
        period = period > 6 ? 6 : period;
    }
    $("#remaining_time").text(msToTime(difference))
    $("#remaining_period").text(`${timeBlocks[period]} : `)
}, 1000);
