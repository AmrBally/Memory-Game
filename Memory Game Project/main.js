
// Effect Duration
let duration = 1000;

// Select Block Container
let blocksContainer = document.querySelector('.memory-game-blocks');

// Create Array Form Game Blocks
let blocks = Array.from(blocksContainer.children)

// timer Container
let timerContainer = document.getElementById('timer');
let timer = 30;

timerContainer.innerText = timer
let timerInterval;



//Select The Start Game Button
document.querySelector('.control-buttons span').onclick = function () {

    // Prompt Window To Ask For Name
    let yourName = prompt('Your Name Is');

    // If Name Is Empty
    if (yourName == null || yourName == '') {

        // Set Name To Unknown
        document.querySelector('.name span').innerHTML = 'User';
        // Name Is Not Empty    
    } else {

        // Set Name TO Your Name Place
        document.querySelector('.name span').innerHTML = yourName;

    }
    // Remove Splash Screen
    document.querySelector('.control-buttons').remove();

    // Loop For Flipped All Blocks

    for (let i = 0; i < blocks.length; i++) {
        blocks[i].classList.add('is-flipped')
    }
    // Loop For Flipped Out All Blocks
    setTimeout(() => {
        for (let i = 0; i < blocks.length; i++) {
            blocks[i].classList.remove('is-flipped')
        }
        timerInterval = setInterval(() => {
            timer -= 1;
            timerContainer.innerText = timer
            if (timer === 0) {
                clearInterval(timerInterval);
                setTimeout(() => {
                    for (let j = 0; j < blocks.length; j++) {
                        blocks[j].classList.remove('has-match');
                    }
                    reloadPage()
                }, 1000)
            }
        }, 1000)
    }, 4000)
};


let reloadBtn = document.querySelector('.reload-buttons');
// Function To Show Reset Button
function reloadPage() {
    reloadBtn.style.display = 'block'
}

// Click On Span To reload Page
let reloadSpan = document.querySelector('.reload-buttons span');
reloadSpan.addEventListener('click', function () {
    location.reload()
})

// Create Range Of Blocks ( Two Ways To Do It )
// let orderRange = [...Array(blocks.length).keys()]
let orderRange = Array.from(Array(blocks.length).keys())

shuffle(orderRange)

// Add Order Css Property To Game Blocks
blocks.forEach((block, index) => {

    block.style.order = orderRange[index];

    block.addEventListener('click', function () {
        flipBlock(block)
    });
});

// Flip Block Function
function flipBlock(selectedBlock) {

    // Add Class is-flipped
    selectedBlock.classList.add('is-flipped');

    //Collect All Flipped Cards
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    // If there is two Selected Blocks
    if (allFlippedBlocks.length === 2) {
        stopClicking()
        checkMatchedBlock(allFlippedBlocks[0], allFlippedBlocks[1])
    }
}

// Stop Clicking Function 
function stopClicking() {

    // Add Class No Clicking To Main Container
    blocksContainer.classList.add('no-clicking');

    // Set time out To Remove THis Class
    setTimeout(() => {

        //Remove THis Class After Duration
        blocksContainer.classList.remove('no-clicking');
    }, duration);
}

// Check Matched Block
function checkMatchedBlock(firstBlock, secondBlock) {

    let triesElement = document.querySelector('.tries span');

    if (firstBlock.dataset.pics === secondBlock.dataset.pics) {

        firstBlock.classList.remove('is-flipped')
        secondBlock.classList.remove('is-flipped')

        firstBlock.classList.add('has-match')
        secondBlock.classList.add('has-match')
    } else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        setTimeout(() => {
            firstBlock.classList.remove('is-flipped')
            secondBlock.classList.remove('is-flipped')
        }, duration)
    }
}

// Shuffle Function
function shuffle(array) {
    let current = array.length,
        temp,
        random;
    while (current > 0) {

        random = Math.floor(Math.random() * current)
        current--;
        temp = array[current]
        array[current] = array[random]
        array[random] = temp
    }
    return array;
}








