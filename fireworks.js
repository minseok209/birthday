document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('fireworksCanvas');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let fireworks = [];
  let textPosition = canvas.height;

  class Firework {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.particles = [];
      this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;

      for (let i = 0; i < 50; i++) {
          const velocity = {
              x: (Math.random() - 0.5) * 5,
              y: (Math.random() - 0.5) * 5
          };
          this.particles.push(new Particle(this.x, this.y, velocity, this.color));
      }
  }

  update() {
      this.particles.forEach(particle => particle.update());
      this.particles = this.particles.filter(particle => particle.alpha > 0);
  }

  draw() {
      this.particles.forEach(particle => particle.draw());
  }
  }

  class Particle {
    constructor(x, y, velocity, color) {
      this.x = x;
      this.y = y;
      this.velocity = velocity;
      this.alpha = 1;
      this.color = color;
  }

  update() {
      this.x += this.velocity.x;
      this.y += this.velocity.y;
      this.velocity.y += 0.05; // gravity
      this.alpha -= 0.01; // fade out
  }

  draw() {
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
      ctx.fill();
  }
  }

  function drawText() {
    // 화면 너비에 따라 글자 크기 동적 조정
    const fontSize = window.innerWidth < 768 ? '30px' : '50px'; // 모바일 화면일 때 30px, 그 외에는 50px
    ctx.fillStyle = 'white';
    ctx.font = `${fontSize} Arial`;
    ctx.textAlign = 'center';
    
    // 글자 위치 조정을 위해 fontSize의 숫자값만 추출
    const fontSizeNumber = parseInt(fontSize, 10);
    
    // y 위치를 fontSize에 따라 동적으로 조정
    ctx.fillText("가은이의 생일을 축하합니다.", canvas.width / 2, textPosition);
    ctx.fillText("가은이 생각하면서 한줄한줄 코딩했어", canvas.width / 2, textPosition + fontSizeNumber + 10); // 여백을 10px로 설정
    ctx.fillText("소소한(만드는데 소소하진 않았던..) 이벤트랄까", canvas.width / 2, textPosition + 2 * (fontSizeNumber + 10)); // 두 번째 줄 여백
    ctx.fillText("- 가은이를 짱 사랑하는 민석이가 -", canvas.width / 2, textPosition + 3 * (fontSizeNumber + 10)); // 세 번째 줄 여백
    ctx.fillText("♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡", canvas.width / 2, textPosition + 4 * (fontSizeNumber + 10)); // 네 번째 줄 여백

    textPosition -= 0.5;

    if (textPosition < -150) {
        textPosition = canvas.height;
    }
}



  function animate() {
      requestAnimationFrame(animate);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (Math.random() < 0.05) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          fireworks.push(new Firework(x, y));
      }

      fireworks.forEach((firework, index) => {
          if (firework.particles.length === 0) {
              fireworks.splice(index, 1);
          }
          firework.update();
          firework.draw();
      });

      drawText();
  }

  window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      textPosition = canvas.height;
  });

  animate();
});
