<!DOCTYPE html>
<html lang="en">
    <head>
        <!-- Page Title -->
        <title>Book-Mart</title>

        <!-- Meta Tags -->
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta charset="utf-8">
        <meta name="keywords" content="HTML5 Template" />
        <meta name="description" content="BookMart">
        <meta name="author" content="Mitul Kanani">

        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!-- Theme Styles -->
        <link rel="stylesheet" href="{{ asset('/css/bootstrap.min.css')}}">
        <link rel="stylesheet" href="{{ asset('/css/bootstrap.css')}}">
        <link rel="stylesheet" href="{{ asset('/css/font-awesome.min.css')}}">
        <!--<link href='https://fonts.googleapis.com/css?family=Raleway:400,100,300,500,600,700,900,800' rel='stylesheet' type='text/css'/>-->
        <link href='http://fonts.googleapis.com/css?family=Lato:300,400,700' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="{{ asset('/css/animate.min.css')}}">
        <link rel="stylesheet" href="{{ asset('/css/galleria.classic.css')}}">
        <link rel="stylesheet" href="{{ asset('/css/slidebars.min.css')}}">
        <link rel="stylesheet" type="text/css" href="{{ asset('/css/autocomplete.min.css')}}"> 
        <!-- Current Page Styles -->
        <link rel="stylesheet" type="text/css" href="{{ asset('/css/slider/settings.css')}}" media="screen" />
        <link rel="stylesheet" type="text/css" href="{{ asset('/css/slider/style.css')}}" media="screen" />
        <link rel="stylesheet" type="text/css" href="{{ asset('/css/slider/jquery.bxslider.css')}}" media="screen" />
        <link rel="stylesheet" type="text/css" href="{{ asset('/css/slider/flexslider.css')}}" media="screen" />

        <!-- Main Style -->
        <link id="main-style" rel="stylesheet" href="{{ asset('/css/style.css')}}">
        <link id="main-style" rel="stylesheet" href="{{ asset('/css/style2.css')}}">

        <!-- Updated Styles -->
        <link rel="stylesheet" href="{{ asset('/css/updates.css')}}">

        <!-- Custom Styles -->
        <link rel="stylesheet" href="{{ asset('/css/custom.css')}}">
        <link rel="stylesheet" href="{{ asset('/css/app.css')}}">
        <link rel="stylesheet" href="{{ asset('/css/bootstrap-lightbox.min.css')}}">

        <!-- Responsive Styles -->
        <link rel="stylesheet" href="{{ asset('/css/responsive.css')}}">
        <link rel="stylesheet" href="{{ asset('/css/raxus.css')}}" media="screen" type="text/css">
        <link id="main-style" rel="stylesheet" href="{{ asset('/css/form.css')}}"/>
        <!-- Javascript -->
        <script type="text/javascript" src="{{ asset('/js/front/jquery-1.11.0.min.js')}}"></script>
        <script type="text/javascript" src="{{ asset('/js/front/jquery.min.js')}}"></script>
        <!-- Twitter Bootstrap -->
        <script type="text/javascript" src="{{ asset('/js/front/bootstrap.min.js')}}"></script>
        <script type="text/javascript" src="{{ asset('/js/front/bootstrap-lightbox.min.js')}}"></script>


        <script type="text/javascript" src="{{ asset('/js/front/modernizr.2.7.1.min.js')}}"></script>
        <script type="text/javascript" src="{{ asset('/js/front/jquery-migrate-1.2.1.min.js')}}"></script>
        <script type="text/javascript" src="{{ asset('/js/front/jquery.placeholder.js')}}"></script>
        <script type="text/javascript" src="{{ asset('/js/front/jquery-ui.1.10.4.min.js')}}"></script>
        <script type="text/javascript" src="{{ asset('/js/front/slider.js')}}"></script>
        <!-- load BXSlider scripts -->
        <script type="text/javascript" src="{{ asset('/js/front/jquery.bxslider.min.js')}}"></script>
        <script type="text/javascript" src="{{ asset('/js/front/raxus-slider.min.js')}}"></script>
        <!-- Flex Slider -->
        <script type="text/javascript" src="{{ asset('/js/front/jquery.flexslider-min.js')}}"></script>
        <!-- Auto complete-->
        <script type="text/javascript" src="{{ asset('/js/front/autocomplete.min.js')}}"></script>

        <script type="text/javascript" src="{{ asset('/js/front/galleria-1.4.2.min.js')}}"></script>
        <script type="text/javascript" src="{{ asset('/js/front/galleria.classic.min.js')}}"></script>
        <!-- Google Map Api -->


        <!-- parallax -->
        <script type="text/javascript" src="{{ asset('/js/front/jquery.stellar.min.js')}}"></script>
        <!-- Isotope -->
        <script type="text/javascript" src="{{ asset('/js/front/isotope.pkgd.min.js')}}"></script>
        <!-- waypoint -->
        <script type="text/javascript" src="{{ asset('/js/front/waypoints.min.js')}}"></script>

        <!-- load page Javascript -->
        <script type="text/javascript" src="{{ asset('/js/front/theme-scripts.js')}}"></script>

        <script type="text/javascript" src="{{ asset('/js/front/slider.js')}}"></script>
        <script type="text/javascript" src="{{ asset('/js/front/modernizr.js')}}"></script>
        <script type="text/javascript" src="{{ asset('/js/front/jquery.mixitup.min.js')}}"></script>
        <script type="text/javascript" src="{{ asset('/js/front/main.js')}}"></script>
        <style>
            .no-js #loader { display: none;  }
            .js #loader { display: block; position: absolute; left: 100px; top: 0; }
            .se-pre-con {
                position: fixed;
                left: 0px;
                top: 0px;
                width: 100%;
                height: 100%;
                z-index: 9999;
                background: url(images/front/gear.gif) center no-repeat #fff;
            }
            #modal-body {
                max-height: calc(110vh - 250px);
                overflow-y: auto;
            }
        </style>
    </head>
    <body>
        <div class="se-pre-con"></div>

        <div id="page-wrapper">
            <header id="header" class="navbar-static-top">
                <div class="main-header">
                    <nav role="navigation" class="navbar navbar-default navbar-fixed-top sb-slide">
                        <!-- Left Control -->
                        <div class="sb-toggle-left navbar-left">
                            <div class="navicon-line"></div>
                            <div class="navicon-line"></div>
                            <div class="navicon-line"></div>
                        </div><!-- /.sb-control-left -->

                        <!-- Right Control -->
                        <div class="sb-toggle-right navbar-right">
                            <div class="navicon-line"></div>
                            <div class="navicon-line"></div>
                            <div class="navicon-line"></div>
                        </div><!-- /.sb-control-right -->

                        <div class="container">
                            <!-- Logo -->
                            <div class="navbar-left" id="logo">
                                <a href="http://plugins.adchsm.me/slidebars/">
                                    <img width="118" height="40" alt="Slidebars Logo" src="http://plugins.adchsm.me/slidebars/images/slidebars-logo@2x.png"></a>
                            </div><!-- /#logo -->

                            <!-- Menu -->
                            <ul class="nav navbar-nav navbar-right">
                                <li><a href="#/" style="color: #98ce44;
                                       font-family: cursive;
                                       font-size: 21px;">Home</a></li>
                                <li><a href="javascript:void(0)" style="color: #98ce44;
                                       font-family: cursive;
                                       font-size: 21px;" class="post_ad_click">Post Ad</a></li>
                                <li><a href="how_it_works.html" style="color: #98ce44;
                                       font-family: cursive;
                                       font-size: 21px;">How it works</a></li>
                                <li><a href="contact_us.html" style="color: #98ce44;
                                       font-family: cursive;
                                       font-size: 21px;">Contact</a></li>
                                <li><a href="#" style="color: #98ce44;
                                       font-family: cursive;
                                       font-size: 21px;">News</a></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
            <div style="display: none;" id="waiting" class="waiting col-sm-12">
                <div class="spinner">
                    <img alt="spinner" src="images/front/loading-book.gif">
                    <h2 style="bottom: 47px;color: #fff;left: 69px;position: absolute;">Loading.......</h2>
                </div>
            </div>

            <div id="sb-site">
                <div id="slideshow">
                    <div class="fullwidthbanner-container">
                        <!--------------------- SLIDER ----------------------->
                        <div class="search-header">
                            <div id="jssor_1" style="position: relative; margin: 0 auto; top: 0px; left: 0px; width: 980px; height: 380px; overflow: hidden; visibility: hidden;">
                                Loading Screen 
                                <div data-u="loading" style="position: absolute; top: 0px; left: 0px;">
                                    <div style="filter: alpha(opacity=70); opacity: 0.7; position: absolute; display: block; top: 0px; left: 0px; width: 100%; height: 100%;"></div>
                                    <div style="position: absolute; display: block; background: url(images/front/loading.gif) no-repeat center center; top: 0px; left: 0px; width: 100%; height: 100%;"></div>
                                </div>
                                <div data-u="slides" style="cursor: default; position: relative; top: 0px; left: 0px; width: 980px; height: 380px; overflow: hidden;">
                                    <div data-b="0" data-p="170.00" data-po="80% 55%" style="display: none;">
                                        <img data-u="image" src="images/front/Book_Graphics3.jpg" />
                                        <div data-u="caption" data-t="0" data-3d="1" style="position: absolute; top: 30px; left: 100px; width: 50px; height: 50px;">
                                            <div data-u="caption" data-t="1" style="position: absolute; top: 0px; left: 300px; width: 500px; height: 30px; background-color: rgba(235,81,0,0.5); font-size: 20px; color: #ffffff; line-height: 30px; text-align: center;">You can Rent your Education material,sport stuff also</div>
                                            <div data-u="caption" data-t="2" style="position: absolute; top: 600px; left: -100px; width: 330px; height: 30px; background-color: rgba(235,81,0,0.5); font-size: 20px; color: #ffffff; line-height: 30px; text-align: center;">Post your Book here you get customer...</div>
                                        </div>
                                        <div data-u="caption" data-t="3" style="position: absolute; top: -50px; left: 400px; width: 80px; height: 40px; background-color: rgba(0,0,0,0.5); font-size: 16px; color: #ffffff; line-height: 40px; text-align: center;">Comes</div>
                                        <div data-u="caption" data-t="4" style="position: absolute; top: 100px; left: 400px; width: 80px; height: 40px; background-color: rgba(0,0,0,0.5); font-size: 16px; color: #ffffff; line-height: 40px; text-align: center;">with</div>
                                        <div data-u="caption" data-t="5" data-3d="1" style="position: absolute; top: 200px; left: 550px; width: 200px; height: 100px; background-color: rgba(235,81,0,0.5); font-size: 24px; color: black; line-height: 100px; text-align: center;">Books</div>
                                        <div data-u="caption" data-t="6" data-3d="1" style="position: absolute; top: 200px; left: 550px; width: 200px; height: 100px; background-color: rgba(235,81,0,0.5); font-size: 24px; color: black; line-height: 100px; text-align: center;">PG Rooms</div>
                                        <div data-u="caption" data-t="7" data-3d="1" style="position: absolute; top: 200px; left: 550px; width: 200px; height: 100px; background-color: rgba(235,81,0,0.5); font-size: 24px; color: black; line-height: 100px; text-align: center;">Hostel</div>
                                        <div data-u="caption" data-t="8" data-3d="1" style="position: absolute; top: 200px; left: 550px; width: 250px; height: 100px; background-color: rgba(235,81,0,0.5); font-size: 24px; color: black; line-height: 100px; text-align: center;">Medical-equipment</div>
                                        <div data-u="caption" data-t="9" data-3d="1" style="position: absolute; top: 200px; left: 550px; width: 200px; height: 100px; background-color: rgba(235,81,0,0.5); font-size: 24px; color: black; line-height: 100px; text-align: center;">Laundry</div>
                                        <div data-u="caption" data-t="10" data-3d="1" style="position: absolute; top: 200px; left: 550px; width: 200px; height: 100px; background-color: rgba(235,81,0,0.5); font-size: 24px; color: black; line-height: 100px; text-align: center;">many more ...</div>
                                    </div>
                                    <div data-b="1" data-p="170.00" style="display: none;">
                                        <img data-u="image" src="images/front/Library_1400_800.jpg" />
                                        <div data-u="caption" data-t="11" style="position: absolute; top: 270px; left: 20px; width: 500px; height: 30px; background-color: rgba(235,81,0,0.5); font-size: 20px; color: #ffffff; line-height: 30px; text-align: center;">160+ University Students are connected with us</div>
                                        <div data-u="caption" data-t="12" style="position: absolute; top: 120px; left: 700px; width: 200px; height: 90px; background-color: rgba(0,0,0,0.5); font-size: 16px; color: #ffffff; line-height: 28px; text-align: center; padding: 2px; box-sizing: border-box;">
                                            No-JQuery<br />
                                            Independent<br />
                                            Javascript Code
                                        </div>
                                        <div data-u="caption" data-t="13" style="position: absolute; top: -100px; left: 720px; width: 160px; height: 90px; background-color: rgba(235,81,0,0.7); font-size: 20px; color: #ffffff; line-height: 90px; text-align: center;">Compress</div>
                                        <div style="position: absolute; top: 40px; left: 300px; width: 400px; height: 200px; overflow: hidden;">
                                            <div data-u="caption" data-t="14" style="position: absolute; top: -50px; left: 205px; width: 200px; height: 30px; font-size: 18px; color: #fff; line-height: 30px;">Size&nbsp; &nbsp; &nbsp;CPU Usage</div>
                                            <div data-u="caption" data-t="15" style="position: absolute; top: 50px; left: 400px; width: 450px; height: 30px; font-size: 18px; color: #fff; line-height: 30px;">Slider with Slideshow&nbsp; &nbsp; &nbsp; 23KB&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ~4%</div>
                                            <div data-u="caption" data-t="16" style="position: absolute; top: 100px; left: 400px; width: 450px; height: 30px; font-size: 18px; color: #fff; line-height: 30px;">Slider with Caption&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 18KB&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ~4%</div>
                                            <div data-u="caption" data-t="17" style="position: absolute; top: 150px; left: 400px; width: 450px; height: 30px; font-size: 18px; color: #fff; line-height: 30px;">Slider&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;17KB&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ~1%</div>
                                        </div>
                                        <a href="" style="display: block; position: absolute; top: 270px; left: 600px; width: 300px; height: 30px; background-color: rgba(235,81,0,0.5); font-size: 20px; color: #ffffff; line-height: 30px; text-align: center;">ddddddddddddd</a>
                                    </div>
                                    <div data-b="2" data-p="170.00" style="display: none;">
                                        <img data-u="image" src="images/front/sr nagar-14.jpg" />
                                        <div data-u="caption" data-t="18" style="position: absolute; top: -100px; left: 50px; width: 600px; height: 80px; font-size: 16px; color: #ffffff; line-height: 20px;">
                                            Jssor Slider is touch swipe image slideshow with 360+ javascript slideshow effects.<br />
                                            When touch Jssor Slider,<br />
                                            it will freeze animation and swipe slides to the direction that finger moves to.
                                        </div>
                                        <div data-u="caption" data-t="19" style="position: absolute; top: 270px; left: 50px; width: 550px; height: 30px; background-color: rgba(235,81,0,0.5); font-size: 20px; color: #ffffff; line-height: 30px; text-align: center;">You Find PG room for you? Find Here...</div>
                                        <div data-u="caption" data-t="20" style="position: absolute; top: 40px; left: 650px; width: 300px; height: 300px; background-color: rgba(40,177,255,0.6); overflow: hidden;">
                                            <div data-u="caption" data-t="21" style="position: absolute; top: -1350px; left: -1350px; width: 3000px; height: 3000px;">
                                                <div data-u="caption" data-t="22" style="position: absolute; top: 0px; left: 0px; width: 3000px; height: 3000px;">
                                                    <div data-u="caption" data-t="23" style="position: absolute; top: 1200px; left: 1050px; width: 1100px; height: 260px; font-size: 130px;">
                                                        Create a slider

                                                        <div style="font-size: .6em;">
                                                            with exciting stuff

                                                        </div>
                                                    </div>
                                                    <div data-u="caption" data-t="24" style="position: absolute; top: 1300px; left: 1750px; width: 400px; height: 80px; font-size: 36px;">
                                                        image, text content<br />
                                                        and
                                                        <a href="#" style="background-color:rgba(255,255,255,0.5); padding: 0 .1em; text-decoration: none;">link</a><br />
                                                    </div>
                                                    <div data-u="caption" data-t="25" style="position: absolute; top: 1600px; left: 1000px; width: 700px; height: 130px; font-size: 48px;">
                                                        Or even full custmized<br />
                                                        html code
                                                    </div>
                                                    <div data-u="caption" data-t="26" style="position: absolute; top: 1800px; left: 205px; width: 800px; height: 400px; font-size: 300px;">Especially</div>
                                                    <div data-u="caption" data-t="27" style="position: absolute; top: 1800px; left: 1500px; width: 500px; height: 120px; font-size: 100px; line-height: 30px;">Photo</div>
                                                    <div data-u="caption" data-t="28" style="position: absolute; top: 1800px; left: 1650px; width: 300px; height: 70px; font-size: 60px;">Picture</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div data-b="3" data-p="170.00" style="display: none;">
                                        <img data-u="image" src="images/front/library.jpg" />
                                        <div data-u="caption" data-t="29" style="position: absolute; top: 280px; left: 50px; width: 500px; height: 30px; background-color: rgba(235,81,0,0.5); font-size: 20px; color: #ffffff; line-height: 30px; text-align: center;">Earn more profit and save time</div>
                                        <div data-u="caption" data-t="30" style="position: absolute; top: 40px; left: 640px; width: 300px; height: 300px; background-color: rgba(40,177,255,0.6); overflow: hidden;">
                                            <div style="position: absolute; top: 0px; left: 0px; width: 240px; height: 80px; overflow: hidden;">
                                                <div style="position: absolute; top: 0px; left: 20px; width: 200px; height: 50px; font-size: 24px; line-height: 50px;">
                                                    You Can Sale Or
                                                </div>
                                                <div data-u="caption" data-t="31" style="position: absolute; top: 40px; left: -200px; width: 200px; height: 40px; font-size: 24px; line-height: 40px; text-align: right;">
                                                    Rent Anything
                                                </div>
                                            </div>
                                        </div>
                                        <div data-u="caption" data-t="32" data-3d="1" style="position: absolute; top: 140px; left: 690px; width: 200px; height: 200px;">
                                            <div data-u="caption" data-t="33" style="position: absolute; top: -20px; left: 0px; width: 200px; height: 200px;">
                                                <img src="images/front/imageedit_6_3822598438.png" data-u="caption" data-t="34" style="position: absolute; top: 85px; left: 85px; width: 50px; height: 50px;" />
                                                <img src="images/front/imageedit_25_3506258137.png" data-u="caption" data-t="35" style="position: absolute; top: 85px; left: 85px; width: 50px; height: 50px;" />
                                                <img src="images/front/imageedit_21_4733987297.png" data-u="caption" data-t="36" style="position: absolute; top: 85px; left: 85px; width: 50px; height: 50px;" />
                                                <img src="images/front/imageedit_23_3066635489.png" data-u="caption" data-t="37" style="position: absolute; top: 85px; left: 85px; width: 50px; height: 50px;" />
                                                <img src="images/front/imageedit_17_7868957865.png" data-u="caption" data-t="38" style="position: absolute; top: 85px; left: 85px; width: 50px; height: 50px;" />
                                            </div>
                                        </div>
                                        <div data-u="caption" data-t="39" style="position: absolute; top: 20px; left: 20px; width: 240px; height: 80px; background-color: rgba(0,0,124,0.3); overflow: hidden;">
                                            <div style="position: absolute; top: 0px; left: 20px; width: 200px; height: 50px; font-size: 24px; color: #ffffff; line-height: 50px;">
                                                All things
                                            </div>
                                            <div data-u="caption" data-t="40" style="position: absolute; top: 40px; left: -200px; width: 200px; height: 40px; font-size: 24px; color: #ffffff; line-height: 40px; text-align: right;">sold here</div>
                                        </div>
                                        <div data-u="caption" data-t="41" style="position: absolute; top: 150px; left: 250px; width: 200px; height: 100px; background-color: rgba(235,81,0,0.7); font-size: 24px; color: #ffffff; line-height: 100px; text-align: center;">Post Add</div>
                                        <div data-u="caption" data-t="42" style="position: absolute; top: 150px; left: 250px; width: 200px; height: 100px; background-color: rgba(235,81,0,0.7); font-size: 24px; color: #ffffff; line-height: 100px; text-align: center;">Get Right client</div>
                                        <div data-u="caption" data-t="43" style="position: absolute; top: 150px; left: 250px; width: 200px; height: 100px; background-color: rgba(235,81,0,0.7); font-size: 24px; color: #ffffff; line-height: 100px; text-align: center;">Get Money</div>
                                    </div>
                                </div>
                                <span data-u="arrowleft" class="jssora22l" style="top:0px;left:10px;width:40px;height:58px;" data-autocenter="2"></span>
                                <span data-u="arrowright" class="jssora22r" style="top:0px;right:10px;width:40px;height:58px;" data-autocenter="2"></span>
                                <a href="http://www.jssor.com" style="display:none">Bootstrap Carousel</a>
                            </div>
                        </div>
                    </div>

                    <!------------------- SLIDER --------------------->
                </div>

                <!-------------- content ------------------------>
                <section id="content">
                    <div class="search-box-wrapper" style="margin-top: 69px;">
                        <div class="search-box container">
                            <ul class="search-tabs clearfix" style="margin-top: -39px;">
                                <li class="active"><a href="#hotels-tab" data-toggle="tab">SEARCH</a></li>
                                <li><a href="#" class="post_ad_click" >POST AD</a></li>
                            </ul>
                            <div class="search-tab-content">
                                <div class="tab-pane fade active in" id="hotels-tab">
                                    <form action="hotel-list-view.html" method="post">
                                        <div class="row">
                                            <div class="form-group col-sm-5">
                                                <input id="college-search" type="text" class="input-text full-width" placeholder="Search by college name...." />
                                            </div>
                                            <div class="form-group col-sm-5">
                                                <input id="branch-search" type="text" class="input-text full-width" placeholder="Search by branch....." />
                                            </div>
                                            <div class="form-group col-sm-2">
                                                <button type="submit" class="full-width icon-check animated" data-animation-type="bounce" data-animation-duration="1">SEARCH NOW</button>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="form-group col-sm-12">
                                                <input id="byname-search" type="text" class="input-text full-width" placeholder="Search by book name...." />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <main class="cd-main-content">
                        <div class="cd-tab-filter-wrapper">
                            <div class="cd-tab-filter">
                                <ul class="cd-filters">
                                    <li class="placeholder"> 
                                        <a data-type="all" href="#0">All</a> <!-- selected option on mobile -->
                                    </li> 
                                    <li class="filter"><a class="selected" href="#0" data-type="all">All</a></li>
                                    <li class="filter" data-filter=".SALE"><a href="#0" data-type="SALE">SALE</a></li>
                                    <li class="filter" data-filter=".RENT"><a href="#0" data-type="RENT">RENT</a></li>
                                    <li class="filter" data-filter=".engineering"><a href="#0" data-type="engineering">Engineering</a></li>
                                    <li class="filter" data-filter=".medical"><a href="#0" data-type="medical">Medical</a></li>
                                    <li class="filter" data-filter=".pgrooms"><a href="#0" data-type="pgrooms">PG-Rooms</a></li>
                                </ul> <!-- cd-filters -->
                            </div> <!-- cd-tab-filter -->
                        </div> <!-- cd-tab-filter-wrapper -->
                        <section class="cd-gallery" style="padding-bottom: 0;">
                            <div class="items-container row image-box style8">
                                <ul>
                                    @foreach($adLists as $key=>$adsList)
                                    <li class="mix {{$adsList->ad_type}}  engineering check1">
                                        <article class="box animated" data-animation-type="fadeInUp">
                                            <figure>
                                                <a class="media-box-thumb" title="" onclick="getgallery({{$adsList->id}});" href="javascript:;">
                                                    <img src="{{asset('ads_picture/original/')}}/{{$adsList->cover_image}}" alt="" class="middle-item"  style="width: 100%;cursor: pointer"/>
                                                </a>
                                            </figure>
                                            <div class="details">
                                                <div class="ribbon-wrapper-green">
                                                    <div class="ribbon-green">
                                                        <span style="color: #fff;font-style: oblique;">{{$adsList->ad_type}}</span>
                                                    </div>
                                                </div>
                                                <h2 class="box-title">{{$adsList->ad_title}}<small>{{$adsList->auther_name}}</small></h2>
                                                <div class="col-sm-12" style="float: left">
                                                    <span class="desc-heading"> Price:&nbsp;&nbsp; </span>
                                                    <span style="float:left">Rs.</span><strong class="price" >{{$adsList->price}} </strong>
                                                </div>
                                                <div class="col-sm-12" style="float: left">
                                                    <span class="desc-heading"> Edition: </span>
                                                    <span style="color: #98ce44;font-weight: bold;">&nbsp;&nbsp;{{$adsList->edition}} </span>
                                                </div>
                                                <div class="col-sm-12" style="float: left">
                                                    <span class="desc-heading">Publication: </span>
                                                    <span style="color: #98ce44;font-weight: bold;">&nbsp;&nbsp;{{$adsList->publication}}</span>
                                                </div>
                                                <div class="col-sm-12" style=" bottom: -14px;margin: 0;padding: 0;">
                                                    <button class="button btn-small dark-blue1 col-sm-6"
                                                            type="button"
                                                            data-toggle="collapse" 
                                                            data-target="#{{$adsList->id}}" 
                                                            aria-expanded="false" 
                                                            aria-controls="{{$adsList->id}}">
                                                        View Details
                                                    </button>
                                                    <a href="view.html">
                                                        <button class="button btn-small green col-sm-6">View more</button>
                                                    </a>
                                                </div>
                                            </div>
                                        </article>
                                        <div class="collapse" id="{{$adsList->id}}" style="background: #fff;">
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <div class="col-sm-6"><span> Owner-name:</span><span>{{$adsList->owner_name}}</span></div>
                                                    <div class="col-sm-6"><span> MobileNo.:</span><span>{{$adsList->mobile}}</span></div>
                                                </div>
                                                <div class="col-sm-12" style="margin-left: 14px;">
                                                    <span> College-name:</span><span>{{$adsList->college}}</span>
                                                </div>
                                                <div class="col-sm-12" style="margin-left: 14px;">
                                                    <span>Address:</span><span>{{$adsList->address}}</span>
                                                </div>
                                                <div class="col-sm-12">
                                                    <div class="col-sm-6"><span> City:</span><span>{{$adsList->city}}</span></div>
                                                    <div class="col-sm-6"><span>Negotiable:</span><span>{{$adsList->type}}</span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    @endforeach
                                    <li class="gap"></li>
                                    <li class="gap"></li>
                                    <li class="gap"></li>
                                </ul>
                            </div>
                            <div class="cd-fail-message">No results found</div>
                        </section> <!-- cd-gallery -->

                        <div class="cd-filter">
                            <form>
                                <div class="cd-filter-block">
                                    <h4>Search</h4>
                                    <div class="cd-filter-content">
                                        <input type="search" placeholder="Try engineering...">
                                    </div> <!-- cd-filter-content -->
                                </div> <!-- cd-filter-block -->

                                <div class="cd-filter-block">
                                    <h4>Categories</h4>
                                    <ul class="cd-filter-content cd-filters list">
                                        <li>
                                            <input class="filter" data-filter=".check1" type="checkbox" id="checkbox1">
                                            <label class="checkbox-label" for="checkbox1">SALE</label>
                                        </li>
                                        <li>
                                            <input class="filter" data-filter=".check2" type="checkbox" id="checkbox2">
                                            <label class="checkbox-label" for="checkbox2">RENT</label>
                                        </li>
                                        <li>
                                            <input class="filter" data-filter=".check3" type="checkbox" id="checkbox3">
                                            <label class="checkbox-label" for="checkbox3">Engineering</label>
                                        </li>
                                        <li>
                                            <input class="filter" data-filter=".check4" type="checkbox" id="checkbox4">
                                            <label class="checkbox-label" for="checkbox4">Medical</label>
                                        </li>
                                        <li>
                                            <input class="filter" data-filter=".check5" type="checkbox" id="checkbox5">
                                            <label class="checkbox-label" for="checkbox5">Commerce</label>
                                        </li>
                                        <li>
                                            <input class="filter" data-filter=".check6" type="checkbox" id="checkbox6">
                                            <label class="checkbox-label" for="checkbox6">Others</label>
                                        </li>
                                        <li>
                                            <input class="filter" data-filter=".check7" type="checkbox" id="checkbox7">
                                            <label class="checkbox-label" for="checkbox7">PG-Rooms</label>
                                        </li>
                                    </ul> <!-- cd-filter-content -->
                                </div> <!-- cd-filter-block -->
                            </form>

                            <a href="#0" class="cd-close">Close</a>
                        </div> <!-- cd-filter -->

                        <a href="#0" class="cd-filter-trigger">Filters</a>
                    </main>
                    <a class="button btn-large full-width uppercase" onclick="loadmore();" href="#">Load More Books</a>


                    <!----------- Related books box--------------->
                    <div class="container">
                        <br>

                        <h2>Others....</h2>
                        <div data-item-margin="30" data-item-width="170" data-animation="slide" class="investor-slideshow image-carousel style2 investor-list">
                            <div class="flex-viewport" style="overflow: hidden; position: relative;">
                                <ul class="slides" style="width: 1200%; transition-duration: 0.6s; transform: translate3d(0px, 0px, 0px);">
                                    <li style="width: 170px; float: left; display: block;">
                                        <div class="travelo-box">
                                            <a href="#"><img alt="" src="images/front/investor1.png" draggable="false"></a>
                                        </div>
                                    </li>
                                    <li style="width: 170px; float: left; display: block;">
                                        <div class="travelo-box">
                                            <a href="#"><img alt="" src="images/front/investor1.png" draggable="false"></a>
                                        </div>
                                    </li>
                                    <li style="width: 170px; float: left; display: block;">
                                        <div class="travelo-box">
                                            <a href="#"><img alt="" src="images/front/investor1.png" draggable="false"></a>
                                        </div>
                                    </li>
                                    <li style="width: 170px; float: left; display: block;">
                                        <div class="travelo-box">
                                            <a href="#"><img alt="" src="images/front/investor1.png" draggable="false"></a>
                                        </div>
                                    </li>
                                    <li style="width: 170px; float: left; display: block;">
                                        <div class="travelo-box">
                                            <a href="#"><img alt="" src="images/front/investor1.png" draggable="false"></a>
                                        </div>
                                    </li>
                                    <li style="width: 170px; float: left; display: block;">
                                        <div class="travelo-box">
                                            <a href="#"><img alt="" src="images/front/investor1.png" draggable="false"></a>
                                        </div>
                                    </li>
                                    <li style="width: 170px; float: left; display: block;">
                                        <div class="travelo-box">
                                            <a href="#"><img alt="" src="images/front/investor1.png" draggable="false"></a>
                                        </div>
                                    </li>
                                    <li style="width: 170px; float: left; display: block;">
                                        <div class="travelo-box">
                                            <a href="#"><img alt="" src="images/front/investor1.png" draggable="false"></a>
                                        </div>
                                    </li>
                                    <li style="width: 170px; float: left; display: block;">
                                        <div class="travelo-box">
                                            <a href="#"><img alt="" src="images/front/investor1.png" draggable="false"></a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <ol class="flex-control-nav flex-control-paging">
                                <li><a class="">1</a></li>
                                <li><a class="flex-active">2</a></li>
                            </ol>
                            <ul class="flex-direction-nav">
                                <li><a href="#" class="flex-prev">Previous</a></li>
                                <li><a href="#" class="flex-next">Next</a></li>
                            </ul>
                        </div>
                    </div>
                    <!----------- Related books box--------------->
                    <div class="global-map-area promo-box no-margin parallax" data-stellar-background-ratio="0.5">
                        <div class="container">
                            <div class="content-section description pull-right col-sm-9">
                                <div class="table-wrapper hidden-table-sm">
                                    <div class="table-cell">
                                        <h2 class="m-title animated" data-animation-type="fadeInDown" data-animation-duration="1.5"><br /><em>12,000+ Books and PG rooms Available!</em>
                                        </h2>
                                    </div>
                                    <div class="table-cell action-section col-md-4 no-float">
                                        <form method="post" action="hotel-list-view.html">
                                            <div class="row">
                                                <div class="col-xs-6 col-md-12">
                                                    <input type="text" class="input-text input-large full-width" value="" placeholder="Enter book name" />
                                                </div>
                                                <div class="col-xs-6 col-md-12">
                                                    <button class="full-width btn-large">search Book</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div class="image-container col-sm-4">
                                <img src="images/front/promo-image1.png" alt="" width="342" height="258" class="animated" data-animation-type="fadeInUp" />
                            </div>
                        </div>
                    </div>
                </section>
                <footer id="footer">
                    <div class="footer-wrapper">
                        <div class="container">
                            <div class="row">
                                <div class="col-sm-6 col-md-3">
                                    <h2>Discover</h2>
                                    <ul class="discover triangle hover row">
                                        <li class="col-xs-6"><a href="#">Safety</a></li>
                                        <li class="col-xs-6"><a href="#">About</a></li>
                                        <li class="col-xs-6"><a href="#">Travelo Picks</a></li>
                                        <li class="col-xs-6"><a href="#">Latest Jobs</a></li>
                                        <li class="active col-xs-6"><a href="#">Mobile</a></li>
                                        <li class="col-xs-6"><a href="#">Press Releases</a></li>
                                        <li class="col-xs-6"><a href="#">Why Host</a></li>
                                        <li class="col-xs-6"><a href="#">Blog Posts</a></li>
                                        <li class="col-xs-6"><a href="#">Social Connect</a></li>
                                        <li class="col-xs-6"><a href="#">Help Topics</a></li>
                                        <li class="col-xs-6"><a href="#">Site Map</a></li>
                                        <li class="col-xs-6"><a href="#">Policies</a></li>
                                    </ul>
                                </div>
                                <div class="col-sm-6 col-md-3">
                                    <h2>College News</h2>
                                    <ul class="travel-news">
                                        <li>
                                            <div class="thumb">
                                                <a href="#">
                                                    <img src="images/front/news01.png" alt="" width="63" height="63" />
                                                </a>
                                            </div>
                                            <div class="description">
                                                <h5 class="s-title"><a href="#">Amazing Places</a></h5>
                                                <p>Purus ac congue arcu cursus ut vitae pulvinar massaidp.</p>
                                                <span class="date">25 Sep, 2013</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="thumb">
                                                <a href="#">
                                                    <img src="images/front/news02.png" alt="" width="63" height="63" />
                                                </a>
                                            </div>
                                            <div class="description">
                                                <h5 class="s-title"><a href="#">Travel Insurance</a></h5>
                                                <p>Purus ac congue arcu cursus ut vitae pulvinar massaidp.</p>
                                                <span class="date">24 Sep, 2013</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="col-sm-6 col-md-3">
                                    <h2>Mailing List</h2>
                                    <p>Sign up for our mailing list to get latest updates and offers.</p>
                                    <br />
                                    <div class="icon-check">
                                        <input type="text" class="input-text full-width" placeholder="your email" />
                                    </div>
                                    <br />
                                    <span>We respect your privacy</span>
                                </div>
                                <div class="col-sm-6 col-md-3">
                                    <h2>About BookMart</h2>
                                    <p>Nunc cursus libero purus ac congue arcu cursus ut sed vitae pulvinar massaidp nequetiam lore elerisque.</p>
                                    <br />
                                    <address class="contact-details">
                                        <span class="contact-phone"><i class="soap-icon-phone"></i> 1-800-123-HELLO</span>
                                        <br />
                                        <a href="#" class="contact-email">help@travelo.com</a>
                                    </address>
                                    <ul class="social-icons clearfix">
                                        <li class="twitter"><a title="twitter" href="#" data-toggle="tooltip"><i class="soap-icon-twitter"></i></a></li>
                                        <li class="googleplus"><a title="googleplus" href="#" data-toggle="tooltip"><i class="soap-icon-googleplus"></i></a></li>
                                        <li class="facebook"><a title="facebook" href="#" data-toggle="tooltip"><i class="soap-icon-facebook"></i></a></li>
                                        <li class="linkedin"><a title="linkedin" href="#" data-toggle="tooltip"><i class="soap-icon-linkedin"></i></a></li>
                                        <li class="vimeo"><a title="vimeo" href="#" data-toggle="tooltip"><i class="soap-icon-vimeo"></i></a></li>
                                        <li class="dribble"><a title="dribble" href="#" data-toggle="tooltip"><i class="soap-icon-dribble"></i></a></li>
                                        <li class="flickr"><a title="flickr" href="#" data-toggle="tooltip"><i class="soap-icon-flickr"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bottom gray-area">
                        <div class="container">
                            <div class="logo pull-left">
                                <a href="index.html" title="Travelo - home">
                                    <img src="" alt="Travelo HTML5 Template" />
                                </a>
                            </div>
                            <div class="pull-right">
                                <a id="back-to-top" href="#" class="animated" data-animation-type="bounce"><i class="soap-icon-longarrow-up circle"></i></a>
                            </div>
                            <div class="copyright pull-right">
                                <p>&copy; 2015 BookMart</p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
        <!---------------------- SIDE BAR -------------------->
        <div class="sb-slidebar sb-left">
            <nav>
                <ul class="sb-menu">
                    <li><img width="118" height="40" alt="Slidebars" src="http://plugins.adchsm.me/slidebars/images/slidebars-logo-white@2x.png"></li>
                    <li class="sb-close"><a href="/">Home</a></li>
                    <li class="sb-close"><a href="post_add">POST FREE AD</a></li>
                    <li class="sb-close"><a href="how_it_works.html">How its work</a></li>
                    <li class="sb-close"><a href="news">News</a></li>
                    <li class="sb-close"><a href="contact">Contact</a></li>
                    <li class="sb-close"><a href="gallery" class="github">Gallery</a></li>
                    <li class="sb-close"><span class="sb-open-right">Share</span></li>
                    <li class="sb-close"><small>BookMart &copy; 2014</small></li>
                </ul>
            </nav>
        </div>

        <div class="sb-slidebar sb-right sb-style-overlay" style="margin-right: -260px;">
            <div class="share-icons-sidebar">
                <a class="share-icon share-facebook" target="_blank" href="http://www.facebook.com/sharer.php?u=http://jssor.com" title="Share on Facebook"></a>
                <a class="share-icon share-twitter" target="_blank" href="http://twitter.com/share?url=http://jssor.com&text=JavaScript%20jQuery%20Image%20Slider/Slideshow/Carousel/Gallery/Banner%20html%20TOUCH%20SWIPE%20Responsive" title="Share on Twitter"></a>
                <a class="share-icon share-googleplus" target="_blank" href="https://plus.google.com/share?url=http://jssor.com" title="Share on Google Plus"></a>
                <a class="share-icon share-linkedin" target="_blank" href="http://www.linkedin.com/shareArticle?mini=true&url=http://jssor.com" title="Share on LinkedIn"></a>
                <a class="share-icon share-stumbleupon" target="_blank" href="http://www.stumbleupon.com/submit?url=http://jssor.com&title=JavaScript%20jQuery%20Image%20Slider/Slideshow/Carousel/Gallery/Banner%20html%20TOUCH%20SWIPE%20Responsive" title="Share on StumbleUpon"></a>
                <a class="share-icon share-pinterest" target="_blank" href="http://pinterest.com/pin/create/button/?url=http://jssor.com&media=http://jssor.com/img/site/jssor.slider.jpg&description=JavaScript%20jQuery%20Image%20Slider/Slideshow/Carousel/Gallery/Banner%20html%20TOUCH%20SWIPE%20Responsive" title="Share on Pinterst"></a>
                <a class="share-icon share-email" target="_blank" href="mailto:?Subject=Jssor%20Slider&Body=Highly%20recommended%20JavaScript%20jQuery%20Image%20Slider/Slideshow/Carousel/Gallery/Banner%20html%20TOUCH%20SWIPE%20Responsive%20http://jssor.com" title="Share by Email"></a>
            </div>
        </div>
        <!-- Slidebars -->
        <!-- Galleria modal -->
        <div aria-hidden="true" role="dialog" tabindex="-1" id="photo_viewer" class="modal2 fade">
            <div class="modal-dialog2 modal-md">
                <div class="modal-content2">
                    <div class="modal-header2">
                        <button id="switch_gallery" data-dismiss="modal" class="close2" type="button"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>            
                    </div>
                    <div class="modal-body2">
                        <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12">
                                <div id="galleria"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- post ad Modal -->
        <div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header" style="background-color: #2d3e52;">
                        <button type="button" style="border-radius: 50%;background: #fff; width: 37px;" class="close" data-dismiss="modal">&times;</button>
                        <h2 style="color: #fff">Post Free ad</h2>
                    </div>
                    <div id="modal-body">

                    </div>
                </div>
            </div>
        </div>

        <script src="js/front/slidebars.min.js"></script>
        <script>
                                $(document).ready(function () {
                        $.slidebars();
                        });
                                var options = {
                                url: "search_json/colleges.json",
                                        categories: [{
                                        maxNumberOfElements: 4,
                                                header: "College - City"
                                        }],
                                        getValue: function (element) {
                                        return element.clg_name;
                                        },
                                        template: {
                                        type: "custom",
                                                method: function (value, item) {
                                                return value + " <br>- " + item.city;
                                                }
                                        },
                                        list: {
                                        showAnimation: {
                                        type: "fade", //normal|slide|fade
                                                time: 400,
                                                callback: function () {
                                                }
                                        },
                                                hideAnimation: {
                                                type: "slide", //normal|slide|fade
                                                        time: 400,
                                                        callback: function () {
                                                        }
                                                },
                                                maxNumberOfElements: 8,
                                                match: {
                                                enabled: true
                                                },
                                                sort: {
                                                enabled: true
                                                }
                                        },
                                        theme: "square"

                                };
                                var branchOptions = {
                                url: "search_json/branches.json",
                                        categories: [{
                                        maxNumberOfElements: 4,
                                                header: "Branch"
                                        }],
                                        getValue: function (element) {
                                        return element.branch_name;
                                        },
                                        list: {
                                        maxNumberOfElements: 4,
                                                match: {
                                                enabled: true
                                                },
                                                sort: {
                                                enabled: true
                                                }
                                        },
                                        theme: "square"
                                };
                                var bynameoptions = {
                                url: "search_json/branches.json",
                                        categories: [{
                                        maxNumberOfElements: 4,
                                                header: "Branch"
                                        }],
                                        getValue: function (element) {
                                        return element.branch_name;
                                        },
                                        list: {
                                        maxNumberOfElements: 4,
                                                match: {
                                                enabled: true
                                                },
                                                sort: {
                                                enabled: true
                                                }
                                        },
                                        theme: "square"
                                };
                                $("#branch-search").easyAutocomplete(branchOptions);
                                $("#college-search").easyAutocomplete(options);
                                $("#byname-search").easyAutocomplete(bynameoptions);</script>
        <!---------------------- SIDE BAR ---------------------------------------->
        <!--use jssor.slider.debug.js instead for debug--> 
        <script>
                    jssor_1_slider_init = function () {

                    var jssor_1_SlideshowTransitions = [
                    {$Duration: 1000, $Delay: 80, $Cols: 8, $Rows: 4, $Clip: 15, $SlideOut: true, $Easing: $Jease$.$OutQuad},
                    {$Duration: 1200, y: 0.3, $Cols: 2, $During: {$Top: [0.3, 0.7]}, $ChessMode: {$Column: 12}, $Easing: {$Top: $Jease$.$InCubic, $Opacity: $Jease$.$Linear}, $Opacity: 2},
                    {$Duration: 1000, x: - 1, y: 2, $Rows: 2, $Zoom: 11, $Rotate: 1, $SlideOut: true, $Assembly: 2049, $ChessMode: {$Row: 15}, $Easing: {$Left: $Jease$.$InExpo, $Top: $Jease$.$InExpo, $Zoom: $Jease$.$InExpo, $Opacity: $Jease$.$Linear, $Rotate: $Jease$.$InExpo}, $Opacity: 2, $Round: {$Rotate: 0.85}},
                    {$Duration: 1200, x: 4, $Cols: 2, $Zoom: 11, $SlideOut: true, $Assembly: 2049, $ChessMode: {$Column: 15}, $Easing: {$Left: $Jease$.$InExpo, $Zoom: $Jease$.$InExpo, $Opacity: $Jease$.$Linear}, $Opacity: 2},
                    {$Duration: 1000, x: 4, y: - 4, $Zoom: 11, $Rotate: 1, $SlideOut: true, $Easing: {$Left: $Jease$.$InExpo, $Top: $Jease$.$InExpo, $Zoom: $Jease$.$InExpo, $Opacity: $Jease$.$Linear, $Rotate: $Jease$.$InExpo}, $Opacity: 2, $Round: {$Rotate: 0.8}},
                    {$Duration: 1500, x: 0.3, y: - 0.3, $Delay: 80, $Cols: 8, $Rows: 4, $Clip: 15, $During: {$Left: [0.3, 0.7], $Top: [0.3, 0.7]}, $Easing: {$Left: $Jease$.$InJump, $Top: $Jease$.$InJump, $Clip: $Jease$.$OutQuad}, $Round: {$Left: 0.8, $Top: 2.5}},
                    {$Duration: 1000, x: - 3, y: 1, $Rows: 2, $Zoom: 11, $Rotate: 1, $SlideOut: true, $Assembly: 2049, $ChessMode: {$Row: 28}, $Easing: {$Left: $Jease$.$InExpo, $Top: $Jease$.$InExpo, $Zoom: $Jease$.$InExpo, $Opacity: $Jease$.$Linear, $Rotate: $Jease$.$InExpo}, $Opacity: 2, $Round: {$Rotate: 0.7}},
                    {$Duration: 1200, y: - 1, $Cols: 8, $Rows: 4, $Clip: 15, $During: {$Top: [0.5, 0.5], $Clip: [0, 0.5]}, $Formation: $JssorSlideshowFormations$.$FormationStraight, $ChessMode: {$Column: 12}, $ScaleClip: 0.5},
                    {$Duration: 1000, x: 0.5, y: 0.5, $Zoom: 1, $Rotate: 1, $SlideOut: true, $Easing: {$Left: $Jease$.$InCubic, $Top: $Jease$.$InCubic, $Zoom: $Jease$.$InCubic, $Opacity: $Jease$.$Linear, $Rotate: $Jease$.$InCubic}, $Opacity: 2, $Round: {$Rotate: 0.5}},
                    {$Duration: 1200, x: - 0.6, y: - 0.6, $Zoom: 1, $Rotate: 1, $During: {$Left: [0.2, 0.8], $Top: [0.2, 0.8], $Zoom: [0.2, 0.8], $Rotate: [0.2, 0.8]}, $Easing: {$Zoom: $Jease$.$Swing, $Opacity: $Jease$.$Linear, $Rotate: $Jease$.$Swing}, $Opacity: 2, $Round: {$Rotate: 0.5}},
                    {$Duration: 1500, y: - 0.5, $Delay: 60, $Cols: 15, $SlideOut: true, $Formation: $JssorSlideshowFormations$.$FormationCircle, $Easing: $Jease$.$InWave, $Round: {$Top: 1.5}},
                    {$Duration: 1000, $Delay: 30, $Cols: 8, $Rows: 4, $Clip: 15, $Formation: $JssorSlideshowFormations$.$FormationStraightStairs, $Assembly: 2050, $Easing: $Jease$.$InQuad},
                    {$Duration: 1200, $Delay: 20, $Clip: 3, $SlideOut: true, $Assembly: 260, $Easing: {$Clip: $Jease$.$OutCubic, $Opacity: $Jease$.$Linear}, $Opacity: 2}
                    ];
                            var jssor_1_SlideoTransitions = [
                                    [{b: - 1.0, d: 1.0, rY: 90.0}, {b: 8500.0, d: 1000.0, o: - 1.0, rY: - 90.0}],
                                    [{b: - 1.0, d: 1.0, o: - 1.0}, {b: 0.0, d: 480.0, x: - 300.0, o: 1.0}, {b: 1000.0, d: 500.0, x: - 370.0}],
                                    [{b: 480.0, d: 520.0, x: 100.0, y: - 320.0}],
                                    [{b: 1500.0, d: 500.0, y: 250.0}, {b: 8500.0, d: 1000.0, x: 600.0}],
                                    [{b: - 1.0, d: 1.0, o: - 1.0, sX: - 0.6, sY: - 0.6}, {b: 2000.0, d: 500.0, o: 1.0, r: 360.0, sX: 0.6, sY: 0.6}, {b: 8500.0, d: 1000.0, y: - 150.0}],
                                    [{b: - 1.0, d: 1.0, o: - 1.0, tZ: - 200.0}, {b: 2500.0, d: 1000.0, o: 1.0, tZ: 200.0}, {b: 3500.0, d: 1000.0, o: - 1.0, tZ: 200.0}],
                                    [{b: - 1.0, d: 1.0, o: - 1.0, tZ: - 200.0}, {b: 3500.0, d: 1000.0, o: 1.0, tZ: 200.0}, {b: 4500.0, d: 1000.0, o: - 1.0, tZ: 200.0}],
                                    [{b: - 1.0, d: 1.0, o: - 1.0, tZ: - 200.0}, {b: 4500.0, d: 1000.0, o: 1.0, tZ: 200.0}, {b: 5500.0, d: 1000.0, o: - 1.0, tZ: 200.0}],
                                    [{b: - 1.0, d: 1.0, o: - 1.0, tZ: - 200.0}, {b: 5500.0, d: 1000.0, o: 1.0, tZ: 200.0}, {b: 6500.0, d: 1000.0, o: - 1.0, tZ: 200.0}],
                                    [{b: - 1.0, d: 1.0, o: - 1.0, tZ: - 200.0}, {b: 6500.0, d: 1000.0, o: 1.0, tZ: 200.0}, {b: 7500.0, d: 1000.0, o: - 1.0, tZ: 200.0}],
                                    [{b: - 1.0, d: 1.0, o: - 1.0, tZ: - 200.0}, {b: 7500.0, d: 1000.0, o: 1.0, tZ: 200.0}, {b: 8500.0, d: 1000.0, o: - 1.0, tZ: 200.0}],
                                    [{b: - 1.0, d: 1.0, c: {x: 250.0, t: - 250.0}}, {b: 0.0, d: 1000.0, c: {x: - 250.0, t: 250.0}}, {b: 5000.0, d: 1000.0, y: 100.0}],
                                    [{b: - 1.0, d: 1.0, o: - 1.0}, {b: 1000.0, d: 1000.0, o: 1.0}, {b: 5000.0, d: 1000.0, y: 280.0}],
                                    [{b: 2000.0, d: 1000.0, y: 190.0, e: {y: 28.0}}, {b: 5000.0, d: 1000.0, x: 280.0}],
                                    [{b: 3000.0, d: 520.0, y: 50.0}, {b: 5000.0, d: 1000.0, y: - 50.0}],
                                    [{b: 3520.0, d: 480.0, x: - 400.0}, {b: 5000.0, d: 800.0, x: 400.0, e: {x: 7.0}}],
                                    [{b: 4000.0, d: 500.0, x: - 400.0}, {b: 5000.0, d: 800.0, x: 400.0, e: {x: 7.0}}],
                                    [{b: 4500.0, d: 500.0, x: - 400.0}, {b: 5000.0, d: 800.0, x: 400.0, e: {x: 7.0}}],
                                    [{b: - 1.0, d: 1.0, o: - 0.4}, {b: 0.0, d: 1000.0, y: 140.0, o: 0.4}, {b: 23000.0, d: 1000.0, y: - 140.0}],
                                    [{b: - 1.0, d: 1.0, c: {x: 275.0, t: - 275.0}}, {b: 1000.0, d: 1000.0, c: {x: - 275.0, t: 275.0}}, {b: 23000.0, d: 1000.0, y: 100.0}],
                                    [{b: - 1.0, d: 1.0, o: - 1.0}, {b: 2000.0, d: 1000.0, o: 1.0}, {b: 23000.0, d: 1000.0, o: - 1.0}],
                                    [{b: - 1.0, d: 1.0, sX: - 0.7, sY: - 0.7}, {b: 5000.0, d: 1000.0, sX: 0.4, sY: 0.4, e: {sX: 16.0, sY: 16.0}}, {b: 9000.0, d: 1000.0, sX: - 0.2, sY: - 0.2, e: {sX: 16.0, sY: 16.0}}, {b: 13000.0, d: 1000.0, sX: - 0.3, sY: - 0.3, e: {sX: 16.0, sY: 16.0}}, {b: 17000.0, d: 1000.0, sX: 0.4, sY: 0.4, e: {sX: 16.0, sY: 16.0}}, {b: 21000.0, d: 1000.0, sX: 0.4, sY: 0.4, e: {sX: 16.0, sY: 16.0}}],
                                    [{b: 4000.0, d: 1500.0, x: 195.0, y: 450.0, r: - 90.0}, {b: 8000.0, d: 1500.0, x: - 225.0, y: - 240.0, r: - 90.0}, {b: 12000.0, d: 1500.0, x: - 220.0, y: - 1140.0, r: 120.0}, {b: 16000.0, d: 1500.0, x: 400.0, y: 580.0, r: 100.0}, {b: 20000.0, d: 1500.0, x: 350.0, y: 350.0, r: 90.0}],
                                    [{b: 4000.0, d: 1500.0, o: - 0.6}],
                                    [{b: - 1.0, d: 1.0, o: - 0.6, r: 90.0}, {b: 4000.0, d: 1500.0, o: 0.6}, {b: 8000.0, d: 1500.0, o: - 0.6}],
                                    [{b: - 1.0, d: 1.0, o: - 0.6, r: 180.0}, {b: 8000.0, d: 1500.0, o: 0.6}, {b: 12000.0, d: 1500.0, o: - 0.6}],
                                    [{b: - 1.0, d: 1.0, o: - 0.6, r: 60.0}, {b: 12000.0, d: 1500.0, o: 0.6}, {b: 16000.0, d: 1000.0, o: - 0.6}],
                                    [{b: - 1.0, d: 1.0, o: - 0.6, r: - 40.0}, {b: 16000.0, d: 1000.0, o: 0.6}, {b: 20000.0, d: 1500.0, o: - 0.6}],
                                    [{b: - 1.0, d: 1.0, o: - 0.6, r: - 130.0}, {b: 20000.0, d: 1500.0, o: 0.6}],
                                    [{b: - 1.0, d: 1.0, c: {x: 250.0, t: - 250.0}}, {b: 0.0, d: 1000.0, c: {x: - 250.0, t: 250.0}}, {b: 10000.0, d: 500.0, y: 90.0}],
                                    [{b: - 1.0, d: 1.0, c: {x: 150.0, t: - 150.0}}, {b: 1000.0, d: 1000.0, c: {x: - 150.0, t: 150.0}}, {b: 10000.0, d: 500.0, c: {y: 150.0, m: - 150.0}}],
                                    [{b: 2000.0, d: 500.0, x: 220.0}],
                                    [{b: 3500.0, d: 500.0, rX: - 20.0}, {b: 4000.0, d: 1000.0, rX: 40.0}, {b: 5000.0, d: 500.0, rX: - 10.0}, {b: 9500.0, d: 500.0, o: - 1.0}],
                                    [{b: 3500.0, d: 2000.0, r: 360.0}],
                                    [{b: - 1.0, d: 1.0, o: - 1.0}, {b: 2500.0, d: 500.0, x: 76.0, y: - 25.0, o: 1.0}],
                                    [{b: - 1.0, d: 1.0, o: - 1.0}, {b: 2500.0, d: 500.0, x: 47.0, y: 65.0, o: 1.0}],
                                    [{b: - 1.0, d: 1.0, o: - 1.0}, {b: 2500.0, d: 500.0, x: - 47.0, y: 65.0, o: 1.0}],
                                    [{b: - 1.0, d: 1.0, o: - 1.0}, {b: 2500.0, d: 500.0, x: - 76.0, y: - 25.0, o: 1.0}],
                                    [{b: - 1.0, d: 1.0, o: - 1.0}, {b: 2500.0, d: 500.0, y: - 80.0, o: 1.0}],
                                    [{b: - 1.0, d: 1.0, c: {x: 120.0, t: - 120.0}}, {b: 6100.0, d: 400.0, c: {x: - 120.0, t: 120.0}}, {b: 10000.0, d: 500.0, y: - 120.0}],
                                    [{b: 6500.0, d: 500.0, x: 220.0}],
                                    [{b: - 1.0, d: 1.0, o: - 1.0, r: 180.0, sX: - 0.5, sY: - 0.5}, {b: 7000.0, d: 500.0, o: 1.0, r: 180.0, sX: 0.5, sY: 0.5}, {b: 8000.0, d: 500.0, o: - 1.0, r: 180.0, sX: 9.0, sY: 9.0}],
                                    [{b: - 1.0, d: 1.0, o: - 1.0, r: 180.0, sX: - 0.5, sY: - 0.5}, {b: 8000.0, d: 500.0, o: 1.0, r: 180.0, sX: 0.5, sY: 0.5}, {b: 9000.0, d: 500.0, o: - 1.0, r: 180.0, sX: 9.0, sY: 9.0}],
                                    [{b: - 1.0, d: 1.0, o: - 1.0, r: 180.0, sX: - 0.5, sY: - 0.5}, {b: 9000.0, d: 500.0, o: 1.0, r: 180.0, sX: 0.5, sY: 0.5}, {b: 9500.0, d: 500.0, o: - 1.0, r: 180.0, sX: 9.0, sY: 9.0}]
                            ];
                            var jssor_1_options = {
                            $AutoPlay: true,
                                    $SlideDuration: 800,
                                    $SlideEasing: $Jease$.$OutQuint,
                                    $SlideshowOptions: {
                                    $Class: $JssorSlideshowRunner$,
                                            $Transitions: jssor_1_SlideshowTransitions,
                                            $TransitionsOrder: 1
                                    },
                                    $CaptionSliderOptions: {
                                    $Class: $JssorCaptionSlideo$,
                                            $Transitions: jssor_1_SlideoTransitions,
                                            $Breaks: [
                                                    [{d: 3000, b: 8500, t: 2}],
                                                    [{d: 2000, b: 5000}],
                                                    [{d: 3000, b: 23000}],
                                                    [{d: 3000, b: 9500, t: 2}]
                                            ]
                                    },
                                    $ArrowNavigatorOptions: {
                                    $Class: $JssorArrowNavigator$
                                    },
                                    $BulletNavigatorOptions: {
                                    $Class: $JssorBulletNavigator$
                                    }
                            };
                            var jssor_1_slider = new $JssorSlider$("jssor_1", jssor_1_options);
                            //responsive code begin
                                    //you can remove responsive code if you don't want the slider scales while window resizing
                                            function ScaleSlider() {
                                            var refSize = jssor_1_slider.$Elmt.parentNode.clientWidth;
                                                    if (refSize) {
                                            refSize = Math.min(refSize, 1423);
                                                    jssor_1_slider.$ScaleWidth(refSize);
                                            }
                                            else {
                                            window.setTimeout(ScaleSlider, 30);
                                            }
                                            }
                                    ScaleSlider();
                                            $Jssor$.$AddEvent(window, "load", ScaleSlider);
                                            $Jssor$.$AddEvent(window, "resize", ScaleSlider);
                                            $Jssor$.$AddEvent(window, "orientationchange", ScaleSlider);
                                            //responsive code end
                                    };</script>

        <script>
                                    jssor_1_slider_init();</script>
        <script>
                                    function loadmore() {
                                    $(".waiting").show()
                                    }
                            function getgallery(id)
                            {
                            $(".waiting").show()
                                    $.ajax({
                                    type: "POST",
                                            url: '{{ url("/gallery")}}',
                                            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                                            data: {mode: "getgallery", id: id},
                                            success: function (response)
                                            {
                                            $(".waiting").hide();
                                                    $("#galleria").html(response);
                                                    $("#photo_viewer").modal();
//                        Galleria.loadTheme('js/front/galleria.classic.min.js');
                                                    Galleria.run('#galleria', {
                                                    extend: function () {
                                                    var gallery = this;
                                                            $('#switch_gallery').click(function () {
                                                    gallery.destroy();
                                                    });
                                                            $('#photo_viewer').on('hidden.bs.modal', function () {
                                                    gallery.destroy();
                                                    })
                                                    }
                                                    });
                                                    Galleria.ready(function () {
                                                    this.attachKeyboard({
                                                    right: this.next,
                                                            left: this.prev
                                                    });
                                                    });
                                            }
                                    });
                            }
                            jQuery(document).ready(function ($) {
                            $('.close-carbon-adv').on('click', function (event) {
                            event.preventDefault();
                                    $('#carbonads-container').hide();
                            });
                            });
                                    $('.post_ad_click').on('click', function () {
                            $(".waiting").show()
                                    // Simple Ajax code to submit a form
                                    $.ajax({
                                    type: "POST",
                                            url: '{{ url("/post_ad")}}',
                                            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                                            success: function (result) {
                                            $(".waiting").hide();
                                                    $("#modal-body").html(result);
                                                    // Simply give your modal an id something like "thankyouModal"
                                                    $("#myModal").modal();
                                            }
                                    });
                            });
                                    $(window).load(function () {
                            // Animate loader off screen
                            $(".se-pre-con").fadeOut("slow");
                            });
        </script>
    </body>
</html>

