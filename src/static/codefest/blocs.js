import $ from "jquery";

// Blocs.js
function setUpSpecialNavs() {
  $(".navbar-toggler").click(function (t) {
    var e = $(this).closest("nav"),
      a = e.find("ul.site-navigation"),
      o = a.clone();
    if (a.parent().is(".fullscreen-nav, .sidebar-nav"))
      if (
        (t.stopPropagation(), a.parent().addClass("nav-special"), $(this).hasClass("selected-nav"))
      )
        $(".blocsapp-special-menu blocsnav").removeClass("open"),
          $(".selected-nav").removeClass("selected-nav"),
          setTimeout(function () {
            $(".blocsapp-special-menu").remove(),
              $("body").removeClass("lock-scroll"),
              $(".nav-special").removeClass("nav-special");
          }, 300);
      else {
        $(this).addClass("selected-nav");
        var i = e.attr("class").replace("navbar", "").replace("row", ""),
          l = a.parent().attr("class").replace("navbar-collapse", "").replace("collapse", "");
        ($(".content-tint").length = -1) && $("body").append('<div class="content-tint"></div>'),
          o
            .insertBefore(".page-container")
            .wrap('<div class="blocsapp-special-menu ' + i + '"><blocsnav class="' + l + '">'),
          $("blocsnav").prepend(
            '<a class="close-special-menu animated fadeIn" style="animation-delay:0.5s;"><div class="close-icon"></div></a>',
          ),
          (function () {
            var t = "fadeInRight",
              e = 0,
              a = 60;
            $(".blocsapp-special-menu blocsnav").hasClass("fullscreen-nav")
              ? ((t = "fadeIn"), (a = 100))
              : $(".blocsapp-special-menu").hasClass("nav-invert") && (t = "fadeInLeft");
            $(".blocsapp-special-menu blocsnav li").each(function () {
              $(this).parent().hasClass("dropdown-menu")
                ? $(this).addClass("animated fadeIn")
                : ((e += a),
                  $(this)
                    .attr("style", "animation-delay:" + e + "ms")
                    .addClass("animated " + t));
            });
          })(),
          setTimeout(function () {
            $(".blocsapp-special-menu blocsnav").addClass("open"),
              $(".content-tint").addClass("on"),
              $("body").addClass("lock-scroll");
          }, 10);
      }
  }),
    $("body")
      .on("mousedown touchstart", ".content-tint, .close-special-menu", function (t) {
        $(".content-tint").removeClass("on"),
          $(".selected-nav").click(),
          setTimeout(function () {
            $(".content-tint").remove();
          }, 10);
      })
      .on("click", ".blocsapp-special-menu a", function (t) {
        $(t.target).closest(".dropdown-toggle").length || $(".close-special-menu").mousedown();
      });
}

function extraNavFuncs() {
  $(".site-navigation a").click(function (t) {
    $(t.target).closest(".dropdown-toggle").length || $(".navbar-collapse").collapse("hide");
  }),
    $("a.dropdown-toggle").click(function (t) {
      $(this).parent().addClass("target-open-menu"),
        $(this)
          .closest(".dropdown-menu")
          .find(".dropdown.open")
          .each(function (t) {
            $(this).hasClass("target-open-menu") || $(this).removeClass("open");
          }),
        $(".target-open-menu").removeClass("target-open-menu");
    }),
    $(".dropdown-menu a.dropdown-toggle").on("click", function (t) {
      var e = $(this),
        a = $(this).offsetParent(".dropdown-menu");
      return (
        $(this).next().hasClass("show") ||
          $(this).parents(".dropdown-menu").first().find(".show").removeClass("show"),
        $(this).next(".dropdown-menu").toggleClass("show"),
        $(this).parent("li").toggleClass("show"),
        $(this)
          .parents("li.nav-item.dropdown.show")
          .on("hidden.bs.dropdown", function (t) {
            $(".dropdown-menu .show").removeClass("show");
          }),
        a.parent().hasClass("navbar-nav") ||
          e.next().css({ top: e[0].offsetTop, left: a.outerWidth() - 4 }),
        !1
      );
    });
}

function getFillHeight() {
  var t = $(window).height();
  return t < fillBodyHeight && (t = fillBodyHeight + 100), t;
}

export function scrollToTarget(t, e) {
  var a = "slow";
  0 == t
    ? (t = $(e).closest(".bloc").height())
    : 1 == t
    ? (t = 0)
    : 2 == t
    ? (t = $(document).height())
    : ((t = $(t).offset().top), $(".sticky-nav").length && (t -= $(".sticky-nav").outerHeight())),
    $(e).is("[data-scroll-speed]") &&
      ((a = $(e).attr("data-scroll-speed")), parseInt(a) && (a = parseInt(a))),
    $("html,body").animate({ scrollTop: t }, a),
    $(".navbar-collapse").collapse("hide");
}

