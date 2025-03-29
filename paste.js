let iframe_coll=document.getElementsByClassName("game-launch-page__iframe w-full")[0];
    let iframe=iframe_coll.contentDocument||iframe_coll.contentWindow?.document;

    const content=iframe.getElementsByClassName("lotka-cell");
    const size=Math.sqrt(content.length);

    console.log(content);
    let num_str=new Map();
    for(let idx=0;idx<content.length;idx++){
        if(!content[idx].classList.contains("lokta-cell--locked")){
            await clickIndex(idx);
            let cell=iframe.querySelector(`[data-cell-idx="${idx}"]`)
            //console.log("CHECK-1",cell);
            let label=cell.getElementsByClassName("lotka-cell-content")[0].querySelector("svg").getAttribute("aria-label");
            num_str.set(1,label);

            await clickIndex(idx);
            cell=iframe.querySelector(`[data-cell-idx="${idx}"]`);
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
            let tile=iframe.querySelector(`[data-cell-idx="${index}"]`);
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
    let str_num=new Map();
    num_str.forEach((val,key)=>{
        str_num.set(val,key);
    });
    console.log(str_num);

    const locked=Array.from(content).map((val,idx)=>val.classList.contains("lotka-cell--locked")?idx:0).filter(idx=>idx!==0);
    let board=Array.from(content).map((val,idx)=>val.classList.contains("lotka-cell--locked")?
        str_num.get(val.getElementsByClassName("lotka-cell-content")[0].querySelector("svg").getAttribute("aria-label")):0);
    console.log("BOARD",board);
    console.log("LOCKED",locked);