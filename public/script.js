document.addEventListener('DOMContentLoaded', function () {
  // 获取DOM元素
  const textInput = document.getElementById('text_input');
  const textGrid = document.getElementById('text_grid');
  const characterDisplay = document.getElementById('character_display');
  // 假设添加一个清空按钮，确保在HTML中添加对应的按钮并设置正确的ID
  const clearButton = document.getElementById('clear_button');



  // 清空输入和网格内容，而不是移除网格
  clearButton.addEventListener('click', function () {
    textInput.value = '';
    updateGridContent();
    resetCharacterDisplay();
  });


  // 初始化10x10网格
  for (let i = 0; i < 50; i++) {
    const cell = document.createElement('div');
    cell.classList.add('grid-cell');
    // 为每个格子添加点击事件，显示笔画（确保displayCharacterAnimation函数已定义）
    cell.addEventListener('click', function () {
      if (cell.textContent.match(/^[\u4e00-\u9fa5]+$/)) {
        displayCharacterAnimation(cell.textContent);
        showPinyin(cell.textContent);
      }
    });
    textGrid.appendChild(cell);
  }

  // 动态更新网格显示输入的汉字
  textInput.addEventListener('input', updateGridContent);
  function updateGridContent() {
    const cells = document.querySelectorAll('.grid-cell');
    cells.forEach(cell => cell.textContent = ''); // 清空网格内容
    const chars = textInput.value.split('').filter(char => char.match(/^[\u4e00-\u9fa5，。？！]$/));
    chars.forEach((char, index) => {
      if (index < 50) cells[index].textContent = char;
    });
  }

  // 重置笔画窗格
  function resetCharacterDisplay() {
    showPinyin('字')
    characterDisplay.innerHTML = '';
    HanziWriter.create(characterDisplay, '字', {
      width: 300,
      height: 300,
      padding: 5
    });
  }

  // 显示拼音
  function showPinyin(char) {
    var { pinyin } = pinyinPro;
    const pinyin_initial = pinyin(char, { pattern: 'initial' });
    const pinyin_initial_char = pinyin(char, { toneType: 'none', pattern: 'initial' });
    const pinyin_final = pinyin(char, { pattern: 'final' });
    const pinyin_final_char = pinyin(char, { toneType: 'none', pattern: 'final' });

    document.getElementById('pinyin_initial').innerText = pinyin_initial;
    document.getElementById('pinyin_initial_upper').innerText = pinyin_initial_char.toUpperCase();
    document.getElementById('pinyin_final').innerText = pinyin_final;
    document.getElementById('pinyin_final_upper').innerText = pinyin_final_char.toUpperCase();
    
  }

  resetCharacterDisplay();

  // 显示汉字笔画动画的函数
  function displayCharacterAnimation(char) {

    speakCharacter(char);

    characterDisplay.innerHTML = ''; // 清空当前展示的汉字
    HanziWriter.create(characterDisplay, char, {
      width: 300,
      height: 300,
      padding: 5,
      strokeColor: '#000000',
      radicalColor: '#168F16',
      strokeAnimationSpeed: 0.3,
      delayBetweenLoops: 2000
    }).loopCharacterAnimation();
  }
});

// Function to speak the character using Web Speech API
function speakCharacter(character) {
  const utterance = new SpeechSynthesisUtterance(character);
  utterance.lang = 'zh-CN';
  // utterance.voice = speechSynthesis.getVoices()[0];
  utterance.rate = 0.1;
  speechSynthesis.speak(utterance);
}