function animateWhenVisible() {
  hideAll(),
    inViewCheck(),
    $(window).scroll(function () {
      inViewCheck(), scrollToTopView(), stickyNavToggle();
    });
}

function setUpDropdownSubs() {
  $("ul.dropdown-menu [data-toggle=dropdown]").on("click", function (t) {
    t.preventDefault(),
      t.stopPropagation(),
      $(this).parent().siblings().removeClass("open"),
      $(this).parent().toggleClass("open");
    var e = $(this).parent().children(".dropdown-menu");
    e.offset().left + e.width() > $(window).width() && e.addClass("dropmenu-flow-right");
  });
}

function stickyNavToggle() {
  var t = 0,
    e = "sticky";
  if ($(".sticky-nav").hasClass("fill-bloc-top-edge")) {
    var a = $(".fill-bloc-top-edge.sticky-nav").parent().css("background-color");
    "rgba(0, 0, 0, 0)" == a && (a = "#FFFFFF"),
      $(".sticky-nav").css("background", a),
      (t = $(".sticky-nav").height()),
      (e = "sticky animated fadeInDown");
  }
  $(window).scrollTop() > t
    ? ($(".sticky-nav").addClass(e),
      "sticky" == e && $(".page-container").css("padding-top", $(".sticky-nav").height()))
    : ($(".sticky-nav").removeClass(e).removeAttr("style"),
      $(".page-container").removeAttr("style"));
}

function hideAll() {
  $(".animated").each(function (t) {
    $(this).closest(".hero").length || $(this).removeClass("animated").addClass("hideMe");
  });
}

function inViewCheck() {
  $($(".hideMe").get().reverse()).each(function (t) {
    var e = $(this),
      a = e.offset().top + e.height(),
      o = $(window).scrollTop() + $(window).height();
    if ((e.height() > $(window).height() && (a = e.offset().top), a < o)) {
      var i = e.attr("class").replace("hideMe", "animated");
      e.css("visibility", "hidden").removeAttr("class"),
        setTimeout(function () {
          e.attr("class", i).css("visibility", "visible");
        }, 0.01),
        e.on("webkitAnimationEnd mozAnimationEnd oAnimationEnd animationEnd", function (t) {
          $(this).removeClass($(this).attr("data-appear-anim-style"));
        });
    }
  });
}

function scrollToTopView() {
  $(window).scrollTop() > $(window).height() / 3
    ? $(".scrollToTop").hasClass("showScrollTop") || $(".scrollToTop").addClass("showScrollTop")
    : $(".scrollToTop").removeClass("showScrollTop");
}

function setUpVisibilityToggle() {
  $(document).on("click", "[data-toggle-visibility]", function (t) {
    t.preventDefault();
    var e = $(this).attr("data-toggle-visibility");
    if (-1 != e.indexOf(",")) {
      var a = e.split(",");
      $.each(a, function (t) {
        o($("#" + a[t]));
      });
    } else o($("#" + e));
    function o(t) {
      t.is("img")
        ? t.toggle()
        : t.is(".row, .bloc-group")
        ? t.toggleClass("d-flex")
        : t.slideToggle();
    }
  });
}

