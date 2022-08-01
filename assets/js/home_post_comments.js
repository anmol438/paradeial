


    let create_comment = function(post_id){
        let new_comment_form = $(`#post-${post_id}>.post-comment-form`);
        new_comment_form.submit(function(e){
            e.preventDefault();
            $.ajax({
                type:'post',
                url:'/comments/create',
                data:new_comment_form.serialize(),
                success:function(data){
                    let new_comment = new_comment_dom(data.data.comment, data.data.comment_user);
                    $(`#post-${post_id}>.comment-list-container>ul`).prepend(new_comment);

                    let delete_comment_button = $(`#comment-${data.data.comment._id}>.delete-comment-button`);
                    delete_comment(delete_comment_button);

                    new Noty({
                        theme:'relax',
                        text: 'Comment Added',
                        layout:'topRight',
                        type:'success',
                        timeout:2000
                    }).show();
                },
                error:function(err){
                    console.log(err.responseText);
                }
            });
        });
    }


    let new_comment_dom = function(comment, user){
        return(`
        <li id="comment-${comment._id}">
            <a class="delete-comment-button" href="/comments/destroy/${comment._id}">x</a>
            ${comment.content}
            <br>
            ${user}
        </li>
        `)
    }

    let delete_comment = function(delete_link){
        $(delete_link).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url:$(delete_link).prop('href'),
                success:function(data){
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme:'relax',
                        text: 'Comment Deleted',
                        layout:'topRight',
                        type:'success',
                        timeout:2000
                    }).show();
                },
                error:function(err){
                    console.log(err.responseText);
                }

            });
        });
    }


    // create_comment();

