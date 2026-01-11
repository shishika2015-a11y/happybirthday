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
  "爷爷，生日快乐！🎂" // 最後は固定
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

  // 6秒後に終了
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

/* ===== メッセージをゆっくり順番表示 ===== */
function showMessagesSequentially() {
  index = 0;
  messageDiv.textContent = messages[index];

  if (timer) clearInterval(timer);

  timer = setInterval(() => {
    index++;

    if (index >= messages.length) {
      clearInterval(timer); // 最後で停止
      return;
    }

    messageDiv.textContent = messages[index];
  }, 3500); // ★ 3秒ごとに切り替え
}

/* ===== ボタン ===== */
btn.addEventListener("click", () => {
  showMessagesSequentially();
  startConfetti();
});

window.addEventListener("resize", resizeCanvas);
