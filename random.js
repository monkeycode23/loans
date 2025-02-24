

insert(getRandomColor(),getRandomText())    



function getRandomColor(){
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}   

// /*  */
function getRandomText(){   
    const texts = [
        "¡Hola, mundo!",
        "Bienvenido a la página aleatoria.",
        "JavaScript es genial.",
        "¡Diviértete programando!",
        "Este es un texto aleatorio."
    ];
    return texts[Math.floor(Math.random() * texts.length)];
}



function insert(color,text){
        const client = new Client()
    client.insert({color,text})
}   



