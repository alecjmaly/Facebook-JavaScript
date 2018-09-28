
/*  Use this script to download likes/unlikes images in a FACEBOOK image carousel to your hard drive
    Step 1: Go to the first image in an image carousel 
    Step 2: copy/paste this code into the console of Google Chrome (Ctrl + Shift + J)
*/


function sleep(ms) {
  return new Promise(response => setTimeout(response, ms));
}

function likePhotos() {
  photoAction('[data-testid="fb-ufi-likelink"]');
}

function unlikePhotos() {
  photoAction('[data-testid="fb-ufi-unlikelink"]');
}


async function photoAction(qry) {
  var original_image = document.querySelector('.spotlight').src,
      counter = 0;

  do {
    // click next page
    document.querySelector('[title="Next"]').click();
    // wait for new image to load
    await sleep(70);

    if (document.querySelector(qry) !== null)
      document.querySelector(qry).click();

    counter++;
  } while (document.querySelector('.spotlight').src !== original_image)
  alert((qry.includes('unlike') ? 'Unliked ' : 'Liked ') + counter + ' photos.');
}

likePhotos();
