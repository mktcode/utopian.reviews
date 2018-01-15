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

function getAcceptedPosts(username, skip, limit, cb) {
    $.ajax({
        url: "/api/posts/accepted/" + username +".json?skip="+skip+"&limit="+limit,
        success: function(response) {
            response.results.forEach(function(post) {
                var created = moment.utc(new Date(post.created)).from(moment.utc().format('YYYY-MM-DD HH:mm:ss'));
                $('#accepted_posts').append('<tr><td>'+post.author+'</td><td>'+post.category+'</td><td>'+post.title+'</td><td>'+created+'</td><td><a target="_blank" href="//utopian.io'+post.url+'" class="btn btn-default btn-sm">View Post</a></td></tr>')
              if (typeof cb === "function") cb();
            })
        }
    })
}
function getRejectedPosts(username, skip, limit,cb) {
    $.ajax({
        url: "/api/posts/hidden/" + username +".json?skip="+skip+"&limit="+limit,
        success: function(response) {
            response.results.forEach(function(post) {
                var created = moment.utc(new Date(post.created)).from(moment.utc().format('YYYY-MM-DD HH:mm:ss'));
                $('#rejected_posts').append('<tr><td>'+post.author+'</td><td>'+post.category+'</td><td>'+post.title+'</td><td>'+created+'</td><td><a target="_blank" href="//utopian.io'+post.url+'" class="btn btn-default btn-sm">View Post</a></td></tr>')
              if (typeof cb === "function") cb();
            })
        }
    })
}


