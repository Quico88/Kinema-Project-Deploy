

    const openButton = document.querySelector(".menu")
    const menu = document.querySelector(".list")
    const closeMenu = document.querySelector(".close")

export function openAndCloseMenu(){
    console.log(menu)
    openButton?.addEventListener("click", ()=>{
        menu.classList.add("list--show");
    });
    closeMenu?.addEventListener("click", ()=>{
        menu.classList.remove("list--show");
    })
}