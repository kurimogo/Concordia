// Furigana表示のオン/オフを制御する変数を定義します
let On_Furigana = true;

// Furigana関数を定義します
function Furigana () {
    // 'rt'タグを持つすべての要素を取得します
    let get_rt = document.getElementsByTagName('rt');
    // 'easy_ja'クラスを持つすべての要素を取得します
    let get_easy_ja = document.getElementsByClassName('easy_ja');
    // 'nomal_ja'クラスを持つすべての要素を取得します
    let get_nomal_ja = document.getElementsByClassName('nomal_ja');
    
    // On_Furiganaがtrueの場合、'rt'と'easy_ja'クラスの要素を非表示にし、'nomal_ja'クラスの要素を表示します
    if(On_Furigana == true){
        // 'rt'タグの要素が存在する場合、それらを非表示にします
        if(get_rt){
            for (var i = 0; i < get_rt.length; i++) {
                get_rt[i].style.visibility = 'hidden';
            }
        }
        // 'easy_ja'クラスの要素が存在する場合、それらを非表示にします
        if(get_easy_ja){
            for (var i = 0; i < get_easy_ja.length; i++) {
                get_easy_ja[i].style.visibility = 'hidden';
            }
        }
        // 'nomal_ja'クラスの要素が存在する場合、それらを表示します
        if(get_nomal_ja){
            for (var i = 0; i < get_nomal_ja.length; i++) {
                get_nomal_ja[i].style.visibility = 'visible';
            }
        }
        On_Furigana = false;
    } else {
        // On_Furiganaがfalseの場合、'rt'と'easy_ja'クラスの要素を表示し、'nomal_ja'クラスの要素を非表示にします
        // 'rt'タグの要素が存在する場合、それらを表示します
        if(get_rt){
            for (var i = 0; i < get_rt.length; i++) {
                get_rt[i].style.visibility = 'visible';
            }
        }
        // 'easy_ja'クラスの要素が存在する場合、それらを表示します
        if(get_easy_ja){
            for (var i = 0; i < get_easy_ja.length; i++) {
                get_easy_ja[i].style.visibility = 'visible';
            }
        }
        // 'nomal_ja'クラスの要素が存在する場合、それらを非表示にします
        if(get_nomal_ja){
            for (var i = 0; i < get_nomal_ja.length; i++) {
                get_nomal_ja[i].style.visibility = 'hidden';
            }
        }
        On_Furigana = true;
    }
}

// ページが読み込まれたときにFurigana関数を実行します
window.addEventListener('load', function (){
    Furigana();
});

function home () {
    location.href = '../home/home.html';
}