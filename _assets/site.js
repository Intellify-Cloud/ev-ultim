$(function () {
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').on("click", function () {
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
            var a = $(this.hash);
            if ((a = a.length ? a : $("[name=" + this.hash.slice(1) + "]")).length) {
                // Update URL hash without jumping
                if (history.pushState) {
                    history.pushState(null, null, this.hash);
                }
                return $("html, body").animate({
                    scrollTop: a.offset().top - 54
                }, 1e3, "easeInOutExpo"), !1
            }
        }
    });

    $(".js-scroll-trigger").on("click", function () {
        $(".navbar-collapse").collapse("hide")
    });

    $("body").scrollspy({
        target: "#mainNav",
        offset: 56
    });

    $(window).on("scroll", function () {
        return 100 < $("#mainNav").offset().top ? $("#mainNav").addClass("navbar-shrink") : $("#mainNav").removeClass("navbar-shrink");
    });

    $("[data-calculator-shell]").each(function () {
        var shell = $(this);
        var iframe = shell.find("[data-calculator-iframe]");
        var loading = shell.find("[data-calculator-loading]");
        var errorState = shell.find("[data-calculator-error]");
        var timer = window.setTimeout(function () {
            if (!shell.hasClass("is-loaded")) {
                loading.addClass("d-none");
                errorState.removeClass("d-none");
            }
        }, 8000);

        iframe.on("load", function () {
            window.clearTimeout(timer);
            shell.addClass("is-loaded");
            loading.addClass("d-none");
            errorState.addClass("d-none");
        });

        iframe.on("error", function () {
            window.clearTimeout(timer);
            loading.addClass("d-none");
            errorState.removeClass("d-none");
        });
    });
});

