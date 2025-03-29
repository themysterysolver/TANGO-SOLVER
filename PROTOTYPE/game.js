let board = [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 2, 0, 0, 0,
    0, 0, 0, 1, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
];

let equal = new Map([
    [6, [0]],
    [9, [8]],
    [13, [12]],
    [23, [22]],
    [34, [28]],
    [33, [32]]
]);

let cross = new Map([
    [7, [1]],
    [3, [2]],
    [17, [16]],
    [19, [18]],
    [27, [26]],
    [35, [29]]
]);

let num_str = new Map([
    [1, "Sun"],
    [2, "Moon"]
]);

let str_num = new Map([
    ["Sun", 1],
    ["Moon", 2]
]);
const locked=[14,21]
let size = 6;

let display=(board)=>{
    console.log(board.map((val, idx) => (idx % size === 0 ? "\n" : "") + val).join(", "));
    console.log("-----------------------");
}

console.log("EQUAL:",equal);
console.log("CROSS",cross);
console.log("BOARD",board);
console.log("LOCKED",locked);
console.log("NUM TO STRING",num_str);
console.log("STR TO NUM",str_num);
console.log("SIZE",size);

//------------------------------------------------INPUT--------------------
let result=[];
let row_freq=new Map();
let col_freq=new Map();

let get_row=((idx)=>{
    let arr=[];
    //let r_idx=[];
    let r=Math.floor(idx/6);
    for(let i=0;i<size;i++){
        arr.push(board[r*size+i]);
        //r_idx.push(r*size+i);
    }
    //console.log(r_idx);
    //console.log('------------R-----')
    return arr;
});
let get_col=((idx)=>{
    let arr=[];
    //let c_idx=[];
    let c=idx%size;
    for(let i=0;i<size;i++){
        arr.push(board[c+i*size]);
        //c_idx.push(c+i*size);
    }
    //console.log(c_idx);
    //console.log('------------C-----')
    return arr;
})

function is_Safe(board,idx){
    
}


function backtrack(idx){
    if(idx===size*size){
        result=structuredClone(board);
        console.log("Hey found it!");
        return true
    }
    if(locked.includes(idx)){
        return;
    }
    for(let i=1;i<3;i++){
        board[idx]=i
        if(is_Safe(board,idx)){
            backtrack(idx+1);
        }
        board[idx]=0
    }
}

//-------------------CALLING-------------------
display(board);
//console.log(backtrack(0))
//console.log(get_row(12),get_row(11),get_row(14),get_row(21));
//console.log(get_col(12),get_col(11),get_col(14),get_col(21));
