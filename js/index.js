const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const exchangeIcon = document.querySelector(".exchange");
const selectTag = document.querySelectorAll("select");
const icons = document.querySelectorAll(".row i");
const translateBtn = document.querySelector("button");



// adiciona paises com os seus respectivos codigos no select

selectTag.forEach((tag, id) => {
    for(let country_code in countries){
        let selected = id == 0 ? country_code == "pt-PT" ? "selected" : "" : country_code ==
        "en-GB" ? "selected" : "";
        let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});




//função para a troca dos idiomas quando o icone de mudança for clicado
exchangeIcon.addEventListener("click", ()=>{
    let tempText = fromText.value,
        tempLang = selectTag[0].value;
    

    fromText.value = toText.value;
    toText.value = tempText;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLang;

})



fromText.addEventListener("keyup", ()=>{
    if(!fromText.value){
        toText.value = "";
    }
});



//eventos no botão de traduzir
translateBtn.addEventListener("click", ()=>{
    let text = fromText.value.trim(),
        translateFrom = selectTag[0].value,
        translateTo = selectTag[1].value;
    if(!text) return;//não faz nada quando o input está vazio
    toText.setAttribute("placeholder","Traduzindo...");
    
    
    //adicionando api

    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`

    fetch(apiUrl).then(res => res.json()).then(data =>{
        toText.value = data.responseData.translatedText;
        data.matches.forEach(data =>{
            if(data.id === 0){
                toText.value = data.translation;
            }
        });

        toText.setAttribute("placeholder", "Tradução");

    });
});



icons.forEach(icon => {
    icon.addEventListener("click", ({target})=>{
        if(!fromText.value || !toText.value) return;
        if(target.classList.contains("fa-copy")){
            if(target.id == "from"){
                navigator.clipboard.writeText(fromText.value);
            }else{
                navigator.clipboard.writeText(toText.value);
            }
        }
    })
})
