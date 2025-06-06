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
