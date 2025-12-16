<?php
/**
* Index file
*
*/
$updated = 20211120;
// JS APP BASE: 1.7
$version = '1.3.6';
$styleVersion = '1.9.3';
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport"                  content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta property="og:url"                content="" />
    <meta property="og:type"               content="application" />
    <meta property="og:title"              content="JSappBase" />
    <meta property="og:description"        content="News App by Spektatum" />
    <meta property="og:image"              content="https://www.spektatum.com/NewsApp/img/icons/pictGlobe/1024.png" />
    <meta http-equiv="Content-Security-Policy" content="default-src 'self' https://lager.emilfolino.se  https://api.thenewsapi.com/* data: gap: https://ssl.gstatic.com https://lager.emilfolino.se 'unsafe-eval'; style-src 'self' https://fonts.googleapis.com 'unsafe-inline'; font-src https://fonts.gstatic.com; media-src 'self'; img-src * https://*.tile.openstreetmap.org data: content:; connect-src *;">

    <title>News app | Spektatum</title>

    <link rel="preload" href="style/style.min.css?v=<?php echo $styleVersion ?>" as="style">
    <!-- <link rel="preload" as="image" href="img/bg/juliana-kozoski_1400px_80.jpg "
    imagesrcset="img/bg/juliana-kozoski_1400px_80.jpg 1900w,
    img/bg/juliana-kozoski_1000px_80.jpg 1900w,
    img/bg/juliana-kozoski_600px_80.jpg 900w,
    img/bg/juliana-kozoski_400px_80.jpg 700w,
    img/bg/juliana-kozoski_350px_80.jpg 400w" imagesizes="50vw"> -->

    <link rel="stylesheet" href="style/style.min.css?v=<?php echo $styleVersion ?>" />
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link rel="icon" href="img/icons/pictGlobe/res/mipmap-xxxhdpi/ic_launcher.png">

</head>
<body>

  <div id="wrapper">
      <div id="nav">
      </div>

      <div id="header">
      </div>

      <div id="content">
      </div>

      <div id="navBottom">
      </div>

      <div id="theFooter">
      </div>

      <div id="bottomLine">
        <p> Version: <?php echo $version ?> </p>
      </div>

   </div>
   <div id='cover'></div>

</body>
  <!-- <script src="js/main.js"></script> -->
  <script type="module" src="dist/bundle.js?v=<?php echo $version ?>"></script>
  <script nomodule src="js/fallback.js"></script>
</html>
