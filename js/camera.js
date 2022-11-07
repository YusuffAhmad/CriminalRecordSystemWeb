    const video = document.querySelector('.player');
    const canvas = document.querySelector('.photo');
    let displayer = document.querySelector('#video-divv');
    let inputTag = document.querySelector('#url');
    let imageForm = document.querySelector('#url-form');
    let photoButton = document.querySelector('#photo-btn')
    const ctx = canvas.getContext('2d');
    const strip = document.querySelector('.strip');
    const host = "https://localhost:5001"



    photoButton.addEventListener('click',
    () => {
        photoButton.textContent = `Loading...`
        photoButton.classList.add("loader");
        photoButton.style.display = "block";
        takePhoto();
    })
    function getVideo() {
        navigator.mediaDevices.getUserMedia({video : true, audio : false})
        .then(localMediaStream => {
            console.log(typeof(localMediaStream));
            video.srcObject = localMediaStream;
            video.play();
        }).catch(err => {
            console.error(`OH NO!!!`, err)
        });  
    }

    function pinToCanvas() {
        const width = video.videoWidth;
        const height = video.videoHeight;
        canvas.width = width;
        canvas.height = height;

        return setInterval(() => {
            ctx.drawImage(video, 0, 0, width, height)
        }, 10)
    }

    function takePhoto() {
        const data = canvas.toDataURL('image/jpeg');
        displayer.href = data;
        displayer.innerHTML = `<img  margin-left= "30pc;" width="300px;" height="225px;" src="${data}" alt="Intruder" />`;
        strip.insertBefore(displayer, strip.firstChild);
        CompareFaces();
    }
   
    function CompareFaces(){
        const dataUrl = canvas.toDataURL('image/jpeg');

        fetch(`${host}/User/CompareFaces`, {
            method: "POST",
            body: JSON.stringify(dataUrl),
            headers: {      
                'Content-Type': 'application/json',
            }
        })
        .then(function(output) {
            console.log("Posting...");
            return output.json();
        })
        .then(function(results) {
            alert(results.message);
        })
        .catch(function(err) {
            console.log(err);
            alert(err);
        })
    }
    video.addEventListener('canplay', ()=> {pinToCanvas()})

    getVideo();
