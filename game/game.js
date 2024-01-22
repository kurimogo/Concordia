let get_Number = 7;
let Q;
let A;
const minus = true;
let operator = ['+', '-', '*', '/'];

let time = 121;

window.onload = function(){
    game_time();
    Question();
}

Q_display_JS = document.getElementById('Q_display');
time_display_JS = document.getElementById('time_display');


function game_time(){
    time--;
    time_display_JS.innerHTML='<h1>'+ time +'</h1>';
    let clock = setTimeout(game_time, 1000);
    if (time <= 0 ){
        clearTimeout(clock);
    }
}


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
    

    console.log(Q_display_JS)
    Q_display_JS.innerHTML='<h1>'+ Q +'</h1>';

}


