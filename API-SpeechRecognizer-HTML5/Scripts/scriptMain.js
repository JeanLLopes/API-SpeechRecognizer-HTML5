window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;

if (window.SpeechRecognition === null) {
    document.getElementById('unsupported').classList.remove('hidden');
}
else {
    document.getElementById('sectionSpeech').className = "block";

    var recognizer = new window.SpeechRecognition();
    var transcription = document.getElementById("transcription");
    var taxa = document.getElementById("taxa");

    recognizer.continuous = true;

    recognizer.onresult = function (event) {
        transcription.textContent = "";
        for (var i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
                transcription.textContent = event.results[i][0].transcript;
                taxa.textContent = '(Taxa de acerto [0/1] : ' + event.results[i][0].confidence + ')';

                document.getElementById("sectionAlerts").className = "block";
            } else {
                transcription.textContent += event.results[i][0].transcript;
            }
        }
    }


    document.querySelector('#rect').addEventListener("click", function () {
        try {
            recognizer.start();
        } catch (ex) {
            console.log('error: ' + ex.message);
        };
    });
}