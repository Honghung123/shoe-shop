(function ($) {
  $(".hero__categories__all").on("click", function () {
    $(".hero__categories ul").slideToggle(400);
  });

  $(".brand-dropdown").on("click", function () {
    $(".sidebar__item__brand ul").slideToggle(400);
  });
  /*--------------------------
        Select - shopping
    ----------------------------*/
  $("select").niceSelect();
})(jQuery);
