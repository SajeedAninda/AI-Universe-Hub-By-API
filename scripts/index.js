let isSorted = false;
let loadCards = async (isShowAll, shouldSort = false) => {
    url = "https://openapi.programming-hero.com/api/ai/tools";
    let res = await fetch(url);
    let data = await res.json();
    let cardsArray = data?.data?.tools;
    let cardsContainer = document.querySelector("#cards-container");
    cardsContainer.textContent = "";

    let showAllBtnContainer = document.querySelector("#show-all-btn-container");
    if (cardsArray.length > 6 && !isShowAll) {
        showAllBtnContainer.classList.remove('hidden');
    }
    else {
        showAllBtnContainer.classList.add('hidden');
    }
    if (!isShowAll) {
        cardsArray = cardsArray.slice(0, 6);
    }

    if (shouldSort) {
        cardsArray.sort((a, b) => new Date(b.published_in) - new Date(a.published_in));
    }

    cardsArray.forEach(cards => {
        let newDiv = document.createElement("div");
        newDiv.innerHTML = `
        <div class="w-96 border flex flex-col justify-center p-4 rounded-xl border-gray-400">
                <div class="top-section space-x-2 border-b border-gray-400">
                    <div class="img-section">
                        <img class="w-[350px] h-[200px] rounded-xl" src="${cards?.image}" alt="">
                    </div>
                    <div class="">
                        <h3 class="text-[#111] text-xl font-semibold my-2">Features</h3>
                        <ol class="my-2 text-[#585858] text-sm list-decimal ml-3">
                            <li>${cards?.features[0]}</li>
                            <li>${cards?.features[1]}</li>
                            <li>${cards?.features[2]}</li>
                        </ol>
                    </div>
                </div>
                <div class="bottom-section flex flex-row justify-between items-center">
                    <div class="bottom-left flex flex-col justify-start">
                        <h3 class="text-[#111] text-xl font-bold my-2">${cards?.name}</h3>
                        <div class="date ml-1 space-x-1 flex flex-row items-center">
                            <i class="fa-solid fa-calendar-days"></i>
                            <p class="text-[#585858] text-sm">${cards?.published_in}</p>
                        </div>
                    </div>
                    <div class="bottom-right">
                        <button onclick="cardDetails('${cards.id}')" href="" class="text-[#EB5757] font-bold text-lg hover:underline">Details</button>
                    </div>
                </div>
            </div>
        `
        cardsContainer.appendChild(newDiv);
    })
}

let cardDetails = async (cardID) => {
    url = `https://openapi.programming-hero.com/api/ai/tool/${cardID}`;
    let res = await fetch(url);
    let data = await res.json();
    console.log(data);


    ai_modal.showModal()
}


let handleShowAllBtn = (isShowAll) => {
    loadCards(isShowAll);
}

document.querySelector("#sortBtn").addEventListener("click", (isShowAll) => {
    isSorted = !isSorted;
    loadCards(isShowAll, isSorted);
});

loadCards();