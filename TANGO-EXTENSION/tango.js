document.getElementById("pop").addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: solveIt
    });
});

function solveIt() {
    let iframe_coll=document.getElementsByClassName("game-launch-page__iframe w-full")[0];
    let iframe=iframe_coll.contentDocument||iframe_coll.contentWindow?.document;

    const content=iframe.getElementsByClassName("lotka-cell");
    const size=Math.sqrt(content.length)

    console.log(content);

}
function clickIndex(index){
    let tile=iframe.querySelector(`[data-cell-idx="${index}"]`);
    if(tile){
        console.log(tile);
        function clickElement(element){
            let down=new MouseEvent("mousedown",{bubbles:true,cancelable:true});
            let up=new MouseEvent("mouseup",{bubbles:true,cancelable:true});
            let click=new MouseEvent("click",{bubbles:true,cancelable:true});
            element.dispatchEvent(down);
            element.dispatchEvent(up);
            element.dispatchEvent(click);
        }
        clickElement(tile);
    }
}
clickIndex(1);
