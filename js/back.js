var today = new Date();
var hour = today.getHours();

if(hour < 6 || hour >= 19){
    document.getElementById("background").style.backgroundImage = "url(img/backgrounds/night.jpg)";
}else if(hour == 6 || hour == 7 || hour == 8 || hour == 17 || hour == 18){
    document.getElementById("background").style.backgroundImage = "url(img/backgrounds/dawn.jpg)";
}else{
    document.getElementById("background").style.backgroundImage = "url(img/backgrounds/stardewbackground.png)";
}