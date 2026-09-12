(function () {
    // 1. Rejim holatini localStorage'dan tekshirish
    let isAccessibilityMode = localStorage.getItem('accessibility_mode') === 'true';

    // 2. Ovozli xabar berish yordamchisi (Text-to-Speech)
    function speak(text) {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel(); // Avvalgi gaplarni to'xtatish
            let utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'uz-UZ'; // O'zbek tili
            utterance.rate = 1.0;
            window.speechSynthesis.speak(utterance);
        }
    }

    // 3. Rejimni yoqish/o'chirish funksiyasi
    function toggleAccessibilityMode(enable) {
        isAccessibilityMode = enable;
        localStorage.setItem('accessibility_mode', enable);

        if (enable) {
            console.log("Ko'zi ojizlar rejimi yoqildi.");
            speak("Ko'zi ojizlar rejimi yoqildi. Sahifa o'qib berilmoqda va ovozli buyruqlar tayyor.");
            activateScreenReaderFeatures();
        } else {
            localStorage.removeItem('accessibility_mode');
            speak("Ko'zi ojizlar rejimi o'chirildi.");
        }
    }

    // 4. Sahifadagi matnlarni o'qish va ovozli boshqaruvni ishga tushirish
    function activateScreenReaderFeatures() {
        // Sahifadagi sarlavha va asosiy matnlarni o'qib berish
        let pageTitle = document.querySelector('h1, h2')?.innerText || document.title;
        speak(pageTitle);

        // Ovozli buyruqlarni tinglashni boshlash (Speech Recognition)
        startVoiceCommands();
    }

    // 5. Ovozli buyruqlar (Speech Recognition)
    function startVoiceCommands() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.warn("Brauzeringiz ovozli buyruqlarni qo'llab-quvvatlamaydi.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'uz-UZ';
        recognition.continuous = true;
        recognition.interimResults = false;

        recognition.onresult = function (event) {
            let command = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
            console.log("Eshitilgan buyruq:", command);

            // Oddiy misol buyruqlar:
            if (command.includes('orqaga') || command.includes('oldingiga')) {
                speak("Orqaga qaytilmoqda");
                window.history.back();
            } else if (command.includes('pastga')) {
                window.scrollBy({ top: 300, behavior: 'smooth' });
                speak("Pastga tushildi");
            } else if (command.includes('yuqoriga')) {
                window.scrollBy({ top: -300, behavior: 'smooth' });
                speak("Yuqoriga chiqildi");
            } else {
                speak("Buyruq tushunarsiz: " + command);
            }
        };

        recognition.onerror = function (event) {
            console.error("Ovozli buyruq xatosi:", event.error);
        };

        // Tugagach qayta ishga tushirish (uzluksiz ishlashi uchun)
        recognition.onend = function () {
            if (isAccessibilityMode) {
                try { recognition.start(); } catch (e) {}
            }
        };

        try {
            recognition.start();
        } catch (e) {}
    }

    // 6. 4 soniya bosib turish (Long Press) logikasi
    let pressTimer = null;
    const HOLD_DURATION = 4000; // 4 soniya

    function startPress(e) {
        // Agar allaqachon yoqilgan bo'lsa, qayta 4 soniya ushlab turish shart emas
        if (isAccessibilityMode) return;

        pressTimer = setTimeout(() => {
            toggleAccessibilityMode(true);
        }, HOLD_DURATION);
    }

    function cancelPress() {
        if (pressTimer) {
            clearTimeout(pressTimer);
            pressTimer = null;
        }
    }

    // Hodisalarni qo'shish (Sichqoncha va Sensor ekran uchun)
    window.addEventListener('mousedown', startPress);
    window.addEventListener('mouseup', cancelPress);
    window.addEventListener('touchstart', startPress);
    window.addEventListener('touchend', cancelPress);

    // 7. Sahifa yuklanganda tekshirish
    window.addEventListener('DOMContentLoaded', () => {
        if (isAccessibilityMode) {
            // Rejim avval yoqilgan bo'lsa, to'g'ridan-to'g'ri ishga tushadi
            activateScreenReaderFeatures();
        }
    });
})();
