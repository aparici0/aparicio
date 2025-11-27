
            // Cursor point
            let cursor = document.querySelector('.custom-cursor');
            let mouseX = 0, mouseY = 0; // Variables para la posición del mouse

            document.addEventListener('mousemove', function(e) {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });

            function updateCursor() {
                cursor.style.left = mouseX + 'px';  // Actualiza la posición horizontal
                cursor.style.top = mouseY + 'px';   // Actualiza la posición vertical
                requestAnimationFrame(updateCursor); // Llama a la función en cada frame
            }

            // Inicia el ciclo de animación
            requestAnimationFrame(updateCursor);

            document.addEventListener('mousedown', function() {
                cursor.style.transform = 'scale(1.5)'; /* Aumenta el tamaño al hacer clic */
            });

            document.addEventListener('mouseup', function() {
                cursor.style.transform = 'scale(1)'; /* Vuelve al tamaño original al soltar */
            });

 
            // Script para mostrar/ocultar los headers
            window.addEventListener('scroll', function() {
            const noStickyHeader = document.querySelector('.no-sticky-header');
            const stickyHeader = document.querySelector('.sticky-header');
            
            if (window.scrollY > noStickyHeader.offsetHeight) {
                noStickyHeader.style.display = 'none';
                stickyHeader.classList.add('active');
            } else {
                noStickyHeader.style.display = 'block';
                stickyHeader.classList.remove('active');
            }
            });

            //Ruido imágenes
            // Seleccionar todas las imágenes y lienzos
            const images = document.querySelectorAll('.main-image');
            const canvases = document.querySelectorAll('.noise-overlay');

            // Función para inicializar el ruido en cada imagen
            function initializeNoise() {
                images.forEach((image, index) => {
                    const canvas = canvases[index];
                    const ctx = canvas.getContext('2d');

                    // Ajustar el tamaño del canvas al de la imagen
                    canvas.width = image.clientWidth;
                    canvas.height = image.clientHeight;

                    // Variables para el movimiento suave
                    let offsetX = 0;
                    let offsetY = 0;
                    const movementSpeed = 0.2; // Controla la velocidad del movimiento suave

                    // Función para generar ruido
                    function generateNoise() {
                        const imageData = ctx.createImageData(canvas.width, canvas.height);
                        const data = imageData.data;

                        for (let i = 0; i < data.length; i += 4) {
                            const value = Math.random() * 255; // Valor aleatorio entre 0 y 255
                            data[i] = value;     // Rojo
                            data[i + 1] = value; // Verde
                            data[i + 2] = value; // Azul
                            data[i + 3] = 30;    // Opacidad ajustada (0-255) para el efecto de grano
                        }

                        ctx.putImageData(imageData, 0, 0);
                    }

                    // Función para calcular el movimiento suave
                    function updateNoisePosition() {
                        // Calcular nuevos offsets utilizando un movimiento suave
                        offsetX += (Math.random() - 0.5) * movementSpeed;
                        offsetY += (Math.random() - 0.5) * movementSpeed;

                        // Limitar el desplazamiento a un rango pequeño
                        offsetX = Math.max(-2, Math.min(2, offsetX));
                        offsetY = Math.max(-2, Math.min(2, offsetY));

                        // Aplicar el desplazamiento al canvas
                        canvas.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
                    }

                    // Animar el ruido
                    function animateNoise() {
                        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
                        generateNoise(); // Generar nuevo ruido
                        updateNoisePosition(); // Actualizar la posición del ruido;
                    }

                    // Actualizar el ruido cada 100ms
                    setInterval(animateNoise, 100);
                });
            }

            // Inicializar el ruido al cargar
            initializeNoise();

            // Texto 
            "use strict";
            let words = document.querySelectorAll(".word");
            words.forEach(word => {
                    let letters = word.textContent.split("");
                    word.textContent = "";
                    letters.forEach(letter => {
                        let span = document.createElement("span");
                        span.textContent = letter;
                        span.className = "letter";
                        word.append(span);
                    });
                });
            let currentWordIndex = 0;
            let maxWordIndex = words.length - 1;
                words[currentWordIndex].style.opacity = "1";
            let rotateText = () => {
            let currentWord = words[currentWordIndex];
            let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];
            // rotate out letters of current word
            Array.from(currentWord.children).forEach((letter, i) => {
                        setTimeout(() => {
                            letter.className = "letter out";
                        }, i * 80);
                    });
            // reveal and rotate in letters of next word
            nextWord.style.opacity = "1";
            Array.from(nextWord.children).forEach((letter, i) => {
                        letter.className = "letter behind";
                        setTimeout(() => {
                            letter.className = "letter in";
                        }, 340 + i * 80);
                    });
            currentWordIndex =
            currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
                };
            rotateText();
            setInterval(rotateText, 4000);
            