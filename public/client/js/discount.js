(function ($) {
    /*-------------------
        Deal timer with slide image
    --------------------- */
    function makeTimer() {
        const currentDate = new Date();
        let endTime = new Date(currentDate);
        endTime.setDate(currentDate.getDate() + 1);
        endTime.setHours(0, 0, 0, 0);
        endTime = (Date.parse(endTime) / 1000);
        let now = new Date();
        now = (Date.parse(now) / 1000);
        let timeLeft = endTime - now;
        let days = Math.floor(timeLeft / 86400);
        let hours = Math.floor((timeLeft - (days * 86400)) / 3600);
        let minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
        let seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
        if (hours < "10") { hours = "0" + hours; }
        if (minutes < "10") { minutes = "0" + minutes; }
        if (seconds < "10") { seconds = "0" + seconds; }
        $("#days").html(days + "<span>Days</span>");
        $("#hours").html(hours + "<span>Hours</span>");
        $("#minutes").html(minutes + "<span>Minutes</span>");
        $("#seconds").html(seconds + "<span>Seconds</span>");
    }
    setInterval(function () { makeTimer(); }, 1000);


})(jQuery);