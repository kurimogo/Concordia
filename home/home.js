//ゲーム開始ボタン押したら選択画面に行くやつ(aタグでいいね)
function select () {
    window.location.href='../select/Select.html';
}

//チュートリアルボタン押したら説明画面に行くやつ(aタグでいいね)
function tutorial () {
    window.location.href='../tutorial/tutorial.html';
}

document.addEventListener('keydown', event => {
    // 変数eventの中身はKeyboardEventオブジェクト
    if (event.code === 'Space') {
        select();
    }
    console.log(event);
});