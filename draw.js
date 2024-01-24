
const describe = {
    easy:"こんにちは"//{title: '初心者コース',overview:'<p>初心者の方はこちら！<br>基礎がここで学べます。</p>'}, 
    //nomal:{title:'中級者コース',overview:'<p>ちょっと自信のある方はこちら！<br>上級者向けコマンドが使えるよ！<br>詳しくは説明書を見てね！</p>'}, 
    //hard:{title:'上級者コース',overview:'<p>自信が有り余って他人に自慢したい方はこちら！<br>*上級者向けコマンドが使えないとできません!!<br>詳しくは説明書を御覧ください。</p>'},
    //2:{title:'上級者コース',overview:'<p>自信が有り余って他人に自慢したい方はこちら！<br>*上級者向けコマンドが使えないとできません!!<br>詳しくは説明書を御覧ください。</p>'}

};

export function test(){
    console.log("hello");
}

let dom_course;
let canvas;
let course_number = 0;
let move_now = 0;
let move_time = 2;

testlabel = ['hello!','why?','yes', 'no!']


window.onload = function () {
    dom_course = document.getElementById("course");
    dom_center_course = document.getElementById("course_arrow");

    board(dom_course, dom_center_course, 140, 4, '');
    setInterval(draw, 40); 
}

// ボタンの部分の関数
function draw() {
    if ( move_now > 360) {
        move_now = 1;
    }else{move_now++;}
    board(dom_course, dom_center_course, 140, 4, '');
}

function board(canvas, canvas_center, size, angle, labal){
        arc_angle = 360/angle;
        arc_number = 360/arc_angle;
        let now_number = Math.ceil(((move_now -(arc_angle/2)) /arc_angle));

        id = canvas.getContext("2d");
        id.clearRect(0, 0, canvas.width, canvas.height);
    for (let number = 0;  number < arc_number; number++){
        //大きな円を書く
        id.beginPath();
        id.arc(canvas.width/2,canvas.height/2, size, ((Math.PI/180)*arc_angle)*number+(Math.PI/4) + (Math.PI/180*move_now),  ((Math.PI/180)*arc_angle)*(number + 1)+(Math.PI/4) + (Math.PI/180*move_now), false);//扇形のパス(複雑なのは円を上に持っていくため)
        id.lineWidth = 3; // 線の太さ
        id.strokeStyle = '#757575'
        id.lineTo(canvas.width/2,canvas.height/2);//線で囲む
        id.stroke();//線の描画
        //中の文字を書く予定
        id.save(); //座標系セーブ
        id.translate((canvas.width/2),canvas.height/2);
        id.rotate(((Math.PI/180)*arc_angle )*number + ((Math.PI/180)*move_now));
        id.fillStyle = '#757575';//文字の設定(色)
        id.font = '15px Arial';//文字の設定(大きさとフォント)
        id.textAlign = 'center';//文字の設定(中央揃え)
        if (labal == ''){
            id.fillText(number,  0, -100);//外枠の文字を書く
        }else {
        id.fillText(labal[number],  0, -100);//外枠の文字を書く
        }
        id.restore();//座標系のセーブ復活
        id.save(); //座標系セーブ
        //console.log(number);
    }

    circle(canvas_center, size, labal, now_number);
}


function circle(canvas_center, size, labal, center_number){
    id= canvas_center.getContext("2d");

    //真ん中の指すやつ
    center_origin = -(150-(size*0.6));
    id.save(); //座標系セーブ
    id.translate((canvas_center.width/2)*0.6,(canvas_center.width/2)*0.6);
    id.scale(0.4, 0.4);
    id.beginPath();//パスの作成
    id.arc(canvas_center.width/2, canvas_center.height/2,  size, (Math.PI/10)*20, (Math.PI/10)*10, false);
    id.moveTo((canvas_center.width/2)+size, canvas_center.width/2);//そこにペン(なのかな？)を移動したよ
    id.lineTo(canvas_center.width/2, canvas_center.width/2-size); //線を書く
    id.lineTo((canvas_center.width/2)-size, canvas_center.width/2);//線を書く
    id.fillStyle = '#EFEFEF';
    id.fill();//塗りつぶす
    id.lineWidth = 3; // 線の太さ
    id.strokeStyle = '#757575'; // テキストの色を設定
    id.stroke();//線の描画
    //中に書く文字を描画する
    id.restore();//座標系のセーブ復活
    id.save(); //座標系セーブ
    id.fillStyle = '#757575'; // テキストの色を設定
    id.textAlign = "center";//横方向
    id.fillText(center_number, canvas_center.width/2, canvas_center.height/2);//ここで真ん中の数字を書いてる
}
