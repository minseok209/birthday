
function updateTimer() {
  const now = new Date();
  const nextBirthday = new Date(now.getFullYear(), 1, 22); // 2월 22일
  if (now > nextBirthday) {
      nextBirthday.setFullYear(now.getFullYear() + 1);
  }
  const diff = nextBirthday - now;
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('timer').innerHTML = days + "일 " + hours + "시간 "
  + minutes + "분 " + seconds + "초 남았습니다!";
}

// 타이머를 업데이트하는 함수를 매초마다 호출
setInterval(updateTimer, 1000);

document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
      var fadeOutText = document.querySelector('p.fade-out-text'); // 'fade-out-text' 클래스를 가진 <p> 요소 선택
      fadeOutText.style.opacity = 0; // 5초 후 투명도를 0으로 변경
  }, 5000); // 5000 밀리초(5초) 후 실행
});

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.caption').forEach(function(caption) {
      caption.addEventListener('click', function() {
          // data-target 속성에서 연결된 이미지의 ID를 가져옵니다.
          var targetId = caption.getAttribute('data-target');
          var targetImage = document.getElementById(targetId);
          
          // 이미지의 표시 상태를 토글합니다.
          if (targetImage.classList.contains('hidden')) {
              targetImage.classList.remove('hidden');
              targetImage.classList.add('visible');
          } else {
              targetImage.classList.add('hidden');
              targetImage.classList.remove('visible');
          }
      });
  });
});

