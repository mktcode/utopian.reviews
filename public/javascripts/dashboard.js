function updateModeratorStatistic(moderator) {
    $.ajax({
        url: "/api/moderator.json",
        data: {
            "account": moderator
        },
        success: function(response) {
            $('#total_moderated').text(response.total_moderated);
        }
    })
}
