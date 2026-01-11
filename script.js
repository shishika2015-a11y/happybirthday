const btn = document.getElementById("btn");
const messageDiv = document.getElementById("message");

const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

/* ===== メッセージ ===== */
const messages = [
  "爷爷，你好吗？🎂",
  "好久没见你了，我很想你。🎉",
  "爷爷，你今年多少岁了？🎂",
  "我今年十岁😊",
  "今年或者明年我想去看你。😊",
  "爷爷，生日快乐！🎂"
];

let index = 0;
let timer = null;

/* ===== 紙吹雪 ===== */
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();

class Confetti {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = -Math.random() * canvas.height;
    this.size = Math.random() * 6 + 4;
    this.speed = Math.random() * 3 + 2;
    this.color = `hsl(${Math.random() * 360},100%,60%)`;
  }
  update() {
    this.y += this.speed;
    if (this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}

let confetti = [];
let animationId;

function startConfetti() {
  confetti = [];
  for (let i = 0; i < 120; i++) {
    confetti.push(new Confetti());
  }

  cancelAnimationFrame(animationId);
  animate();

  setTimeout(() => {
    cancelAnimationFrame(animationId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, 20000);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach(c => {
    c.update();
    c.draw();
  });
  animationId = requestAnimationFrame(animate);
}

/* ===== メッセージ表示（修正版） ===== */
function showMessage(text, isFinal = false) {
  // クラスを「消す」のではなく「外す」
  messageDiv.classList.remove("fade-in", "final-message");

  // 再描画トリガー（フェードを毎回効かせる）
  void messageDiv.offsetWidth;

  messageDiv.textContent = text;

  if (isFinal) {
    messageDiv.classList.add("final-message");
  }

  messageDiv.classList.add("fade-in");
}

function showMessagesSequentially() {
  index = 0;
  showMessage(messages[index]);

  if (timer) clearInterval(timer);

  timer = setInterval(() => {
    index++;

    if (index >= messages.length) {
      clearInterval(timer);
      btn.disabled = false;
      btn.textContent = "もう一度";
      return;
    }

    const isFinal = index === messages.length - 1;
    showMessage(messages[index], isFinal);

  }, 3500);
}

/* ===== ボタン ===== */
btn.addEventListener("click", () => {
  if (btn.disabled) return;

  btn.disabled = true;
  btn.textContent = "再生中…";

  showMessagesSequentially();
  startConfetti();
});

window.addEventListener("resize", resizeCanvas);
