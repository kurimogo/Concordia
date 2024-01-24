let get_Number = 5;
let Q;
let A = ['1','+', '1'];
const minus = true;
let operator = ['+', '-', '*', '/'];
const quiz_list = {number: 0, pass: 0, fail: 0, invalid:0} 
let minutes = 0;

Q_display_JS = document.getElementById('Q_display');
time_display_JS = document.getElementById('time_display');
pass_display_JS = document.getElementById('pass_display');
fail_display_JS = document.getElementById('fail_display');
invalid_display_JS = document.getElementById('invalid_display');

let input_ui_gethtml = document.getElementById("input_ui_dom");

const input_ui_list= [];

let time = 1800;

window.onload = function(){
    countdown();
}


//カウントダウン
let count = 5;
function countdown (){
    input_ui_gethtml.innerHTML ='<canvas id=countdown width="400" height="400"></canvas>'
    let count_getdom = document.getElementById('countdown');
    let count_dom = count_getdom.getContext('2d');
    if(count > 0){
        count_dom.font = '200px Arial';
        count_dom.fillStyle = '#757575'; // テキストの色を設定
        count_dom.fillText(count, 200, 200);
        count--;
        //上のタイムの部分
        if(Math.floor(time / 60) > 0){
            minutes = Math.floor(time / 60) +'分';
        }else{
            minutes ='';
        }
        time_display_JS.innerHTML='<h2>'+ minutes + (time % 60)+ '秒' +'</h2>';

        count_time = setTimeout(countdown, 1000);
    } else {
        clearTimeout(count_time);
        input_ui_gethtml.innerHTML = ''
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
    }
}

//問題
function Question(){
    if (get_Number % 2 == 1) {
        for (let now_number = 0; now_number < get_Number; now_number++){
            if (now_number % 2 == 1){
                Q = Q + (operator[Math.floor(Math.random() * operator.length)]);
            } else {
                Q = Q + (Math.floor(Math.random() * 10));
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
                input_ui_list.push({id:'', type:'number',number: 10, start:270, now:2});
            } else {
                input_ui_list.push({type:'symbol',number: 4, start:270, now:2});
            }
            input_ui_gethtml.innerHTML += "<div class='input_ui_css'><canvas id=input_" + input_ui_number + " width='300' height='300'></canvas><button onclick='draw(" + input_ui_number + ",1)'>左回転</button><button onclick='draw(" + input_ui_number + ", -1)'>回転</button></div>";

        }
    console.log(input_ui_list);

    for (let input_ui_number = 0; input_ui_number < get_Number; input_ui_number++){
            get_minidom = document.getElementById('input_' + input_ui_number);
            minidom = get_minidom.getContext("2d");
            input_ui_list[input_ui_number].id = minidom
            new_board(input_ui_list[input_ui_number].id, input_ui_list[input_ui_number].type, 300, input_ui_list[input_ui_number].number, input_ui_list[input_ui_number].now);
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
    input_ui_list[get_id].now += turn
    new_board(input_ui_list[get_id].id, input_ui_list[get_id].type, 300, input_ui_list[get_id].number, input_ui_list[get_id].now);
}



function new_board(id, type, size, arc_number, now,){
    id.clearRect(0, 0, size, size);
    Symbol =['+', '-', '/', '*']
    let number = 0;
    let now_display = 0;
    if(now == 0){
       now_display = 0;
    }else {
       now_display = arc_number - now;
    }
for (number = 0;  number < arc_number; number++){
    //下準備
    arc_angle = 360/arc_number;
    arc_angle_half = arc_angle/2 + 90;
    
    //大きな円を書く
    id.beginPath();
    id.arc(size/2,size/2, size/2.1, ((Math.PI/180)*arc_angle)*(number + now) + ((Math.PI/180)*arc_angle_half),  ((Math.PI/180)*arc_angle)*((number + now)+ 1) + ((Math.PI/180)*arc_angle_half), false);//扇形の描画
    id.lineWidth = 3; // 線の太さ
    id.strokeStyle = '#757575'
    id.lineTo(size/2,size/2);//線で囲む
    id.stroke();//線の描画
    //中の文字を書く予定
    id.save(); //座標系セーブ
    id.translate((size/2), size/2);
    id.rotate(((Math.PI/180)*arc_angle)* (number + now));
    id.fillStyle = '#757575';//文字の設定(色)
    id.textAlign = 'center';//文字の設定(中央揃え)

    if (type == 'number'){
        id.font = '25px Arial';//文字の設定(大きさとフォント)
        id.fillText(number,  0, -100);//外枠の文字を書く
    }else if(type == 'symbol'){
        id.font = '40px Arial';//文字の設定(大きさとフォント)
        id.fillText(Symbol[number],  0, -100);//外枠の文字を書く

    }
    id.restore();//座標系のセーブ復活
    id.save(); //座標系セーブ
}

    //真ん中の円
    id.save(); //座標系セーブ
    id.translate((size/2)*0.6,(size/2)*0.6);
    id.scale(0.4, 0.4);
    id.beginPath();//パスの作成
    id.arc(size/2, size/2,  size/2, (Math.PI/10)*20, (Math.PI/10)*10, false);
    id.moveTo((size/2)+ size/2, size/2);//そこにペン(なのかな？)を移動したよ
    id.lineTo(size/2, size/2 - size/2); //線を書く
    id.lineTo((size/2)- size/2, size/2);//線を書く
    id.fillStyle = '#EFEFEF';
    id.fill();//塗りつぶす
    id.lineWidth = 3; // 線の太さ
    id.strokeStyle = '#757575'; // 線の色
    id.stroke();//線の描画
    //中に書く文字を描画する
    id.restore();//座標系のセーブ復活
    id.save(); //座標系セーブ
    id.fillStyle = '#757575'; // テキストの色を設定
    id.textAlign = "center";//横方向
    if (type == 'number'){
        id.font = '25px Arial';//文字の設定(大きさとフォント)
        id.fillText(now_display,  size/2, size/1.9);//外枠の文字を書く
    }else if(type == 'symbol'){
        id.font = '40px Arial';//文字の設定(大きさとフォント)
        id.fillText(Symbol[now_display],  size/2, size/1.9);//外枠の文字を書く

    }
}


//回答システム
function answer(){
    if(time > 0){
    let answer_formula = ''; // 初期化
    for (let process_answer = 0; process_answer < get_Number; process_answer++){
        answer_formula = (answer_formula + A[process_answer]);
    }
   // answer_formula = eval(answer_formula);

    if(answer_formula == Q){
        quiz_list.pass++;
        pass_display_JS.innerHTML = '<p id="pass_display">'+ quiz_list.pass +'</p>'
        Question();
    }else {
        quiz_list.fail++;
        fail_display_JS.innerHTML = '<p id="fail_display">' + quiz_list.fail +'</p>'
    }
    console.log(quiz_list);

}else {
    console.log('受付終了')
}
}

function invalid(){
    quiz_list.invalid++;
    invalid_display_JS.innerHTML = '<p id="fail_display">' + quiz_list.invalid +'</p>'
    Question();
}
