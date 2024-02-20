
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
