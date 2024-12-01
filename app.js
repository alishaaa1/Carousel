document.addEventListener('DOMContentLoaded',()=>{
    const carouselInner = document.getElementById('carouselInner');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');

    const fetchImages = () =>{
        return fetch('https://picsum.photos/v2/list?page=1&limit=5')
        .then(res=>{
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .catch(err=>{
            console.error('Error fetching images:', err);
            return [];
        });
    };

    fetchImages().then(images=>{
        if (!images || images.length === 0) {
            console.error("No images fetched or an error occurred.");
            return;
        }
        images.forEach((img, index)=>{
            const item = document.createElement('div');
            item.className = 'carousel-item';
            item.innerHTML = `
                <img src="https://picsum.photos/id/${img.id}/600/400" alt="Image ${index + 1}"/>
                <div class="carousel-text">${img.author}</div>
            `;
            carouselInner.appendChild(item);
        });

        let currentIndex = 0;

        const updateCarousel = () =>{
            const offset = -currentIndex*100;
            carouselInner.style.transform = `translateX(${offset}%)`;
            prevButton.disabled = currentIndex === 0;
            nextButton.disabled = currentIndex === images.length - 1;
        };
        prevButton.addEventListener('click',()=>{
            if(currentIndex>0) currentIndex--;
            updateCarousel();
        });
        nextButton.addEventListener('click',()=>{
            if(currentIndex <images.length - 1) currentIndex++;
            updateCarousel();
        });
        updateCarousel();
    });
});