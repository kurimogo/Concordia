// 文字列としてURLを取得する。
 let url_string = window.location.href;
 // 文字列としてのURLをURLオブジェクトに変換する。
 let url = new URL(url_string);
 // URLオブジェクトのsearchParamsのget関数でIDがdの値を取得する。
 let get_Number = url.searchParams.get("Number");
 //let operator = url.searchParams.get("operator");

let Q;
let A = [];
let operator = ['+', '-', '*', '/'];
const minus = true;
const quiz_list = {number: 0, pass: 0, fail: 0, invalid:0} 
let minutes = 0;
let AnswerPass = false;

Q_display_JS = document.getElementById('Q_display');
time_display_JS = document.getElementById('time_display');
pass_display_JS = document.getElementById('pass_display');
fail_display_JS = document.getElementById('fail_display');
invalid_display_JS = document.getElementById('invalid_display');
let center_dom = document.getElementById('center');
let input_ui_gethtml;
const input_ui_list= [];

let time = 300;

window.onload = function(){
    countdown();
}

function Question(){
    let old_Q = Q
    Q = 0;
    if(AnswerPass == true){
    if (get_Number % 2 == 1) {
        for (let now_number = 0; now_number < get_Number; now_number++){
            if (now_number % 2 == 1){
                Q += (operator[Math.floor(Math.random() * operator.length)]);
            } else {
                Q +=  (Math.floor(Math.random() * 10));
            }
        }
    } else {
        get_Number = get_Number - 1;
        Question();
    }
    Q = eval(Q);
    if (!Number.isInteger(Q) || old_Q == Q ||(Q.toString().includes('-')&& minus) || Q === 0) {
        Question();    
    }
    Q_display_JS.innerHTML='<h2>'+ Q +'</h2>';
}
}


//特定のキーが押されたときの反応
let keysPressed = {};
const now_down = {Left:'', right:'', down_1:'',down_2:'',down_3:'',down_4:'',down_5:'',down_6:'',down_7:''}

// キーボードのキーが押されたときのイベントリスナー
document.addEventListener('keydown', (event) => {
    const key = event.key;
    const isLeft = key === 'ArrowLeft';
    const isRight = key === 'ArrowRight';

    // 特定のキーが押されたときのアクションを設定
    if (key === 'Enter') answer();
    if (key === ' ') invalid();
    if (isLeft || isRight) now_down[key] = true;
    if (key >= '1' && key <= '7') now_down[`down_${key}`] = true;

    // 左または右のキーと数字のキーが同時に押されたときに描画
    for (let i = 1; i <= 7; i++) {
        if ((isLeft && now_down[`down_${i}`] && get_Number > i - 1) ||
            (isRight && now_down[`down_${i}`] && get_Number > i - 1)) {
            draw(i - 1, isLeft ? 1 : -1);
        }
    }
});

// キーボードのキーが離されたときのイベントリスナー
document.addEventListener('keyup', (event) => {
    const key = event.key;
    const isLeft = key === 'ArrowLeft';
    const isRight = key === 'ArrowRight';

    // 特定のキーが離されたときのアクションを設定
    if (isLeft || isRight) now_down[key] = false;
    if (key >= '1' && key <= '7') now_down[`down_${key}`] = false;
});

document.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'ArrowLeft': now_down.Left = false; break;

        case 'ArrowRight': now_down.right = false; break;
        
        case '1': now_down.down_1 = false; break;

        case '2': now_down.down_2 = false; break;

        case '3': now_down.down_3 = false; break;

        case '4': now_down.down_4 = false; break;

        case '5': now_down.down_5 = false; break;

        case '6': now_down.down_6 = false; break;

        case '7': now_down.down_7 = false; break;
    }

});

//カウントダウン
let count = 3;
function countdown (){
    if(count > 0){
        center_dom.innerHTML = '<p id="count_p">' + count + '</p>'
        //上のタイムの部分
        if(Math.floor(time / 60) > 0){
            minutes = Math.floor(time / 60) +'分';
        }else{
            minutes ='';
        }
        time_display_JS.innerHTML='<h2>'+ minutes + (time % 60)+ '秒' +'</h2>';
        count_time = setTimeout(countdown, 1000);
        count--;
    } else {
        clearTimeout(count_time);
        center_dom.innerHTML = '<div id="input_ui_dom"></div> <div id="answer_button_ui"><button onclick="invalid()" class="answer_button">飛ばす(スペースキー)</button><button onclick="answer()" class="answer_button">回答！(エンターキー)</button></div>'
        input_ui_gethtml = document.getElementById("input_ui_dom");
        AnswerPass = true;
        Allinput_ui();
        game_time();
        Question();
    }
}

