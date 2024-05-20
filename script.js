let currentPageUrl = 'https://rickandmortyapi.com/api/character';

window.onload = async () => {
    try {
       await loadCharacters(currentPageUrl);
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar cards');
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)

};

async function loadCharacters (url) {
    const mainContent = document.getElementById ('main-content')
    mainContent.innerHTML = ''; //Limpa os elementos da página anterior antes de gerar os elementos da próxima página.

    try {

        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((character) => {
            const card = document.createElement("div")
            card.style.backgroundImage = 
            `url(${character.image})` 
            card.className = "cards"

            const characterNameBG = document.createElement("div")
            characterNameBG.className = "character-name-bg"

            const characterName = document.createElement("span")
            characterName.className = "character-name"
            characterName.innerText = `${character.name}`

            characterNameBG.appendChild(characterName)
            card.appendChild(characterNameBG)

            card.onclick = () => {
                const modal = document.getElementById("modal")
                modal.style.visibility = "visible"

                const modalContent = document.getElementById("modal-content")
                modalContent.innerHTML = ''

                const characterImage = document.createElement("div")
                characterImage.style.backgroundImage = 
                `url(${character.image})`
                characterImage.className = "character-image"

                const name = document.createElement("span")
                name.className = "character-details"
                name.innerText = `Nome: ${character.name}`

                const characterStatus = document.createElement("span")
                characterStatus.className = "character-details"
                characterStatus.innerText = `Status: ${convertStatus(character.status)}`

                const species = document.createElement("span")
                species.className = "character-details"
                species.innerText = `Especie: ${convertSpecies(character.species)}`

                const origin = document.createElement("span")
                origin.className = "character-details"
                origin.innerText = `Origem: ${character.origin.name}`

                const gender = document.createElement("span")
                gender.className = "character-details"
                gender.innerText = `Gênero: ${convertGender(character.gender)}`

                modalContent.appendChild(characterImage)
                modalContent.appendChild(name)
                modalContent.appendChild(characterStatus)
                modalContent.appendChild(species)
                modalContent.appendChild(origin)
                modalContent.appendChild(gender)


            }

            mainContent.appendChild(card)
        });


        const nextButton = document.getElementById('next-button')
        const backButton = document.getElementById('back-button')

        nextButton.disabled = !responseJson.info.next
        backButton.disabled = !responseJson.info.prev

        backButton.style.visibility = responseJson.info.prev? "visible" : "hidden"

        currentPageUrl = url

    } catch (error) {
        alert('Erro ao carregar os personagens')
        console.log(error)
    }
}

async function loadNextPage() {
    if(!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.info.next)

    } catch (error) {
        console.log(error)
        alert ('Erro ao carregar a próxima página')
    }
}

async function loadPreviousPage() {
    if(!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.info.prev)

    } catch (error) {
        console.log(error)
        alert ('Erro ao carregar a página anterior')
    }
}

function hideModal() {
    const modal = document.getElementById('modal')
    modal.style.visibility = "hidden"
}

function convertGender(gender) {
    const genero = {
        male : "masculino",
        female : "feminino",
        genderless: "sem gênero",
        "n/a" : "não se aplica"
    };

    return genero [gender.toLowerCase()] || gender;
}

function convertStatus(status) {
    const estatus = {
        alive : "vivo",
        dead : "morto",
        unknown: "desconhecido",
    };

    return estatus [status.toLowerCase()] || status;
}

function convertSpecies(species) {
   const especies = {
    human: "humano",
    alien: "extraterrestre",
    humanoid: "humanoide",
    animal: "animal",
    "mythological creature": "criatura mitológica",
    disease: "doença",
    robot: "robô",
    unknown: "desconhecido",
   }

   return especies [species.toLowerCase()] || species;
}

