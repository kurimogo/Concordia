/*
  ================================================================================
  <害虫駆除の業者の方へ>
  自分が確認した害虫は駆除したけど、確認していないやつも潜んでいる可能性があるのでお願いします。
  そこからさらに増える可能性があるので...しかもあると動かないからね。
  虫の名前がきになるって？
  確か蛾だ。英語ではこういう害虫のことを「bug」というらしい。
  なんでいるかって？それは僕も知らない。なんか勝手に増えるんだ。

  このプログラムが一番増えやすいかもしれない。
  ================================================================================
  <ここの説明>
  ここでは歯車の設定や合否を判断する場所だ
  最近テストコードというのを覚えたから頑張って実装したかも

  キャンバスで図形を書いていろいろして完成している
  え？画像のほうが楽だと思うって？僕もそう思うんだ。でもね上手くかけなかったからこうしているんだ
  ================================================================================
*/
    //グローバル変数

    circle = 3;//円盤の個数(記号を含む)
    cicele_list = [];
    const cicele_canvas = document.getElementById("game");//右側にこの回るやつを埋め込む場所を探してくる

  /*  for (var circle_now = 1 ; circle_now  > circle ; circle_now++) {
      if (circle_now % 2 !== 0){
        cicele_canvas.appendChild(node)

      } else {

      }
      
    }
*/


    let old_right = 0; //一個前の設定
    let now_right = 0; // 現在の回転した位置
    let select_right = 0;//現在の数値
    let future_right = 0; //　設定したい数値
    const start_right = 0;//変数リセット(念のため)

  
    //const canvas = canvas_right.getContext("2d");//2次元描画



//歯車(数字)
window.onload = function() {


    if (canvas_right.getContext) {

      //move_right();

      board();
       //最初に背景色となる土台を作成します
       //canvas.beginPath();//パスの作成
       //canvas.arc(150, 150, 140, (Math.PI/5)*1, (Math.PI/5)*9, false);//黒い円

       
       

         //canvas.fillStyle = '#ff0000';
         //canvas.fill();//塗りつぶす
      }
    }

  

  //回転する板を作る

  function board(){
    //大きな円を書くプログラム
    for(var right = 0; right <= 9; right++){

      const course = right + now_right;
      const select_right = right + now_right;


 

      //円を作るプログラム
      canvas.beginPath();//パスの作成
      canvas.arc(150, 150, 140, ((Math.PI/5)*course),  ((Math.PI/5)*(course + 1)), false);//扇形のパス(複雑なのは円を上に持っていくため)
      
      
      /* 
      <上の文章が複雑なので記録しておきます>
      =========================================================================
      　　(-Math.PI/2 + -Math.PI/10)と書いてある最初の部分は
      　　90度左に回転し、そこからさらに18度曲げるというコードです。
      　　最初のコードは円の開始位置を決めています。
      ==========================================================================
      */
      canvas.lineWidth = 3; // 線の太さ
      canvas.lineTo(150,150);//線で囲む
      canvas.closePath();//線で囲む作業を完了させる
      canvas.stroke();//線の描画


     canvas.save(); //座標系セーブ

     canvas.translate(150, 150);
     canvas.rotate((Math.PI / 5) * course);

      //円の中の文字を作るプログラム
      canvas.fillStyle = '#000';
      canvas.font = '30px Arial';
      canvas.textAlign = 'center';
      canvas.textBaseline = 'middle';
      canvas.fillText(right,  0, -115);

      canvas.restore();//座標系のセーブ復活


      //真ん中の図形を書くプログラム
 
         //丸い枠を作る
          canvas.beginPath();//パスの作成
          canvas.arc(150, 150, 60, (Math.PI/10)*20, (Math.PI/10)*10, false);//中の円
          canvas.fillStyle = '#ffffff';
          canvas.fill();//塗りつぶす
          canvas.lineWidth = 3; // 線の太さ
          canvas.stroke();//線の描画

           canvas.beginPath();//お絵かきをするよーっていう呪文
           canvas.moveTo(90, 150);//そこにペン(なのかな？)を移動したよ
           canvas.lineTo(150, 90);   
           canvas.lineTo(210, 150);
 
           canvas.fillStyle = '#ffffff';
           canvas.fill();//塗りつぶす
           canvas.lineWidth = 3; // 線の太さ
           canvas.stroke();//線の描画
 
           canvas.restore();//座標系のセーブ復活
           canvas.save(); //座標系セーブ

          //中に書く文字を描画する
          canvas.fillStyle = '#000'; // テキストの色を設定
          canvas.font = '50px Arial'; // フォントを設定
          canvas.textAlign = "center";
          canvas.textBaseline = "middle"; // 縦方向の揃え
          canvas.fillText(Math.floor(9-(select_right % 10)), 150, 150);//ここで真ん中の数字を書いてる
          



    }
  }

  //右回転をする(右側の歯車を)

   functionmove_right(){
   now_right = now_right+1;
   canvas.clearRect(0,0, 300 ,300)
    board();//繰り返し呼び出す
    console.log();
   }


//歯車(記号)