
{
    let create_post = function(){
        let new_post_form = $('#new-post-form');
        new_post_form.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url:'/posts/create/',
                data: new_post_form.serialize(),
                success:function(data){
                    let new_post  = create_post_dom(data.data.post, data.data.post_user);
                    $('#post-list-container>ul').prepend(new_post);
                    let delete_post_button = $(`#post-${data.data.post._id}>.delete-post-button`);
                    delete_post(delete_post_button);
                    create_comment(data.data.post._id);

                    new Noty({
                        theme:'relax',
                        text: 'Post Created',
                        layout:'topRight',
                        type:'success',
                        timeout:2000
                    }).show();
                },
                error:function(err){
                    console.log(err.responseText);
                }
            })
        })
    }


    let create_post_dom = function(post, user){
        return(`
        
                <li id="post-${post._id}">
                    <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>

                    ${post.content} 
                    <br>
                    ${user} 

                    <form action="/comments/create" method="POST" class="post-comment-form">
                        <input type="text" name="content" id="">
                        <input type="hidden" name="post" value="${post._id}">
                        <input type="submit" value="Comment" id="">
                    </form>

                    <div class="comment-list-container">
                        <ul>

                        </ul>
                    </div>
                    <br><br>
                </li>

            `)
    }

    let delete_post = function(delete_link){
        $(delete_link).click(function(e){
            e.stopPropagation();
            e.preventDefault();
           

            $.ajax({
                type:'get',
                url:$(delete_link).prop('href'),
                success:function(data){
                    // console.log(data);
                    $(`#post-${data.data.post_id}`).remove();

                    new Noty({
                        theme:'relax',
                        text: 'Post Deleted',
                        layout:'topRight',
                        type:'success',
                        timeout:2000
                    }).show();
                },
                error:function(error){
                    console.log(error.responseText);
                }
            });
        });
    };

    create_post();
    // let delete_post_button = $('.delete-post-button');
    // for(let button of delete_post_button){
    //     delete_post(button);
    // }

    let posts = $(`#post-list-container>ul>li`);
    for(let post of posts){
        let delete_post_button = $(`.delete-post-button`, post);
        delete_post(delete_post_button);

        let post_id = $(post).prop('id').split('-')[1];
        create_comment(post_id);


    }

    $(`.delete-comment-button`).each(function(){
        delete_comment(this);
    });
    
}