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

function getAcceptedPosts(username, skip, limit) {
    $.ajax({
        url: "/api/posts/accepted/" + username +".json?skip="+skip+"&limit="+limit,
        success: function(response) {
            response.results.forEach(function(post) {
                $('#accepted_posts').append('<tr><td>'+post.author+'</td><td>'+post.category+'</td><td>'+post.title+'</td><td><a href="//utopian.io'+post.url+'" class="btn btn-default btn-sm">View Post</a></td></tr>')
            })
        }
    })
}
function getRejectedPosts(username, skip, limit) {
    $.ajax({
        url: "/api/posts/hidden/" + username +".json?skip="+skip+"&limit="+limit,
        success: function(response) {
            response.results.forEach(function(post) {
                $('#rejected_posts').append('<tr><td>'+post.author+'</td><td>'+post.category+'</td><td>'+post.title+'</td><td><a href="//utopian.io'+post.url+'" class="btn btn-default btn-sm">View Post</a></td></tr>')
            })
        }
    })
}


