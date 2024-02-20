document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('heartCanvas');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  function drawHeart(x, y, size, color) {
      ctx.fillStyle = color;
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(x, y + topCurveHeight);
      // Top left curve
      ctx.bezierCurveTo(
          x, y, 
          x - size / 2, y, 
          x - size / 2, y + topCurveHeight
      );

      // Bottom left curve
      ctx.bezierCurveTo(
          x - size / 2, y + (size + topCurveHeight) / 2, 
          x, y + (size + topCurveHeight) / 2, 
          x, y + size
      );

      // Bottom right curve
      ctx.bezierCurveTo(
          x, y + (size + topCurveHeight) / 2, 
          x + size / 2, y + (size + topCurveHeight) / 2, 
          x + size / 2, y + topCurveHeight
      );

      // Top right curve
      ctx.bezierCurveTo(
          x + size / 2, y, 
          x, y, 
          x, y + topCurveHeight
      );

      ctx.closePath();
      ctx.fill();
  }

  function hearts() {
      let particles = [];

      function explode() {
          let x = Math.random() * canvas.width;
          let y = Math.random() * canvas.height;
          let colors = ['#FF69B4', '#FFC0CB', '#FF1493', '#DB7093']; // Heart colors
          let count = 10;
          while (count--) {
              particles.push({
                  x: x,
                  y: y,
                  xv: (Math.random() - 0.5) * 4,
                  yv: (Math.random() - 0.5) * 4,
                  size: Math.random() * 10 + 5,
                  color: colors[Math.floor(Math.random() * colors.length)],
                  age: 0,
                  maxAge: 100
              });
          }
      }

      function update() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          particles.forEach((particle, index) => {
              particle.x += particle.xv;
              particle.y += particle.yv;
              particle.age++;
              if (particle.age < particle.maxAge) {
                  drawHeart(particle.x, particle.y, particle.size, particle.color);
              } else {
                  particles.splice(index, 1);
              }
          });

          if (Math.random() < 0.1) { // Adjust spawn rate
              explode();
          }

          requestAnimationFrame(update);
      }

      update();
  }

  hearts();
});
