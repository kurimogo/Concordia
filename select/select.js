


let dom_course;
let context_course;

window.onload = function() {
    dom_course = document.getElementById("course");
    if (dom_course) {
        context_course = dom_course.getContext("2d");
        new_board();
    } else {
        console.error("例外エラーが発生しました。");
    }
}

function new_board(){
    for (let course = 0; course <=3; course++){
        //大きな円を書く
        context_course.beginPath();
        context_course.arc(150, 150, 140, ((Math.PI/2)*course)+(Math.PI/4),  ((Math.PI/2)*(course + 1)+(Math.PI/4)), false);//扇形のパス(複雑なのは円を上に持っていくため)
        context_course.lineWidth = 3; // 線の太さ
        context_course.strokeStyle = '#757575'
        context_course.lineTo(150,150);//線で囲む
        context_course.stroke();//線の描画
        //中の文字を書く予定
        context_course.save(); //座標系セーブ
        context_course.translate(150, 150);
        context_course.rotate((Math.PI / 2) * course);
        context_course.fillStyle = '#757575';
        context_course.font = '30px Arial';
        context_course.textAlign = 'center';
        context_course.fillText(course,  0, -100);
        context_course.restore();//座標系のセーブ復活
        context_course.save(); //座標系セーブ
        //真ん中の指すやつ
        context_course.beginPath();//パスの作成
        context_course.arc(150, 150, 60, (Math.PI/10)*20, (Math.PI/10)*10, false);
        context_course.moveTo(90, 150);//そこにペン(なのかな？)を移動したよ
        context_course.lineTo(150, 90); //線を書く
        context_course.lineTo(210, 150);//線を書く
        context_course.fillStyle = '#EFEFEF';
        context_course.fill();//塗りつぶす
        context_course.lineWidth = 3; // 線の太さ
        context_course.stroke();//線の描画
        //中に書く文字を描画する
        context_course.fillStyle = '#757575'; // テキストの色を設定
        context_course.font = '30px Arial'; // フォントを設定
        context_course.textAlign = "center";//横方向
        context_course.fillText('hello', 150, 150);//ここで真ん中の数字を書いてる
    }
}
