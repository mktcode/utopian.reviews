function updateModeratorStatistic(moderator) {
  $.ajax({
    url: "/api/moderator.json",
    data: {
      "account": moderator
    },
    success: function (response) {
      $('#total_moderated').text(response.total_moderated);
    }
  })
}

function getAcceptedPosts(username, skip, limit, cb) {

  $.ajax({
    url: 'https://api.utopian.io/api/posts?moderator=' + username + '&status=reviewed&skip=' + skip + '&limit=' + limit,
    success: function (response) {
      $('#accepted_moderated_count').text(response.total)
      response.results.forEach(function (post) {
        var created = moment.utc(new Date(post.created)).format('YYYY-MM-DD HH:mm:ss');
        if (post.json_metadata.moderator.time) {
          var modDate = moment.utc(new Date(post.json_metadata.moderator.time)).format('YYYY-MM-DD HH:mm:ss');
        } else {
          var modDate = "unknown";
        }
        $('#accepted_posts').append('<tr><td>' + post.author + '</td><td>' + post.json_metadata.type + '</td><td>' + post.title + '</td><td>' + created + '</td><td>' + modDate + '</td><td><a target="_blank" href="//utopian.io' + post.url + '" class="btn btn-default btn-sm">View Post</a></td></tr>')
        if (typeof cb === "function") cb();
      })
    }
  })
}

function getRejectedPosts(username, skip, limit, cb) {
  $.ajax({
    url: 'https://api.utopian.io/api/posts?moderator=' + username + '&status=flagged&skip=' + skip + '&limit=' + limit,
    success: function (response) {
      response.results.forEach(function (post) {
        $('#rejected_moderated_count').text(response.total)
        var created = moment.utc(new Date(post.created)).format('YYYY-MM-DD HH:mm:ss');
        if (post.json_metadata.moderator.time) {
          var modDate = moment.utc(new Date(post.json_metadata.moderator.time)).format('YYYY-MM-DD HH:mm:ss');
        } else {
          var modDate = "unknown";
        }
        $('#rejected_posts').append('<tr><td>' + post.author + '</td><td>' + post.json_metadata.type + '</td><td>' + post.title + '</td><td>' + created + '</td><td>' + modDate + '</td><td><a target="_blank" href="//utopian.io' + post.url + '" class="btn btn-default btn-sm">View Post</a></td></tr>')
        if (typeof cb === "function") cb();
      })
    }
  })
}


