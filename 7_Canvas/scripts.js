        const canvas = document.querySelector('#draw');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth; // set full screen width
        canvas.height = window.innerHeight; // set full screen height
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth - 50;

        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;
        let hue = 0;
        let direction = true;

        function draw(e) {
            if (!isDrawing) return; //if not drawing - draw
            ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
            ctx.beginPath();
            ctx.moveTo(lastX, lastY); //start position
            ctx.lineTo(e.offsetX, e.offsetY); //end position
            ctx.stroke();
            // lastX = e.offsetX;
            // lastY = e.offsetY;
            [lastX, lastY] = [e.offsetX, e.offsetY];
            hue++;
            if (hue >= 360) {
                hue = 0;
            }
            if (ctx.lineWidth >= 30 || ctx.lineWidth <= 1) {
                direction = !direction;
            }
            if (direction) {
                ctx.lineWidth++;
            } else {
                ctx.lineWidth--;
            }
        }

        canvas.addEventListener('mousedown', (e) => {
            isDrawing = true;
            [lastX, lastY] = [e.offsetX, e.offsetY];
        }); //draw only on mouse button pressed
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', () => isDrawing = false); // stop drawing if buttom released
        canvas.addEventListener('mouseout', () => isDrawing = false); // stop drawing if not in a screen

        //not canvas

        const toolsOpener = document.querySelector('.tools-opener');
        const toolsDiv = document.querySelector('.tools');
        const h1Title = document.querySelector('.tools h1')
        const toolsOpenerBefore = document.querySelector(('.tools-opener'), ':before');

        toolsOpener.addEventListener('click', () => {
            toolsDiv.classList.toggle('opened');
            if (toolsDiv.classList.contains('opened')) {
                h1Title.style.transform = 'translate3d(0px,0px,0px)';
                toolsOpenerBefore.style.transform = 'rotateY(180deg)';

            } else {
                h1Title.style.transform = 'translate3d(-400px,0px,0px)';
                toolsOpenerBefore.style.transform = 'rotateY(0deg)';
            }

        });

        window.addEventListener('mouseup', e => {
            if (e.target != toolsDiv && e.target.parentNode != toolsDiv) {
                toolsDiv.classList.remove('opened');
                h1Title.style.transform = 'translate3d(-400px,0px,0px)';
                toolsOpenerBefore.style.transform = 'rotateY(0deg)';
            }
        })