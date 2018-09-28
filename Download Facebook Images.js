
/*  Use this script to download all images in a FACEBOOK image carousel to your hard drive
    Step 1: Go to the first image in an image carousel 
    Step 2: copy/paste this code into the console of Google Chrome (Ctrl + Shift + J)
*/

function rafAsync() {
  return new Promise(resolve => {
      requestAnimationFrame(resolve); //faster than set time out
  });
}

function checkElement(selector, last_image) {
  if (document.querySelector(selector).src === last_image) {
      return rafAsync().then(() => checkElement(selector, last_image));
  } else {
      return Promise.resolve(true);
  }
}

// download image
function forceDownload(url, fileName){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "blob";
  xhr.onload = function(){
      var urlCreator = window.URL || window.webkitURL;
      var imageUrl = urlCreator.createObjectURL(this.response);
      var tag = document.createElement('a');
      tag.href = imageUrl;
      tag.download = fileName;
      document.body.appendChild(tag);
      tag.click();
      document.body.removeChild(tag);
  }
  xhr.send();
}

async function downloadPhotos() {
  var original_image = document.querySelector('.spotlight').src,
      counter = 0, 
      last_image = document.querySelector('.spotlight').src;

  do {
    // click next page
    document.querySelector('[title="Next"]').click();
    
    // wait for new image to load
    await checkElement('.spotlight', last_image);

    forceDownload(document.querySelector('.spotlight').src, ++counter + '.jpg');
    last_image = document.querySelector('.spotlight').src;

  } while (document.querySelector('.spotlight').src !== original_image)
  alert('Downloaded ' + counter + ' images.' );
}

downloadPhotos()
