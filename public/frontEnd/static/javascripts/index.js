/**
 * /public/javascripts/index.js
 *
 * Contains functions that scale the homepage's background video.
 * The code is entirely from: http://jsfiddle.net/vke7uLee/show/.
 * As it is drag and drop, I will not comment on it or change
 * styling. Additionally,the footage belongs to:
 * http://fancyfootage.club/library/2015/01/lightbulb/
 */

$(function(){
/** Document Ready Functions **/
/********************************************************************/

$(document).ready(function() {

  // Resive video
  scaleVideoContainer();

  initBannerVideoSize('.video-container .poster img');
  initBannerVideoSize('.video-container .filter');
  initBannerVideoSize('.video-container video');

  $(window).on('resize', function() {
    scaleVideoContainer();
    scaleBannerVideoSize('.video-container .poster img');
    scaleBannerVideoSize('.video-container .filter');
    scaleBannerVideoSize('.video-container video');
  });

});

/** Reusable Functions **/
/********************************************************************/

function scaleVideoContainer() {

  var height = $(window).height();
  var unitHeight = parseInt(height) + 'px';
  $('.homepage-hero-module').css('height', unitHeight);

}

function initBannerVideoSize(element) {

  $(element).each(function() {
    $(this).data('height', $(this).height());
    $(this).data('width', $(this).width());
  });

  scaleBannerVideoSize(element);

}

function scaleBannerVideoSize(element) {

  var windowWidth = $(window).width(),
    windowHeight = $(window).height(),
    videoWidth,
    videoHeight;

  $(element).each(function() {
    var videoAspectRatio = $(this).data('height') / $(this).data('width'),
      windowAspectRatio = windowHeight / windowWidth;

    if (videoAspectRatio > windowAspectRatio) {
      videoWidth = windowWidth;
      videoHeight = videoWidth * videoAspectRatio;
      $(this).css({
        'top': -(videoHeight - windowHeight) / 2 + 'px',
        'margin-left': 0
      });
    } else {
      videoHeight = windowHeight;
      videoWidth = videoHeight / videoAspectRatio;
      $(this).css({
        'margin-top': 0,
        'margin-left': -(videoWidth - windowWidth) / 2 + 'px'
      });
    }

    $(this).width(videoWidth).height(videoHeight);

    $('.homepage-hero-module .video-container video').addClass('fadeIn animated');
  });
}

});