//タイマーの部分
function game_time(){
    time--;
    if(Math.floor(time / 60) > 0){
        minutes = Math.floor(time / 60) +'分';
    }else{
        minutes ='';
    }
    time_display_JS.innerHTML='<h2>'+ minutes + (time % 60)+ '秒' +'</h2>';
    let clock = setTimeout(game_time, 1000);
    if (time <= 0 ){
        clearTimeout(clock);
        AnswerPass = false;
        fin();
    }
}

// 問題を生成する関数
function Question() {
    let old_Q = Q;
    Q = 0;

    // AnswerPassがtrueの場合に問題を生成
    if (AnswerPass) {
        // get_Numberが奇数の場合に問題を生成
        while (get_Number % 2 == 0 || !Number.isInteger(Q) || old_Q == Q || (Q.toString().includes('-') && minus)) {
            Q = 0;
            if (get_Number % 2 == 1) {
                for (let now_number = 0; now_number < get_Number; now_number++) {
                    Q += now_number % 2 == 1 ? operator[Math.floor(Math.random() * operator.length)] : Math.floor(Math.random() * 10);
                }
            } else {
                get_Number--;
            }

            Q = eval(Q);
        }

        // 問題を表示
        Q_display_JS.innerHTML = `<h2>${Q}</h2>`;
    }
}

// 最初の描画システム
function Allinput_ui () {
    // ウィンドウの幅が480ピクセルより大きい場合はsizeを200に、それ以下の場合はsizeを150に設定
    let size = window.innerWidth > 480 ? 200 : 150;

    for (let input_ui_number = 0; input_ui_number < get_Number; input_ui_number++){
        if (input_ui_number % 2 !== 1) {
            input_ui_list.push({id: input_ui_number, type:'number', number: 10, start:270, now:0});
        } else {
            input_ui_list.push({id: input_ui_number, type:'symbol', number: 4, start:270, now:0});
        }
        if(size !== 200){
            input_ui_gethtml.innerHTML += `<div class='input_ui_css'><button onclick='draw(${input_ui_number},1)'>左に回す<br>(${input_ui_number + 1}と左キー)</button><canvas id=input_${input_ui_number} width=${size} height=${size}></canvas><button onclick='draw(${input_ui_number}, 1)'>右に回す<br>(${input_ui_number + 1}と右キー)</button></div>`;
        }else {
            input_ui_gethtml.innerHTML += `<div class='input_ui_css'><canvas id=input_${input_ui_number} width=${size} height=${size}></canvas><button onclick='draw(${input_ui_number},1)'>左に回す<br>(${input_ui_number + 1}と左キー)</button><button onclick='draw(${input_ui_number}, -1)'>右に回す<br>(${input_ui_number + 1}と右キー)</button></div>`;
        }
        
    }

    for (let input_ui_number = 0; input_ui_number < get_Number; input_ui_number++){
        new_board(input_ui_list[input_ui_number].id, input_ui_list[input_ui_number].type, input_ui_list[input_ui_number].number, input_ui_list[input_ui_number].now);
    }
}

let dom_course;
let canvas;
let course_number = 0;
let move_now = 0;
let move_time = 2;

// ボタンの部分の関数
function draw(get_id, turn) {
    let now_total_number = Math.abs(input_ui_list[get_id].now + turn)
    if(turn == Math.abs(turn)) {
    if(turn && now_total_number < input_ui_list[get_id].number -1){
    input_ui_list[get_id].now += turn;

    }else if(turn && now_total_number + turn >= input_ui_list[get_id].number -1){
        input_ui_list[get_id].now = 0;
    }
}else {
        if(turn && now_total_number < input_ui_list[get_id].number ){
        input_ui_list[get_id].now += turn % 10;
    
        }else if(turn && now_total_number + turn >= input_ui_list[get_id].number -1){
            input_ui_list[get_id].now = 0;
        }

}

    new_board(input_ui_list[get_id].id, input_ui_list[get_id].type, (input_ui_list[get_id].number),input_ui_list[get_id].now);

}

