/*<<設定の関数>>
------------------------
* 1行目...初心者モードの設定
* 2行目...中級者モードの設定
* 3行目...上級者モードの設定
* 4行目...カスタム設定
------------------------
*/
left_explanation = [
    {type: 'easy_menu', title: '初心者モード', explanation: '初めての方はこちら！下のメニューではどんな問題を出すか設定できるよ！'}, 
    {type: 'normal_menu', title: '中級者モード', explanation: '中級者の方はこちら！下の設定では初心者モードで設定できる事以外に<br>マイナスを出す設定も追加されたよ！'},
    {type: 'normal_menu', title: '上級者モード', explanation: '上級者の方はこちら！下の設定の説明は問題ないよね？<br>そんな上級者の方に豆知識!円盤の数がたくさんあると<br>乱数調整でどんどん難しくなるよ！'},
    {type: '_menu', title: 'カスタム設定', explanation: 'カスタム設定だよ！自分好みに設定して練習したい方はこちら！'}
]

let left_now_number = 0;//何回回ったか記録する関数
let get_Number = 7;
let operator = ['+', '-', '*', '/'];
const minus = true;

//ロードしたときに最初の設定を読み込む
window.onload = function(){
    Left_menu(left_now_number)
    new_board(500,4,left_now_number);
}
//ボタン押したら回る関数
function rotate(get_rotate) {
    left_now_number += get_rotate
    Left_menu(left_now_number)
    new_board(500,4,left_now_number);
}

function Left_menu(now_number) {
    get_left_dom = document.getElementById('left');
    get_left_dom.innerHTML = '<h2>'+ left_explanation[now_number].title +'</h2><p>'+ left_explanation[now_number].explanation +'</p>'
}


//円盤のやつ
function new_board(size, arc_number, now){
    get_dom_id = document.getElementById('right_canvas');
    dom_id = get_dom_id.getContext("2d");
    dom_id.clearRect(0, 0, size, size);

for (let now_dom_number = 0;  now_dom_number < arc_number; now_dom_number++){
    //下準備
    arc_angle = 360/arc_number;
    arc_angle_half = arc_angle/2 + 90;

    //扇形をつくる
    dom_id.beginPath();
    dom_id.arc(size/2,size/2, size/2.1, ((Math.PI/180)*arc_angle)*(now_dom_number + now) + ((Math.PI/180)*arc_angle_half),  ((Math.PI/180)*arc_angle)*((now_dom_number  + now)+ 1) + ((Math.PI/180)*arc_angle_half), false);//扇形の描画
    dom_id.lineWidth = 3; // 線の太さ
    dom_id.strokeStyle = '#757575'
    dom_id.lineTo(size/2,size/2);//線で囲む
    dom_id.stroke();//線の描画
    
    //中の文字を書く予定
    dom_id.save(); //座標系セーブ
    dom_id.translate((size/2), size/2);
    dom_id.rotate(((Math.PI/180)*arc_angle)* (now_dom_number + now));//扇画の角度に合わせるようにまわう
    dom_id.fillStyle = '#757575';//文字の設定(色)
    dom_id.textAlign = 'center';//文字の設定(中央揃え)
    dom_id.font = '25px Arial';//文字の設定(大きさとフォント)
    dom_id.fillText(left_explanation[now_dom_number].title,  0, -size/3);//外枠の文字を書く

    dom_id.restore();//座標系のセーブ復活
    dom_id.save(); //座標系セーブ
}
    //真ん中の円
    dom_id.save(); //座標系セーブ
    dom_id.translate((size/2)*0.6,(size/2)*0.6);
    dom_id.scale(0.4, 0.4);
    dom_id.beginPath();//パスの作成
    dom_id.arc(size/2, size/2,  size/2, (Math.PI/10)*20, (Math.PI/10)*10, false);
    dom_id.moveTo((size/2)+ size/2, size/2);//そこにペン(なのかな？)を移動したよ
    dom_id.lineTo(size/2, size/2 - size/2); //線を書く
    dom_id.lineTo((size/2)- size/2, size/2);//線を書く
    dom_id.fillStyle = '#EFEFEF';
    dom_id.fill();//塗りつぶす
    dom_id.lineWidth = 3; // 線の太さ
    dom_id.strokeStyle = '#757575'; // 線の色
    dom_id.stroke();//線の描画
    //中に書く文字を描画する
    dom_id.restore();//座標系のセーブ復活
    dom_id.save(); //座標系セーブ
    dom_id.fillStyle = '#757575'; // テキストの色を設定
    dom_id.textAlign = "center";//横方向
    dom_id.font = '25px Arial';//文字の設定(大きさとフォント)
    dom_id.fillText(left_explanation[now].title,  size/2, size/1.9);//中の文字を書く
}

//ホーム画面に戻る関数(aタグのほうが楽)
function home(){
    window.location.href='../home/home.html';
}

function goGame(){
    let send = ''
    for(let go_operator = 0; go_operator < operator.length; go_operator++){
       send += "&operator=" + operator[go_operator];
    }
    window.location.href = "../game/game.html" + "?title=" + left_explanation[left_now_number].title + "&Number=" + get_Number + "&operator="+ send + "&minus=" +  minus;
}
