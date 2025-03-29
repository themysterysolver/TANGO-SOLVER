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



console.log("EQUAL:",equal);
console.log("CROSS",cross);
console.log("BOARD",board);
console.log("LOCKED",locked);
console.log("NUM TO STRING",num_str);
console.log("STR TO NUM",str_num);
console.log("SIZE",size);

//------------------------------------------------INPUT--------------------
let display=(board)=>{
    console.log(board.map((val, idx) => (idx % size === 0 ? "\n" : "") + val).join(", "));
    console.log("-----------------------");
}

let result=[];

let get_row=((idx)=>{
    let arr=[];
    let r=Math.floor(idx/6);
    for(let i=0;i<size;i++){
        arr.push(board[r*size+i]);
    }
    return arr;
});
let get_col=((idx)=>{
    let arr=[];
    let c=idx%size;
    for(let i=0;i<size;i++){
        arr.push(board[c+i*size]);
    }
    return arr;
})
function check_count(mat){
    let count1=0;
    let count2=0;
    mat.forEach(el =>{
        if(el===1){
            count1++;
        }else if(el==2){
            count2++;
        }
    });
    for(let i=1;i<mat.length-1;i++){
        if(mat[i]!==0 && mat[i]===mat[i-1] && mat[i]===mat[i+1]){
            return false;
        }
    }
    return count1<=3 && count2<=3;
}
function is_Safe(board,idx){
    let row=get_row(idx);
    let col=get_col(idx);
    if(!(check_count(row) && check_count(col))){
        return false;
    }
    if(equal.has(idx)){
        let na=equal.get(idx);
        for(let i=0;i<na.length;i++){
            if(board[na[i]]!==0 && board[na[i]]!==board[idx]) {
                return false;
            }
        }
    }
    if(cross.has(idx)){
        let na=cross.get(idx);
        for(let i=0;i<na.length;i++){
            if(board[na[i]]!==0 && board[na[i]]===board[idx]) {
                return false;
            }
        }
    }
    return true;
}


function backtrack(idx){
    display(board);
    if(idx===size*size){
        result=structuredClone(board);
        console.log("Hey found it!");
        return true
    }
    if(locked.includes(idx)){
        return backtrack(idx+1);
    }
    for(let i=1;i<3;i++){
        board[idx]=i
        if(is_Safe(board,idx)){
            if(backtrack(idx+1))return true;
        }
        board[idx]=0
    }
    return false;
}

//-------------------CALLING-------------------
display(board);
console.log(backtrack(0))
display(result);
//console.log(get_row(12),get_row(11),get_row(14),get_row(21));
//console.log(get_col(12),get_col(11),get_col(14),get_col(21));