function new_board(now_dom_id, type, arc_number, now,){
    Symbol =['+', '-', '÷', '×']
    get_dom_id = document.getElementById('input_' + now_dom_id);
    size = get_dom_id.width;
    console.log(size)
    dom_id = get_dom_id.getContext("2d");
    dom_id.clearRect(0, 0, size, size);
    if(now == 0) {
        now_display = (now);
    }else if(String(now).slice(0,1) !== '-'){
     now_display = (input_ui_list[now_dom_id].number - now );
    } else {
        now_display = Math.abs(now);
    }
for (let now_dom_number = 0;  now_dom_number < arc_number; now_dom_number++){
    //下準備
    arc_angle = 360/arc_number;
    arc_angle_half = arc_angle/2 + 90;
    

    //大きな円を書く
    dom_id.beginPath();
    dom_id.arc(size/2,size/2, size/2.1, ((Math.PI/180)*arc_angle)*(now_dom_number + now) + ((Math.PI/180)*arc_angle_half),  ((Math.PI/180)*arc_angle)*((now_dom_number  + now)+ 1) + ((Math.PI/180)*arc_angle_half), false);//扇形の描画
    dom_id.lineWidth = 3; // 線の太さ
    dom_id.strokeStyle = '#757575'
    dom_id.lineTo(size/2,size/2);//線で囲む
    dom_id.stroke();//線の描画
    if(now_dom_number == 0){

    }
    
    //中の文字を書く予定
    dom_id.save(); //座標系セーブ
    dom_id.translate((size/2), size/2);
    dom_id.rotate(((Math.PI/180)*arc_angle)* (now_dom_number + now));
    dom_id.fillStyle = '#757575';//文字の設定(色)
    dom_id.textAlign = 'center';//文字の設定(中央揃え)

    if (type == 'number'){
        dom_id.font = (size/8) + 'px Arial';//文字の設定(大きさとフォント)
        dom_id.fillText(now_dom_number,  0, -size/3);//外枠の文字を書く
    }else if(type == 'symbol'){
        dom_id.font = (size/8) + 'px Arial';//文字の設定(大きさとフォント)
        dom_id.fillText(Symbol[now_dom_number],  0, -size/3);//外枠の文字を書く
    }
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
    if (type == 'number'){
        dom_id.font = (size/6) + 'px Arial';//文字の設定(大きさとフォント)
        dom_id.fillText(now_display,  size/2, size/1.9);//中の文字を書く
        A[now_dom_id] = now_display;
    }else if(type == 'symbol'){
        dom_id.font = (size/6) + 'px Arial';//文字の設定(大きさとフォント)
        dom_id.fillText(Symbol[now_display],  size/2, size/1.9);//中の文字を書く
        A[now_dom_id] = Symbol[now_display];
    }
}





// 回答を処理する関数
function answer() {
    if (time > 0) {
        // 回答式を生成
        let answer_formula = A.slice(0, get_Number).join('');

        // '×'と'÷'をそれぞれ'*'と'/'に置換
        answer_formula = answer_formula.replace(/×/g, '*').replace(/÷/g, '/');

        // 回答式を評価
        answer_formula = eval(answer_formula);

        // 正解か不正解かを判定し、結果を表示
        if (answer_formula == Q) {
            quiz_list.pass++;
            pass_display_JS.innerHTML = `<p id="pass_display">${quiz_list.pass}</p>`;
            Question();
        } else {
            quiz_list.fail++;
            fail_display_JS.innerHTML = `<p id="fail_display">${quiz_list.fail}</p>`;
        }
    } else {
        console.log('受付終了');
    }
}

// 無効な回答を処理する関数
function invalid() {
    quiz_list.invalid++;
    invalid_display_JS.innerHTML = `<p id="fail_display">${quiz_list.invalid}</p>`;
    Question();
}

//もう一回遊ぶ
function play(){
    location.reload();
}

function why_home(){
    let confirmResult = confirm("ゲームをやめてホーム画面に戻りますか？");
    if (confirmResult) {
        // ユーザーがOKをクリックした場合、ホーム画面に戻る
        home();
    }
}



/* <<終了画面の描画>>
* 1行目...真ん中にこのゲームでの成果を書いてる
* 2行目...ゲームが終了したことを「現在の数」、「タイム」に書いている。
*/
function fin () {
    center_dom.innerHTML = '<div id="answer_menu"><h1>結果発表ー！！</h1><ul id="A_list"><li>正解した数 ' + quiz_list.pass + '</li><li>不正解の数 ' + quiz_list.fail + '</li><li>飛ばした数 ' + quiz_list.invalid + '</li></ul><button onclick="play()">もう一回遊ぶ</button><button onclick="home()">ホーム画面</button></div>'
    time_display_JS.innerHTML = Q_display_JS.innerHTML = '<h2>---</h2>';
}

