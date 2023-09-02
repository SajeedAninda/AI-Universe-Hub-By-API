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
        <div class="border flex flex-col justify-center p-4 rounded-xl border-gray-400">
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
    let cardDetailedData=data.data;
    // console.log(cardDetailedData);

    // MODAL CONTAINER 
    let modalContainer=document.querySelector("#modal-container");
    // console.log(modalContainer);
    modalContainer.innerHTML=   `
    <div class="flex justify-center items-center">
    <div class="left bg:white lg:bg-[#eb57570d] rounded-xl py-6 px-4 flex flex-col justify-center items-center flex-1 space-y-8 w-[320px] h-[320px] lg:w-[450px] lg:h-[400px]">
        <div class="top">
            <h3 class="text-sm lg:text-lg font-bold text-[#111]">${cardDetailedData?.description}</h3>
        </div>


        <div class="middle flex flex-row gap-3">
            <div
                class="div text-sm w-[100px] h-[80px] text-[#03A30A] bg-white p-6  rounded-xl font-bold text-center flex items-center justify-center">
                <p>${cardDetailedData?.pricing[0]?.price} <br>
                <span>${cardDetailedData?.pricing[0]?.plan} </span>
                </p>

            </div>
            <div
                class="div text-sm w-[100px] h-[80px] text-[#F28927] bg-white p-6 rounded-xl font-bold text-center flex items-center justify-center">
                <p>${cardDetailedData?.pricing[1]?.price} <br>
                <span>${cardDetailedData?.pricing[2]?.plan} </span>
                </p>
            </div>
            <div
                class="div text-sm w-[100px] h-[80px] text-[#EB5757] bg-white p-6 rounded-xl font-bold text-center flex items-center justify-center">
                <p class="text-xs">${cardDetailedData?.pricing[2]?.price}<br>
                <span>${cardDetailedData?.pricing[2]?.plan} </span>
                </p>
            </div>
        </div>

        <div class="bottom flex gap-8">
            <div>
                <h2 class="text-xl text-[#111] font-bold">Features</h2>
                <ul class="text-[#585858] list-disc ml-4">
                    <li>${cardDetailedData?.features[1].feature_name}</li>
                    <li>${cardDetailedData?.features[2].feature_name}</li>
                    <li>${cardDetailedData?.features[3].feature_name}</li>
                </ul>
            </div>
            <div>
                <h2 class="text-xl text-[#111] font-bold">Integrations</h2>
                <ul class="text-[#585858] list-disc ml-4">
                    <li>${cardDetailedData?.integrations[0]}</li>
                    <li>${cardDetailedData?.integrations[1]}</li>
                    <li>${cardDetailedData?.integrations[2]}</li>
                </ul>
            </div>
        </div>
    </div>
</div>



<div class="right flex-1 border rounded-xl border-gray-400 py-6 px-4  w-[450px] h-[400px] flex flec-col items-center justify-center text-center">
    <div>
        <img class="w-[9/12] h-[9/12]" src="${cardDetailedData.image_link[0]}" alt="">
        <h2 class="text-xl font-bold text-[#111]">
        ${cardDetailedData.input_output_examples[0].input}
        </h2>
        <p class="text-bg" >${cardDetailedData?.input_output_examples[0].output}</p>
    </div>
</div>
    `

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