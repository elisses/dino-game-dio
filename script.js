const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;


const handleDown = event => {
    if (event.keyCode === 32) {
        if (!isJumping) {
            jump();
        }
    }
}

const jump = () => {
    isJumping = true;

    let upInterval = setInterval(() => {

        if (position >= 200) {
            clearInterval(upInterval);
            //descendo
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }

            }, 20);
        } else {
            //subindo
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

const createCactus = () => {
    const cactus = document.createElement('div');

    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if (cactusPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            //Game Over
            clearInterval(leftInterval);
            document.body.innerHTML =
                "<div class= 'container'>" +
                "<div>" +
                "<img src='https://thumbs.gfycat.com/ShowyWaterloggedBichonfrise-small.gif' alt='game over'" +
                "</div>" +
                "<div class ='button-start'>" +
                "<button onclick='window.location.reload()'>Jogar Novamente</button>" +
                "</div>" +
                "</div>"
                ;

        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    setTimeout(createCactus, randomTime);
}
createCactus();
document.addEventListener('keydown', handleDown);