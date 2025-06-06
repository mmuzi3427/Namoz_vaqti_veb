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
