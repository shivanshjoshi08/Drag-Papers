let highestZ = 1;

class Paper {

    holdingPaper = false;

    prevMouseX = 0;
    prevMouseY = 0;

    mouseX = 0;
    mouseY = 0;

    velocityX = 0;
    VelocityY = 0;

    currentPaperX = 0;
    currentPaperY = 0;

    init(paper) {

        // --- Mouse Events (Desktop) ---
        paper.addEventListener('mousedown', (e) => {

            this.holdingPaper = true;

            paper.style.zIndex = highestZ;
            highestZ += 1;

            if (e.button === 0) {
                this.prevMouseX = this.mouseX;
                this.prevMouseY = this.mouseY;

                console.log(this.prevMouseX);
                console.log(this.prevMouseY);
            }
            // alert('mouse is selected');
        })

        document.addEventListener('mousemove', (e) => {
            // console.log("mouse is moved");

            this.mouseX = e.clientX;
            this.mouseY = e.clientY;

            this.velocityX = this.mouseX - this.prevMouseX;
            this.velocityY = this.mouseY - this.prevMouseY;

            if (this.holdingPaper) {

                this.currentPaperX += this.velocityX;
                this.currentPaperY += this.velocityY;

                this.prevMouseX = this.mouseX;
                this.prevMouseY = this.mouseY;

                paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px)`;
            }
        })
        window.addEventListener("mouseup", (e) => {
            // console.log("mouse button is released");
            this.holdingPaper = false;
        })

        // --- Touch Events (Mobile) ---
        paper.addEventListener('touchstart', (e) => {
            this.holdingPaper = true;

            paper.style.zIndex = highestZ;
            highestZ += 1;

            const touch = e.touches[0];
            this.mouseX = touch.clientX;
            this.mouseY = touch.clientY;

            this.prevMouseX = this.mouseX;
            this.prevMouseY = this.mouseY;
        }, { passive: false })

        document.addEventListener('touchmove', (e) => {
            if (!this.holdingPaper) return;

            e.preventDefault(); // prevent scrolling while dragging

            const touch = e.touches[0];
            this.mouseX = touch.clientX;
            this.mouseY = touch.clientY;

            this.velocityX = this.mouseX - this.prevMouseX;
            this.velocityY = this.mouseY - this.prevMouseY;

            this.currentPaperX += this.velocityX;
            this.currentPaperY += this.velocityY;

            this.prevMouseX = this.mouseX;
            this.prevMouseY = this.mouseY;

            paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px)`;
        }, { passive: false })

        window.addEventListener('touchend', (e) => {
            this.holdingPaper = false;
        })
    }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
    const p = new Paper();
    p.init(paper);
});