const galleryImages = document.querySelectorAll("#gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const closeBtn = document.getElementById("closeBtn");

let currentIndex = 0;

// Open Lightbox
function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = galleryImages[index].src;
    lightbox.style.display = "flex";
}

galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => openLightbox(index));
});

// Next Image
nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex].src;
});

// Previous Image
prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex].src;
});

// Close Lightbox
closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
});

// Filter Images
function filterImages(category) {
    galleryImages.forEach(img => {
        if (category === "all" || img.dataset.category === category) {
            img.style.display = "block";
            img.style.animation = "fadeIn 0.5s forwards";
        } else {
            img.style.display = "none";
        }
    });
}

// Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle("dark");
}
