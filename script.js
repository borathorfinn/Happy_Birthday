// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const nextEnvelopeBtn = document.getElementById("next-envelope-btn"); // ২য় স্ক্রিনের নতুন খাম বাটন

const title = document.getElementById("letter-title");
const letterVideo = document.getElementById("letter-video"); 
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// টেক্সট অ্যারে - একদম আপনার দেওয়া লেটেস্ট টাইমিং ও স্পিড অনুযায়ী সাজানো
const textArray = [
    { text: "but you mean so much to me", delay: 75 },
    { text: "........\n", delay: 180 }, 
    { text: "I swear not in my wildest dreams did i think I'd become friends with this guy whom at first i thought might just be another Ayush Ghosh of our class.\n\n", delay: 60 },
    { text: "🎀PAUSE_30S🎀", delay: 500 }, // আপনার দেওয়া ৫০০ মিলিমেকেন্ডের মার্কার পজ
    { text: "Then suddenly one day, noticed this dude also misses submission deadlines", delay: 70 },
    { text: "🎀WAIT🎀", delay: 180 }, // আপনার দেওয়া ৫০০ মিলিমেকেন্ডের মার্কার পজ
    { text: " 🎀\n", delay: 80 },
    { text: "also doesn't bother solving numericals in PRP's class", delay: 70 },
    { text: "....... 🎀\n", delay: 100 }, 
    { text: "In a batch full of performative nerds, found another performative nerd ♡", delay: 83 }
];

let partIndex = 0;
let charIndex = 0;

function customTypeWriter() {
    if (partIndex < textArray.length) {
        const currentPart = textArray[partIndex];
        
        // আপনার কোডের লজিক অনুযায়ী ঠিক ৫০০ মিলিমেকেন্ডেরই পজ হবে
        if (currentPart.text === "🎀PAUSE_30S🎀") {
            partIndex++;
            setTimeout(() => {
                customTypeWriter();
            }, 500); 
            return;
        }

        // আপনার কোডের লজিক অনুযায়ী ঠিক ৫০০ মিলিমেকেন্ডেরই পজ হবে
        if (currentPart.text === "🎀WAIT🎀") {
            partIndex++;
            setTimeout(() => {
                customTypeWriter();
            }, 180); 
            return;
        }

        if (charIndex < currentPart.text.length) {
            title.innerHTML += currentPart.text.charAt(charIndex);
            charIndex++;
            setTimeout(customTypeWriter, currentPart.delay);
        } else {
            partIndex++;
            charIndex = 0;
            setTimeout(customTypeWriter, 50);
        }
    } else {
        // টাইপিং শেষ হলে নতুন খাম বাটনটি ভেসে উঠবে
        if (buttons) {
            buttons.style.display = "flex";
        }
    }
}

// First Envelope Click (১ম স্ক্রিন থেকে ২য় স্ক্রিনে যাওয়া)
envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";

    if (letterVideo) {
        letterVideo.muted = false;
        letterVideo.play().catch(err => console.log("Video playback error:", err));
    }

    setTimeout(() => {
        document.querySelector(".letter-window").classList.add("open");
        customTypeWriter(); 
    }, 50);
});

// Second Envelope Click (নতুন খামে ক্লিক করে ফাইনাল স্ক্রিনে যাওয়া)
if (nextEnvelopeBtn) {
    nextEnvelopeBtn.addEventListener("click", () => {
        title.textContent = "HAPPY BIRTHDAY ARUNODAY."; 
        
        // This removes the 220px invisible gap instantly!
        title.style.minHeight = "0px"; 
        title.style.marginBottom = "15px"; // Controls exactly how close you want the cat to be

        if (letterVideo) {
            letterVideo.pause(); 
            
            const img = document.createElement("img");
            img.src = "cat_dance.gif";
            img.className = "cat";
            img.style.width = "250px";
            img.style.margin = "0 auto"; // Keeps it horizontally centered
            img.style.display = "block";
            letterVideo.parentNode.replaceChild(img, letterVideo);
        }

        document.querySelector(".letter-window").classList.add("final");
        buttons.style.display = "none"; 
        finalText.style.display = "block"; 
    });
}