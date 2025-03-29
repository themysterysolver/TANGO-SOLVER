document.getElementById("pop").addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: solveIt
    });
});

async function solveIt() {
    //let iframe_coll=document.getElementsByClassName("game-launch-page__iframe w-full")[0];
    //let iframe=iframe_coll.contentDocument||iframe_coll.contentWindow?.document;

    const content=document.getElementsByClassName("lotka-cell");
    const size=Math.sqrt(content.length);

    console.log(content);
    let num_str=new Map();
    for(let idx=0;idx<content.length;idx++){
        if(!content[idx].classList.contains("lokta-cell--locked")){
            await clickIndex(idx);
            let cell=document.querySelector(`[data-cell-idx="${idx}"]`)
            //console.log("CHECK-1",cell);
            let label=cell.getElementsByClassName("lotka-cell-content")[0].querySelector("svg").getAttribute("aria-label");
            num_str.set(1,label);

            await clickIndex(idx);
            cell=document.querySelector(`[data-cell-idx="${idx}"]`);
            //console.log("CHECK-2:",cell);
            let nlabel=cell.getElementsByClassName("lotka-cell-content")[0].querySelector("svg").getAttribute("aria-label");
            num_str.set(2,nlabel);

            clickIndex(idx);
            break;
        }
    }
    console.log(num_str);

    function delay(ms){
        return new Promise(resolve=>setTimeout(resolve,ms));
    }
    function clickIndex(index){
        return new Promise(resolve=>{
            let tile=document.querySelector(`[data-cell-idx="${index}"]`);
            if(tile){
                //console.log(`Tile clicked at ${index}`);
                async function clickElement(element){
                    let down=new MouseEvent("mousedown",{bubbles:true,cancelable:true});
                    let up=new MouseEvent("mouseup",{bubbles:true,cancelable:true});
                    let click=new MouseEvent("click",{bubbles:true,cancelable:true});
                    element.dispatchEvent(down);
                    element.dispatchEvent(up);
                    element.dispatchEvent(click);
                    await delay(5);
                    resolve();
                }
                clickElement(tile);
            } 
            else{
                resolve();
            }
        });
    }
    //clickIndex(1);

    let str_num=new Map();
    num_str.forEach((val,key)=>{
        str_num.set(val,key);
    });
    console.log(str_num);
    const locked=Array.from(content).map((val,idx)=>val.classList.contains("lotka-cell--locked")?idx:0).filter(idx=>idx!==0);
    let board=Array.from(content).map((val,idx)=>val.classList.contains("lotka-cell--locked")?
        str_num.get(val.getElementsByClassName("lotka-cell-content")[0].querySelector("svg").getAttribute("aria-label")):0);
    //console.log("BOARD",board);
    //console.log("LOCKED",locked);

    let equal=new Map();
    let cross=new Map();

    const elements=document.querySelectorAll(".lotka-cell, .lotka-cell-edge--right, .lotka-cell-edge--down");
    console.log(elements);

    let last_idx=null;
    elements.forEach(el=>{
        if(el.classList.contains("lotka-cell")){
            last_idx=parseInt(el.getAttribute("data-cell-idx"));
        }
        else if(el.classList.contains("lotka-cell-edge--right") && last_idx!==null){
            let choice=el.querySelector("svg").getAttribute("aria-label")==="Equal"?equal:cross;
            if(!choice.has(last_idx+1)){
                choice.set(last_idx+1,[]);
            }
            choice.get(last_idx+1).push(last_idx);
        }
        else if(el.classList.contains("lotka-cell-edge--down") && last_idx!==null){
            let choice=el.querySelector("svg").getAttribute("aria-label")==="Equal"?equal:cross;
            if(!choice.has(last_idx+size)){
                choice.set(last_idx+size,[]);
            }
            choice.get(last_idx+size).push(last_idx);
        }
    });
    console.log("EQUAL:",equal);
    console.log("CROSS",cross);
    console.log("BOARD",board);
    console.log("LOCKED",locked);
    console.log("NUM TO STRING",num_str);
    console.log("STR TO NUM",str_num);
    console.log("SIZE",size);
    console.log("---------------------------CHECKPOINT-1(I/P)-------------------------------")

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

    let populate=(()=>{
        for(i=0;i<result.length;i++){
            if(!locked.includes(i)){
                while(result[i]!==0){
                    clickIndex(i);
                    delay(100);
                    result[i]-=1
                }
            }
        }
    })
    populate();
}

