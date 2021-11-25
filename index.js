"use strict"

const loadSlides = async (name) => {
    const splitName = name.split('.')
    const fetchSlides = await fetch("pyslider/presentations/"+name+`${splitName[splitName.length - 1] === "html" ? "" : ".html"}`);
    const rowPresentation = await fetchSlides.text();
    const minifiedPresentation = rowPresentation.replace(/\n|\r|\n\r/gm, '\t')
    const svgReg = /<svg .*?>(.*?)<\/svg>/gm;
    const slides = minifiedPresentation.match(svgReg)
    return slides
}

const generateSlideshow = async (parent) => {
    let slideIndex = 0;
    const presentationScreen = document.createElement("div");
    presentationScreen.className = "presentation-screen";
    const slider = document.createElement("div");
    slider.className = "slider";
    slider.style.display = "flex";
    slider.style.height = "100%"
    slider.style.transition = "transform .3s ease-in-out"
    let name = parent.dataset.presentationname;
    let slides =  await loadSlides(name);
    parent.style.overflow = "hidden";
    let slidesNumberContainer = undefined
    if(slides) {
        slides.forEach(element => {
            const slideWrapper = document.createElement("div");
            slideWrapper.className = "slide";
            slideWrapper.style.minWidth = "100%"
            slideWrapper.style.minHeight = "100%"
            slideWrapper.style.flexGrow = "1"

            element = element.slice(0, 4) + ' style="width: 100%; height: 100%" ' + element.slice(4);
            slideWrapper.innerHTML = element;
            slider.append(slideWrapper);
        });
    }

    parent.append(slider);

    if(parent.dataset.showslidenumber && parent.dataset.showslidenumber === "true" && slides) {
        slidesNumberContainer = slidesNumber(slides.length)
        slidesNumberContainer.style.position = "absolute"
        slidesNumberContainer.style.bottom = "0.75rem"
        slidesNumberContainer.style.right = "3rem"
        slidesNumberContainer.style.borderRadius = "4px"
        parent.dataset.slidernumbersize && (slidesNumberContainer.style.fontSize = parent.dataset.slidernumbersize)
        slidesNumberContainer.style.backgroundColor = "rgba(0, 0, 0, 0.5)"
        slidesNumberContainer.style.color = "#e6e6e6"
        slidesNumberContainer.style.padding = "0.25rem 0.5rem"

        parent.append(slidesNumberContainer)
    }

    const rightArrowClick = () => {
        if(slideIndex < slider.children.length-1) {
            slideIndex++
            slider.style.transform = `translate(-${slideIndex * 100}%, 0)`

            slidesNumberContainer && (slidesNumberContainer.children[0].innerText = `${slideIndex+1}`)
        }
    }

    const leftArrowClick = () => {
        if(slideIndex > 0) {
            slideIndex--
            slider.style.transform = `translate(-${slideIndex * 100}%, 0)`

            slidesNumberContainer && (slidesNumberContainer.children[0].innerText = `${slideIndex+1}`)
        }
    }
    if(parent.dataset.controlarrows && parent.dataset.controlarrows === "true") {
        let arrowSize = "3rem"
        console.log("(")
        if(parent.dataset.arrowsize) {
            arrowSize = parent.dataset.arrowsize
            console.log("((")
        }

        const arrows = generateArrows({rightArrowClick, leftArrowClick, arrowSize})
        parent.dataset.arrowcolor && (arrows.style.color = parent.dataset.arrowcolor)
        parent.append(arrows)
    } else {
        parent.style.cursor = "pointer"
        parent.onclick = () => {
            if(slideIndex < slider.children.length-1) {
                rightArrowClick()
            }
            else {
                slideIndex = 0
                slider.style.transform = `translate(-${slideIndex * 100}%, 0)`
                slidesNumberContainer && (slidesNumberContainer.children[0].innerText = `${slideIndex+1}`)
            }
        }
    }
}

const generateArrows = ( {leftArrowClick=()=>undefined, rightArrowClick=()=>undefined, arrowSize="3rem"} ) => {
    const arrowContainer = document.createElement('div')
    arrowContainer.style.position = "absolute"
    arrowContainer.style.inset = "0"

    const arrowLeft = document.createElement('div')
    arrowLeft.style.position = "absolute"
    arrowLeft.style.top = "50%"
    arrowLeft.style.transform = "translate(0, -50%)"
    arrowLeft.style.cursor = "pointer"
    arrowLeft.innerHTML = `<span style='font-size:${arrowSize}; user-select:none' class='material-icons arrow-icon --left'>navigate_before</span>`

    const arrowRight = document.createElement('div')
    arrowRight.style.position = "absolute"
    arrowRight.style.right = "0"
    arrowRight.style.top = "50%"
    arrowRight.style.transform = "translate(0, -50%)"
    arrowRight.style.cursor = "pointer"
    arrowRight.innerHTML = `<span style='font-size:${arrowSize}; user-select:none' class='material-icons arrow-icon --right'>navigate_next</span>`

    arrowContainer.append(arrowLeft)
    arrowContainer.append(arrowRight)

    arrowContainer.className = "slider-arrows";
    arrowLeft.className += "slider-arrow --left";
    arrowRight.className += "slider-arrow --right";

    arrowRight.onclick = rightArrowClick

    arrowLeft.onclick = leftArrowClick


    return arrowContainer;
}

const slidesNumber = (slidesNumber) => {
    const numberContainer = document.createElement('div')
    numberContainer.className = "slider-number"
    const slideNumber = document.createElement("span")
    const slideTotal = document.createElement("span")

    slideNumber.innerText = `1`

    slideTotal.innerText = `/${slidesNumber}`

    numberContainer.append(slideNumber)
    numberContainer.append(slideTotal)

    return numberContainer;
}

const includeIcons = () => {
    const iconLink = window.document.createElement("link");
    iconLink.href="https://fonts.googleapis.com/icon?family=Material+Icons";
    iconLink.rel="stylesheet";
    window.document.head.appendChild(iconLink);
}

includeIcons();

const slidersContainers = document.getElementsByClassName("pyslider")
Object.values(slidersContainers).forEach(container => {
    container.style.height = '100%'
    container.style.position = "relative"
    generateSlideshow(container)
})



