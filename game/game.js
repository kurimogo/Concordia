let get_Number = 7;
let Q = '';
let A;
let operator = ['+', '-', '*', '/'];



window.onload = function(){
    Question();
}

function Question(){
    if (get_Number % 2 == 1) {
        for (let now_number = 0; now_number < get_Number; now_number++){
            if (now_number % 2 == 1){
                Q = Q + (operator[Math.floor(Math.random() * operator.length)]);
            } else if(Q.slice(-1) == '/'){
               Q = Q + (Q.charAt(Q.length -2));
            } else {
                Q = Q + (Math.floor(Math.random() * 10));
            }
        }
    } else {
        get_Number = get_Number - 1;
        Question();
    }
    Q = eval(Q);
    //if(Q.slice(1) == '-') {
    //    Question();
    //}

    console.log(Q)
}


