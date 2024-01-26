let get_Number = 3;
let Q;
let A = [];
const minus = true;
let operator = ['+', '-', '*', '/'];
const quiz_list = {number: 0, pass: 0, fail: 0, invalid:0} 
let minutes = 0;

Q_display_JS = document.getElementById('Q_display');
time_display_JS = document.getElementById('time_display');
pass_display_JS = document.getElementById('pass_display');
fail_display_JS = document.getElementById('fail_display');
invalid_display_JS = document.getElementById('invalid_display');
let center_dom = document.getElementById('center');
let input_ui_gethtml
const input_ui_list= [];

let time = 120;

window.onload = function(){
    countdown();

}
//特定のキーが押されたときの反応
let keysPressed = {};
const now_down = {Left:'',down_1:'',2:'',3:'',4:'',5:'',6:'',7:''}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'Enter':
            answer();
            break;
        case ' ':
            invalid();
            break;
        case 'ArrowLeft':
        now_down.Left = true; 
        break;
        case '1':
        now_down.down_1 = true;
        break;
    }
    if(now_down.Left == true && now_down.down_1 == true){
        console.log('同時に押されてるぞ！')
    }
            });

document.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'ArrowLeft':
        now_down.Left = false; 
        break;
        case '1':
        now_down.down_1 = false;
        break;
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
        fin();
    }
}



//問題
function Question(){
    Q = '';
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
    if (!Number.isInteger(Q) || (Q.toString().includes('-')&& minus)) {
        Q = 0;
        Question();    
    }
    Q_display_JS.innerHTML='<h2>'+ Q +'</h2>';
}


//最初の描画システム
function Allinput_ui () {
        for (let input_ui_number = 0; input_ui_number < get_Number; input_ui_number++){
            if (input_ui_number % 2 !== 1) {
                input_ui_list.push({id:'', type:'number',number: 10, start:270, now:0});
            } else {
                input_ui_list.push({type:'symbol',number: 4, start:270, now:0});
            }
            input_ui_gethtml.innerHTML += "<div class='input_ui_css'><canvas id=input_" + input_ui_number + " width='250' height='250'></canvas><button onclick='draw(" + input_ui_number + ",1)'>左回転</button><button onclick='draw(" + input_ui_number + ", -1)'>右回転</button></div>";

        }
    console.log(input_ui_list);

    for (let input_ui_number = 0; input_ui_number < get_Number; input_ui_number++){
            input_ui_list[input_ui_number].id = input_ui_number;
            new_board(input_ui_list[input_ui_number].id, input_ui_list[input_ui_number].type, 250, input_ui_list[input_ui_number].number, input_ui_list[input_ui_number].now);
    }
    }


let dom_course;
let canvas;
let course_number = 0;
let move_now = 0;
let move_time = 2;

testlabel = ['hello!','why?','yes', 'no!']



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

    new_board(input_ui_list[get_id].id, input_ui_list[get_id].type, 250, (input_ui_list[get_id].number),input_ui_list[get_id].now);

}



function new_board(now_dom_id, type, size, arc_number, now,){
    Symbol =['+', '-', '÷', '×']
    get_dom_id = document.getElementById('input_' + now_dom_id);
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

    //dom_id.arc(size/2,size/2, size/2.1, ((Math.PI/180)*arc_angle)*(now_dom_number + now) + ((Math.PI/180)*arc_angle_half),  ((Math.PI/180)*arc_angle)*((now_dom_number  + now)+ 1) + ((Math.PI/180)*arc_angle_half), false);//扇形の描画
    //dom_id.

    //中の文字を書く予定
    dom_id.save(); //座標系セーブ
    dom_id.translate((size/2), size/2);
    dom_id.rotate(((Math.PI/180)*arc_angle)* (now_dom_number + now));
    dom_id.fillStyle = '#757575';//文字の設定(色)
    dom_id.textAlign = 'center';//文字の設定(中央揃え)

    if (type == 'number'){
        dom_id.font = '25px Arial';//文字の設定(大きさとフォント)
        dom_id.fillText(now_dom_number,  0, -size/3);//外枠の文字を書く
    }else if(type == 'symbol'){
        dom_id.font = '40px Arial';//文字の設定(大きさとフォント)
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
        dom_id.font = '25px Arial';//文字の設定(大きさとフォント)
        dom_id.fillText(now_display,  size/2, size/1.9);//中の文字を書く
        A[now_dom_id] = now_display;
    }else if(type == 'symbol'){
        dom_id.font = '40px Arial';//文字の設定(大きさとフォント)
        dom_id.fillText(Symbol[now_display],  size/2, size/1.9);//中の文字を書く
        A[now_dom_id] = Symbol[now_display];
    }
}


//回答システム
function answer(){
    if(time > 0){
    let answer_formula = ''; // 初期化
    for (let process_answer = 0; process_answer < get_Number; process_answer++){
        answer_formula = (answer_formula + A[process_answer]);
    }
    console.log(answer_formula);
    answer_formula = answer_formula.replace('×', '*')
    
   answer_formula = eval(answer_formula);

    if(answer_formula == Q){
        quiz_list.pass++;
        pass_display_JS.innerHTML = '<p id="pass_display">'+ quiz_list.pass +'</p>'
        Question();
    }else {
        quiz_list.fail++;
        fail_display_JS.innerHTML = '<p id="fail_display">' + quiz_list.fail +'</p>'
    }

}else {
    console.log('受付終了')
}
}

function invalid(){
    quiz_list.invalid++;
    invalid_display_JS.innerHTML = '<p id="fail_display">' + quiz_list.invalid +'</p>'
    Question();
}


function fin () {
    center_dom.innerHTML = '<div><h1>結果発表ー！！</h1><h2>正解した数 ' + quiz_list.pass + '</h2></div>'
    time_display_JS.innerHTML = '<h2>終了</h2>'
    Q_display_JS.innerHTML = '<h2>終了</h2>'
}