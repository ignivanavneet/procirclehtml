(function($) {
    var App = {
        /**
         * Init Function
         */
        init: function() {
            App.Preloader();
            App.menu();
            App.fslider();
            App.wscroll();
            App.animation();
            App.countrydrop();
            App.overlay();
            App.catlist();
            App.scrollanimation();

        },

        /**
         * Preloader
         */
        Preloader: function() {
            $(window).load(function() {
                $('#preloader').delay(500).fadeOut('slow');
                $(window).scrollTop(0);
            });
        },
        menu: function() {

            $(document).on("click", "div.nav-icon", function() {
                $(this).removeClass('nav-icon').addClass('opens');
                TweenMax.to(".side-menu", 0.5, { left: "0px", ease: Power0.easeInOut });
                TweenMax.to(this, 0.5, { left: "220px", ease: Power1.easeInOut });

            });

            $(document).on("click", "div.opens", function() {
                TweenMax.to(".side-menu", 0.5, { left: "-220px", ease: Power0.easeInOut });
                TweenMax.to(this, 0.5, { left: "0px", ease: Power1.easeInOut });
                $(this).removeClass('opens').addClass('nav-icon');
            });

        },


        fslider: function() {
            var owl = $(".f-slider");
            owl.owlCarousel({
                loop: false,
                margin: 0,
                dots: false,
                nav: false,
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: 2
                    },
                    1000: {
                        items: 3
                    },
                    1400: {
                        items: 4,

                    }
                }
            });
        },

        wscroll: function() {

            $(".home").niceScroll({ cursorcolor: "#fff" });
            $(".s-scroll").niceScroll({ cursorcolor: "#067cb6" });

        },

        animation: function() {

            $(window).load(function() {
                TweenMax.staggerFromTo($('.f-box'), 1, { scale: 0 }, {
                    scale: 1,
                    opacity: 1,

                    ease: Back.easeInOut,
                    delay: 1
                }, 0.2);

                TweenMax.staggerFromTo($('.social-share'), 1, { opacity: "0" }, {

                    opacity: 1,

                    ease: Back.easeInOut,
                    delay: 1.5
                }, 0.5);

            });

            var viewPortWidth = $(window).width();
            if (viewPortWidth > 767) {
                $(document).on({
                    mouseenter: function() {
                        TweenMax.to(".social-share-list", 0.6, { "padding-bottom": "30px", ease: Power2.easeInOut });
                    },
                    mouseleave: function() {
                        TweenMax.to(".social-share-list", 0.6, { "padding-bottom": "10px", ease: Power2.easeInOut });
                    }
                }, ".social-share")

            }
        },



        countrydrop: function() {
            $("#phone").intlTelInput({

                utilsScript: "assetes/js/utils.js"
            });
        },

        overlay: function() {
            $('.l-btn').click(function() {
                TweenMax.staggerFromTo($('.overlay-pannel'), 0.1, { top: "-100%" }, {
                    top: "0%",
                    visibility: "visible",
                    ease: Power2.easeInOut,

                }, 0.5);

                var id = $(this).attr('tab-index');

                $(".content-pane").each(function() {
                    var value = $(this).attr('tab-index');
                    if (id == value) {
                        $('.content-pane').removeClass('active');
                        $(this).addClass('active');

                    } else {

                        $(this).removeClass('active');
                    }
                });

                $('.overlay_tabs span').each(function() {
                    var value = $(this).attr('tab-index');
                    if (id == value) {
                        $('.overlay_tabs span').removeClass('active');
                        $(this).addClass('active');
                    } else {
                        $(this).removeClass('active');
                    }

                });

            });

            $('.s-btn').click(function() {
                var id = $(this).attr('tab-index');
                $(".content-pane").each(function() {
                    var value = $(this).attr('tab-index');
                    if (id == value) {
                        $('.content-pane').removeClass('active');
                        $(this).addClass('active');

                    } else {

                        $(this).removeClass('active');
                    }
                });
            });

            $('.f-btn').click(function() {
                var id = $(this).attr('tab-index');
                $(".content-pane").each(function() {
                    var value = $(this).attr('tab-index');
                    if (id == value) {
                        $('.content-pane').removeClass('active');
                        $(this).addClass('active');
                        $('.overlay_tabs').addClass('hidden');
                    } else {

                        $(this).removeClass('active');
                        $('.overlay_tabs').removeClass('hidden');
                    }
                });
            });



            $('.overlay-close').click(function() {

                TweenMax.staggerFromTo($('.overlay-pannel'), 0.1, { top: "0%" }, {
                    top: "100%",
                    visibility: "visible",
                    ease: Power2.easeInOut,

                }, 0.5);

                $('.overlay_tabs').removeClass('hidden').delay(500);
            });

            $('.overlay_tabs span').click(function() {
                $('.overlay_tabs span').removeClass('active');
                $(this).addClass('active');
                var id = $(this).attr('tab-index');
                // alert(id);
                $(".content-pane").each(function() {
                    var value = $(this).attr('tab-index');
                    if (id == value) {
                        $('.content-pane').removeClass('active');
                        $(this).addClass('active');
                        //$(this).show();
                    } else {
                        //  $(this).addClass('hidden');
                        $(this).removeClass('active');
                    }
                });


            });
        },
        catlist: function() {
            $('.cat-btn').click(function() {
                var id = $(this).attr('data-index');
                $('.cat-btn').removeClass('active');
                $(this).addClass('active');
                $(".list-pane").each(function() {
                    var value = $(this).attr('data-index');
                    if (id == value) {
                        $('.list-pane').removeClass('active');
                        $(this).addClass('active');
                        //$(this).show();
                    } else {
                        //  $(this).addClass('hidden');
                        $(this).removeClass('active');
                    }
                });

            });

        },

        scrollanimation: function() {
            TweenMax.staggerFromTo($('.animate'), 1, { scale: 0 }, {
                scale: 1,
                opacity: 1,

                ease: Power2.easeInOut,
                delay: 1
            }, 0.2);


              TweenMax.staggerFromTo($('.fade'), 1, { opacity: 0 }, {
                scale: 1,
                opacity: 1,

                ease: Power0.easeInOut,
                delay: 1
            }, 0.2);

        }

    }
    $(function() {
        App.init();
    });
})(jQuery);
