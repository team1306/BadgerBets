window.onbeforeunload = function() {
    return "NOOOOOOOO DONT GO!!!!";
}
let upDown = 0;
$(".up.incremental-button").on("click", () => {
    upDown++;
    $(".up-down-number").text(upDown);
});
$(".down.incremental-button").on("click", () => {
    upDown--;
    $(".up-down-number").text(upDown);
});