function setUpLightBox() {
  window.targetLightbox,
    $(document)
      .on("click", "[data-lightbox]", function (t) {
        t.preventDefault(), (targetLightbox = $(this));
        var e = targetLightbox.attr("data-lightbox"),
          a = targetLightbox.attr("data-autoplay"),
          o = '<p class="lightbox-caption">' + targetLightbox.attr("data-caption") + "</p>",
          i = "no-gallery-set",
          l = targetLightbox.attr("data-frame");
        targetLightbox.attr("data-gallery-id") && (i = targetLightbox.attr("data-gallery-id"));
        var n = "";
        1 == a && (n = "autoplay");
        var s = $(
          '<div id="lightbox-modal" class="modal fade"><div class="modal-dialog modal-dialog-centered modal-lg"><div class="modal-content ' +
            l +
            ' blocs-lb-container"><button id="blocs-lightbox-close-btn" type="button" class="close-lightbox" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><div class="modal-body"><a href="#" class="prev-lightbox" aria-label="prev"><span class="fa fa-chevron-left"></span></a><a href="#" class="next-lightbox" aria-label="next"><span class="fa fa-chevron-right"></span></a><img id="lightbox-image" class="img-fluid mx-auto d-block" src="' +
            e +
            '"><div id="lightbox-video-container" class="embed-responsive embed-responsive-16by9"><video controls ' +
            n +
            ' class="embed-responsive-item"><source id="lightbox-video" src="' +
            e +
            '" type="video/mp4"></video></div>' +
            o +
            "</div></div></div></div>",
        );
        $("body").append(s),
          "fullscreen-lb" == l &&
            ($("#lightbox-modal")
              .addClass("fullscreen-modal")
              .append(
                '<a class="close-full-screen-modal animated fadeIn" style="animation-delay:0.5s;" onclick="$(\'#lightbox-modal\').modal(\'hide\');"><div class="close-icon"></div></a>',
              ),
            $("#blocs-lightbox-close-btn").remove()),
          ".mp4" == e.substring(e.length - 4)
            ? ($("#lightbox-image, .lightbox-caption").removeClass("d-block").hide(),
              $("#lightbox-video-container").show())
            : ($("#lightbox-image,.lightbox-caption").addClass("d-block").show(),
              $("#lightbox-video-container").hide(),
              targetLightbox.attr("data-caption") ||
                $(".lightbox-caption").removeClass("d-block").hide()),
          $("#lightbox-modal").modal("show"),
          "no-gallery-set" == i
            ? (0 == $("a[data-lightbox]").index(targetLightbox) && $(".prev-lightbox").hide(),
              $("a[data-lightbox]").index(targetLightbox) == $("a[data-lightbox]").length - 1 &&
                $(".next-lightbox").hide())
            : (0 == $('a[data-gallery-id="' + i + '"]').index(targetLightbox) &&
                $(".prev-lightbox").hide(),
              $('a[data-gallery-id="' + i + '"]').index(targetLightbox) ==
                $('a[data-gallery-id="' + i + '"]').length - 1 && $(".next-lightbox").hide()),
          addLightBoxSwipeSupport();
      })
      .on("hidden.bs.modal", "#lightbox-modal", function () {
        $("#lightbox-modal").remove();
      }),
    $(document).on("click", ".next-lightbox, .prev-lightbox", function (t) {
      t.preventDefault();
      var e = "no-gallery-set",
        a = $("a[data-lightbox]").index(targetLightbox),
        o = $("a[data-lightbox]").eq(a + 1);
      targetLightbox.attr("data-gallery-id") &&
        ((e = targetLightbox.attr("data-gallery-id")),
        (a = $('a[data-gallery-id="' + e + '"]').index(targetLightbox)),
        (o = $('a[data-gallery-id="' + e + '"]').eq(a + 1))),
        $(this).hasClass("prev-lightbox") &&
          ((o = $('a[data-gallery-id="' + e + '"]').eq(a - 1)),
          "no-gallery-set" == e && (o = $("a[data-lightbox]").eq(a - 1)));
      var i = o.attr("data-lightbox");
      if (".mp4" == i.substring(i.length - 4)) {
        var l = "";
        1 == o.attr("data-autoplay") && (l = "autoplay"),
          $("#lightbox-image, .lightbox-caption").removeClass("d-block").hide(),
          $("#lightbox-video-container")
            .show()
            .html(
              "<video controls " +
                l +
                ' class="embed-responsive-item"><source id="lightbox-video" src="' +
                i +
                '" type="video/mp4"></video>',
            );
      } else $("#lightbox-image").attr("src", i).addClass("d-block").show(), $("#lightbox-video-container").hide(), $(".lightbox-caption").removeClass("d-block").hide(), o.attr("data-caption") && $(".lightbox-caption").html(o.attr("data-caption")).show();
      (targetLightbox = o),
        $(".next-lightbox, .prev-lightbox").hide(),
        "no-gallery-set" == e
          ? ($("a[data-lightbox]").index(o) != $("a[data-lightbox]").length - 1 &&
              $(".next-lightbox").show(),
            0 < $("a[data-lightbox]").index(o) && $(".prev-lightbox").show())
          : ($('a[data-gallery-id="' + e + '"]').index(o) !=
              $('a[data-gallery-id="' + e + '"]').length - 1 && $(".next-lightbox").show(),
            0 < $('a[data-gallery-id="' + e + '"]').index(o) && $(".prev-lightbox").show());
    });
}

function addKeyBoardSupport() {
  $(window).keydown(function (t) {
    37 == t.which
      ? $(".prev-lightbox").is(":visible") && $(".prev-lightbox").click()
      : 39 == t.which && $(".next-lightbox").is(":visible") && $(".next-lightbox").click();
  });
}

function addLightBoxSwipeSupport() {
  $("#lightbox-image").length &&
    $("#lightbox-image").swipe({
      swipeLeft: function (t, e, a, o, i) {
        $(".next-lightbox").is(":visible") && $(".next-lightbox").click();
      },
      swipeRight: function () {
        $(".prev-lightbox").is(":visible") && $(".prev-lightbox").click();
      },
      threshold: 0,
    });
}

$(document).ready(function () {
  extraNavFuncs(),
    setUpSpecialNavs(),
    setUpDropdownSubs(),
    setUpLightBox(),
    setUpVisibilityToggle(),
    addKeyBoardSupport(),
    -1 != navigator.userAgent.indexOf("Safari") &&
      -1 == navigator.userAgent.indexOf("Chrome") &&
      $("#page-loading-blocs-notifaction").remove(),
    $('a[onclick^="scrollToTarget"]').click(function (t) {
      t.preventDefault();
    });
}),
  $(window).on("load", function () {
    animateWhenVisible(), $("#page-loading-blocs-notifaction").remove();
  }),
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });
