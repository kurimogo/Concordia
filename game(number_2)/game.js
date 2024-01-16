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
    let old_right = 0; //一個前の設定
    let now_right = 0; // 現在の回転した位置
    let select_right = 0;//現在の数値
    let future_right = 0; //　設定したい数値
    const start_right = 0;//変数リセット(念のため)

    const canvas_right = document.getElementById("right");//右側にこの回るやつを埋め込む場所を探してくる
    const context_right = canvas_right.getContext("2d");//2次元描画

//歯車(数字)
window.onload = function() {


    if (canvas_right.getContext) {

      //movie_right();

      board();
       //最初に背景色となる土台を作成します
       //context_right.beginPath();//パスの作成
       //context_right.arc(150, 150, 140, (Math.PI/5)*1, (Math.PI/5)*9, false);//黒い円

       
       

         //context_right.fillStyle = '#ff0000';
         //context_right.fill();//塗りつぶす
      }
    }

  

  //回転する板を作る

  function board(){
    //大きな円を書くプログラム
    for(var right = 0; right <= 9; right++){

      const rotate_right = right + now_right;
      const select_right = right + now_right;


 

      //円を作るプログラム
      context_right.beginPath();//パスの作成
      context_right.arc(150, 150, 140, ((Math.PI/5)*rotate_right),  ((Math.PI/5)*(rotate_right + 1)), false);//扇形のパス(複雑なのは円を上に持っていくため)
      
      
      /* 
      <上の文章が複雑なので記録しておきます>
      =========================================================================
      　　(-Math.PI/2 + -Math.PI/10)と書いてある最初の部分は
      　　90度左に回転し、そこからさらに18度曲げるというコードです。
      　　最初のコードは円の開始位置を決めています。
      ==========================================================================
      */
      context_right.lineWidth = 3; // 線の太さ
      context_right.lineTo(150,150);//線で囲む
      context_right.closePath();//線で囲む作業を完了させる
      context_right.stroke();//線の描画


     context_right.save(); //座標系セーブ

     context_right.translate(150, 150);
     context_right.rotate((Math.PI / 5) * rotate_right);

      //円の中の文字を作るプログラム
      context_right.fillStyle = '#000';
      context_right.font = '30px Arial';
      context_right.textAlign = 'center';
      context_right.textBaseline = 'middle';
      context_right.fillText(right,  0, -115);

      context_right.restore();//座標系のセーブ復活


      //真ん中の図形を書くプログラム
 
         //丸い枠を作る
          context_right.beginPath();//パスの作成
          context_right.arc(150, 150, 60, (Math.PI/10)*20, (Math.PI/10)*10, false);//中の円
          context_right.fillStyle = '#ffffff';
          context_right.fill();//塗りつぶす
          context_right.lineWidth = 3; // 線の太さ
          context_right.stroke();//線の描画

           context_right.beginPath();//お絵かきをするよーっていう呪文
           context_right.moveTo(90, 150);//そこにペン(なのかな？)を移動したよ
           context_right.lineTo(150, 90);   
           context_right.lineTo(210, 150);
 
           context_right.fillStyle = '#ffffff';
           context_right.fill();//塗りつぶす
           context_right.lineWidth = 3; // 線の太さ
           context_right.stroke();//線の描画
 
           context_right.restore();//座標系のセーブ復活
           context_right.save(); //座標系セーブ

          //中に書く文字を描画する
          context_right.fillStyle = '#000'; // テキストの色を設定
          context_right.font = '50px Arial'; // フォントを設定
          context_right.textAlign = "center";
          context_right.textBaseline = "middle"; // 縦方向の揃え
          context_right.fillText(Math.floor(9-(select_right % 10)), 150, 150);//ここで真ん中の数字を書いてる
          



    }
  }

  //右回転をする(右側の歯車を)

   function movie_right(){
   now_right = now_right+1;
   context_right.clearRect(0,0, 300 ,300)
    board();//繰り返し呼び出す
    console.log();
   }


//歯車(記号)