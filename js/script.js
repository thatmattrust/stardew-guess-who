const characters = [
    { name: "Abigail", image: "img/villagers/Abigail.png" },
    { name: "Alex", image: "img/villagers/Alex.png" },
    { name: "Caroline", image: "img/villagers/Caroline.png" },
    { name: "Clint", image: "img/villagers/Clint.png" },
    { name: "Demetrius", image: "img/villagers/Demetrius.png" },
    { name: "Dwarf", image: "img/villagers/Dwarf.png" },
    { name: "Elliott", image: "img/villagers/Elliott.png" },
    { name: "Emily", image: "img/villagers/Emily.png" },
    { name: "Evelyn", image: "img/villagers/Evelyn.png" },
    { name: "George", image: "img/villagers/George.png" },
    { name: "Governor", image: "img/villagers/Governor.png" },
    { name: "Grandpa", image: "img/villagers/Grandpa.png" },
    { name: "Gunther", image: "img/villagers/Gunther.png" },
    { name: "Gus", image: "img/villagers/Gus.png" },
    { name: "Henchman", image: "img/villagers/Henchman.png" },
    { name: "Haley", image: "img/villagers/Haley.png" },
    { name: "Harvey", image: "img/villagers/Harvey.png" },
    { name: "Jas", image: "img/villagers/Jas.png" },
    { name: "Jodi", image: "img/villagers/Jodi.png" },
    { name: "Kent", image: "img/villagers/Kent.png" },
    { name: "Krobus", image: "img/villagers/Krobus.png" },
    { name: "Leah", image: "img/villagers/Leah.png" },
    { name: "Leo", image: "img/villagers/Leo.png" },
    { name: "Lewis", image: "img/villagers/Lewis.png" },
    { name: "Linus", image: "img/villagers/Linus.png" },
    { name: "Marlon", image: "img/villagers/Marlon.png" },
    { name: "Marnie", image: "img/villagers/Marnie.png" },
    { name: "Maru", image: "img/villagers/Maru.png" },
    { name: "Morris", image: "img/villagers/Morris.png" },
    { name: "Mr. Qi", image: "img/villagers/Mr._Qi.png" },
    { name: "Pam", image: "img/villagers/Pam.png" },
    { name: "Penny", image: "img/villagers/Penny.png" },
    { name: "Pierre", image: "img/villagers/Pierre.png" },
    { name: "Robin", image: "img/villagers/Robin.png" },
    { name: "Sam", image: "img/villagers/Sam.png" },
    { name: "Sandy", image: "img/villagers/Sandy.png" },
    { name: "Sebastian", image: "img/villagers/Sebastian.png" },
    { name: "Shane", image: "img/villagers/Shane.png" },
    { name: "Vincent", image: "img/villagers/Vincent.png" },
    { name: "Willy", image: "img/villagers/Willy.png" },
    { name: "Wizard", image: "img/villagers/Wizard.png" }
];

let currentCharacterIndex = 0;

function displayCharacter(index) {
    currentCharacterIndex = index;
    const character = characters[currentCharacterIndex];
    const randomCharacterDiv = document.getElementById('randomCharacter');
    randomCharacterDiv.innerHTML = `
        <img src="${character.image}" alt="${character.name}">
        <p>${character.name}</p>
    `;
}

function displayNextCharacter() {
    currentCharacterIndex = (currentCharacterIndex + 1) % characters.length;
    displayCharacter(currentCharacterIndex);
}

function displayPreviousCharacter() {
    currentCharacterIndex = (currentCharacterIndex - 1 + characters.length) % characters.length;
    displayCharacter(currentCharacterIndex);
}

let krobusFound = 0;
function populateCharacterGrid() {
    const characterGrid = document.getElementById('characterGrid');
    characters.forEach(character => {
        const characterContainer = document.createElement('div');
        const img = document.createElement('img');
        const nameLabel = document.createElement('div');

        img.src = character.image;
        img.alt = character.name;
        img.classList.add('character');
        img.addEventListener('click', () => {
            img.classList.toggle('dimmed');
            nameLabel.classList.toggle("slash");
            
            const remainingCharacters = document.querySelectorAll('.character:not(.dimmed)').length;
            if (remainingCharacters === 1) {
                const krobusElement = [...document.querySelectorAll('.character')].find(el => el.alt === 'Krobus');
                if (krobusElement && !krobusElement.classList.contains('dimmed')) {
                    krobusElement.src = "img/villagers/Krobus_alt.png";
                    if(krobusFound == 0){
                        secretfound();
                        krobusFound = 1;
                    }
                    
                }
            }
        });

        nameLabel.classList.add('character-name');
        nameLabel.innerText = character.name;

        characterContainer.appendChild(img);
        characterContainer.appendChild(nameLabel);
        characterGrid.appendChild(characterContainer);
    });
}

function resetBoards() {
    document.querySelectorAll(".character").forEach(character => {
        character.classList.remove("dimmed");
    });
    document.querySelectorAll(".slash").forEach(character => {
        character.classList.remove("slash");
    });

}

document.getElementById('randomCharacterBtn').addEventListener('click', () => {
    displayCharacter(Math.floor(Math.random() * characters.length));
});
document.getElementById('ResetCharacterBtn').addEventListener('click', resetBoards);
document.getElementById('nextCharacterBtn').addEventListener('click', displayNextCharacter);
document.getElementById('prevCharacterBtn').addEventListener('click', displayPreviousCharacter);

let clickCount = 0;
let clickTimer;
var clicked = 0;

document.getElementById('logo').addEventListener('click', () => {
    clickCount++;

    if (clickCount === 1) {
        clickTimer = setTimeout(() => {
            clickCount = 0;
        }, 3000);
    }

    if (clickCount === 3 && clicked == 0) {
        clearTimeout(clickTimer); 
        addNewCharacters();
        clickCount = 0;
        showLeafOverlay(); 
        secretfound();
        clicked = 1;
    }
});

function addNewCharacters() {
    const newCharacters = [
        { name: "Matt", image: "img/villagers/Matt.png" },
        { name: "Spouse", image: "img/villagers/Spouse.png" }
    ];

    newCharacters.forEach(character => {
        characters.push(character); 

        const characterGrid = document.getElementById('characterGrid');
        const characterContainer = document.createElement('div');
        const img = document.createElement('img');
        const nameLabel = document.createElement('div');

        img.src = character.image;
        img.alt = character.name;
        img.classList.add('character');

        img.addEventListener('click', () => {
            img.classList.toggle('dimmed');
            nameLabel.classList.toggle("slash");
        });
        
        nameLabel.classList.add('character-name');
        nameLabel.innerText = character.name;

        characterContainer.appendChild(img);
        characterContainer.appendChild(nameLabel);
        characterGrid.appendChild(characterContainer);
    });
}

function start() {
    populateCharacterGrid();
    displayCharacter(currentCharacterIndex);
}

function showLeafOverlay() {
    const leafOverlay = document.getElementById('leafOverlay');
    leafOverlay.style.display = 'block';
}

document.getElementById("concernedApeLogo").addEventListener("click", function(){
    document.getElementById("concernedApeLogo").src = "img/concerned_alt.png";
    new Audio('sounds/honk.mp3').play();
});

function secretfound(){
    new Audio('sounds/secret.mp3').play();
}


window.onload = start;