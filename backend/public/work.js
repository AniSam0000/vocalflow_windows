let mediaRecorder;
let audioChunks = [];
let isRecording = false;
let stream;

const statusBadge = document.getElementById("statusBadge");
const statusDot = document.getElementById("statusDot");
const statusText = document.getElementById("statusText");
const rawText = document.getElementById("rawText");
const improvedText = document.getElementById("improvedText");
const deepgramBalance = document.getElementById("deepgramBalance");
const groqBalance = document.getElementById("groqBalance");

// Set status UI
function setStatus(type, text) {
  statusBadge.className = "status-badge " + type;
  statusText.textContent = text;
}

// Fetch balances on load
async function loadBalances() {
  try {
    const res = await fetch("/balances");
    const data = await res.json();
    deepgramBalance.textContent = `$${parseFloat(data.deepgram).toFixed(2)}`;
    groqBalance.textContent = data.groq;
  } catch (err) {
    deepgramBalance.textContent = "Error";
    groqBalance.textContent = "Error";
  }
}

// Setup mic
async function setupMic() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    console.log("Mic ready");
  } catch (err) {
    console.error("Mic error:", err);
    setStatus("", "Mic not found");
  }
}

// Start recording
function startRecording() {
  if (!stream || isRecording) return;
  isRecording = true;
  audioChunks = [];

  mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.ondataavailable = (e) => audioChunks.push(e.data);

  mediaRecorder.onstop = async () => {
    setStatus("processing", "Processing...");

    const blob = new Blob(audioChunks, { type: "audio/webm" });
    const formData = new FormData();
    formData.append("audio", blob, "audio.webm");

    try {
      const res = await fetch("/transcribe", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      rawText.textContent = data.raw || "—";
      improvedText.textContent = data.text || "—";
      setStatus("", "Ready");
    } catch (err) {
      console.error("Transcription error:", err);
      setStatus("", "Error — try again");
    }

    isRecording = false;
  };

  mediaRecorder.start();
  setStatus("recording", "Recording...");
}

// Stop recording
function stopRecording() {
  if (!isRecording || !mediaRecorder) return;
  mediaRecorder.stop();
}

// Keyboard events
document.addEventListener("keydown", (e) => {
  if (e.key === "F9") {
    e.preventDefault();
    startRecording();
  }
  if (e.key === "F10") {
    e.preventDefault();
    stopRecording();
  }
});

// Init
loadBalances();
setupMic();
